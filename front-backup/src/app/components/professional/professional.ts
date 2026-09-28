import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professional } from '../../services/professional';
import { ProfessionalDto } from '../../models/professional.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule ],
  selector: 'app-professional',
  standalone: true,
  styleUrl: './professional.css',
  templateUrl: './professional.html',
})
export class ProfessionalComponent implements OnInit {
  professionals : Professional[] = [];
  deletedProfessionals : Professional[] = [];
  professionalForm! : FormGroup;
  isEditMode = false;
  shoeDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private professionalService : professionalService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.loadProfessionals();
  }

  initForm(): void{
    this.professionalForm = this.fb.group({
    dniP: ['',[Validators.required, Validators.min(1)]],
    name: ['',[Validators.required, Validators.maxLength(15)]],
    surname: ['',[Validators.required, Validators.maxLength(15)]],
    typeP: ['',[Validators.required, Validators.maxLength(15)]],
    assessmentP: ['',[Validators.required, Validators.maxLength(15)]],
    delete: [false]
    });
  }
  loadProfessionals(): void{
    this.loading = true;
    this.professionalService.getProfessional().subscribe({
      next : (data) => {
        this.professionals = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'error al cargar profesionales' ;
        this.loading = false;
      }
    });
  }

  loadDeletedProfessionals(): void {

    this.professionalService.getProfessionalDelete().subscribe({

      next: (data) => {
        this.deletedProfessionals = data;
      },
      error: (err) => {
        this.errorMessage = ' error al cargar profesionales eliminados';

      }
    });
  }

  onSubmit(): void {
    if (this.professionalForm.invalid){
      this.professionalForm.markAllAsTouched();
      return;
    }

    const dto: ProfessionalDto = this.professionalForm.value;

    if (this.isEditMode){

      this.professionalService.upDateProfessional(dto).subscribe({
        next : () => {
          this.resetForm();
          this.loadDeletedProfessionals();

        }
      })
    }
  }



}
