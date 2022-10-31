import React from "react";

function DropBox({ id, name, handleRemove }) {
  return (
    <div className="flex flex-col font-semibold w-44 h-40 p-2 text-center bg-amber-400 mx-4 cursor-pointer shadow-md">
      <button
        onClick={(e) => {
          handleRemove(true, id);
        }}
        className="text-white self-end"
      >
        X
      </button>
      <h1 className="flex-1 flex justify-center items-center mb-4">{name}</h1>
    </div>
  );
}

export default DropBox;
