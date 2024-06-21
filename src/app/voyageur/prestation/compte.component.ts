import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css',
})
export class CompteComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private immobilierService: ImmobilierService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$'
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const userInfo: any =
      JSON.parse(localStorage.getItem('userInfo') as any) || {};
    const userProfile: any =
      JSON.parse(localStorage.getItem('userProfile') as any) || {};

    if (userInfo?.email) {
      this.userForm.patchValue(userInfo);
    } else {
      this.userForm.controls['email'].setValue(userProfile.email);
    }
  }

  saveUserInfo() {
    localStorage.setItem('userInfo', JSON.stringify(this.userForm.value));
    this.toaster.success('enregistrement enregistré avec succès');
  }
  navigate(path:string){
    this.router.navigate([path]);
  }
}
