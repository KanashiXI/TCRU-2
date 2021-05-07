import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Order } from 'src/app/shared/interface/order';
import { OrderService } from 'src/app/shared/service/order.service';
import { BillComponent } from '../../shop/bill/bill.component';
import { SlipuploadComponent } from './slipupload/slipupload.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  dataSource: Order[] = [];
  orderDetail: Order[] = [];
  filterOrder: Order[] = [];

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
        this.filter(0);
      }
    )
  }

  filter(index) {
    this.filterOrder = this.dataSource.filter((element) => this.filterByType(element, index));
  }

  filterByType(element, index) {
    if(index == 0){
      return (element.status == 0)
    }else if(index == 1){
      return (element.status == 1)
    }else if (index == 2){
      return (element.status == 2)
    }
    
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


  onClickUpload(id) {
    localStorage.setItem("order_id", id);
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.dialog.open(SlipuploadComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }


}
