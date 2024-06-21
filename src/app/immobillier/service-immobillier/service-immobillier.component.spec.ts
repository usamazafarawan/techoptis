import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceImmobillierComponent } from './service-immobillier.component';

describe('ServiceImmobillierComponent', () => {
  let component: ServiceImmobillierComponent;
  let fixture: ComponentFixture<ServiceImmobillierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceImmobillierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceImmobillierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
