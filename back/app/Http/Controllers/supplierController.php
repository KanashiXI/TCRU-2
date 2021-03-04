<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\supplier;
class SupplierController extends Controller
{
    public function getsupplier1()
    {
        $supplierModel = new supplier();
        $data =  $supplierModel->getsupplier();
        return response()->json($data); 
    }
    public function addsupplier(Request $request)
    {
        
        $supplierModel = new supplier();
        $data =  $supplierModel->addsupplier($request->all());
    }
    public function getOnesupplier(Request $request)
    {
        $id=$request->id;
        $supplierModel = new supplier();
        $data =  $supplierModel->getOnesupplier($id);
        return response()->json($data); 
    }
    public function updatesupplier(Request $request, $id)
    {
        $id=$request->id;
        $supplierModel = new supplier();
        $supplierModel->updatesupplier($id,$request->all());
        return response()->json([ 'id' => $id]);
    }
    public function destroys(Request $request)
    {
        $id=$request->id;
        $supplierModel = new supplier();
        $supplierModel->deletesupplier($id);
        return response()->json([ 'id' => $id]);
    }
}
