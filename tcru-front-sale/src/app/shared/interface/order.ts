export interface Order {
    order_id?: number;
    order_date?: string;
    require_date?: any;
    status?: number;
    user_id?: number;
    updated_at?: string;
    created_at?: string;
    net_amount?: string;
    total_price?: string;
    promotion_id?: number;
    discount?: string;
    request_tax?: number;
    address_id?: number;
    address?: String;
    telephone?: String;
    firstname?: String;
    lastname?: String;
    district?: String;
    amphures?: String;
    province?: String;
    postal_code?: String;
    image?: string;
}
