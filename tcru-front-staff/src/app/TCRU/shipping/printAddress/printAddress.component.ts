import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { OrderInterface } from 'src/app/interfaces/orderInterface';
import { ShippingService } from './../../../Service/shippingService.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-printAddress',
  templateUrl: './printAddress.component.html',
  styleUrls: ['./printAddress.component.scss']
})
export class PrintAddressComponent implements OnInit {

  message: string;
  errorMessage: String;
  submitted = false;

  dataSource: OrderInterface[];

  reactiveForm: FormGroup;


  constructor(
    private ShippingService: ShippingService,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      order_id: localStorage.getItem('order_id'),
    }
    this.getAddress(requestData.order_id);
  }

  getAddress(data) {
    this.ShippingService.getOneShipping(data).subscribe(
      res => {
        this.dataSource = res;
      }
    )
  }

  public openPDF(): void {
    let DATA = document.getElementById('address');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('address.pdf');
    });
  }

}
