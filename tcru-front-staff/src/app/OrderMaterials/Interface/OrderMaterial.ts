export interface OrderMaterial {
    order_material_id: number;
    shop_name: string;
    contact_person: string;
    phone_contact_person: string;
    order_name: string;
    address: Text;
    start_date?: any;
    end_date?: any;
    material_name: string;
    detail: Text;
    quantity: number;
    price: number;
    discount: number;
    vat: number;
    sum_quantity: number;
    sum_price: number;
}