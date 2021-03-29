<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\product;
use App\productType;
use App\promotion;
use DB;

class PromotionController extends Controller
{

    public function getPromotion()
    {
        $getall = promotion::all();
        return response()->json($getall,200); 
    }

    //ใช้คำนวนส่วนลดในตะกร้าสินค้า
    public function getCartPromotion()
    {
        $getall = promotion::where('status', 1)->get();  
        return response()->json($getall,200); 
    }

    public function getOnePromotion($request)
    {
        $getall = promotion::where('promotion_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function addPromotion(Request $request)
    {
        $new = new promotion;
        $new->promotion_name = $request->input('promotion_name');
        $new->detail = $request->input('detail');
        $new->unit = $request->input('unit');
        // $new->status = $request->input('status');
        $new->cost_condidtion = $request->input('cost_condidtion');               
        $new->save();
        return response()->json(['newitem'=>$new],201);
    }

    public function deletePromotion($request)
    {
        $promotion = promotion::where('promotion_id', $request);
            if($promotion)
                $promotion->delete(); 
            else
            return response()->json(['promotion not found']);
        return response()->json(['deleted']); 
    }

    public function editPromotion(Request $request, promotion $promotion)
    {       
        $edit = promotion::where('promotion_id', $request->promotion_id)->first();
        $edit->promotion_name = $request->input('promotion_name');
        $edit->detail = $request->input('detail');
        $edit->unit = $request->input('unit');
        // $edit->status = $request->input('status');
        $edit->cost_condidtion = $request->input('cost_condidtion');
        $result = $edit->save();
    }

    public function editPromotionStatus(Request $request){
        try {
            foreach ($request->all() as $key => $data ) {                
                $input = [               
                    'status' => $data['status'],
                ];
                DB::table('promotion')->where('promotion_id',$data['promotion_id'])->update($input);
            }             
            return response()->json(true,200); 
        }
        catch(\Exception $e){
            return response()->json($e,500); 
        }
    }


}