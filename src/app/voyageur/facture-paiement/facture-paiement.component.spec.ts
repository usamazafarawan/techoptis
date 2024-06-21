import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePaiementComponent } from './facture-paiement.component';

describe('FacturePaiementComponent', () => {
  let component: FacturePaiementComponent;
  let fixture: ComponentFixture<FacturePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturePaiementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
