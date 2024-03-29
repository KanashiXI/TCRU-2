<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\order;
use App\orderDetail;
use DB;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {     
        // $result = $edit->save();
        $ldate = date('Y-m-d H:i:s');
        $data = new order;
        $data->order_date = $ldate;
        $data->status = 0;
        $data->save(); 
        DB::beginTransaction();
        try {
            $lastid = $data->order_id;
            // ["data1"=>[],"data"=>122]
            foreach($request->all() as $key => $item){
                $orderdetail = new orderDetail();
                $orderdetail['order_id']=$lastid;
                $orderdetail['product_id']=$item['product_id'];
                $orderdetail['user_id']=$item['user_id']; 
                $orderdetail['product_quantity']=$item['product_quantity']; 
                $orderdetail['retail_price']=$item['retail_price']; 
                $orderdetail->save();
            } 

            DB::commit();
            return response()->json($lastid,201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=>$e->getMessage()],500);
        }              
    }

    public function fillOrder(Request $request, order $order){       
        $edit = order::where('order_id', $request->order_id)->first();   
        $edit->total_price=$request->net_amount;
        $edit->promotion_id=$request->promotion_id;
        $edit->discount=$request->discount;
        $edit->net_amount=$request->net_amount;
        $edit->request_tax=$request->request_tax;
        $edit->user_id=$request->user_id; 
        $edit->address_id=$request->address_id; 
        $result = $edit->save(); 
        return response()->json(true,200);
    }

    public function deleteFromCart(Request $request){
        try {
            $ids_to_delete = array_map(function($item){ return $item['cart_id']; }, $request->all());
            DB::table('cart')->whereIn('cart_id', $ids_to_delete)->delete(); 
        }
        catch(\Exception $e){
        }
    }




}
















// return response()->json(['newitem'=>$data],201);



        // return response()->json(['newitem'=>$request->input()],201);




        

        // return DB::transaction(function() use ($request) {
        //     $user = orderDetail::create([
        //         'username' => $request->post('username')
        //     ]);
    
        //     return response()->json(['message' => 'User saved!']);
        // });


                    // foreach ($product_id as $k => $id) {
            //     $values[] = [
            //     'product_id' => $id,
            //     'user_id'  => $request->user_id,
            //     'created_at' => orderDetail::now(),
            //     ];
            // }


            // if($request->ajax())
            // {
            //     $books=$request->books;
            //     $data = array();
            //     foreach($books as $book)
            //     {
            //         if(!empty($book))
            //         {
            //             $data[] =[
            //                 'name' => $book,
            //                 'user_id' => Auth::id(),
            //             ];                 

            //         }
            //     }
            // }




            // DB::table('order_detail')->insert(
            //     $values
            // );



            // DB::insert('insert into order_detail (product_id, order_id) values ($data, $data)');
            
        
            
            // return response()->json(['newitem'=>$arrays],201);
            // all good

// orderDetail::create(array_merge($request->all(), ['index' => 'value'])); 
        // $addorder = new order;
        // $addorder->user_id = $request->input('user_id');               
        // $addorder->save();

        // foreach ($request as $key=>$value)
        // {
        //     $data[] = [
        //         'product_id' => $value['product_id'],
        //         'user_id' => $value['user_id'],
                
        //     ];
        // }

        // DB::table('order_datail')->insert($data); // Query Builder approach as you are using