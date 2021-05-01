import { Component, OnInit } from '@angular/core';
import { PromotionInteface } from '../interfaces/promotioninterface';
import { PromotionService } from './../../../Service/promotion.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-showPromotion',
  templateUrl: './showPromotion.component.html',
  styleUrls: ['./showPromotion.component.css']
})
export class ShowPromotionComponent implements OnInit {

  dataSource: PromotionInteface[];
  errorMessage: String;
  dataForm: PromotionInteface;
  toggleChecked: number;


  constructor(
    private PromotionService: PromotionService,

  ) { }

  handleToggle(i): void {
    // this.dataSource.forEach((item) => {
    //   item.status = 0;
    // });
    var x = i
    this.dataSource[x].status = 1;
    this.PromotionService.editPromotionStatus(this.dataSource).subscribe();
  }

  ngOnInit() {
    this.PromotionService.getPromotion().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
  }

  onClickDelete(data) {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ ใช่ หรือ ไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then((result) => {
      if (result.value) {
        this.PromotionService.deletePromotion(data).subscribe()
        Swal.fire(
          'ลบข้อมูลเรียบร้อย',
          '',
          'success',
        )
        this.ngOnInit() 
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    }) 
  }

  onClickSubmit(data) {
    this.PromotionService.nextMessage(data);
    localStorage.setItem("promotion_id", data);
  }


}
