<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\order;
use DB;

class CouponController extends Controller
{

    public function checkCoupon($request)
    {


        $getall = DB::table('users')
            ->join('order', 'order.user_id', '=', 'users.id')
            ->select( DB::raw('sum(order.net_amount) as sumnet'))
            ->where('users.id', $request)
            ->where('order.status', '>', 0)
            // ->where('order.check_for_coupon ','=', 1 )
            ->get(); 
            return response()->json($getall,200);

        // if(10000){
        //     $voucher->code = $this->generateRandomString(6);
        // }else{
        // }     
    }

    public  function generateRandomString($length = 20) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    

}



        //รับ object ของ order เข้ามา 

        // order status สถานะการชำระเงิน > 0 คือจ่ายเงินแล้ว 
        // (0 ยังไม่อัพโหลดหลักฐานการชำระ 1 ตรวจสอบการชำระเงินแล้ว กำลังจัดส่ง)       เมื่อเจ้าหน้าที่ตรวจสอบสถานะการจ่ายเงินของออเดอร์และเปลี่ยนสถานะเป็นตรวจสอบการจ่ายเงินแล้ว ระบบจะอัพเดทสถานะ order.check_for_coupon เป็น 1
        // order.check_for_coupon สถานะการใช้งานคูปองของระบบ 
        // (1 อยู่ระหว่างการคำนวนยอดรวมทั้งหมด และจะเปลี่ยนเป็น 2 เมื่อผลรวม > 10000 และระบบจะเปลี่ยนสถานะ order ที่ check_for_coupon = 1 ทั้งหมดเป็น 2)