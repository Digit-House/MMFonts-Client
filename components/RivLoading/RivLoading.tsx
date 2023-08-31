import { useRive } from '@rive-app/react-canvas';
import React from 'react';

const RivLoading = () => {
  const { rive, RiveComponent } = useRive({
    src: '/loading.riv',
    autoplay: true,
  });
  return (
    <div className="h-[550px] ">
      <RiveComponent />
    </div>
  );
};

export default RivLoading;
