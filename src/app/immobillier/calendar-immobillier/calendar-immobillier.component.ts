import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay, CalendarModule, CalendarMonthViewEventTimesChangedEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendar-immobillier',
  templateUrl: './calendar-immobillier.component.html',
  styleUrls: ['./calendar-immobillier.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, CalendarModule]
})
export class CalendarImmobillierComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Réservé',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    },
  ];

  activeDayIsOpen: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  dayClicked(day: CalendarMonthViewDay): void {
    if (isSameMonth(day.date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, day.date) && this.activeDayIsOpen === true) ||
        day.events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = day.date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarMonthViewEventTimesChangedEvent): void {
    if (newEnd) {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // Handle event click or other actions here
  }

  addReservation(date: Date): void {
    const reservation: CalendarEvent = {
      start: date,
      title: 'Réservé',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    };

    this.events.push(reservation);
    this.events = [...this.events]; // Refresh the array to update the view
  }
}
