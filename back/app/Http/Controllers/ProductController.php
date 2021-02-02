<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\product;

class ProductController extends Controller
{
    public function getproduct()
    {
        $getall = product::all();
        return response()->json($getall,200); 
    }

    public function getOneProduct($request)
    {
        $getall = product::where('product_id', $request)->get();  
        return response()->json($getall,200); 
    }

}