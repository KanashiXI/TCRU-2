export interface OrderInterface {
    chooseAddress: boolean;
    order_id?: number;
    order_date?: number;
    require_date?: string;
    price?: number;
    status_id?: number;
    status_name?: string;
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
    userfirstname?: string;
    userlastname?: string;
    shipfirstname?: string;
    shiplastname?: string;
    address?: string;
    subdistrict?: string;
    district?: string;
    province?: string;
    postal_code?: string;
    telephone?: string;
    id?: string;
    detail_id?: number;
    product_name?: string;
    quantity?: number;
    retail_price?: number;
    image?: string;
    
}