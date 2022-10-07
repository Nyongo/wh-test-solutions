/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CurrencyPipe } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
const MONTHLY_PAYMENT_RATE_PERCENTAGE = 2;
const LATE_PAYMENT_PERCENTAGE = 5;
@Component({
  selector: "ng-app",
  template: `<div>
    <h2>Loan Details</h2>
    <b>Monthly Payment:</b> {{ monthly_payment }} <br />
    <b>Late Payment Fee : {{ late_payment }}</b> <br />
  </div>`,
})
export class Test01Component implements OnInit {
  loan_amount: number = 300;  // 1000
  monthly_payment: any = 200;
  late_payment: any = 10;
  constructor(private currencyPipe: CurrencyPipe) { 
  }
  ngOnInit() {
    if (this.loan_amount && this.loan_amount > 0) {
        this.monthly_payment = (MONTHLY_PAYMENT_RATE_PERCENTAGE*this.loan_amount)/100;
        this.late_payment = (LATE_PAYMENT_PERCENTAGE*this.monthly_payment)/100;
        // Using currencyPipe to transform data
        this.monthly_payment = this.currencyPipe.transform(this.monthly_payment , 'USD');
        this.late_payment = this.currencyPipe.transform(this.late_payment , 'USD');
    }else{
        this.monthly_payment = this.late_payment = 'N/A';
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: Test01Component,
      },
    ]),
  ],
  declarations: [Test01Component],
})
export class Test01Module {}
