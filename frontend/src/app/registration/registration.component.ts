import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:3001/api/auth/register', this.registrationData)
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
