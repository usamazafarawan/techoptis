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
  id?: number;
  name?: string;
  date?: string;
  photo?: string;
  price?: number;
  service?: string;
  city?: string;
  services?: {
    menage: boolean;
    petitDejeuner: boolean;
  };
  description?: string;
  factures?: Facture[];
  interventions?: Intervention[];
  revenue?: Revenue;
  expenses?: Expenses;
  area?:string;
  rooms?:number
}

@Injectable({
  providedIn: 'root',
})
export class ImmobilierService {
  private properties = new BehaviorSubject<Property[]>([
    // {
    //   id: 1,
    //   name: 'Appartement Paris',
    //   date: '2023-06-01',
    //   photo: 'path/to/photo.jpg',
    //   price: 1200,
    //   service: 'Wifi, TV',
    //   city: 'Paris',
    //   services: {
    //     menage: true,
    //     petitDejeuner: true
    //   },
    //   description: 'Un bel appartement à Paris.',
    //   factures: [
    //     { date: '2023-06-01', montant: 100, description: 'Facture 1' },
    //     { date: '2023-07-01', montant: 150, description: 'Facture 2' }
    //   ],
    //   interventions: [
    //     { date: '2023-06-10', description: 'Réparation chaudière' },
    //     { date: '2023-07-15', description: 'Peinture' }
    //   ],
    //   revenue: { location: 1200 },
    //   expenses: { services: 250 }
    // },
    // {
    //   id: 2,
    //   name: 'Villa Nice',
    //   date: '2023-07-01',
    //   photo: 'path/to/photo.jpg',
    //   price: 1500,
    //   service: 'Piscine, Jardin',
    //   city: 'Nice',
    //   services: {
    //     menage: true,
    //     petitDejeuner: false
    //   },
    //   description: 'Une belle villa à Nice.',
    //   factures: [
    //     { date: '2023-07-01', montant: 200, description: 'Facture 1' },
    //     { date: '2023-08-01', montant: 250, description: 'Facture 2' }
    //   ],
    //   interventions: [
    //     { date: '2023-07-10', description: 'Entretien piscine' },
    //     { date: '2023-08-15', description: 'Jardinage' }
    //   ],
    //   revenue: { location: 1500 },
    //   expenses: { services: 300 }
    // },
   // old Properties
{
id:1,
name:'Apartments Samsa - Borik',
area:'120 sq ft',
city:'Nice',
date: '2023-07-01',
photo: '../../../assets/images/p-0.png',
price: 1500,
rooms:5,
description:'Pepe - Room with balcony, a property with a terrace, is located in  Rovinj, 1.9 km from Mulini Beach, 2 km from Škaraba Beach, as well as 2.7 km from Cathedral St. Eufemia  Rovinj.',
      services: {
        menage: true,
        petitDejeuner: false
      },
}
,
{
  id:2,
  name:'Olive Garden Paradise',
  area:'190 sq ft',
  city:'Nice',
  date: '2023-07-01',
  photo: '../../../assets/images/p-1.png',
  price: 1700,
  rooms:3,
  description:'Boasting air-conditioned accommodation with a balcony, Olive Garden Paradise with Swimming Pool - NEW!!! is located in Rovinj.',
        services: {
        menage: true,
        petitDejeuner: false
      },
  }
  ,
  {
    id:3,
    name:'Angelo ZulianiOpens ',
    area:'190 sq ft',
    city:'Paris',
    date: '2023-07-01',
    photo: '../../../assets/images/p-2.png',
    price: 1400,
    rooms:6,
    description:'Set in Rovinj, 500 metres from Cuvi Beach and 1.2 km from Škaraba Beach, Apartment Capo D Oro offers a garden and air conditioning',
    services: {
      menage: true,
      petitDejeuner: false
    },
    },
    {
      id:4,
      name:'Villa Brajkovic',
      area:'110 sq ft',
      city:'Paris',
      date: '2023-07-01',
      photo: '../../../assets/images/p-3.png',
      price: 1200,
      rooms:8,
      description:'Located 300 metres from Porton Biondi Beach and 500 metres from Sand Beach Biondi in Rovinj, Villa Brajkovic-near the sea and Rovinj center offers accommodation with a kitchen.',
      services: {
        menage: true,
        petitDejeuner: false
      },
      },
      {
        id:5,
        name:'Rovinj Apartment Lea',
        area:'155 sq ft',
        city:'Bordeaux',
        date: '2023-07-01',
        photo: '../../../assets/images/p-4.png',
        price: 1500,
        rooms:3,
        description:'Boasting air-conditioned accommodation with a patio, Villa Zdenko Apartment with Sea view is situated in Rovinj. This property offers access to a balcony, free private parking and free WiFi.',
        services: {
          menage: true,
          petitDejeuner: false
        },
        },
        {
          id:6,
          name:'Villa Zdenko Apartment',
          area:'145 sq ft',
          city:'Bordeaux',
          date: '2023-07-01',
          photo: '../../../assets/images/p-5.png',
          price: 1500,
          rooms:6,
          description:'Apartman Roko is set in Rovinj, 1.8 km from Sveti Andrija Beach, 2 km from Cuvi Beach, as well as 1.7 km from Cathedral St. Eufemia Rovinj.',
          services: {
            menage: true,
            petitDejeuner: false
          },
          },
          {
            id:7,
            name:'Apartman Roko',
            area:'110 sq ft',
            city:'Troyes',
            date: '2023-07-01',
            photo: '../../../assets/images/p-6.png',
            price: 2500,
            rooms:8,
            description:'Located in Rovinj, 1.1 km from Mulini Beach and 1.2 km from Sveti Andrija Beach, Apartment Maeîstro by Privileggio Residence offers air conditioning.',
            services: {
              menage: true,
              petitDejeuner: false
            },
            }

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


