import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professional, professionalDto } from '../../models/professional.model';
import { ProfessionalService } from '../../services/professional';
import { City } from '../../models/city.model';
import { CityService } from '../../services/city';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-professional',
  standalone: true,
  styleUrl: './professional.css',
  templateUrl: './professional.html',
})
export class ProfessionalComponents implements OnInit {

  professionals: Professional[] = [];
  cities: City[] = [];
  deletedProfessionals: Professional[] = [];
  professionalForm!: FormGroup;
  isEditMode = false;
  showDeleted = false;
  loading = false;
  errorMessage = '';

constructor(
  private fb: FormBuilder,
  private professionalService: ProfessionalService,
  private cityService: CityService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
  this.initForm();
  this.loadProfessionals();
  this.loadCities();
}

  initForm(): void {
    this.professionalForm = this.fb.group({
      dniP: ['', [Validators.required, Validators.min(1)]],
      nameP: ['', [Validators.required, Validators.maxLength(15)]],
      surnameP: ['', [Validators.required, Validators.maxLength(15)]],
      typeP: ['', [Validators.required, Validators.maxLength(15)]],
      deleteP: [false],
      idCity: [null, [Validators.required, Validators.min(1)]],
    })
  }

  loadProfessionals(): void {
  this.loading = true;

  this.professionalService.getProfessional().subscribe({
    next: (data) => {
      this.professionals = data;
      this.loading = false;
      this.cdr.markForCheck();
    },
    error: () => {
      this.errorMessage = 'Error al cargar profesionales';
      this.loading = false;
      this.cdr.markForCheck();
    },
  });
}

  loadCities(): void {
  this.cityService.getCities().subscribe({
    next: (data) => {
      this.cities = data;
      this.cdr.detectChanges();
    },
    error: () => {
      this.errorMessage = 'Error al cargar ciudades';
      this.cdr.detectChanges();
    },
  });
}

  loadDeletedProfessional(): void {
    this.professionalService.getProfessionalDelete().subscribe({
      next: (data) => {
        this.deletedProfessionals = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'error al cargar Profesionales eliminados';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if(this.professionalForm.invalid){
      this.professionalForm.markAllAsTouched();
      return;
    }
    const dto: professionalDto = this.professionalForm.getRawValue();

    if(this.isEditMode){
      this.professionalService.upDateProfessional(dto).subscribe({

        next: () => {
          this.resetForm();
          this.loadProfessionals();
        },
        error: () => {
          this.errorMessage = 'error al actualizar profesional'}, 
      });
    } else {
      this.professionalService.createProfessional(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadProfessionals();
        },
        error: ()=> {
          this.errorMessage = 'error al crear profesional'
        },
      });
    }
  }
  onEdit(professional:Professional):void{
    this.isEditMode = true;
    this.professionalForm.patchValue({
      dniP: professional.dniP,
      nameP: professional.nameP,
      surnameP: professional.surnameP,
      typeP: professional.typeP,
      assessmentP: professional.assessmentP,
      deleteP: professional.deleteP ?? false,
      idCity: professional.city?.idCity ?? null,
    });
    this.professionalForm.get('dniP')?.disable();
    
  }
  onDelete(dniP:number): void{
    if (confirm(`Seguro que desea eliminar al profesional con dni: ${dniP}?`)){
      this.professionalService.deleteProfessionals(dniP).subscribe({
        next:()=>{
          this.loadProfessionals();
          if (this.showDeleted) this.loadDeletedProfessional();
        },
        error:(err)=> {
          this.errorMessage='error al eliminar profesional'
        },
      });
    }
  }
  onRestore(dniP:number):void{
    this.professionalService.restoreProfessional(dniP).subscribe({
      next:()=>{
        this.loadProfessionals();
        this.loadDeletedProfessional();
      },
      error: (err)=> {
        this.errorMessage = 'error al restaurar profesional'
      },
    });
  }
  toggleDeletedView(): void{
    this.showDeleted = !this.showDeleted;
    if(this.showDeleted){
      this.loadDeletedProfessional();
    }
  }
  resetForm(): void {
  this.isEditMode = false;

  this.professionalForm.reset({
    idCity: null,
    deleteP: false,
  });

  this.professionalForm.get('dniP')?.enable();
}
}
