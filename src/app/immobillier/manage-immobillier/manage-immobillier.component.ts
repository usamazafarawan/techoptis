import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf'; // Importer jsPDF
import { ImmobilierService, Property, Facture } from '../../immobilier.service';

@Component({
  selector: 'app-manage-immobillier',
  templateUrl: './manage-immobillier.component.html',
  styleUrls: ['./manage-immobillier.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ManageImmobillierComponent implements OnInit {
  property: Property | undefined;

  constructor(
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.property = this.immobilierService.getPropertyById(+id);
    }
  }

  orderService(): void {
    console.log('Commander une prestation');
    // Ajouter la logique pour commander une prestation
  }

  downloadInvoice(facture: Facture): void {
    const doc = new jsPDF();

    doc.text('Facture', 10, 10);
    doc.text(`Date : ${facture.date}`, 10, 20);
    doc.text(`Montant : ${facture.montant} €`, 10, 30);
    doc.text(`Description : ${facture.description}`, 10, 40);

    doc.save(`facture_${facture.date}.pdf`);
  }
}

