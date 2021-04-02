import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
// import { ShippingInterface } from './../../../interfaces/shippingInterface';
import { OrderInterface } from './../../../interfaces/orderInterface';
import { ShippingService } from './../../../Service/shippingService.service';

//dropdown status
interface status {
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

  dataSource: OrderInterface[] = [];
  errorMessage: String;
  dataForm: OrderInterface;

  // dropdown status 
  selectedValue: string;
  selectedStatus: string;
  // ------------

  status: status[] = [
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
    localStorage.setItem("order_id", data);
  }

}
