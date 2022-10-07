/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import {
  Component,
  NgModule,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "ng-app",
  template: `<style>
      .form-group {
        display: flex;
        flex-direction: column;
        margin: 15px 15px;
        width: 250px;
      }
      section {
        display: flex;
      }
    </style>
    <form [formGroup]="form">
      <h2>Enter your first and last name</h2>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" formControlName="firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" formControlName="lastName" />
      </div>
    </form>
    <div class="results">
      <span
        *ngIf="
          form.get('firstName').touched &&
          form.get('firstName').value &&
          form.get('lastName').touched &&
          form.get('lastName').value
        "
      >
        {{ getUsername() }}
      </span>
    </div> `,
  styles: [],
})
export class UserNameComponent implements OnInit {
  username: string = "john_ode";
  public form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
    });
  }
  getUsername(): string {
    const firstName = this.form.value.firstName.toLowerCase();
    const lastName = this.form.value.lastName.toLowerCase();
    return `${firstName}_${lastName}_${this.generateRandomInt(1, 9)}`;
    // const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    // return `${firstName}_${lastName}_${randomNumber}`;
  }
  generateRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserNameComponent,
      },
    ]),
  ],
  declarations: [UserNameComponent],
})
export class UserNameModule {}
