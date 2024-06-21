import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Property, ImmobilierService } from '../../immobilier.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] 
})
export class EditComponent {
  property: Property = {
    id: 0,
    name: '',
    date: '',
    photo: '',
    price: 0,
    service: '',
    city: '',
    services: {
      menage: true,
      petitDejeuner: true
    },
    description: '',
    factures: [],
    interventions: [],
    revenue: { location: 0 },
    expenses: { services: 0 }
  };

  propertyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private immobilierService: ImmobilierService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      photo: ['', Validators.required],
      price: ['', Validators.required],
      service: ['', Validators.required],
      city: ['', Validators.required],
      menage: [true],
      petitDejeuner: [true],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const formValue = this.propertyForm.value;
      this.property = {
        ...this.property,
        name: formValue.name,
        date: formValue.date,
        photo: formValue.photo,
        price: formValue.price,
        service: formValue.service,
        city: formValue.city,
        services: {
          menage: formValue.menage,
          petitDejeuner: formValue.petitDejeuner
        },
        description: formValue.description
      };
      this.immobilierService.addProperty(this.property);
      this.router.navigate(['/immobilier/list']);
    }
  }
}
