<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\lotp;
class lotpControlle extends Controller
{
    function getlotp(Request $request){
       
            $product_id = $request->product_id;
            $lotpModel=new lotp();
            $data=$lotpModel->getlotp($product_id);
            return response()->json($data);
        
    }
    public function getlotp1()
    {
        $lotpModel = new lotp();
        $data =  $lotpModel->getsupplier();
        return response()->json($data); 
    }
    public function addlotp(Request $request)
    {
        
        $lotpModel = new lotp();
        $data =  $lotpModel->addlotp($request->all());
    }
    // public function getOnesupplier(Request $request)
    // {
    //     $id=$request->id;
    //     $lotpModel = new lotp();
    //     $data =  $lotpModel->getOnesupplier($id);
    //     return response()->json($data); 
    // }
    // public function updatesupplier(Request $request, $id)
    // {
    //     $id=$request->id;
    //     $lotpModel = new lotp();
    //     $lotpModel->updatesupplier($id,$request->all());
    //     return response()->json([ 'id' => $id]);
    // }
    // public function destroys(Request $request)
    // {
    //     $id=$request->id;
    //     $lotpModel = new lotp();
    //     $lotpModel->deletesupplier($id);
    //     return response()->json([ 'id' => $id]);
    // }

    

}
