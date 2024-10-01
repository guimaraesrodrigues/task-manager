import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  // Define your task interface (id, title, completed, etc.)
  _id?: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3001/api/tasks'; // Your backend API URL

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<any> { // Adjust return type if needed
    return this.http.post(this.apiUrl, task);
  }

  deleteTask(taskId: string): Observable<any> { // Adjust return type if needed
    const url = `${this.apiUrl}/${taskId}`; // Construct the URL for deleting the task
    return this.http.delete(url);
  }
}
