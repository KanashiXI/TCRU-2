import { Component, OnInit } from '@angular/core';
import { lotp } from 'src/app/models/lotp.model';
import { LotpService } from '../../service/lotp.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  id: any;
  lotp=new lotp();
  form: FormGroup;
  date: any[] = [];
  files: any;
  dataArr: any;

  constructor(private fb: FormBuilder,private http: HttpClient,
    private LotpService: LotpService,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.getData();
  }
  getData()
  {
    this.LotpService.getstock_product().subscribe(res=>{
      this.dataArr=res;
      console.log(this.dataArr)
    })
  }

}
