import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImmobilierService, Property } from '../../immobilier.service';

@Component({
  selector: 'app-edit-immobillier',
  templateUrl: './edit-immobillier.component.html',
  styleUrls: ['./edit-immobillier.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditImmobillierComponent implements OnInit {
  property: Property | undefined;
  immobilierService: ImmobilierService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) {
    this.immobilierService = this.injector.get(ImmobilierService);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.property = this.immobilierService.getPropertyById(+id);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.property) {
          this.property.photo = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.property) {
      this.immobilierService.updateProperty(this.property);
      this.router.navigate(['/immobilier/list']);
    }
  }
}
