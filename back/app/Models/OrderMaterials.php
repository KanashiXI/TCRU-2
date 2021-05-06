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
        $insertData = [
            //databade => frontend
            "shop_name" => $data['shop_name'],
            "contact_person" => $data['contact_person'],
            "phone_contact_person" => $data['phone_contact_person'],
            "order_name" => $data['order_name'],
            "address" => $data['address'],
            // "start_date" => $data['start_date'],
            // 'end_date' => $data['end_date'],
            "material_name" => $data['material_name'],
            "quantity" => $data['quantity'],
            "price" => $data['price'],
            "discount" => $data['discount'],
            "status" => "จัดทำใบสั่งซื้อ",
            "unit" => $data['unit'],
            "vat" => $data['vat']
        ];
        DB::table("order_materail")->insert($insertData);
    }

    function deleteOrderMaterails($id)
    {
        DB::table("order_materail")->where("order_material_id",$id)->delete();
    }

    function getunit_material()
    {
        $data = DB::table("unit_material")->get();
        return $data;
    }
}