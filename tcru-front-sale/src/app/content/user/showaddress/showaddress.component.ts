import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { Subject } from 'rxjs';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Address } from '../addaddress/interfaces/address';
import { AddressService } from '../addaddress/services/address.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-showaddress',
  templateUrl: './showaddress.component.html',
  styleUrls: ['./showaddress.component.scss']
})
export class ShowaddressComponent implements OnInit {

  dataForm: Emloyeeinterface;
  errorMessage: String;
  dataSource: Address[];
  shippingAddressList: Address[];

  constructor(
    private addressService: AddressService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('customerUsername'),
    }
    this.customerService.getCustomerProfileByEmail(requestData.customerUsername).subscribe(
      res => {
        this.dataForm = res;
        const user_id = res[0].id;
        const address_id = res[0].address_id;
        this.getUserAddress(user_id);
      },
      error => this.errorMessage = <any>error
    )
  }

  getUserAddress(user_id) {
    this.addressService.getShippingAddress(user_id).subscribe(data => {
      this.dataSource = data;
    });
  }

  onClickDelete(data) {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ ใช่ หรือ ไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then((result) => {
      if (result.value) {
        this.addressService.deleteAddress(data).subscribe()
        Swal.fire(
          'ลบข้อมูลเรียบร้อย',
          '',
          'success',
        )
        this.ngOnInit() 
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    }) 
  }
  
  onClickSubmit(data) {
    this.addressService.nextMessage(data);
    localStorage.setItem("address_id", data);
  }

}
