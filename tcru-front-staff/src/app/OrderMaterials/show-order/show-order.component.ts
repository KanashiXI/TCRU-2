import { Component, OnInit } from '@angular/core';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderMaterials } from '../../Models/OrderMaterials.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  searchText: string;
  order_material_id: string;
  Search: string;
  materialMessage: string;
  dataArr: any;
  material_name:any;
  page: any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;

  constructor(private http: HttpClient,
    private Order: OrderMaterialsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
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
    if(confirm('คุณต้องการลบฟรือไม่ ?') == true)
    this.Order.deleteOrderM(id).subscribe(result => {
      this.getOrder();
    },
    err => {
      console.log(err);
    })
  }
}
