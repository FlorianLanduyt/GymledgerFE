import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
} 


function comparePasswords(control: AbstractControl): {[key: string]: any} {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword ? null : { 'passwordsDiffer': true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthenticationService ){}

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.email],
       serverSideValidateUsername(this.authService.checkUserNameAvailability)],
       passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
       }, {validator: comparePasswords})
        
    });

}

}
