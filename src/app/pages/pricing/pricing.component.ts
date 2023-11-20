import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  navigationToCheckout(){
    this.router.navigate(['/Checkout'])
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
