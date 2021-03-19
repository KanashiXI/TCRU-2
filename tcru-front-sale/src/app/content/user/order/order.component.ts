import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/shared/interface/order';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  dataSource: Order[] = [];
  orderDetail: Order[] = [];
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    this.orderService.getOreder(requestData.customerUsername).subscribe(
      res => {
        this.dataSource = res;

      }
    )
  }

  onClickSubmit(id){
    localStorage.setItem("address_id", id);
  }


}
