<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\customer;
class CustomerController2 extends Controller
{

    function getcustomer1(Request $request)
    {
         
         
          $skip = $request->skip;
          $limit = $request->limit;
          $customerModel = new customer();
          $data =  $customerModel->getcustomer1($skip,$limit);
          $totalCount = $customerModel->getTotalcustomer();
          $response["data"] = $data;
          $response["totalRecord"] = $totalCount;
          return response()->json($response);
    }
    public function getOnecustomer(Request $request)
    {
        $id=$request->customer_id;
        $customerModel = new customer();
        $data =  $customerModel->getOnecustomer($id);
        return response()->json($data); 
    }

    public function updatecustomer(Request $request, $id)
    {
        $id=$request->customer_id;
        $customerModel = new customer();
        $customerModel->updatecustomer($id,$request->all());
        return response()->json([ 'id' => $id]);
    }

    public function destroy(Request $request)
    {
        $id=$request->customer_id;
        $customerModel = new customer();
        $customerModel->deletecustomer($id);
        return response()->json([ 'id' => $id]);
    }

}
