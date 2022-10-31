import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Box from "./Box";
import DropBox from "./DropBox";
import Axios from "axios";

const Operands = [
  {
    id: 1,
    name: "A",
  },
  {
    id: 2,
    name: "B",
  },
  {
    id: 3,
    name: "C",
  },
  {
    id: 4,
    name: "D",
  },
  {
    id: 5,
    name: "E",
  },
];

const Operators = [
  {
    id: 11,
    name: "+",
  },
  {
    id: 12,
    name: "-",
  },
  {
    id: 13,
    name: "*",
  },
  {
    id: 14,
    name: "/",
  },
];

function Home() {
  const [dropBox, setDropBox] = useState([]);
  const [isRemove, setIsRemove] = useState(false);
  const [currRemove, setCurrRemove] = useState();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      addObject(item.id, item.arrayBool);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addObject = (id, isVar) => {
    var objectList = [];
    if (isVar) {
      objectList = Operands.filter((op) => id === op.id);
    } else {
      objectList = Operators.filter((op) => id === op.id);
    }
    setDropBox((dropBox) => [...dropBox, objectList[0]]);
  };

  const getTheRhs = () => {
    var num = prompt("Input the RHS Integer");
    const listObj = [
      {
        id: 20,
        name: num,
      },
    ];
    setDropBox((dropBox) => [...dropBox, listObj[0]]);
  };

  const getTheComp = (value) => {
    const listObj = [
      {
        id: 50,
        name: value,
      },
    ];
    setDropBox((dropBox) => [...dropBox, listObj[0]]);
  };

  const handleEvaluate = () => {
    const finalExpression = dropBox.map((obj) => {
      return obj.name;
    });
    const jsonObj = {
      expression: finalExpression,
    };
    const finalExpJson = JSON.stringify(jsonObj);
    Axios.post("https://evaluation-mern.herokuapp.com/getAnswer", {
      result: finalExpJson,
    })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (value, id) => {
    setIsRemove(value);
    setCurrRemove(id);
  };

  useEffect(() => {
    if (isRemove) {
      const listObj = dropBox.filter((op) => currRemove !== op.id);
      setDropBox(listObj);
      setIsRemove(false);
      setCurrRemove();
    }
  }, [isRemove, currRemove, dropBox]);

  return (
    <>
      <div className="border-2 border-black border-solid w-screen h-full my-20 py-4 px-2">
        <div className="w-full flex justify-start items-center">
          {Operands.map((op) => {
            return <Box id={op.id} name={op.name} arrayName={true} />;
          })}
        </div>
      </div>
      <div className="border-2 border-black border-solid w-screen h-full my-10 py-4 px-2">
        <div className="w-full flex justify-start items-center">
          {Operators.map((optor) => {
            return <Box id={optor.id} name={optor.name} arrayName={false} />;
          })}
          <button
            className="font-semibold px-20 py-16 text-center bg-[#F57328] mx-4 shadow-md ml-20"
            onClick={() => {
              getTheComp("<");
            }}
          >
            &lt;
          </button>
          <button
            className="font-semibold px-20 py-16 text-center bg-[#F57328] mx-4 shadow-md"
            onClick={() => {
              getTheComp(">");
            }}
          >
            &gt;
          </button>
          <button
            className="font-semibold p-16 text-center bg-[#CC3636] mx-4 shadow-md ml-20"
            onClick={getTheRhs}
          >
            RHS Integer
          </button>
        </div>
      </div>
      <div
        ref={drop}
        className="border-2 border-black border-dashed w-screen min-h-[12em] mt-20 mb-4 py-4 px-2"
      >
        <div className="w-full flex justify-start items-center">
          {dropBox.map((el) => {
            return (
              <DropBox id={el.id} name={el.name} handleRemove={handleRemove} />
            );
          })}
        </div>
      </div>
      <button
        className="w-screen bg-blue-600 text-white text-xl font-semibold p-2 shadow-2xl hover:bg-blue-700 transition-all ease-in-out duration-200"
        onClick={handleEvaluate}
      >
        Evaluate
      </button>
    </>
  );
}

export default Home;
