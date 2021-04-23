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

    function getOrderMaterialsSkipAndLimit($skip, $limit)
    {
        $data = DB::table('status_order')
        ->rightJoin('order_materail', 'status_order.status_order_id', '=', 'order_materail.status')->skip($skip)->take($limit)->get();
        return $data;
    }

    function getTatalOrderMaterials()
    {
        $data = DB::table('order_materail')->get()->count();
        return $data;
    }

    function getOneOrderMaterials($id)
    {
        $data = DB::table("order_materail")->where("order_material_id", $id)->get()->first();
    }

    function addOrderMaterials($data)
    {
        DB::table("order_materail")->insert($data);
    }

    function deleteOrderMaterails($id)
    {
        DB::table("order_materail")->where("order_material_id",$id)->delete();
    }
}