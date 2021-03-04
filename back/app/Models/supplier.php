<?php

namespace App\Models;

use DB;

class supplier 
{

    // function getsupplier1($skip,$limit)
    // {
    //     $data=DB::table('supplier')->skip($skip)->take($limit)->get();
    //     return $data;
    // }
    // function getTotalsupplier(){
    //     $data=DB::table('supplier')->get()->count();
    //     return $data;
    // }
    function getsupplier()
    {
        $data = DB::table("supplier")->get();
        return $data;
    }
    function addsupplier($data)
    {
        DB::table("supplier")->insert($data);
    }
    function deletesupplier($id)
    {
        DB::table("supplier")->where("id",$id)->delete();
    }
    function updatesupplier($id,$data)
    {
        DB::table("supplier")->where("id",$id)->update($data);
    }
    function getOnesupplier($id)
    {
        $data = DB::table("supplier")->where("id",$id)->get()->first();
        return $data;
    }
    
}
