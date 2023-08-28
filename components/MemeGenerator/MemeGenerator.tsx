/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MemeContext, { getInitialData, ICanvasComponent, ICanvasContext, ICanvasData } from '@context/MemeContext';
import CanvasComponent from './components/CanvasComponent';
import Toolbar from './components/Toolbar';

const MemeGenerator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLCanvasElement>(null);

  const [canvasData, setCanvasData] = useState<ICanvasData[]>([]);
  const [activeSelection, setActiveSelection] = useState<Set<string>>(new Set());
  const [enableQuillToolbar, setEnableQuillToolbar] = useState<boolean>(true);

  const isSelectAll = useRef<boolean>(false);

  const updateCanvasData = (data: Partial<ICanvasComponent>) => {
    const currentDataIndex = canvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    const updatedData = { ...canvasData?.[currentDataIndex], ...data };
    canvasData.splice(currentDataIndex, 1, updatedData);
    setCanvasData([...(canvasData || [])]);
  };

  const addElement = (type: string) => {
    const defaultData = getInitialData(canvasData, type);
    setCanvasData([...canvasData, { ...defaultData, type: type ?? 'TEXT' }]);
    activeSelection.clear();
    activeSelection.add(defaultData.id);
    setActiveSelection(new Set(activeSelection));
  };

  const deleteElement = useCallback(() => {
    setCanvasData([
      ...canvasData.filter((data) => {
        if (data.id && activeSelection.has(data.id)) {
          activeSelection.delete(data.id);
          return false;
        }
        return true;
      }),
    ]);
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);

  const selectAllElement = useCallback(() => {
    isSelectAll.current = true;
    canvasData.map((data) => activeSelection.add(data.id || ''));
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);

  const context: ICanvasContext = {
    actions: {
      setCanvasData,
      setActiveSelection,
      updateCanvasData,
      addElement,
      setEnableQuillToolbar,
    },
    state: {
      canvasData,
      activeSelection,
      enableQuillToolbar,
    },
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        deleteElement();
      } else if (['a', 'A'].includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        selectAllElement();
      }
    },
    [deleteElement, selectAllElement]
  );

  const outSideClickHandler = () => {
    isSelectAll.current = false;
    setActiveSelection(new Set());
  };

  const handleMouseDown = useCallback((event) => {
    if (!isSelectAll.current) {
      return;
    }

    outSideClickHandler();
    isSelectAll.current = false;
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);

  useEffect(() => {
    if (!imageRef.current) return;
    const canvasContext = imageRef.current.getContext('2d');
    const image = new Image();
    image.src =
      'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip';
    image.style.objectFit = 'cover';
    image.onload = function () {
      const wrh = image.width / image.height;
      const canvas = imageRef.current;
      if (!canvas) return;
      let newWidth = canvas.width;
      let newHeight = newWidth / wrh;
      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = newHeight * wrh;
      }
      const xOffset = newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0;
      const yOffset = newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;

      canvasContext?.drawImage(image, xOffset, yOffset, newWidth, newHeight);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <MemeContext.Provider value={context}>
        <Toolbar isEditEnable={true} />
        <div className="w-full h-[60vh] relative overflow-hidden bg-white">
          {canvasData.map((canvas) => {
            return <CanvasComponent {...canvas} key={canvas.id} />;
          })}
        </div>
        {/* {JSON.stringify(canvasData)} */}
      </MemeContext.Provider>
    </div>
  );
};

export default MemeGenerator;
