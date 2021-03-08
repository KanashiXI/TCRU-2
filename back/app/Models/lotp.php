<?php

namespace App\Models;

use DB;

class lotp
{
    function getlotp($product_id)
    {
        $data=DB::table('lot_product')->where('product_id',$product_id)->get();
        return $data;
    }
    function getlotp1()
    {
        $data = DB::table("lot_product")->get();
        return $data;
    }
    function addlotp($data)
    {
        DB::table("lot_product")->insert($data);
    }
    function getOnelotp($product_id)
    {
        $data = DB::table("lot_product")->where("product_id",$product_id)->get()->first();
        return $data;
    }
    function getlotp11($product_id)
    {
        // $data = DB::table("product")->sum('final_amount')->get();
        // return $data;
        $data = DB::table('lot_product')->where('product_id',$product_id)
        ->select( DB::raw('SUM(final_amount)'))->get();
        return $data;
    }
}
