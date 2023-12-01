import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0,
          height: "0px",
        })
      ),
      transition("void <=> *", animate(300)),
    ]),
  ],
})
export class PricingComponent implements OnInit {
  navigationToCheckout() {
    this.router.navigate(["/Checkout"]);
  }

  constructor(private router: Router) {}
  // Use properties to track the visibility of the answer
  isAnswerVisible1 = false;
  isAnswerVisible2 = false;
  isAnswerVisible3 = false;

  // Toggle the visibility of the answer
  toggleAnswer1() {
    this.isAnswerVisible1 = !this.isAnswerVisible1;
  } 
  toggleAnswer2() {
    this.isAnswerVisible2 = !this.isAnswerVisible2;
  }
   toggleAnswer3() {
    this.isAnswerVisible3 = !this.isAnswerVisible3;
  }

  ngOnInit(): void {}
}
