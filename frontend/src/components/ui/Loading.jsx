import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="border-4 border-white border-t-transparent border-t-4 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loading;