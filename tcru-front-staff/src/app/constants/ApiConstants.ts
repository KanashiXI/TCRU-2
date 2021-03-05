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
}