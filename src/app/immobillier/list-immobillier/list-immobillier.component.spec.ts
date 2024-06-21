import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImmobillierComponent } from './list-immobillier.component';

describe('ListImmobillierComponent', () => {
  let component: ListImmobillierComponent;
  let fixture: ComponentFixture<ListImmobillierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListImmobillierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListImmobillierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
