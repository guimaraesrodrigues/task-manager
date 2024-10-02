import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  public registerForm: FormGroup; 

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
     // Initialize the form with FormBuilder
     this.registerForm = this.fb.group({
      username: ['', [Validators.required]], // Add validators as needed
      password: ['', [Validators.required]]
    });
   }

  onSubmit() {
    this.http.post('http://localhost:3001/api/register', this.registerForm.value)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Optionally redirect to login page or display a success message
          this.router.navigate(['/login']); // Example redirect
        },
        (error) => {
          console.error('Registration error:', error);
          // Handle registration errors, e.g., display an error message
        }
      );
  }
}
