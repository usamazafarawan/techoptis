import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarImmobillierComponent } from './calendar-immobillier.component';

describe('CalendarImmobillierComponent', () => {
  let component: CalendarImmobillierComponent;
  let fixture: ComponentFixture<CalendarImmobillierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarImmobillierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarImmobillierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
