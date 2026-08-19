import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  private fb = inject( FormBuilder );
  private authService = inject(AuthService);
  private router = inject(Router);

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: ''
  };

  currentUser?: User;

  ngOnInit() {
  }

  public userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', [Validators.required]]
  });

  register() {
    if (this.userForm.invalid) return;

    this.authService.register(this.userForm.value)
      .subscribe({
        next: (user) => {
          this.router.navigate(['/login']);
          console.log('User created', user);
        },
        error: (err) => {
          alert(`Error creating user:\n${err.message}`);
          console.error('Error creating user', err);
        }
      });
  };

}
