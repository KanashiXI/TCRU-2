import { isPropsValidTester } from '@fullcalendar/core/validation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../../models/Material.model';
import { Customers } from '../../Models/customers';
@Component({
  selector: 'app-editc',
  templateUrl: './editc.component.html',
  styleUrls: ['./editc.component.css']
})
export class EditcComponent implements OnInit {

  id: any;
  Customers=new Customers();
  date: any;
  files: any;


  constructor(private http: HttpClient,
    private CustomersService: CustomersService,
    private toastr: ToastrService,
    private route:ActivatedRoute) { 
  }
  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.getData();
  }
  getData(){
  this.CustomersService.geteditCustomers(this.id).subscribe(res=>{
    this.date = res;
    this.Customers = this.date;
  })
}
editCustomers(){
  if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
  this.CustomersService.editCustomers(this.id,this.Customers).subscribe(res=>{
    this.toastr.success('แก้ไขสำเร็จ!');
  },
    err => {
    this.toastr.error('แก้ไขล้มเหลว!');
    console.log(err);
  });
}
}
}
