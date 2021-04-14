import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-slipupload',
  templateUrl: './slipupload.component.html',
  styleUrls: ['./slipupload.component.css']
})
export class SlipuploadComponent {



  constructor(
    private cartService: CartService,
  ) { }


  files: File = null;

  onFileSelected(event) {
    this.files = <File>event.target.files[0];
  }


  imageUpload() {
    const requestData = {
      ...Subject,
      order_id: localStorage.getItem('order_id'),
    }

    const formdata = new FormData();
    formdata.append('image', this.files, this.files.name);
    formdata.append('order_id', requestData.order_id);
    // if (event.target.files.length > 0) {
    //   const reader = new FileReader();
    //   let formdata = new FormData();
    //   formdata.append(event.target.files[0], requestData.order_id);
    //   console.log("reader is " + event.target.files[0])
    //   reader.onload = (e) => {
    this.cartService.uploadSlip(formdata).subscribe();
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    // }

  }

  // onClickUpload() {
  //   let formdata = new FormData();
  //   formdata.append("file", this.files, this.files.name);
  //   this.cartService.addOrder(formdata).subscribe()
  // }
}
