import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  loginForm: FormGroup; 

  constructor(
    private http: HttpClient, 
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the form with FormBuilder
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Add validators as needed
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) { 
      this.http.post('http://localhost:3001/api/login', this.loginForm.value)
        .subscribe(
          (response: any) => {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token); 
            this.router.navigate(['/']); 
          },
          (error) => {
            console.error('Login error:', error);
          }
        );
    } else {
      // Handle form validation errors if needed
    }
  }
}
