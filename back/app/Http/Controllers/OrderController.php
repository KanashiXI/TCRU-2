<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\order;
use App\orderDetail;
use DB;
use App\Exports\ExcelExport;
use App\Exports\ExcelAddress;
use Maatwebsite\Excel\Facades\Excel;


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



    public function getImageOrder($request){ 
        $getall = DB::table('order')
            ->select('image')
            ->where('order.order_id', $request)
            ->get(); 
        return response()->json($getall,200);
    }

    public function fillImageOrder(Request $request, order $order){ 
        // $file = order::where('order_id',$request->order_id)->first(); 
        // $file = $request->file('image');
        // $file->save();

        if ($request->hasFile('image'))
         {
            // $file = order::where('order_id',$request->order_id)->first(); 
            $file = $request->file('image');
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $uploadPath = "public/image";
            $picture   = $filename;           
            $file->move(public_path('img'), $picture);
            $imageName["image"] =  $filename;
            DB::table("order")->where("order_id",$request->order_id)->update($imageName);
            //move image to public/img folder
            return response()->json(["message" => "Image Uploaded Succesfully"]);
         } 
        else
        {
            return response()->json(["message" => "Select image first."]);
        }

        // return response()->json([$file],200);
    }

    public function fillOrder(Request $request, order $order){       
        $edit = order::where('order_id', $request->order_id)->first();   
        $edit->total_price=$request->total_price;
        $edit->promotion_id=$request->promotion_id;
        $edit->discount=$request->discount;
        $edit->net_amount=$request->net_amount;
        $edit->request_tax=$request->request_tax;
        $edit->user_id=$request->user_id; 
        $edit->address_id=$request->address_id; 
        $edit->shipping_brand=$request->shipping_brand;
        $edit->shipping_price=$request->shipping_price;    
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

    public function getOrder()
    {
        $getall = order::all();
        // $getall = DB::table('order')
        //     ->join('order_detail', 'order_detail.order_id', '=', 'order.order_id' )
        //     ->select('*')
        //     ->where('order.user_id', $request)
        //     ->groupBy('order.order_id')
        //     ->get(); 
        return response()->json($getall,200); 
        // return response()->json($getall,200); 
    }

    public function getOrderByUser($request)
    {
        $getall = DB::table('order')
            ->select('*')
            ->where('order.user_id', $request)
            ->get(); 
        return response()->json($getall,200);
    }    

    public function getOrderDetail($request)
    {
        $getall = DB::table('order')
            ->join('order_detail', 'order_detail.order_id', '=', 'order.order_id' )
            ->join('status', 'status.id', '=', 'order.status')
            ->join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->join('address', 'address.address_id', '=', 'order.address_id')
            ->join('provinces', 'provinces.id', '=', 'address.province_id')
            ->join('amphures', 'amphures.id', '=', 'address.amphures_id')
            ->join('districts', 'districts.id', '=', 'address.districts_id')
            ->select('order.order_id', 'order.order_date', 'order.require_date', 'order.status as status_id', 
                    'status.name as status_name',
                    'order.user_id', 'order.updated_at', 'order.created_at', 'order.net_amount',
                    'order.total_price', 'order.promotion_id', 'order.discount as discount', 'order.request_tax',
                    'order.address_id', 'order_detail.product_quantity', 'order.net_amount', 
                    'order.discount', 'order.total_price',
                    'address.address', 'address.firstname', 'address.lastname', 'address.telephone', 
                    'provinces.name_th as province', 'amphures.name_th as amphures', 
                    'districts.name_th as districts', 'address.postal_code as postal_code',
                    'product.product_id', 'product.product_name', 'product.retail_price', 'product.unit')
            ->where('order.order_id', $request)
            // ->groupBy('order.order_id')
            ->get(); 
        return response()->json($getall,200);
    } 


    public function exportExcel($datefrom, $mountfrom, $yearfrom, $dateto, $mountto, $yearto)
    {
        // return Excel::download(new ExcelExport, 'orders.xlsx');
        $yearfirst = $yearfrom-543;
        $yearnext = $yearto-543;
        $datef = $yearfirst.'-'.$mountfrom.'-'.$datefrom;
        $datet = $yearnext.'-'.$mountto.'-'.$dateto;
        // $dateTo = 
        return (new ExcelExport($datef,$datet))->download('orders.xlsx');
        // return response()->json($datef,200);
    }

    public function exportExcelAddress($datefrom, $mountfrom, $yearfrom, $dateto, $mountto, $yearto)
    {
        $yearfirst = $yearfrom-543;
        $yearnext = $yearto-543;
        $datef = $yearfirst.'-'.$mountfrom.'-'.$datefrom;
        $datet = $yearnext.'-'.$mountto.'-'.$dateto;
        return (new ExcelAddress($datef,$datet))->download('orders-addreess.xlsx');
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