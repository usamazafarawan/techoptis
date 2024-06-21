import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobillierComponent } from './immobillier.component';

describe('ImmobillierComponent', () => {
  let component: ImmobillierComponent;
  let fixture: ComponentFixture<ImmobillierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmobillierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImmobillierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
