/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import DraggableText from '@components/DraggableText/DraggableText';

const MemeGenerator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLCanvasElement>(null);

  const addText = () => {
    console.log('Add Text');
  };

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
    <div>
      <div className="flex flex-row justify-between my-4">
        <div className="flex flex-col items-left"></div>
        <div>
          <div className="relative">
            <p
              onClick={addText}
              className="p-4 px-3 py-2 border-2 border-black rounded-md cursor-pointer bg-secondary text-darkblue"
            >
              Add Text Here
            </p>
          </div>
        </div>
      </div>
      <div ref={containerRef} className="border-2 bg-gray-100 w-full rounded-sm relative overflow-hidden">
        <canvas ref={imageRef} className="w-full"></canvas>
        <DraggableText containerRef={containerRef} />
      </div>
    </div>
  );
};

export default MemeGenerator;
