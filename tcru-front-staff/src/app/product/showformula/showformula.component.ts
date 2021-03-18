import { Component, OnInit } from '@angular/core';
import { FormulaService } from 'src/app/service/formula.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formula } from 'src/app/models/formula.model';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-showformula',
  templateUrl: './showformula.component.html',
  styleUrls: ['./showformula.component.css']
})
export class ShowformulaComponent implements OnInit {
  form: FormGroup;
  files: any;
  dataArr: any;
  formula = new formula();
  MaterialsList: any;
  dataaArr: any = [ ];
  productList: any;
  id: any;


  constructor(private fb: FormBuilder, private http: HttpClient,
    private FormulaService: FormulaService,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.getData();
  }
  getData(){
    this.FormulaService.getformulaid(this.id).subscribe(res=>{
      this.dataArr = res;
      this.formula = this.dataArr;
    })
  }

}
