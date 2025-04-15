import React, { useState } from "react";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const { count } = useSelector((state) => {
    return state;
  });
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-start pt-5 overflow-hidden">
      {count}
    </div>
  );
};

export default App;
