import { Component, OnInit } from '@angular/core';
import { OrderMaterialsService } from '../../Service/order-materials.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderMaterials } from '../../Models/OrderMaterials.model';

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
  constructor(private http: HttpClient,
    private Order: OrderMaterialsService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder()
  {
    this.Order.getData().subscribe(res=>{
      this.dataArr=res;
    })

}
}
