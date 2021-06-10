<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\shipping;
use App\shippingBrand;
use App\transportation;
use App\order;
use App\status;
use App\coupon;
use App\users;
use DB;

class ShippingController extends Controller {

    public function getDetailShipping($request)
    {
        $getall = DB::table('order')
            ->join('order', 'order.order_id', '=', 'shipping.order_id')
            ->join('address', 'address.address_id', '=', 'order.address_id')
            ->join('provinces', 'provinces.id', '=', 'address.province_id')
            ->join('amphures', 'amphures.province_id', '=', 'provinces.id')
            ->join('districts', 'districts.amphure_id', '=', 'amphures.id')
            ->join('shipping_brand', 'shipping_brand.shipping_brand_id', '=', 'shipping.shipping_brand_id')
            ->select('shipping.shipping_id','shipping.number')
            ->where('order.order_id', $request)
            ->groupBy('order.order_id')
            ->get(); 
        return response()->json($getall,200); 
    }

    public function getTranspotationCost()
    {
        $getall = transportation::all();
        return response()->json($getall,200); 
    }

    public function getShippingBrand()
    {
        $getall = shippingBrand::all();
        return response()->json($getall,200); 
    }

    public function getShippingOrder()
    {
        $getall = DB::table('order')
            ->join('status', 'status.id', '=', 'order.status')
            ->select('order.order_id', 'order.order_date', 'order.user_id', 'order.image',
                    'order.shipping_number', 'order.send_date', 'order.shipping_price', 'order.estimate',
                    'status.id as status_id','status.name as status_name')
            ->groupBy('order.order_id')
            ->get(); 
        return response()->json($getall,200);
    }

    public function getShippingAddress()
    {
        $getall = DB::table('order')
            ->join('status', 'status.id', '=', 'order.status')
            ->join('address', 'address.address_id', '=', 'order.address_id')
            ->join('provinces', 'provinces.id', '=', 'address.province_id')
            ->join('amphures', 'amphures.id', '=', 'address.amphures_id')
            ->join('districts', 'districts.id', '=', 'address.districts_id')
            ->select('order.order_id', 'order.address_id', 'address.firstname', 'address.lastname',
                    'address.address', 'address.telephone as telephone',
                    'provinces.name_th as province', 'amphures.name_th as district', 'districts.name_th as subdistrict',
                    'address.postal_code as postal_code')
            ->groupBy('order.order_id')
            ->get(); 
        return response()->json($getall,200);
    }

    public function getOneStatus($request) {
        $getStatus = DB::table('order')
            ->join('status', 'status.id', '=', 'order.status' )
            ->select('status.name')
            ->where('order.order_id', $request)
            ->get(); 
        return response()->json($getStatus,200);
    }

    public function getStatus() {
        $getall = status::all();
        return response()->json($getall,200);
    }

    public function getOneShipping($request)
    {
        $getall = DB::table('order')
            ->join('users', 'users.id', '=', 'order.user_id')            
            ->join('order_detail', 'order_detail.order_id', '=', 'order.order_id')
            ->join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->join('address', 'address.address_id', '=', 'order.address_id')
            ->join('provinces', 'provinces.id', '=', 'address.province_id')
            ->join('amphures', 'amphures.id', '=', 'address.amphures_id')
            ->join('districts', 'districts.id', '=', 'address.districts_id')
            ->join('shipping_brand', 'shipping_brand.shipping_brand_id', '=', 'order.shipping_brand')
            ->join('status', 'status.id', '=', 'order.status')
            ->select('order.promotion_id', 'order.net_amount', 'order.user_id', 'order.order_id', 'order.shipping_number', 'order.send_date',
            'users.firstname as userfirstname', 'users.lastname as userlastname',
            'address.firstname as shipfirstname', 'address.lastname as shiplastname', 'address.address',
            'address.telephone as telephone',
            'provinces.name_th as province', 'amphures.name_th as district', 'districts.name_th as subdistrict',
            'address.postal_code as postal_code',
            'status.name as status_name',
            'order_detail.order_detail_id as detail_id', 'order_detail.product_quantity as quantity', 'order_detail.retail_price as retail_price',
            'product.product_name as product_name')         
            ->where('order.order_id', $request)
            ->get(); 
        return response()->json($getall,200); 
    }

    public function getCouponByUserId($request)
    { 
        $getall = DB::table('coupon')
            ->select('*')
            ->where('coupon.user_id', $request)
            ->where('coupon.coupon_status', 0)
            ->get(); 
        return response()->json($getall,200);
    }

    public function getShipPoint($request)
    {
        $getall = DB::table('users')
            ->select('users.shopping_point')
            ->where('users.id', $request)
            ->get(); 
        return response()->json($getall,200);
    }

    public function editStatus(Request $request, order $order)
    {       
        $edit = order::where('order_id', $request->order_id)->first();
        $edit->status=$request->status;
        $edit->shipping_number=$request->shipping_number;
        $edit->send_date=$request->send_date;
        $result = $edit->save();
        $statusValue = $request->status;
        $promotionId = $request->promotion_id;
        $netAmount = DB::table('order')
            ->select( 'net_amount')
            ->where('order_id', $request->order_id)
            ->get()
            ->pluck('net_amount');     
        $getUserShopPoint = DB::table('users')
            ->select( 'shopping_point')
            ->where('users.id', $request->user_id)
            ->get()
            ->pluck('shopping_point');    
        if((int)$getUserShopPoint[0] <= 10000 && $statusValue == "1" && $promotionId == 0){
            $editShopPoint=(int)$getUserShopPoint[0]+(int)$netAmount[0];
            if($editShopPoint >= 10000 ){
                $newShopPoint = $editShopPoint - 10000;
                $savePoint = users::where('id', $request->user_id)->first();
                $savePoint->shopping_point=$newShopPoint;
                $result = $savePoint->save();
                $length = 20;
                // generate coupon    
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < $length; $i++) {
                    $randomString .= $characters[rand(0, $charactersLength - 1)];
                }
                $data = new coupon;
                $data->key = $randomString;
                $data->coupon_status = 0;
                $data->user_id = $request->user_id;
                $data->save();
            }else{
                $savePoint = users::where('id', $request->user_id)->first();
                $savePoint->shopping_point=$editShopPoint;
                $result = $savePoint->save();      
            }
        }
        return response()->json($promotionId); 
    }

}