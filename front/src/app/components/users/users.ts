import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, UsersDto } from '../../models/user.model';
import { UsersService } from '../../services/users';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-users',
  standalone: true,
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  deletedUsers: User[] = [];
  userForm!: FormGroup;
  isEditMode = false;
  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      dniUs: ['', [Validators.required, Validators.min(1)]],
      nameU: ['', [Validators.required, Validators.maxLength(15)]],
      surnameU: ['', [Validators.required, Validators.maxLength(15)]],
      phoneU: ['', [Validators.required, Validators.maxLength(15)]],
      emailU: ['', [Validators.required, Validators.maxLength(30)]],
      passwordU: ['', [Validators.required, Validators.maxLength(100)]],
      deleteU: [false]
    });
  }

  loadUsers(): void {

    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'error al cargar Usuarios';
        this.loading = false;
      }
    });
  }

  loadDeletedUser(): void {

    this.usersService.getUserDelete().subscribe({
      next: (data) => {
        this.deletedUsers = data;
      },
      error: (err) => {
        this.errorMessage = 'error al cargar Usuarios eliminados';
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const dto: UsersDto = this.userForm.value;

    if (this.isEditMode) {
      this.usersService.upDateUser(dto).subscribe({

        next: () => {
          this.resetForm();
          this.loadDeletedUser();
        }
      });
    }
  }
}