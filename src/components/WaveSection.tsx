import React from 'react';
import Wavify from 'react-wavify';

const WavifyEffect: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  return (
    <div className="relative h-20 overflow-hidden">
      <Wavify
        fill={trigger ? '#ff4d4f' : '#1890ff'}
        paused={!trigger}
        options={{ height: 20, amplitude: 20, speed: 0.15, points: 3 }}
      />
    </div>
  );
};

export default WavifyEffect;
