type Column = {
  key: string;
  title: string;
};

enum Status {
  todo = "todo",
  progress = "progress",
  done = "done",
}

interface Kanban {
  title: string;
  description: string;
  status: Status;
  _createdAt: Date;
}
