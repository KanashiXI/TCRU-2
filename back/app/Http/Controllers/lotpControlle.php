<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producttcru;
use App\Models\lotp;
class lotpControlle extends Controller
{
    function getlotp(Request $request){
       
            $product_id = $request->product_id;
            $lotpModel=new lotp();
            $data=$lotpModel->getlotp($product_id);
            return response()->json($data);
        
    }
    public function getlotp11()
    {
        // $product_id = $request->product_id;
        $lotpModel=new lotp();
        $data=$lotpModel->getlotp11();
        return response()->json($data);
    }
    public function getlotp1()
    {
        $lotpModel = new lotp();
        $data =  $lotpModel->getsupplier();
        return response()->json($data); 
    }
    public function getstock_product()
    {
        $lotpModel = new lotp();
        $data =  $lotpModel->getstock_product();
        return response()->json($data); 
    }
    public function addlotp(Request $request)
    {
        
        $lotpModel = new lotp();
        $data =  $lotpModel->addlotp($request->all());
    }
    public function getOnelotp(Request $request)
    {
        $id=$request->product_id;
        $productModel = new lotp();
        $data =  $productModel->getOnelotp($id);
        return response()->json($data); 
    }

    

}
