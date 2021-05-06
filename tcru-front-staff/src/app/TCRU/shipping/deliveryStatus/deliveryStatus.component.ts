import { MatTableDataSource } from '@angular/material/table';
import { statusOrder } from './../../../OrderMaterials/Interface/statusOrder';
import { element } from 'protractor';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
// import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { OrderInterface } from './../../../interfaces/orderInterface';
import { ShippingService } from './../../../Service/shippingService.service';
import { StatusInterface } from './../../../interfaces/statusInterface';
import { findIndex } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


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
  
  chooseAddress: boolean = false;
  shAddress: boolean = false;
  choosen: OrderInterface[] = [];

  orderAddressSelected : OrderInterface[] = [];
  addressList: OrderInterface[];
  selectAddress: OrderInterface[] = [];

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
    this.getAddress();
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
    if(index == 1){
      this.shAddress = true;
    } else {
      this.shAddress = false;
    }
    console.log(this.shAddress)
  }

  filterByType(element, index) {
    if(index == 4){
      return (element.status_id == 0 || element.status_id == 1 || element.status_id == 2)
    }else{
      // console.log(element.status+'------'+this.typeList[index].id)
      return (element.status_id == this.typeList[index].id)
    }
    
  }

  changeSelection(orderId) {
    this.fetchSelectedItems();
    // this.getEditForm(orderId);
    // this.selectAddress = this.orderAddressSelected.filter(value => {
    //   return Number(value.order_id) == Number(orderId)
    // });
    // console.log(this.selectAddress) 
    this.getAddress()
    console.log(this.orderAddressSelected)
  }

  getAddress(){
    this.ShippingService.getShippingAddress().subscribe(
      res => {
        this.orderAddressSelected =  this.orderOnfilter.filter(value => {
          return value.chooseAddress;
        });
      }
    )
    // console.log(this.orderAddressSelected)
  }

  fetchSelectedItems() {
    this.choosen = this.orderOnfilter.filter(value => {
      return value.chooseAddress;
    });
    console.log(this.choosen)
    // this.fetchAddress()
  }

  // fetchAddress() {
  //   this.orderAddressSelected = this.addressList.filter(value => {
  //     return value.address;
  //   });
  //   console.log(this.orderAddressSelected)
  // }

  // getEditForm(data) {
  //   this.ShippingService.getOneShipping(data).subscribe(
  //     res => {
  //       this.addressList = res;
  //       // this.fetchAddress()
  //       this.orderAddressSelected.push

  //     },
  //     error => this.errorMessage = <any>error
  //   )
    
  // }
}