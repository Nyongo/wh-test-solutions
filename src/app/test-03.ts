/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
@Component({
    selector : 'ng-app',
    template : ` <style>
    .error {
      color: #FF0000;
    }
    .success {
        color: #008000;
        font-size: 18px;
    }
  </style>
  <form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [(ngModel)]="email" name="email" /><br/>
                    <span *ngIf="emailError" class="error">{{emailError}}</span>
                    <br/>
                    <input type="password" [(ngModel)]="password" name="password" /><br/>
                    <span *ngIf="passwordError" class="error">{{passwordError}}</span>
                    <div>
                    <button type="submit" (click)="submitForm($event)">Submit</button>
                    </div>
                    <br/><br/>
                    <div *ngIf="logged_in" class="success">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    logged_in = false;
    emailError: string = "";
    passwordError: string = "";
    submitForm($event: Event): void {
        $event.preventDefault();
        this.emailError =  this.isValidEmail(this.email) == true ? '' : 'Please provide a valid email eg abc@a.com';
        this.passwordError =  this.isValidPassword(this.password) == true ? '' 
        : 'Password must contain at least a special character, an uppercase character, a lower case character, a number and be of a minimum of 8 Characters';
        // If no error let's turn on the loggedIn Flag
        this.logged_in = !this.emailError && !this.passwordError  ? true : false;
    }
    isValidEmail(value): boolean {
        const VALID_EMAIL_REGEX = /\S+@\S+\.\S+/;
        return value.match(VALID_EMAIL_REGEX) ? true : false;
    }
    isValidPassword(value): boolean {
        const VALID_PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return value.match(VALID_PASSWORD_REGEX) ? true : false;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};