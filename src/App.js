import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./components/Home";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#FFF8EA]">
        <h1 className="text-center text-3xl font-semibold">
          Internship Assessment - Harsh Sharma
        </h1>
        <Home></Home>
        <div className="flex justify-center items-center mt-4">
          <p className="text-center m-2 mr-8 text-2xl">A -- 10</p>
          <p className="text-center m-2 mr-8 text-2xl">B -- 50</p>
          <p className="text-center m-2 mr-8 text-2xl">C -- 30</p>
          <p className="text-center m-2 mr-8 text-2xl">D -- 5</p>
          <p className="text-center m-2 mr-8 text-2xl">E -- 20</p>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
