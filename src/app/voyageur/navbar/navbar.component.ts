import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatMenuModule,MatIconModule]
})
export class NavbarComponent implements OnInit{
  searchQuery: string = '';
  userProfile:any;
  constructor(private router: Router) {}

 ngOnInit(): void {
    this.userProfile = JSON.parse(localStorage.getItem("userProfile") as any);
 }
  onSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/voyageur/list-location'], { queryParams: { query: this.searchQuery } });
  }

  navigateToLogin(): void {
    this.router.navigate(['/voyageur/se-connecter']);
  }
  navigateToSignup(){
    this.router.navigate(['/voyageur/registre']);
  }
}
