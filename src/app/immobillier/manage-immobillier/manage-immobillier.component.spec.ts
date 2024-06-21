import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageImmobillierComponent } from './manage-immobillier.component';

describe('ManageImmobillierComponent', () => {
  let component: ManageImmobillierComponent;
  let fixture: ComponentFixture<ManageImmobillierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageImmobillierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageImmobillierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
