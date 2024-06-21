import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImmobilierService, Property } from '../../immobilier.service';

@Component({
  selector: 'app-list-immobillier',
  templateUrl: './list-immobillier.component.html',
  styleUrls: ['./list-immobillier.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: []
})
export class ListImmobillierComponent implements OnInit {
  properties: Property[] = [];

  constructor(private router: Router, private immobilierService: ImmobilierService) { }

  ngOnInit(): void {
    this.immobilierService.properties$.subscribe((properties: Property[]) => {
      this.properties = properties;
    });
  }

  manageProperty(id: number) {
    this.router.navigate(['/immobilier/manage', id]);
  }

  openCalendar(id: number) {
    this.router.navigate(['/immobilier/calendar', id]);
  }

  confirmDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bien?')) {
      console.log('Supprimer le bien', id);
      
    }
  }

  editProperty(id: number) {
    this.router.navigate(['/immobilier/edit', id]);
  }

  navigateToEdit() {
    this.router.navigate(['/immobilier/edit']);
  }
}

