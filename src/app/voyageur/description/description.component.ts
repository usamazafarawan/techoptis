import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Property, ImmobilierService } from '../../immobilier.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DescriptionComponent implements OnInit {
  property: Property | undefined;

  constructor(
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.property = this.immobilierService.getPropertyById(id);
  }
}
