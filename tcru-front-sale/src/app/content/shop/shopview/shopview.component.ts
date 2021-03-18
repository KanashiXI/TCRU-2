import { ProductDetailComponent } from './../productDetail/productDetail.component';
import { Component, Injectable, OnInit } from '@angular/core';
import { Product } from './interfaces/product';
import { ProductviewService } from './services/productview.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-shopview',
  templateUrl: './shopview.component.html',
  styleUrls: ['./shopview.component.css']
})

@Injectable()
export class ShopviewComponent implements OnInit {

  activeIndex: number = 0;

  errorMessage: String;
  productList: Product[];
  products: Product[];
  sortOrder: number;
  sortField: string;

  typeList: Product[] = [];
  productOnfilter: Product[] = [];
  hotProduct: Product[] = [];
  hotProductList: Product[] = [];

  loader: boolean = false;
  allProduct: boolean = false;
  typeLoader: boolean = false;
  listHotProduct: Product[] = [];
  slides = [
    { 'image': 'https://i.imgur.com/O9UeG0P.jpg'},
    { 'image': 'https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/126976613_393904472025324_8066580742924449164_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8bfeb9&_nc_eui2=AeG1gMYW7EmTNItMg-R-SDAqJ4f9skLfVvonh_2yQt9W-iDye1obfDvk42NLEkf23zFiMxjYI5qoX5BMFhn3ogy_&_nc_ohc=4Hh-pm5lWrwAX-B-vHV&_nc_ht=scontent.fbkk5-6.fna&oh=422ea4fe48d2eaa512253e4ac0bc5ffd&oe=60779CC4' },
    { 'image': 'https://scontent.fbkk14-1.fna.fbcdn.net/v/t1.0-9/121576561_361953951887043_4380031649996676986_n.jpg?_nc_cat=104&ccb=3&_nc_sid=8bfeb9&_nc_eui2=AeG6Tuh8ubarUyTpOHKPebe8IC4-OI9EXZEgLj44j0RdkXLm2UwuPQz6jD1SKkz4V6TZArVH89_g5B2y-PYf2r4D&_nc_ohc=narQFWrDQ7MAX9VUerS&_nc_oc=AQln8gkeeTrf5En89x_foSdfnyuyTrNOPkcHeFVtRxtECfkfMOEVasinhJx7mn69bg0&_nc_ht=scontent.fbkk14-1.fna&oh=076170196e675e4453f1165fcb228fff&oe=6066221D' },
    { 'image': 'https://scontent.fbkk14-1.fna.fbcdn.net/v/t1.0-9/120489323_347720516643720_8228968719966987857_o.jpg?_nc_cat=106&ccb=3&_nc_sid=8bfeb9&_nc_eui2=AeGVsG7EBGrgmCcmNTJbqH_1_m5zUfOMt1P-bnNR84y3Uy0Q4GTjGeWkKWw1f_nqbMvMKVqlAKDAPmfZrSrI251y&_nc_ohc=8n-JWeksCG8AX_0s1Nb&_nc_ht=scontent.fbkk14-1.fna&oh=446d63696c9dc743d753d369a95fdbca&oe=60653DF0' },
    
  ];


  // foods: Food[] = [
  //   { value: 'steak-0', viewValue: 'Steak' },
  //   { value: 'pizza-1', viewValue: 'Pizza' },
  //   { value: 'tacos-2', viewValue: 'Tacos' }
  // ];

  constructor(
    private productViewService: ProductviewService,
    public dialog: MatDialog,
    private overlay: Overlay,
  ) { }

  ngOnInit() {

    this.productViewService.getProductType().subscribe(
      res => {
        this.typeList = res;
        this.typeLoader = true;
        this.productViewService.getProduct().subscribe(
          res => {
            this.productList = res;
            this.listHotProduct = res;
            this.onClickSelectType(0);
            this.allProduct = true;
          },
          error => this.errorMessage = <any>error
        )
      }
    )

    this.productViewService.getHotProducte().subscribe(
      res => {
        this.hotProduct = res;
        // this.hotProduct.sort(function (a, b) {
        //   return b.count - a.count;
        // });
        // this.hotProductList = res;

        // this.listHotProduct.forEach((element) => {
        //   this.hotProductList = this.hotProductList.filter((element1) => {
        //     return element1 == element;
        //   })
        // })
        this.loader = true;


        // this.hotProductList.forEach((element) => {
        //   this.productList = this.productList.filter((element1) => {
        //     return element1 == element;
        //   })
        // })

        // var newList = this.productList.filter(function (word) {
        //   // console.log(this.productList, this.hotProductList)
        //   return this.hotProductList.includes(word);
        // })
        // console.log(newList);

        // for (let index = 0; index < this.productList.length; index++) {
        //   for (let indexH = 0; indexH < this.hotProductList.length; indexH++) {
        //     if (this.productList[index].product_id == this.hotProductList[indexH].product_id) {
        //       console.log(this.productList[index].product_id, '---', this.productList[index].product_id)
        //     }
        //   }
        // }

        // this.sortProduct();       
        // this.listHotProduct = this.productList.filter((value) => {
        //   return value.product_id == this.hotProductList[].product_id;

        //   console.log(this.listHotProduct)
        // });
        // this.hotProductList.map((obj) => {
        //   this.cartTotal == Number(obj.product_id);
        // });


      }
    )
  }




  // sortProduct() {
  //   this.productList.sort(function (a, b) {
  //     return a.count - b.count;
  //   });
  //   this.hotProductList = this.productList;
  // }

  onClickSubmit(product_id, retail_price) {
    localStorage.setItem("product_id", product_id);
    localStorage.setItem("retail_price", retail_price);
    this.openDialogAddress();

  }

  openDialogAddress() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'

    });
  }

  onClickSelectType(index) {
    this.productOnfilter = this.productList.filter((element) => this.filterByType(element, index));
    console.log(this.productOnfilter)
  }

  filterByType(element, index) {
    return (element.product_type == this.typeList[index].product_type)
  }

  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  openDialog() {
    this.dialog.open(ProductDetailComponent);
  }

}
