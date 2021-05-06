<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\shipping;
use App\shippingBrand;
use App\transportation;
use App\order;
use App\status;
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
        // $getall = order::all();
        // return response()->json($getall,200); 

        $getall = DB::table('order')
            // ->join('order', 'order.order_id', '=', 'shipping.order_id')
            // ->join('users', 'users.id', '=', 'order.user_id')
            ->join('status', 'status.id', '=', 'order.status')
            ->select('order.order_id', 'order.order_date', 'order.user_id', 
                    'order.shipping_number', 'order.send_date', 'order.shipping_price', 'order.estimate',
                    'status.id as status_id','status.name as status_name')
            // ->where('order.order_id', $request)
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
            // ->where('order.order_id', $request)
            ->groupBy('order.order_id')
            ->get(); 
        return response()->json($getall,200);
    }

    public function getOneShipping($request)
    {
        // $getall = order::where('order_id', $request)->get();  
        // return response()->json($getall,200);

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
            ->select('order.order_id', 'users.firstname as userfirstname', 'users.lastname as userlastname',
            'address.firstname as shipfirstname', 'address.lastname as shiplastname', 'address.address',
            'address.telephone as telephone',
            'provinces.name_th as province', 'amphures.name_th as district', 'districts.name_th as subdistrict',
            'address.postal_code as postal_code',
            'status.name as status_name',
            'order_detail.order_detail_id as detail_id', 'order_detail.product_quantity as quantity', 'order_detail.retail_price as retail_price',
            'product.product_name as product_name')
            
            ->where('order.order_id', $request)
            // ->groupBy('order.order_id')
            ->get(); 
        return response()->json($getall,200); 
    }

    public function editStatus(Request $request, order $order)
    {       
        $edit = order::where('order_id', $request->order_id)->first();
        $edit->status=$request->status;
        $result = $edit->save();
    }

    public function getOneStatus($request) {
        // $getStatus = order::where('order_id', $request->order_id)->first();
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
}