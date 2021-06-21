<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\order;
use App\coupon;
use DB;

class CouponController extends Controller
{
    public function deleteCoupon($request)
    {
        $prod = coupon::where('coupon_id', $request);
            if($prod)
                $prod->delete(); 
            else
            return response()->json(['prod not found']);
        return response()->json(['deleted']); 
    }

    public function checkCoupon($request)
    {

        $getOrder = DB::table('users')
            ->join('order', 'order.user_id', '=', 'users.id')
            ->select( 'order_id', 'coupon_status')
            ->where('users.id', $request)
            // ->where('order.status', '>', 0)
            // ->where('order.check_for_coupon ','=', 1 )
            ->get(); 

        $getall = DB::table('users')
            ->join('order', 'order.user_id', '=', 'users.id')
            ->select( DB::raw('sum(order.net_amount) as sumnet'))
            ->where('users.id', $request)
            // ->where('order.status', '>', 0)
            // ->where('order.check_for_coupon ','=', 1 )
            ->get(); 
        // return response()->json($getall,200);
        $total = $getall[0]->sumnet;
        if($total >= 10000){
        $length = 20;
        // generate coupon    
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        $data = new coupon;
        $data->key = $randomString;
        $data->coupon_status = 0;
        $data->user_id = $request;
        $data->save();
        // $fillkey = coupon::where('user_id', $request)->first();
        // $result = $edit->save();
        //addCoupon()
        //changeStatusOrder() getorderId

        DB::beginTransaction();
        try {
            foreach($getOrder->all() as $key => $item){
                // $status['order_id']= 1;
                $status['coupon_status']= 1;
                $status->save();
            } 

            DB::commit();
            return response()->json('success',201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=>$e->getMessage()],500);
        }
        //
            // $voucher->code = $this->generateRandomString(6);
        }else{

        }
        return $total;    
    }

    // public  function generateRandomString($length = 20) {
    //     $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //     $charactersLength = strlen($characters);
    //     $randomString = '';
    //     for ($i = 0; $i < $length; $i++) {
    //         $randomString .= $characters[rand(0, $charactersLength - 1)];
    //     }
    //     return $randomString;
    // }
    

}



        //รับ object ของ order เข้ามา 

        // order status สถานะการชำระเงิน > 0 คือจ่ายเงินแล้ว 
        // (0 ยังไม่อัพโหลดหลักฐานการชำระ 1 ตรวจสอบการชำระเงินแล้ว กำลังจัดส่ง)       เมื่อเจ้าหน้าที่ตรวจสอบสถานะการจ่ายเงินของออเดอร์และเปลี่ยนสถานะเป็นตรวจสอบการจ่ายเงินแล้ว ระบบจะอัพเดทสถานะ order.check_for_coupon เป็น 1
        // order.check_for_coupon สถานะการใช้งานคูปองของระบบ 
        // (1 อยู่ระหว่างการคำนวนยอดรวมทั้งหมด และจะเปลี่ยนเป็น 2 เมื่อผลรวม > 10000 และระบบจะเปลี่ยนสถานะ order ที่ check_for_coupon = 1 ทั้งหมดเป็น 2)