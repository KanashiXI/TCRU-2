import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Tax } from '../interfaces/tax';
import { TaxService } from '../services/tax.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { EditTaxAddressComponent } from '../editTaxAddress/editTaxAddress.component';

@Component({
  selector: 'app-showTaxAddress',
  templateUrl: './showTaxAddress.component.html',
  styleUrls: ['./showTaxAddress.component.css']
})
export class ShowTaxAddressComponent implements OnInit {

  dataForm: Emloyeeinterface;
  dataSource: Tax[];
  errorMessage: String;

  constructor(
    private taxService: TaxService,
    private customerService: CustomerService,
    private overlay: Overlay,
    public dialog: MatDialog,
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
        this.getUserTax(user_id);
      },
      error => this.errorMessage = <any>error
    )
  }

  handleRadio(i): void {
    this.dataSource.forEach((item) => {
      item.status = 0;
    });
    var x = i
    this.dataSource[x].status = 1;
    // this.taxService.editStatusAddress(this.dataSource).subscribe();
  }

  getUserTax(user_id) {
    this.taxService.getTax(user_id).subscribe(data => {
      this.dataSource = data;
    });
  }

  onClickDelete(data) {
    // this.taxService.deleteTax(data).subscribe();
    // this.ngOnInit();

    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ ใช่ หรือ ไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then((result) => {
      if (result.value) {
        this.deletaTax(data)
        Swal.fire(
          'ลบข้อมูลเรียบร้อย',
          '',
          'success',
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })
  }

  deletaTax(data) {
    this.taxService.deleteTax(data).subscribe(),
      this.ngOnInit()
  }

  onClickEdit(data) {
    localStorage.setItem("local_tax_id", data);
    this.openDialogTax()
  }

  openDialogTax() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(EditTaxAddressComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }

}
