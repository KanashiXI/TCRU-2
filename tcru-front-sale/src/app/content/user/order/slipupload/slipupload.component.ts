import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/shared/interface/order';
import { CartService } from 'src/app/shared/service/cart.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-slipupload',
  templateUrl: './slipupload.component.html',
  styleUrls: ['./slipupload.component.css']
})
export class SlipuploadComponent implements OnInit {



  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) { }


  success: number;
  files: File = null;
  orderId: string;
  orderPart: Order[] = [];

  ngOnInit() {
    const requestData = {
      ...Subject,
      order_id: localStorage.getItem('order_id'),
    }
    this.orderId = requestData.order_id;
    this.getUserSlip();
  }

  getUserSlip() {
    this.orderService.getSlip(this.orderId).subscribe(
      res => {
        this.orderPart = res;
      }
    )
  }

  onFileSelected(event) {
    this.files = <File>event.target.files[0];
  }


  imageUpload() {


    const formdata = new FormData();
    formdata.append('image', this.files, this.files.name);
    formdata.append('order_id', this.orderId);
    // if (event.target.files.length > 0) {
    //   const reader = new FileReader();
    //   let formdata = new FormData();
    //   formdata.append(event.target.files[0], requestData.order_id);
    //   console.log("reader is " + event.target.files[0])
    //   reader.onload = (e) => {
    if (formdata != null) {
      this.cartService.uploadSlip(formdata).subscribe(res => {
        this.getUserSlip();
        this.ngOnInit();
      });
      console.log("upload image")
    }
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    // }

  }

  // onClickUpload() {
  //   let formdata = new FormData();
  //   formdata.append("file", this.files, this.files.name);
  //   this.cartService.addOrder(formdata).subscribe()
  // }
}
