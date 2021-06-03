import { MatTableDataSource } from '@angular/material/table';
import { statusOrder } from './../../../OrderMaterials/Interface/statusOrder';
import { element } from 'protractor';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { OrderInterface } from './../../../interfaces/orderInterface';
import { ShippingService } from './../../../Service/shippingService.service';
import { StatusInterface } from './../../../interfaces/statusInterface';
import { findIndex } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-deliveryStatus',
  templateUrl: './deliveryStatus.component.html',
  styleUrls: ['./deliveryStatus.component.scss'],
  providers: [
    DatePipe
  ]
})

// class Service {
//   constructor(private datePipe: DatePipe) { }
//   changeDate(date) {
//     return this.datePipe.transform(date, 'yyyy-MM-dd');
//   }
// }


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

  orderAddressSelected: OrderInterface[] = [];
  addressList: OrderInterface[];
  selectAddress: OrderInterface[] = [];

  reactiveForm: FormGroup;
  dateFrom: string;
  dateTo: string;
  check: number;



  pipe: DatePipe;

  constructor(
    private ShippingService: ShippingService,
    private fb: FormBuilder,
    public datePipe: DatePipe,

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
    this.createForm();

  }

  applyFilter() {
    this.dateFrom = this.range.controls['start'].value.toLocaleDateString();
    this.dateTo = this.range.controls['end'].value.toLocaleDateString();

    let first_date = this.range.controls['start'].value;
    let latest_date = this.range.controls['end'].value;
    let first_date2 = this.datePipe.transform(first_date, 'yyyy/MM/dd');
    let latest_date2 = this.datePipe.transform(latest_date, 'yyyy/MM/dd');
    console.log(first_date2 + "==" + latest_date2)
    this.orderOnfilter = this.orderOnfilter.filter((item: any) => {
      // console.log(item.order_date = this.datePipe.transform(item.order_date, 'yyyy/MM/dd')+ "==" + latest_date)
      return (item.order_date = this.datePipe.transform(item.order_date, 'yyyy/MM/dd')) >= first_date2 &&
        (item.order_date = this.datePipe.transform(item.order_date, 'yyyy/MM/dd')) <= latest_date2;
    });
  }

  exportProduct() {
    this.dateFrom = this.range.controls['start'].value.toLocaleDateString();
    this.dateTo = this.range.controls['end'].value.toLocaleDateString();
    this.ShippingService.getReportAddress(this.dateFrom, this.dateTo).subscribe(
      blob => this.ShippingService.download(blob, 'product' + this.dateFrom + '-' + this.dateTo + '.xlsx'),
    );
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });








  // formatDate(date) {
  //   var dateFromFormatted = new DatePipe(date).transform(date, 'dd-MM-yyyy');
  //   return dateFromFormatted;
  // }

  createForm() {
    this.reactiveForm = this.fb.group({
      send_date_from: ['',],
      send_date_to: ['',],
    })
  }



  get send_date_from() {
    return this.reactiveForm.get('send_date_from')
  }
  get send_date_to() {
    return this.reactiveForm.get('send_date_to')
  }

  refresh() {
    this.ngOnInit()
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
    this.check = index;
    if (index == 1) {
      this.shAddress = true;
    } else {
      this.shAddress = false;
    }
    console.log(this.shAddress)
  }

  filterByType(element, index) {
    if (index == 4) {
      return (element.status_id == 0 || element.status_id == 1 || element.status_id == 2)
    } else {
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

  getAddress() {
    this.ShippingService.getShippingAddress().subscribe(
      res => {
        this.orderAddressSelected = this.orderOnfilter.filter(value => {
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