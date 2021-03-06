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
    
}
