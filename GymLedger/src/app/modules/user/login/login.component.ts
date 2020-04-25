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
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    this.authService.login(
      this.user.value.email,
      this.user.value.password
    ).subscribe(val => {
      if (val) {
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.authService.redirectUrl = undefined;
        } else {
          this.router.navigate(['/gymnast']);
        }
      }
    }, err => this.errorMsg = err.json().message);
  }
  
}
