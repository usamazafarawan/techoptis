import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { VoyageurService } from '../../voyageur.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatMenuModule,MatIconModule,ReactiveFormsModule]
})
export class NavbarComponent implements OnInit{
  userProfile:any=null;
  searchQuery = new FormControl('');
  constructor(private router: Router,private voyageurService: VoyageurService) {}

 ngOnInit(): void {
    this.voyageurService.lognnInfo$.subscribe((userInfo)=>{
     this.userProfile  = userInfo;
    });
 }
  onSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/voyageur/list-location'], { queryParams: { query: this.searchQuery.value } });
  }

  navigateToLogin(): void {
    this.router.navigate(['/voyageur/se-connecter']);
  }
  navigateToSignup(){
    this.router.navigate(['/voyageur/registre']);
  }
  logOut(){
    this.userProfile = null;
    this.voyageurService._lognnInfo.next(null)
    localStorage.removeItem("userProfile");
    this.router.navigate(['/voyageur/se-connecter']);
  }
}
