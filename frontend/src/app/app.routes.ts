import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: TaskListComponent, canActivate: [AuthGuard]  },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];
