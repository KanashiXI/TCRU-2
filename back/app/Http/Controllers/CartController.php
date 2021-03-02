<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\cart;

class CartController extends Controller
{
    public function getCartByUserId($request)
    {       
        $getall = cart::where('user_id', $request)->get();  
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
    public function editCartByProductId(Request $request, cart $cart)
    {       
        $edit = cart::where('product_id', $request->product_id)->first();   
        $edit->product_quantity=$request->product_quantity;
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