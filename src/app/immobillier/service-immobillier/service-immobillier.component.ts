import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImmobilierService } from '../../immobilier.service';

@Component({
  selector: 'app-service-immobillier',
  templateUrl: './service-immobillier.component.html',
  styleUrls: ['./service-immobillier.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ServiceImmobillierComponent implements OnInit {

  constructor(private immobilierService: ImmobilierService) { }

  ngOnInit(): void {
    
  }
}
