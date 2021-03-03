import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Promotion } from './../../../shared/interface/promotion';
import { PromotionService } from './../../../shared/service/promotion.service';


@Component({
  selector: 'app-showPromotion',
  templateUrl: './showPromotion.component.html',
  styleUrls: ['./showPromotion.component.scss']
})
export class ShowPromotionComponent implements OnInit {

  dataSource: Promotion[];
  errorMessage: String;

  constructor(
    private PromotionService: PromotionService,

  ) { }

  ngOnInit() {
    this.PromotionService.getPromotion().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
  }

}
