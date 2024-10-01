import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Add styles if needed
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:3001/api/login', this.loginData) // Adjust the URL if needed
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          // Store the JWT token (e.g., in localStorage or a cookie)
          localStorage.setItem('token', response.token); // Example using localStorage

          // Redirect to the desired page after successful login
          this.router.navigate(['/']); // Example redirect to home page
        },
        (error) => {
          console.error('Login error:', error);
          // Handle login errors, e.g., display an error message
        }
      );
  }
}
