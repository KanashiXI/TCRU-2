import { ShowTaxAddressComponent } from './../../user/taxinvoice/showTaxAddress/showTaxAddress.component';
import { ShowaddressComponent } from './../../user/showaddress/showaddress.component';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Promotion } from 'src/app/shared/interface/promotion';
import { CartDataSource, CartItem } from './cart-datasource';
import { Product } from '../shopview/interfaces/product';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/shared/service/cart.service';
import { ShippingBrand } from 'src/app/shared/interface/shipping-brand';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { Address } from '../../user/addaddress/interfaces/address';
import { AddressService } from '../../user/addaddress/services/address.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Shippingcost } from './../../../shared/interface/shippingcost';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  cartStatus: boolean = false;
  checked: boolean = false;
  counter: number = 0;
  cartItem = [];
  cartTotal: number = 0;
  productInCart: Product[] = [];
  promotionData: Promotion[] = [];
  promotionNumber: number;
  discribePromotion: String;
  promotionId: number;
  isGotPromotion: boolean = false;
  totalPrice: number;
  discount: number;
  condition: number;
  gun: string;
  selectItem: Product[] = [];
  tempSelect: Product[] = [];
  selectItemForDelete: Product[] = [];
  arr: any[] = [];
  value = 0;
  reactiveForm: FormGroup;
  dataForm: Product;
  step: Number = 1;
  shippingAddressList: Address[] = [];
  dataSource: Address[] = [];
  statusAddIsNull: boolean;
  editProductQuantityForm: FormGroup;
  loadUpdateCart: boolean = false;
  isSelectProduct: boolean = false;
  taxCheck: boolean = false;
  panelOpenState = false;
  shippingBrand: ShippingBrand[] = [];
  shippingCost: Shippingcost[] = [];
  shippingData: Shippingcost[] = [];
  cartWeight: number;
  sumShippingCost: number = 0;
  @ViewChild('htmlData') htmlData: ElementRef;
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];
  constructor(
    private router: Router,
    private addressService: AddressService,
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private overlay: Overlay

  ) { }

  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('product.pdf');
    });
  }

  ngOnInit() {
    console.log(this.selectItem.values())
    const requestData = {
      ...Subject,
      customerUsername: localStorage.getItem('user_id'),
    }
    this.getUserAddress(requestData.customerUsername)
    // customerUsername: localStorage.getItem('user_id'),
    this.createForm(requestData.customerUsername);
    this.queryCartProduct(requestData.customerUsername);
    this.getCartPromotion();
    this.getShippingBrand();
    this.getShippingCost();
  }

  getShippingBrand() {
    this.cartService.getShippingBrand().subscribe(data => {
      this.shippingBrand = data;
    });
  }

  getShippingCost() {
    this.cartService.getShippingCost().subscribe(data => {
      this.shippingCost = data;
    });
  }

  handleRadio(i): void {
    this.shippingBrand.forEach((item) => {
      item.status = 0;
    });
    var x = i
    this.shippingBrand[x].status = 1;
    this.filterShippingCost(this.shippingBrand[x].shipping_brand_id)
  }

  filterShippingCost(brandId) {
    this.shippingData = this.shippingCost.filter((value) => {
      return value.shipping_brand_id == brandId;
    })
  }


  getUserAddress(user_id) {
    this.addressService.getShippingAddress(user_id).subscribe(data => {
      this.shippingAddressList = data;
      this.filterAdd();
      if (this.shippingAddressList.length < 1) {
        this.statusAddIsNull = true;
      } else {
        this.statusAddIsNull = false;
      }
    });
  }

  filterAdd() {
    this.dataSource = this.shippingAddressList.filter((value, index) => {
      return value.status == 1;
    });
    this.reactiveForm.patchValue({
      address_id: this.dataSource[0].address_id,
    })
  }

  changestatusCart() {
    this.cartStatus = true;
  }

  backstatusCart() {
    // this.cartStatus = false;
    // this.router.navigateByUrl('');
  }

  createForm(uId) {
    this.reactiveForm = this.fb.group({
      order_id: ['',],
      user_id: ['',],
      net_amount: ['',],
      total_price: ['',],
      promotion_id: ['',],
      discount: ['',],
      request_tax: ['',],
      address_id: [''],
    })

    this.reactiveForm.patchValue({
      user_id: uId,
    })

    this.editProductQuantityForm = this.fb.group({
      retail_price: [''],
      product_id: [''],
      product_quantity: [''],
      user_id: [''],
    })
  }

  checkoutCart() {
    if (this.isSelectProduct) {
      this.cartService.checkoutCart(this.selectItem).subscribe(
        res => {
          this.dataForm = res;
          this.reactiveForm.patchValue({
            order_id: this.dataForm,
            request_tax: this.taxCheck
            ///////////////////////////////////////////////////////////////////////////////////////////////////
          });
          this.cartService.addOrder(this.reactiveForm.getRawValue()).subscribe(
            res => {
              this.cartService.deleteFromCart(this.selectItem).subscribe();
              Swal.fire({
                icon: 'success',
                title: 'ทำรายการสำเร็จ',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigateByUrl('/order');
              // this.ngOnInit()
            }, err => {
              Swal.fire({
                icon: 'error',
                title: 'ทำรายการไม่สำเร็จ',
                showConfirmButton: false,
                timer: 2000
              });
            }
          );
          this.ngOnInit()
        },
        error => {
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'โปรดเลือกรายการ',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }



  changeSelection() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    console.log()
    this.selectItem = this.productInCart.filter((value, index) => {
      return value.checked;
    });
  }

  getCartPromotion() {
    this.cartService.getCartPromotion().subscribe(res => {
      this.promotionData = res;
      this.promotionNumber = this.promotionData[0].unit;
      this.discribePromotion = this.promotionData[0].detail;
      this.condition = this.promotionData[0].cost_condidtion;
      this.promotionId = this.promotionData[0].promotion_id;
    })
  }

  queryCartProduct(user_id) {
    this.cartService.getCartItemList(user_id).subscribe(res => {
      this.productInCart = res;
      this.editProductQuantityForm.patchValue({
        user_id: user_id,
      })
    })
  }

  remove(id: string) {

    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ ใช่ หรือ ไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then((result) => {
      if (result.value) {
        this.cartService.remove(id).subscribe(res => {

          Swal.fire(
            'ลบข้อมูลเรียบร้อย',
            '',
            'success',
          )
          this.ngOnInit()

          //dialog ลบสำเร็จ
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })


  }

  ngAfterContentChecked() {
    this.cartTotal = 0;
    this.cartWeight = 0;
    this.selectItem.map((obj) => {
      this.cartTotal += Number(obj.retail_price);
      this.cartWeight += (Number(obj.weight) * Number(obj.product_quantity))
    });
    console.log('weight' + this.cartWeight)
    if (this.cartTotal > 0) {
      this.isSelectProduct = true;
    } else {
      this.isSelectProduct = false;
    }
    // console.log(this.isSelectProduct)

    this.totalPrice = this.cartTotal;
    if (this.promotionNumber > 0 && this.totalPrice >= this.condition) {
      this.isGotPromotion = true;
      this.discount = (this.cartTotal * (this.promotionNumber / 100))
      this.calculateShippingCostByWeight(this.cartWeight)
      this.cartTotal = (this.cartTotal - this.discount) + Number(this.sumShippingCost);

      this.reactiveForm.patchValue({
        discount: this.discount,
        net_amount: this.cartTotal,
        promotion_id: this.promotionId,
        total_price: this.totalPrice,
      })

    } else {
      this.isGotPromotion = false;
      this.calculateShippingCostByWeight(this.cartWeight)

      this.reactiveForm.patchValue({
        discount: this.discount,
        net_amount: this.cartTotal,
        promotion_id: 0,
        total_price: this.totalPrice
      })
    }
  }

  calculateShippingCostByWeight(cartWeight) {
    this.shippingData.sort((a, b) => a.weight_condition - b.weight_condition);

    this.shippingData.filter((value) => {
      if (Number(cartWeight) <= Number(value.weight_condition)) {
        this.sumShippingCost = value.transportation_cost

      }
    })
    // console.log('---------' + this.sumShippingCost)
  }

  updateCart() {
    this.loadUpdateCart = true;
    this.cartService.editQuantityProductInCart(this.editProductQuantityForm.getRawValue()).subscribe(res => {
      this.loadUpdateCart = false;
    });

  }

  handleMinus(cart) {
    if (cart.product_quantity > 1) {
      cart.product_quantity--;
      cart.retail_price -= cart.price_per_piece;
      this.editProductQuantityForm.patchValue({
        retail_price: cart.retail_price,
        product_id: cart.product_id,
        product_quantity: cart.product_quantity,
      })
    }

    this.updateCart();
  }

  handlePlus(cart) {
    cart.product_quantity++;
    const oddRetail = Number(cart.retail_price);
    const sumRetail = Number(cart.price_per_piece) + oddRetail;
    cart.retail_price = sumRetail;
    this.editProductQuantityForm.patchValue({
      retail_price: cart.retail_price,
      product_id: cart.product_id,
      product_quantity: cart.product_quantity,
    })
    this.updateCart();
  }

  openDialogAddress() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(ShowaddressComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }

  openDialogTax() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(ShowTaxAddressComponent, {
      autoFocus: false,
      scrollStrategy,
      maxHeight: '90vh',
      maxWidth: '130vh'
    });
  }

}
