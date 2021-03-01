<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\order;
use App\orderDetail;
use DB;

class OrderController extends Controller
{
    public function createShippingAddress(Request $request)
    {      
         
        // orderDetail::create(array_merge($request->all(), ['index' => 'value'])); 
        // $addorder = new order;
        // $addorder->user_id = $request->input('user_id');               
        // $addorder->save();

        // foreach ($request as $key=>$value)
        // {
        //     $data[] = [
        //         'product_id' => $value['product_id'],
        //         'user_id' => $value['user_id'],
                
        //     ];
        // }

        // DB::table('order_datail')->insert($data); // Query Builder approach as you are using

        // return response()->json(['newitem'=>$data],201);
    }
}