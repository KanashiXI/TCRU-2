import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { ShippingService } from './../../../Service/shippingService.service';

//dropdown status
interface Status {
  value: string;
  viewValue: string;
}
// ----------

@Component({
  selector: 'app-deliveryStatus',
  templateUrl: './deliveryStatus.component.html',
  styleUrls: ['./deliveryStatus.component.scss']
})
export class DeliveryStatusComponent implements OnInit {

  dataSource: ShippingInterface[];
  errorMessage: String;
  dataForm: ShippingInterface;

  // dropdown status 
  selectedValue: string;
  selectedStatus: string;
  // ------------

  cars: Status[] = [
    {value: '1', viewValue: '---'},
    {value: '2', viewValue: 'รอจัดส่ง'},
    {value: '3', viewValue: 'จัดส่งเรียบร้อย'}
  ];

  constructor(
    private ShippingService: ShippingService,
  ) { }

  ngOnInit() {
    this.ShippingService.getShippingOrder().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
  }

  onClickDetail(data) {
    this.ShippingService.nextMessage(data);
    localStorage.setItem("shipping_id", data);
  }

}
