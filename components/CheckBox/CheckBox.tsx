import React from 'react';

type CheckBoxType = {
  done: boolean;
  i: number;
  task: string;
  handleCheckBoxChange: (d: boolean, i: number) => void;
};

const CheckBox = ({ handleCheckBoxChange, done, i, task }: CheckBoxType) => {
  return (
    <div className="flex items-center h-6 mr-2">
      <input
        aria-describedby="comments-description"
        type="checkbox"
        onChange={() => handleCheckBoxChange(done, i)}
        checked={done}
        className="w-4 h-4 rounded cursor-pointer accent-pink-300 border-secondary focus:secondary"
      />
      <p className="ml-2 text-sm font-medium text-gray-900">{task}</p>
    </div>
  );
};

export default CheckBox;
