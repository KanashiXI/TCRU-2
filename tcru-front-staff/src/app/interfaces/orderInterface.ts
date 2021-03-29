export interface OrderInterface {
    order_id?: number;
    order_date?: number;
    require_date?: string;
    price?: number;
    status?: number;
    user_id?: number;
    net_amount?: number;
    total_price?: number;
    promotion_id?: number;
    discount?: number;
    request_tax?: number;
    address_id?: number;
    shipping_number?: string;
    shipping_brand?: number;
    send_date?: Date;
    estimate?: number;
    shipping_price?: number;
}