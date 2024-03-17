"use client";

import React, { useState } from "react";
import Task from "./Task";

type Props = {};

enum Status {
  todo = "todo",
  progress = "progress",
  done = "done",
}

const bars: Column[] = [
  {
    key: "todo",
    title: "To Do",
  },
  {
    key: "progress",
    title: "On Progress",
  },
  {
    key: "done",
    title: "Done",
  },
];

const Kanban = (props: Props) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [kanbans, setKanbans] = useState<Kanban[]>([]);

  const handleCreate = () => {
    let tasks: Kanban[] = [
      ...kanbans,
      {
        title: title,
        description: description,
        status: Status.todo,
        _createdAt: new Date(),
      },
    ];

    setKanbans(tasks);
    setTitle("");
    setDescription("");
    setOpenForm(false);
  };

  const handleDelete = (i: number) => {
    const updatedTasks = kanbans.filter((_, index) => index !== i);

    setKanbans(updatedTasks);
  };

  return (
    <div className="flex flex-col m-auto max-w-7xl">
      <h1 className="text-4xl text-center py-16">Kanban Board</h1>

      {openForm && (
        <form className="flex flex-col max-w-lg m-auto mb-10">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="border-2 border-[#5030E5] rounded-md p-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="border-2 border-[#5030E5] rounded-md p-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreate}
              className="bg-green-300 p-2 rounded-md"
            >
              Create
            </button>
            <button
              onClick={() => setOpenForm(false)}
              className="bg-red-300 p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex justify-between my-10">
        {bars.map((col: Column) => (
          <div className="flex flex-col w-[354px] bg-[#F5F5F5] rounded-[16px] p-5 gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`w-[8px] h-[8px] rounded-full ${
                    col.key === "todo"
                      ? "bg-[#5030E5]"
                      : col.key === "progress"
                      ? "bg-[#FFA500]"
                      : "bg-[#8BC48A]"
                  }`}
                />
                <h3>{col.title}</h3>
              </div>

              {col.key === "todo" && (
                <div
                  className="px-2 m-0 text-[#5030E5] text-lg cursor-pointer bg-purple-300 rounded-md"
                  onClick={() => setOpenForm(true)}
                >
                  +
                </div>
              )}
            </div>

            <hr
              className={`border-2 ${
                col.key === "todo"
                  ? "border-[#5030E5]"
                  : col.key === "progress"
                  ? "border-[#FFA500]"
                  : "border-[#8BC48A]"
              }`}
            />

            <div className="flex flex-col gap-2">
              {kanbans.map((task, i) => (
                <>
                  {col.key === task.status && (
                    <Task
                      title={task.title}
                      description={task.description}
                      _createdAt={task._createdAt}
                      handleDelete={handleDelete}
                      index={i}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
