import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Facture {
  date: string;
  montant: number;
  description: string;
}

export interface Intervention {
  date: string;
  description: string;
}

export interface Revenue {
  location: number;
}

export interface Expenses {
  services: number;
}

export interface Property {
  id: number;
  name: string;
  date: string;
  photo: string;
  price: number;
  service: string;
  city: string;
  services: {
    menage: boolean;
    petitDejeuner: boolean;
  };
  description: string;
  factures?: Facture[];
  interventions?: Intervention[];
  revenue?: Revenue;
  expenses?: Expenses;
}

@Injectable({
  providedIn: 'root',
})
export class ImmobilierService {
  private properties = new BehaviorSubject<Property[]>([
    {
      id: 1,
      name: 'Appartement Paris',
      date: '2023-06-01',
      photo: 'path/to/photo.jpg',
      price: 1200,
      service: 'Wifi, TV',
      city: 'Paris',
      services: {
        menage: true,
        petitDejeuner: true
      },
      description: 'Un bel appartement à Paris.',
      factures: [
        { date: '2023-06-01', montant: 100, description: 'Facture 1' },
        { date: '2023-07-01', montant: 150, description: 'Facture 2' }
      ],
      interventions: [
        { date: '2023-06-10', description: 'Réparation chaudière' },
        { date: '2023-07-15', description: 'Peinture' }
      ],
      revenue: { location: 1200 },
      expenses: { services: 250 }
    },
    {
      id: 2,
      name: 'Villa Nice',
      date: '2023-07-01',
      photo: 'path/to/photo.jpg',
      price: 1500,
      service: 'Piscine, Jardin',
      city: 'Nice',
      services: {
        menage: true,
        petitDejeuner: false
      },
      description: 'Une belle villa à Nice.',
      factures: [
        { date: '2023-07-01', montant: 200, description: 'Facture 1' },
        { date: '2023-08-01', montant: 250, description: 'Facture 2' }
      ],
      interventions: [
        { date: '2023-07-10', description: 'Entretien piscine' },
        { date: '2023-08-15', description: 'Jardinage' }
      ],
      revenue: { location: 1500 },
      expenses: { services: 300 }
    },
   
  ]);

  properties$ = this.properties.asObservable();

  getProperties(): Property[] {
    return this.properties.value;
  }

  getPropertyById(id: number): Property | undefined {
    return this.properties.value.find((property) => property.id === id);
  }

  updateProperty(updatedProperty: Property): void {
    const properties = this.properties.value.map((property) =>
      property.id === updatedProperty.id ? updatedProperty : property
    );
    this.properties.next(properties);
  }

  addProperty(property: Property): void {
    property.id = this.properties.value.length + 1; 
    const properties = [...this.properties.value, property];
    this.properties.next(properties);
  }
}


