<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderMaterials;
use DB;

class OrderMaterialController extends Controller
{
    public function getorderMaterialsall()
    {
        $orderMaterialModel = new OrderMaterials();
        $data = $orderMaterialModel->getOrderMaterials();
        return response()->json($data);
    }

    // public function getorderMaterials()
    // {
    //     $getall = DB::table('order_material')
    //         ->join('supplier', 'supplier.id', '=', 'order_material.id')
    //         ->join('status_order', 'status_order.id', '=', 'order_material.status_order_id')
    //         ->select('order_material.order_material_id', 'order_material.status_order', 'order_material.start_date', 'order_material.end_date')
    //         ->where('order_material.order_material_id')
    //         ->groupBy('order_material.order_material_id')
    //         ->get(); 
    //         return response()->json($getall,200);
    // }

    public function postorderMaterials(Request $request)
    {
        $new = new orderMaterial;
        $new->supplier_name = $request->input('supplier_name');
        $new->start_date = $request->input('start_date');
        $new->end_date = $request->input('end_date');
        $new->status_order = $request->input('status_order');
        $new->material_name = $request->input('material_name');
        $new->detail = $request->input('detail');
        $new->quantity =$request->input('quantity');
        $new->sum_quantity = $request->input('sum_quantity');
        $new->price = $request->input('price');
        $new->sum_price = $request->input('sum_price');
        $new->order_name = $request->input('order_name');
        $new->save();
        return response()->json(['newitem'=>$new],200);
    }
}

