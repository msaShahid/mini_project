export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: "Pending" | "Done" | "InProgress";
  createdAt: string;
  updatedAt: string;
}
