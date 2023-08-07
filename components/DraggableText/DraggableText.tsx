import React, { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface DraggableTextProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function DraggableText({ containerRef }: DraggableTextProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  const cords = useRef<{ x: number; y: number; lastX: number; lastY: number }>({ x: 0, y: 0, lastX: 0, lastY: 0 });

  const isClicked = useRef<boolean>(false);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      console.log('mousedown');
      isClicked.current = true;
      cords.current.x = e.clientX;
      cords.current.y = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      console.log('mouseup');
      isClicked.current = false;
      cords.current.lastX = box.offsetLeft;
      cords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      console.log('mousemove');
      if (!isClicked.current) return;

      const dx = e.clientX - cords.current.x + cords.current.lastX;
      const dy = e.clientY - cords.current.y + cords.current.lastY;

      /*   const left = parseInt(box.style.left || '0');
      const top = parseInt(box.style.top || '0'); */

      box.style.left = `${dx}px`;
      box.style.top = `${dy}px`;
    };

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, [boxRef, containerRef]);

  return (
    <div ref={boxRef} className="absolute top-0 text-white bg-darkblue p-4 cursor-move">
      <TextareaAutosize minRows={3} maxRows={6} defaultValue="Just a single line..." />
    </div>
  );
}
