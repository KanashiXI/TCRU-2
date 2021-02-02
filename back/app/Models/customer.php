<?php

namespace App\Models;

use DB;

class customer 
{

    function getcustomer1($skip,$limit)
    {
        $data=DB::table('customers')->skip($skip)->take($limit)->get();
        return $data;
    }
    function getTotalcustomer(){
        $data=DB::table('customers')->get()->count();
        return $data;
    }
    function getcustomer()
    {
        $data = DB::table("customers")->get();
        return $data;
    }
    // function addMaterial($data)
    // {
    //     DB::table("material")->insert($data);
    // }
    function deletecustomer($id)
    {
        DB::table("customers")->where("customer_id",$id)->delete();
    }
    function updatecustomer($id,$data)
    {
        DB::table("customers")->where("customer_id",$id)->update($data);
    }
    function getOnecustomer($id)
    {
        $data = DB::table("customers")->where("customer_id",$id)->get()->first();
        return $data;
    }
    
}
