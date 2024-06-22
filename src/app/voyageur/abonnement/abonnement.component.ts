import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmobilierService, Property } from '../../immobilier.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,NavbarComponent,CommonModule]
})
export class AbonnementComponent implements OnInit {
  selectedSubscription:any[]=[];
  userProfile:any={ };
  userIndex:number=-1

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
   
    /////
  }

  ngOnInit(): void {
     this.userProfile = JSON.parse(localStorage.getItem('userProfile') as any) || {};
     this.selectedSubscription = JSON.parse(localStorage.getItem('userSubscription') as any) || {};
    
     if(this.selectedSubscription?.length){
      this.userIndex = this.selectedSubscription.findIndex((user)=> user.userEmail == this.userProfile.email)
     }
 
  }

  subscribe(subsritionType:string,price:number){
    const selectedSubscription={
      subType:subsritionType,
      subPrice:price,
      userName:this.userProfile.name,
      userEmail:this.userProfile.email,
    }

    if(this.selectedSubscription?.length){
      this.userIndex = this.selectedSubscription.findIndex((user)=> user.userEmail == this.userProfile.email)
      if(this.userIndex>-1){
        this.selectedSubscription[this.userIndex]=selectedSubscription
      } 
    }
    else{
       this.userIndex=0;
       this.selectedSubscription=[];
            this.selectedSubscription.push(selectedSubscription)  ;
            this.selectedSubscription =[...this.selectedSubscription]
    }
    localStorage.setItem("userSubscription", JSON.stringify(this.selectedSubscription));

  }

}
