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

    public static get getShippingAddressURL(): string {
        return '/api/getShippingAddress';
    }

    public static get getSlipURL(): string {
        return '/api/getslip';
    }

    public static get getOneStatusURL(): string {
        return '/api/getselectedstatus';
    }

    public static get addInstructionURL(): string {
        return '/api/addinstruction';
    }

    public static get getInstructionURL(): string {
        return '/api/getinstruction';
    }

    public static get deleteInstructionURL(): string {
        return '/api/deleteinstruction';
    }    
    
    public static get getOneInstructionURL(): string {
        return '/api/getoneinstruction';
    }    
    
    public static get editInstructionURL(): string {
        return '/api/editinstruction';
    }

    public static get addFaqURL(): string {
        return '/api/addfaq';
    }

    public static get getFaqURL(): string {
        return '/api/getfaq';
    }    
    
    public static get deleteFaqURL(): string {
        return '/api/deletefaq';
    } 
}