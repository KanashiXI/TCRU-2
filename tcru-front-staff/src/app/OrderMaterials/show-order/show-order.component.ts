import { Component, OnInit } from '@angular/core';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderMaterials } from '../../Models/OrderMaterials.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  searchText: string;
  order_material_id: string;
  Search: string;
  OrderMMessage: string;
  dataArr: any;
  page: any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  id: any;

  constructor(private http: HttpClient,
    private Order: OrderMaterialsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getOrder();
  }

  getOrder()
  {
    this.spinner.show();
    if(this.page == 1){
      this.skip = 0;
    }
    else {
      this.skip = (this.page-1) * this.limit;
    }
    var requestObj = {
      'limit': this.limit,
      'skip': this.skip
    }

    this.Order.getData1(requestObj).subscribe((res:any) => {
      this.spinner.hide();
      this.dataArr = res.data;
      this.totalCount = res.totalRecord;
    })
  }

  deleteOrderM(id)
  {
    if(confirm('คุณต้องการลบหรือไม่ ?') == true)
    this.Order.deleteOrderM(id).subscribe(result => {
      this.getOrder();
      this.spinner.show();
      this.toastr.success('ลบรายการสั่งซื้อสำเร็จ!');
    },
    err => {
      this.toastr.error('ลบรายการสั่งซื้อไม่สำเร็จ!!');
      this.spinner.show();
      console.log(err);
    });
  }
}
