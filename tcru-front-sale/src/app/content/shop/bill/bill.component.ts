import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Order } from 'src/app/shared/interface/order';
import { OrderService } from 'src/app/shared/service/order.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  orderDetail: Order[] = [];
  addressData: String;
  resData: String[] = [];
  constructor(
    private orderService: OrderService,


  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      order_id: localStorage.getItem('order_id'),
    }
    
    this.orderService.getOrederDetail(requestData.order_id).subscribe(
      res => {
        this.orderDetail = res;
        // this.addressData = this.orderDetail[0].address; 
        this.resData[0] =  this.orderDetail[0].address;   
        this.resData[1] =  this.orderDetail[0].telephone;   
        this.resData[2] =  this.orderDetail[0].firstname;   
        this.resData[3] =  this.orderDetail[0].lastname;   
        this.resData[4] =  this.orderDetail[0].total_price;
        this.resData[5] =  this.orderDetail[0].district;
        this.resData[6] =  this.orderDetail[0].amphures;
        this.resData[7] =  this.orderDetail[0].province;  
        this.resData[8] =  this.orderDetail[0].postal_code;
        this.resData[9] =  this.orderDetail[0].net_amount;
        this.resData[10] =  this.orderDetail[0].discount;
        this.resData[11] =  this.orderDetail[0].total_price;
      }
    )
  }

  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('product.pdf');
    });
  }
  




}
