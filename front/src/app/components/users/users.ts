import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user.model';
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
  private usersService: UsersService,
  private cdr: ChangeDetectorRef
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
      emailU: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
        ],
      ],
      passwordU: ['', [Validators.required, Validators.maxLength(100)]],
      deleteU: [false],
    });
  }

loadUsers(): void {
  this.loading = true;

  this.usersService.getUsers().subscribe({
    next: (data) => {
      this.users = data;
      this.loading = false;

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('ERROR GET USERS:', err);
      this.errorMessage = 'error al cargar Usuarios';
      this.loading = false;

      this.cdr.detectChanges();
    },
  });
}

  loadDeletedUsers(): void {
    this.usersService.getUserDelete().subscribe({
      next: (data) => {
        this.deletedUsers = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR GET DELETED USERS:', err);
        this.errorMessage = 'error al cargar Usuarios eliminados';
        this.cdr.detectChanges();
      },
    });
  }

 onSubmit(): void {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  const dto = this.userForm.getRawValue();

  if (this.isEditMode && dto.passwordU === '') {
    delete dto.passwordU;
  }

  if (this.isEditMode) {
    this.usersService.upDateUser(dto).subscribe({
      next: () => {
        this.resetForm();
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'error al actualizar Usuario';
      },
    });
  } else {
    this.usersService.createUser(dto).subscribe({
      next: () => {
        this.resetForm();
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'error al crear Usuario';
      },
    });
  }
}
onEdit(user: User): void {
  this.isEditMode = true;

  this.userForm.patchValue({
    dniUs: user.dniUs,
    nameU: user.nameU,
    surnameU: user.surnameU,
    phoneU: user.phoneU,
    emailU: user.emailU,
    passwordU: '',
    deleteU: user.deleteU ?? false,
  });

  this.userForm.get('dniUs')?.disable();

  const passwordControl = this.userForm.get('passwordU');

  passwordControl?.setValidators([Validators.maxLength(100)]);
  passwordControl?.updateValueAndValidity();
}

  onDelete(dniUs: number): void {

    if (
      confirm(
        `Seguro que desea eliminar al Usuario con DNI: ${dniUs}?`
      )
    ) {

      this.usersService.deleteUser(dniUs).subscribe({
        next: () => {
          this.loadUsers();

          if (this.showDeleted) {
            this.loadDeletedUsers();
          }
        },
        error: (err) => {
          this.errorMessage = 'error al eliminar Usuario';
        },
      });
    }
  }

  onRestore(dniUs: number): void {

    this.usersService.restoreUser(dniUs).subscribe({
      next: () => {
        this.loadUsers();
        this.loadDeletedUsers();
      },
      error: (err) => {
        this.errorMessage = 'error al restaurar Usuario';
      },
    });
  }

  toggleDeletedView(): void {

    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedUsers();
    }
  }

resetForm(): void {
  this.isEditMode = false;

  this.userForm.reset({
    passwordU: '',
    deleteU: false,
  });

  this.userForm.get('dniUs')?.enable();

  const passwordControl = this.userForm.get('passwordU');

  passwordControl?.setValidators([
    Validators.required,
    Validators.maxLength(100),
  ]);

  passwordControl?.updateValueAndValidity();
}
}