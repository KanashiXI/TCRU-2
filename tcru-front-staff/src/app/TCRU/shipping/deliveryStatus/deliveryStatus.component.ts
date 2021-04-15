import { statusOrder } from './../../../OrderMaterials/Interface/statusOrder';
import { element } from 'protractor';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
// import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { OrderInterface } from './../../../interfaces/orderInterface';
import { ShippingService } from './../../../Service/shippingService.service';
import { StatusInterface } from './../../../interfaces/statusInterface';
import { findIndex } from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-deliveryStatus',
  templateUrl: './deliveryStatus.component.html',
  styleUrls: ['./deliveryStatus.component.scss']
})
export class DeliveryStatusComponent implements OnInit {

  dataSource: OrderInterface[] = [];
  errorMessage: String;
  dataForm: OrderInterface;
  // statusArr: StatusInterface[] = [];
  statusArr: OrderInterface[] = [];
  orderList: OrderInterface[];
  allProduct: boolean = false;

  // dropdown status 
  orderOnfilter: OrderInterface[] = [];
  // typeList: StatusInterface[] = [];
  typeList: OrderInterface[] = [];
  // ------------

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(
    private ShippingService: ShippingService,
  ) { }

  ngOnInit() {
    this.ShippingService.getStatus().subscribe(
      res => {
        this.typeList = res;
        this.ShippingService.getShippingOrder().subscribe(
            res => {
              res.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
              this.dataSource = res;
              this.onClickSelectType(4);
              this.allProduct = true;
            },
            error => this.errorMessage = <any>error
          )
      }
      
    )
    this.getStatus();
    console.log(this.dataSource)
    
  }

  onClickDetail(data) {
    this.ShippingService.nextMessage(data);
    localStorage.setItem("order_id", data);
  }

  getStatus() {
    this.ShippingService.getStatus().subscribe(
      res => {
        this.statusArr = res;
      }
    )
  }

  onClickSelectType(index) {
    this.orderOnfilter = this.dataSource.filter((element) => this.filterByType(element, index));
    console.log(this.orderOnfilter)
  }

  filterByType(element, index) {
    if(index == 4){
      return (element.status_id+1 == 1 || element.status_id+1 == 2 || element.status_id+1 == 3)
    }else{
      // console.log(element.status+'------'+this.typeList[index].id)
      return (element.status_id == this.typeList[index].id)
    }
    
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

}
