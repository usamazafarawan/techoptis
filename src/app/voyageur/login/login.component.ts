import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoyageurService } from '../../voyageur.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  otpSubmitCheck: boolean = false;
  formGroup: FormGroup;
  submitted = false;
  formInvalid = false;
  parametersData = [];
  subParametersData = [];
  activeId = '';
  activeSubId = '';
  editId = '';
  confirmPass = false;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private voyageurService: VoyageurService,

  ) {
    this.formGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSave() {
    if (this.formGroup.invalid) {
      this.formInvalid = true;
      return;
    }
    const registeredUsers: any[] =
      JSON.parse(localStorage.getItem('registeredUSers') as any) || [];
    if (
      registeredUsers.findIndex(
        (user) =>
          user.email == this.formGroup.value.email &&
          user.newPassword == this.formGroup.value.password
      ) > -1
    ) {
      localStorage.setItem('userProfile', JSON.stringify(registeredUsers.find(   (user) =>
        user.email == this.formGroup.value.email &&
        user.newPassword == this.formGroup.value.password)));
      this.toaster.success('Connecté avec succès', 'Succès');
      this.voyageurService._lognnInfo.next(registeredUsers.find(   (user) =>
        user.email == this.formGroup.value.email &&
        user.newPassword == this.formGroup.value.password));

      this.router.navigate(['/voyageur/list-location']);
    } else {
      this.toaster.error('E-mail ou mot de passe incorrect', 'Error');
      this.voyageurService._lognnInfo.next(null);
    }
  }
  registerPage() {
    this.router.navigate(['/voyageur/registre']);
  }
}
