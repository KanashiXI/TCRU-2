import { LotpService } from 'src/app/service/lotp.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { production } from '../../models/production.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lotp } from 'src/app/models/lotp.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-showlot',
  templateUrl: './showlot.component.html',
  styleUrls: ['./showlot.component.css']
})
export class ShowlotComponent implements OnInit {
  id: any;
  lotpArr: any;
  lotp = new lotp();
  categoryArr: any;
  date: any;
  production = new production();
  constructor(private fb: FormBuilder, private http: HttpClient,
    private LotpService: LotpService,
    private ProductService: ProductService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.getData();
  }
  // getproduct() {
  //   this.LotpService.getproduct().subscribe(res => {
  //     this.categoryArr = res;
  //   })
  // }
  getData(){
    this.ProductService.productionid(this.id).subscribe(res=>{
      this.date = res;
      console.log(this.date);
    })
  }

}
