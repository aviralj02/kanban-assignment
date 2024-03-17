import React from "react";

type Props = {
  title: string;
  description: string;
  _createdAt: Date;
  handleDelete: (i: number) => void;
  index: number;
};

const Task = ({
  title,
  description,
  _createdAt,
  handleDelete,
  index,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <span
          className="p-1 bg-red-400 text-xs rounded-lg cursor-pointer"
          onClick={() => handleDelete(index)}
        >
          delete
        </span>
      </div>
      <p>{description}</p>
      <span>{_createdAt.toLocaleDateString()}</span>
    </div>
  );
};

export default Task;
