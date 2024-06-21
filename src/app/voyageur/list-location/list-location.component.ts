import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Property, ImmobilierService } from '../../immobilier.service';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] 
})
export class ListLocationComponent implements OnInit {
  searchResults: Property[] = [];
  filteredProperties: Property[] = [];

  constructor(
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const address = params['address'] || '';
      this.searchResults = this.immobilierService.getProperties().filter(property =>
        property.city.toLowerCase().includes(address.toLowerCase())
      );
      this.filteredProperties = this.searchResults;
    });
  }

  filterByCity(city: string): void {
    if (city) {
      this.filteredProperties = this.searchResults.filter(property => property.city === city);
    } else {
      this.filteredProperties = this.searchResults;
    }
  }
}


