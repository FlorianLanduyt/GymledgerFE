import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup
  public errorMsg: string = ""

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    this.authService.userNameExists$(this.user.value.email, this.user.value.password).subscribe((exists: boolean) => {
      if(exists){
        console.log(exists)
        this.authService.login(
          this.user.value.email,
          this.user.value.password
        ).subscribe(val => {
          if (val) {
            if (this.authService.redirectUrl) {
              // this.router.navigateByUrl(this.authService.redirectUrl);
              // this.authService.redirectUrl = undefined;

              this.router.navigate(['training/gymnast']);
            } else {
              this.router.navigate(['training/gymnast']);
            }
          }
        }, err => this.errorMsg = "Er is iets onverwacht misgelopen. Probeer later opnieuw.");
      } else {
        this.errorMsg = "Incorrect wachtwoord of e-mailadres"
      }
    })
  }


  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'Dit veld is verplicht';
    } else if (errors.email) {
      return `geen geldige emailadres`;
    }
  }
}
