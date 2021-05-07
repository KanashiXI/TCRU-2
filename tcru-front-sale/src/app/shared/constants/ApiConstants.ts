export class ApiConstants {
    public static get baseURl(): string {
        return 'http://127.0.0.1:8000';
    }
    public static get provinceURl(): string {
        return '/api/province';
    }
    public static get aumphureURl(): string {
        return '/api/amphures';
    }
    public static get districtURl(): string {
        return '/api/districts';
    }
    public static get daddressURl(): string {
        return '/api/shipaddress';
    }
    public static get editressURl(): string {
        return '/api/editshipaddress';
    }
    public static get getoneaddressURL(): string {
        return '/api/oneaddress';
    }
    public static get gettaxURL(): string {
        return '/api/tax';
    }
    public static get getonetaxURL(): string {
        return '/api/onetax';
    }
    public static get edittaxURL(): string {
        return '/api/edittax';
    }

    public static get productURL(): string {
        return '/api/product';
    }
    public static get productTypeURL(): string {
        return '/api/producttype';
    }

    public static get productdetailURL(): string {
        return '/api/productdetail';
    }

    public static get getcartproductURL(): string {
        return '/api/cartlist';
    }

    public static get searchcartproductURL(): string {
        return '/api/searchproduct';
    }

    public static get addproductcartURL(): string {
        return '/api/addproductcart';
    }
    public static get addmoreproductcartURL(): string {
        return '/api/editproduct';
    }
    public static get deleteproductcartURL(): string {
        return '/api/deleteproduct';
    }
    public static get getCartPromotionURL(): string {
        return '/api/cartpromotion';
    }
    public static get getHotProductURL(): string {
        return '/api/hotproduct';
    }
    public static get checkoutCartURL(): string {
        return '/api/cartcheckout';
    }
    public static get getPromotionURL(): string {
        return '/api/promotion';
    }
    public static get orderURL(): string {
        return '/api/order';
    }
    public static get deleteFromCartURL(): string {
        return '/api/deletefromcart';
    }
    public static get editAddStatusURL(): string {
        return '/api/editAddStatus';
    }

    public static get orderDetailURL(): string {
        return '/api/selectOrder';
    }

    public static get shippingBrandURL(): string {
        return '/api/getShippingBrand';
    }

    public static get shippingCostURL(): string {
        return '/api/gettransport';
    }

    public static get uploadSlipURL(): string {
        return '/api/uploadslip';
    }

    public static get getSlipURL(): string {
        return '/api/getslip';
    }

    public static get getcouponURL(): string {
        return '/api/getcoupon';
    }
    public static get editTaxStatusURL(): string {
        return '/api/editTaxStatus';
    }





    public static get getshippointURL(): string {
        return '/api/getshippoint';
    }


}