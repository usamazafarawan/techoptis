import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class signupComponent implements OnInit {

  formGroup: FormGroup
  formInvalid = false;
  registeredUsers:any[] =[];


  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toaster:ToastrService,
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      newPassword: ['', [Validators.required]],
    })
  }

  // toaster = inject(ToastrService);

  ngOnInit(): void {
  }


  onSave() {
    this.registeredUsers = JSON.parse(localStorage.getItem("registeredUSers") as any) || [];
    if (this.registeredUsers?.length) {
      if (this.registeredUsers.findIndex((user) => user.email == this.formGroup.value.email) > -1) {
        this.toaster.error('utilisateur déjà enregistré', 'Error');
      }
      else {
        this.registeredUsers.push(this.formGroup.value);
        localStorage.setItem("registeredUSers", JSON.stringify(this.registeredUsers))
        this.toaster.success('utilisateur enregistré avec succès', 'Succès');
        this.route.navigate(['/voyageur/se-connecter']);
      }
    }
    else {
      this.registeredUsers.push(this.formGroup.value);
      localStorage.setItem("registeredUSers", JSON.stringify(this.registeredUsers))
      this.toaster.success('utilisateur enregistré avec succès', 'Succès');
      this.route.navigate(['/voyageur/se-connecter']);
    }
  }
}
