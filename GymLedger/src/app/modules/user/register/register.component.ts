import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

function serverSideValidateEmail(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
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

function comparePasswords(control: AbstractControl): ValidationErrors {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string = ""

  constructor(
    public fb: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email],
        serverSideValidateEmail(this.authService.checkUserNameAvailability)],

      passwordGroup: this.fb.group(
        {
          password: [
            'P@ssword111', 
            [
              Validators.required, 
              Validators.minLength(8)
            ]
          ],
          confirmPassword: ['P@ssword111', Validators.required]
        }, 
        { validator: comparePasswords }),

      isCoach: ['true', Validators.required],
      firstName: ['peter', Validators.required],
      lastName: ['pieters', Validators.required],
      birthday: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    this.authService
    .register(
      this.user.value.firstName,
      this.user.value.lastName,
      this.user.value.email,
      this.user.value.passwordGroup.password,
      this.user.value.isCoach,
      this.user.value.birthday
    )
    .subscribe(
      (val) => {
        if (val) {
          if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = undefined;
          } else {
            this.router.navigate(['']);
          }
        } else {
          this.errorMsg = `Could not login`;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMsg = `Error while trying to login user ${this.user.value.email}: ${err.error.message}`;
        } else {
          this.errorMsg = `Error ${err.status} while trying to login user ${this.user.value.email}: ${err.error}`;
        }
      }
    );
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'Dit veld is verplicht';
    } else if (errors.minlength) {
      return `heeft teniminste ${errors.minlength.requiredLength} karakters nodig (heeft ${errors.minlength.actualLength})`;
    } else if (errors.hasNumber) {
      return `heeft tenminste 1 nummer nodig`;
    } else if (errors.userAlreadyExists) {
      return `deze gebruikersnaam is reeds in gebruik`;
    } else if (errors.email) {
      return `geen geldige emailadres`;
    } else if (errors.passwordsDiffer) {
      return `komt niet overeen met wachtwoord`;
    }
  }


}
