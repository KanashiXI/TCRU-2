<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\shipping;
use App\shippingBrand;
use App\transportation;
use App\order;
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
        $getall = order::all();
        return response()->json($getall,200); 
    }

    public function getOneShipping($request)
    {
        $getall = shipping::where('shipping_id', $request)->get();  
        return response()->json($getall,200); 
    }
}