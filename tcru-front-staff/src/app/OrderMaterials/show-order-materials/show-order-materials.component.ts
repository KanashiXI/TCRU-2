import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-order-materials',
  templateUrl: './show-order-materials.component.html',
  styleUrls: ['./show-order-materials.component.css']
})
export class ShowOrderMaterialsComponent implements OnInit {

  orderMaterials: any[];
  orderMaterials_id: string;
  orderMaterialsMessage: string;
  searchText: string;
  term: string;
  filterTerm: string;
  page:any = 1;
  limit: any = 10;
  skip: any;
  categoryArr:any;
  totalCount: any;
  dataArr: any;

  constructor(private http: HttpClient,
    private OrderMaterials: OrderMaterialsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderMaterials();
  }

  getOrderMaterials()
  {
    if(this.page == 1)
    {
      this.skip = 0;
    }
    else{
      this.skip = (this.page-1) * this.limit;
    }
    var requestObj = {
      'limit': this.limit,
      'skip': this.skip
    }
    this.OrderMaterials.getData1(requestObj).subscribe((res:any) => {
      this.dataArr = res.data;
      this.totalCount = res.totalCount;
    })
  }

}
