/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getRandomColors } from "../helpers/getRandomColors";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (taskData: any) => void;
}

function AddModal({ isOpen, onClose, setOpen, handleAddTask }: AddModalProps) {
  const initialTaskData = {
    id: uuidv4(),
    title: "",
    description: "",
    priorty: "",
    deadline: 0,
    image: "",
    alt: "",
    tags: [] as Tag[],
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = () => {
    handleAddTask(taskData);
    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[50%] w-[90%] lg:w-[30%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Başlık"
          className="w-full h-12 px-3 outline-none rounded-lg border bg-slate-100 border-slate-300 text-[15px] font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Açıklama"
          className="w-full h-12 px-3 outline-none rounded-lg border bg-slate-100 border-slate-300 text-[15px] font-medium"
        />
        <select
          name="priorty"
          className="w-full h-12 px-2 outline-none bg-slate-100 border border-slate-300"
          onChange={handleChange}
          value={taskData.priorty}
        >
          <option value="">
            Öncelik
          </option>
          <option value="low">Düşük</option>
          <option value="medium">Orta</option>
          <option value="high">Yüksek</option>
        </select>
        <input
          type="text"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          placeholder="Deadline"
          className="w-full h-12 px-3 outline-none rounded-lg border bg-slate-100 border-slate-300 text-[15px] font-medium"
        />
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Etiket"
          className="w-full h-12 px-3 outline-none rounded-lg border bg-slate-100 border-slate-300 text-[15px] font-medium"
        />
        <button
          className="w-[50%] hover:bg-red-700 rounded-md h-9 bg-red-600 text-white font-medium"
          onClick={handleAddTag}
        >
          Etiket Ekle
        </button>
        <div className="w-full">
          {taskData.tags && <span>Etiketler:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              className="inline-block mx-1 px-[10px] my-1 py-[2px] text-[13px] font-medium rounded-md"
              key={index}
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-4 justify-between">
          <input
            type="text"
            name="alt"
            value={taskData.alt}
            onChange={handleChange}
            placeholder="Resim Başlığı"
            className="w-full h-12 px-3 outline-none rounded-lg border bg-slate-100 border-slate-300 text-[15px] font-medium"
                  />
                  <input type="file" name="image" onChange={handleImageChange} className="w-full"/>
              </div>
              <button className="w-full hover:bg-red-700 mt-3 rounded-md h-9 bg-red-600 text-white font-medium" onClick={handleSubmit}>Submit Task</button>
      </div>
    </div>
  );
}

export default AddModal;
