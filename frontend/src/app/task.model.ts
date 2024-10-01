export interface Task {
  _id?: string; // Optional if you're using a database
  title: string;
  description?: string;
  completed: boolean;
}
