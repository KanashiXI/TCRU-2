import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Order } from 'src/app/shared/interface/order';
import { OrderService } from 'src/app/shared/service/order.service';
import { BillComponent } from '../../shop/bill/bill.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  dataSource: Order[] = [];
  orderDetail: Order[] = [];
  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    this.orderService.getOreder(requestData.customerUsername).subscribe(
      res => {
        res.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
        this.dataSource = res;

      }
    )
  }

  onClickSubmit(id) {
    localStorage.setItem("order_id", id);
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.dialog.open(BillComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }


  // onClickBill() {

  // }


}
