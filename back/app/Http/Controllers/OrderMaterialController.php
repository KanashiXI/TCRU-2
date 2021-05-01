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

    public function addOrderMaterials(Request $request)
    {
        $orderMaterialModel = new OrderMaterials();
        $data = $orderMaterialModel->addOrderMaterials($request->all());
    }

    public function destroys(Request $request)
    {
        $id = $request->order_material_id;
        $orderMaterialModel = new OrderMaterials();
        $orderMaterialModel->deleteOrderMaterails($id);
        return response()->json(['id' => $id]);
    }

    public function getunit_material()
    {
        $orderMaterialModel = new OrderMaterials();
        $data = $orderMaterialModel ->getunit_material();
        return response()->json($data);
    }
}

