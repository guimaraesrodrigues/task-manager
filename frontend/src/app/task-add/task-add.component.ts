import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {

  newTask: Task = { title: '', description: '', completed: false };

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Optional data from the dialog opener
  ) {}

  addNewTask() {
    this.taskService.addTask(this.newTask)
      .subscribe(
        (response) => {
          console.log('Task added successfully:', response);
          this.dialogRef.close(this.newTask); // Close the dialog and pass the new task
          this.newTask = { title: '', description: '', completed: false }; // Clear the form
        },
        (error) => {
          console.error('Error adding task:', error);
          // Handle the error, e.g., display an error message
        }
      );
  }
  
}
