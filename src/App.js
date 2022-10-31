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
      </div>
    </DndProvider>
  );
}

export default App;
