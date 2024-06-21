import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './voyageur/navbar/navbar.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,NavbarComponent]  // Ajoutez RouterModule ici
})
export class AppComponent {
  title = 'my-app';
}
