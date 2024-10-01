import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from '../task-add/task-add.component';
import { map, Observable, tap } from 'rxjs';
import { TaskService } from '../task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskAddComponent,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
   ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{

  tasks$!: Observable<Task[]>;
  displayedColumns: string[] = ['completed', 'title', 'description','actions'];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }

  openTaskAddDialog(): void {
    const dialogRef = this.dialog.open(TaskAddComponent, {
      width: '500px', // Adjust width as needed
      height: '350px',
      // You can pass data to the dialog component here if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result from the dialog (e.g., add the new task)
        this.tasks$ = this.tasks$.pipe(
          map((tasks: Task[]) => [...tasks, result]) // Add the new task to the array
        );
      }
    });
  }


  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id!).subscribe(() => {
      this.tasks$ = this.tasks$.pipe(
        map(tasks => tasks.filter(t => t._id !== task._id))
      );
    });
  }

}
