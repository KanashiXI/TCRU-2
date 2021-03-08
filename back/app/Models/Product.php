<?php

namespace App\Models;

use DB;

class Product 
{

    function getProduct1($skip,$limit)
    {
        $data=DB::table('product')->skip($skip)->take($limit)->get();
        return $data;
    }
    function getTotalProduct(){
        $data=DB::table('product')->get()->count();
        return $data;
    }
    function getProduct($skip,$limit)
    {
        // $data = DB::table("product")->crossJoin('categoryp')->get();
        //     return $data;

            $data = DB::table('categoryp')
            ->rightJoin('product', 'categoryp.id', '=', 'product.category_id')->skip($skip)->take($limit)->get();
            return $data;

            // $users = DB::table('categoryp')
            // ->join('product', 'categoryp.id', '=', 'product.category_id')
            // ->select('product.*', 'categoryp.name')
            // ->get();
    }
    function addProduct($data)
    {
        DB::table("product")->insert($data);
    }
    function deleteProduct($id)
    {
        DB::table("product")->where("id",$id)->delete();
    }
    function updateProduct($id,$data)
    {
        DB::table("product")->where("id",$id)->update($data);
    }
    function getOneProduct($id)
    {
        $data = DB::table("product")->where("id",$id)->get()->first();
        return $data;
    }
    
}
