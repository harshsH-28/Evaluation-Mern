import React from "react";
import { useDrag } from "react-dnd";

function Box({ id, name, arrayName }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {
      id: id,
      arrayBool: arrayName,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex flex-col font-semibold w-44 h-40 p-2 text-center text-white bg-[#428028] mx-4 cursor-pointer shadow-md ${
        isDragging ? "border-2 border-black" : ""
      }`}
    >
      <h1 className="flex-1 flex justify-center items-center">{name}</h1>
    </div>
  );
}

export default Box;
