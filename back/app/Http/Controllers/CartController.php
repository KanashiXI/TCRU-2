<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\cart;
use DB;

class CartController extends Controller
{
    public function getCartByUserId($request)
    {       
        // $getall = DB::table('address')
        //     ->join('provinces', 'provinces.id', '=', 'address.province_id')
        //     ->join('amphures', 'amphures.id', '=', 'address.amphures_id')
        //     ->join('districts', 'districts.id', '=', 'address.districts_id')
        //     ->join('users', 'users.id', '=', 'address.user_id')
        //     ->select('address.status','address.postal_code', 'address.user_id', 'address.firstname', 'address.lastname', 'address.address_id', 'address.address' , 'provinces.name_th as province_name', 'amphures.name_th as amphure_name', 'districts.name_th as district_name')
        //     ->where('address.user_id', $request)
        //     ->groupBy('address.address_id')
        //     ->get(); 
        $getall = DB::table('cart')
            ->join('product', 'product.product_id', '=', 'cart.product_id')
            ->select('cart.cart_id','product.image','cart.price_per_piece','product.product_description','product.product_id','product.product_name','cart.product_quantity','product.product_type','product.product_type_id','cart.retail_price','product.stock','product.unit','product.unit_count_id','cart.user_id','product.weight')
            ->where('cart.user_id', $request)
            ->get();

            
        // $getall = cart::where('user_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function addtoCart(Request $request)
    {       
        $new = new cart;
        $new->product_id = $request->input('product_id');
        $new->product_quantity = $request->input('product_quantity');
        $new->product_description = $request->input('product_description');
        $new->product_name = $request->input('product_name');
        $new->user_id = $request->input('user_id');  
        $new->retail_price = $request->input('retail_price');      
        $new->price_per_piece = $request->input('price_per_piece');      
        $new->save();
        return response()->json(['newitem'=>$new],201);
    }

    public function deleteCartByProductId($request)
    {       
        $prod = cart::where('cart_id', $request);
            if($prod)
                $prod->delete(); 
            else
            return response()->json(['prod not found']);
        return response()->json(['deleted']); 
    }


    // public function updateProductInCart(Request $request, cart $cart)
    // {     
    //     try {
    //         foreach ($request->all() as $key => $data ) {                
    //             $input = [               
    //                 'checked' => $data['checked'],
    //             ];
    //             DB::table('cart')->where('cart_id',$data['cart_id'])->update($input);
    //         }             
    //         return response()->json(true,200); 
    //     }
    //     catch(\Exception $e){
    //         return response()->json($e,500); 
    //     }  
    // }

    public function editCartByProductId(Request $request, cart $cart)
    {       
        $edit = cart::where('user_id', $request->user_id)->where('product_id', $request->product_id)->first();   
        $edit->product_quantity=$request->product_quantity;
        $edit->retail_price=$request->retail_price;
        $result = $edit->save();
    }

    public function getProductByProductId($product_id, $userId)
    {       
        $getall = cart::where('user_id', $userId)
        ->where('product_id', $product_id)
        ->get();  
        return response()->json($getall,200);
    }

}