import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/shared/interface/order';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  orderDetail: Order[] = [];
  
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      order_id: localStorage.getItem('order_id'),
    }
    this.orderService.getOrederDetail(requestData.order_id).subscribe(
      res => {
        this.orderDetail = res;
      }
    )
  }

  


}
