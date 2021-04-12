<?php

namespace App\Models;

use DB;

class OrderMaterials
{
    function getOrderMaterials()
    {
        $data = DB::table("order_materail")->get();
        return $data;
    }
}