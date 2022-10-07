/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "textfield",
  template:
    '<input type="text"  [(ngModel)]="field" (keyup)="onTitleChange()" />',
})
export class TextField {
  field = "";
  @Output() titleChangedEvent = new EventEmitter<string>();
  onTitleChange(): void {
    this.titleChangedEvent.emit(this.field);
  }
}

@Component({
  selector: "child-component",
  template: `<h2>
    Title:
    <h2>
      <br /><textfield (titleChangedEvent)="titleChanged($event)"></textfield>
    </h2>
  </h2>`,
})
export class ChildComponent {
  title: string = "";
  @Output() userChangeEvent = new EventEmitter<number>();
  titleChanged(title: string) {
    this.title = title;
  }
 
}

@Component({
  selector: "ng-app",
  template: `<div>
    <child-component #child></child-component> <br />
    Title is {{ child.title }} 
  </div>`,
})
export class Test02Component implements OnInit {
  title: string = "";
  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
