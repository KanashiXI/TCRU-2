import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../../Models/Promotion.model';
import { PromotionService } from './../../../Service/promotion.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-showPromotion',
  templateUrl: './showPromotion.component.html',
  styleUrls: ['./showPromotion.component.css']
})
export class ShowPromotionComponent implements OnInit {

  dataSource: Promotion[];
  errorMessage: String;

  constructor(
    private PromotionService: PromotionService,

  ) { }

  ngOnInit() {
    this.PromotionService.getData().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
  }


}
