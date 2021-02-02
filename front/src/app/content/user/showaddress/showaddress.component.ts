import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Address } from '../address/interfaces/address';
import { AddressService } from '../address/services/address.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-showaddress',
  templateUrl: './showaddress.component.html',
  styleUrls: ['./showaddress.component.css']
})
export class ShowaddressComponent implements OnInit {
  // @Output() newItemEvent = new EventEmitter<string>();
  dataForm: Emloyeeinterface;
  errorMessage: String;
  dataSource: Address[];
  shippingAddressList: Address[];

  constructor(
    private addressService: AddressService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {

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
    // Swal.fire({  
    //   title: 'คุณต้องการลบข้อมูลนี้ ใช่ หรือ ไม่?',
    //   icon: 'warning',  
    //   showCancelButton: true,  
    //   confirmButtonText: 'ใช่',  
    //   cancelButtonText: 'ไม่'  
    // }).then((result) => {  
    //   if (result.value) {  
    //     Swal.fire(
    //       'ลบข้อมูลเรียบร้อย',
    //       '',
    //       'success',
    //       this.addressService.deleteAddress(data).subscribe(), 
    //       this.ngOnInit()  
    //     )
    //   } else if (result.dismiss === Swal.DismissReason.cancel) { }  
    // })
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

  // confirmBox(){  
  //   Swal.fire({  
  //     title: 'Are you sure want to remove?',  
  //     text: 'You will not be able to recover this file!',  
  //     icon: 'warning',  
  //     showCancelButton: true,  
  //     confirmButtonText: 'Yes, delete it!',  
  //     cancelButtonText: 'No, keep it'  
  //   }).then((result) => {  
  //     if (result.value) {  
  //       Swal.fire(  
  //         'Deleted!',  
  //         'Your imaginary file has been deleted.',  
  //         'success'  
  //       )  
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {  
  //       Swal.fire(  
  //         'Cancelled',  
  //         'Your imaginary file is safe :)',  
  //         'error'  
  //       )  
  //     }  
  //   })  
  // }

}
