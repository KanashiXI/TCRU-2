<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\shipping;
use DB;

class ShippingController extends Controller {

    public function getDetailShipping($request)
    {
        $getall = DB::table('shipping')
            ->join('order', 'order.order_id', '=', 'shipping.order_id')
            ->join('address', 'address.address_id', '=', 'order.address_id')
            ->join('provinces', 'provinces.id', '=', 'address.province_id')
            ->join('amphures', 'amphures.province_id', '=', 'provinces.id')
            ->join('districts', 'districts.amphure_id', '=', 'amphures.id')
            ->join('shipping_brand', 'shipping_brand.shipping_brand_id', '=', 'shipping.shipping_brand_id')
            ->select('shipping.shipping_id','shipping.number')
            ->where('shipping.shipping_id', $request)
            ->groupBy('shipping.shipping_id')
            ->get(); 
        return response()->json($getall,200); 
    }

    public function getShippingOrder()
    {
        $getall = shipping::all();
        return response()->json($getall,200); 
    }

    public function getOneShipping($request)
    {
        $getall = shipping::where('shipping_id', $request)->get();  
        return response()->json($getall,200); 
    }
}