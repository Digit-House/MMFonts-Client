/* eslint-disable @next/next/no-img-element */
import { toPng } from 'html-to-image';
import React, { useCallback, useRef, useState } from 'react';
import MemeContext, { getInitialData, ICanvasComponent, ICanvasContext, ICanvasData } from '@context/MemeContext';
import CanvasComponent from './components/CanvasComponent';
import Toolbar from './components/Toolbar';

const MemeGenerator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [canvasData, setCanvasData] = useState<ICanvasData[]>([
    {
      type: 'IMAGE',
      id: 'IMAGE__1616154982257__0',
      position: { left: 269, top: 103.08001708984375 },
      dimension: { width: '365px', height: '365px' },
      content: '',
    },
  ]);
  const [activeSelection, setActiveSelection] = useState<Set<string>>(new Set());
  const [enableQuillToolbar, setEnableQuillToolbar] = useState<boolean>(false);

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

  const downloadImage = () => {
    toPng(imageContainerRef.current as HTMLDivElement)
      .then(function (dataUrl) {
        downloadBase64Image(dataUrl, 'my-image.png');
      })
      .catch(function (error) {
        console.log('oops, something went wrong!', error);
      });
  };

  const downloadBase64Image = (linkSource: string, fileName: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);

  return (
    <div ref={containerRef} className="text-center">
      <MemeContext.Provider value={context}>
        <Toolbar isEditEnable={enableQuillToolbar} />
        <div className=" w-full h-[60vh] border-2 relative overflow-hidden bg-white">
          <div className="w-full h-full bg-transparent" ref={imageContainerRef}>
            {canvasData.map((canvas) => {
              return <CanvasComponent {...canvas} key={canvas.id} />;
            })}
          </div>
        </div>
        {canvasData[0].content && (
          <button
            className="mt-12 w-60 mx-auto p-4 px-3 py-2 border-2 border-black rounded-md cursor-pointer bg-secondary text-darkblue"
            onClick={() => downloadImage()}
          >
            Download
          </button>
        )}
      </MemeContext.Provider>
    </div>
  );
};

export default MemeGenerator;
