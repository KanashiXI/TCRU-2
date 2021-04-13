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

    public function getorderMaterialsSkipAndLimit(Request $request)
    {
        $skip = $request->skip;
        $limit = $request->limit;
        $orderMaterialModel = new OrderMaterials();
        $data = $orderMaterialModel->getOrderMaterialsSkipAndLimit($skip, $limit);
        $totalCount = $orderMaterialModel->getTatalOrderMaterials();
        $response["data"] = $data;
        $response["totalRecord"] = $totalCount;
        return response()->json($response);
    }

    public function getOneOrderMaterials(Request $request)
    {
        $id = $request->order_material_id;
        $orderMaterialModel = new OrderMaterials();
        $data = $orderMaterialModel->getOneOrderMaterials($id);
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

    public function destroys(Request $request)
    {
        $id = $request->order_material_id;
        $orderMaterialModel = new OrderMaterials();
        $orderMaterialModel->deleteOrderMaterails($id);
        return response()->json(['id' => $id]);
    }
}

