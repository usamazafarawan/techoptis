import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImmobillierComponent } from './edit-immobillier.component';

describe('EditImmobillierComponent', () => {
  let component: EditImmobillierComponent;
  let fixture: ComponentFixture<EditImmobillierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditImmobillierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditImmobillierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
