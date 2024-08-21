/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Columns } from "../types";
import { Board } from "../data/Board";
import { AddOutline } from "react-ionicons";
import Task from "../components/Task";
import AddModal from "../components/AddModal";
import { onDragEnd } from "../helpers/onDragEnd";

const LOCAL_STORAGE_KEY = "kanbanColumns";

function Boards() {
  const [columns, setColumns] = useState<Columns>(() => {
    const savedColumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedColumns ? JSON.parse(savedColumns) : Board;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const openModal = (columnId: any) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div key={columnId} className="w-full items-center flex flex-col">
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white border rounded-lg shadow-sm text-black font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: any) => {
                      return (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided: any) => (
                            <>
                              <Task task={task} provided={provided} />
                            </>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex items-center cursor-pointer gap-1 py-[10px] md:w-[50%] w-fit opacity-90 rounded-lg border justify-center shadow-sm bg-red-600 text-white font-medium text-[15px] hover:bg-red-800"
              >
                <AddOutline color={"white"} width="20px" height="20px" />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
}

export default Boards;
