export class ApiConstants {
    public static get baseURl(): string {
        return 'http://127.0.0.1:5000';
    }
    public static get getPromotionURL(): string {
        return '/api/promotion';
    }

    public static get addPromotionURL(): string {
        return '/api/addpromotion';
    }

    public static get deletePromotionURL(): string {
        return '/api/deletepromotion';
    }

    public static get editPromotionURl(): string {
        return '/api/editpromotion';
    }

    public static get editPromotionStatusURl(): string {
        return '/api/editpromotionstatus';
    }

    public static get getOnePromotionURL(): string {
        return '/api/onePromotion';
    }

    public static get getShippingOrderURL(): string {
        return '/api/getShippingOrder';
    }

    public static get getOneShippingURL(): string {
        return '/api/getOneShipping';
    }
    
    public static get getStatusURL(): string {
        return '/api/getStatus';
    }

    public static get editStatusURL(): string {
        return '/api/editStatus';
    }
}