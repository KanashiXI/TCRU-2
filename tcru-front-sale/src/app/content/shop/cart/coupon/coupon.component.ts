import { ConstantPool } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { CustomerService } from 'src/app/shared/service/customer.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  couponData: Emloyeeinterface[] = [];
  // @Output() couponCode = new EventEmitter<string>();

  coupon: Emloyeeinterface[] = [];
  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    const requestData = {
      ...Subject,
      userId: localStorage.getItem('user_id'),
    }
    this.getCoupon(requestData.userId)
  }

  getCoupon(userId) {
    this.customerService.getCoupon(userId).subscribe(res => {
      this.couponData = res;
    })
  }

  selectCoupon(item) {
    // this.couponCode.emit(this.couponData[index].key);
    this.coupon = item;
    console.log('hey I am  clicked in child');
  }

}
