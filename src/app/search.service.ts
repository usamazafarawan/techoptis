import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property, ImmobilierService } from './immobilier.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private immobilierService: ImmobilierService) {}

  search(term: string): Observable<Property[]> {
    if (!term.trim()) {
      
      return of([]);
    }

    
    const properties = this.immobilierService.getProperties();
    return of(properties.filter((property: Property) => 
      property.name.toLowerCase().includes(term.toLowerCase())));
  }
}
