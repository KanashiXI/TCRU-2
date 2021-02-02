<?php

namespace App\Models;

use DB;

class material 
{

    function getMaterial1($skip,$limit)
    {
        $data=DB::table('material')->skip($skip)->take($limit)->get();
        return $data;
    }
    function getTotalMaterial(){
        $data=DB::table('material')->get()->count();
        return $data;
    }
    function getMaterial()
    {
        $data = DB::table("material")->get();
        return $data;
    }
    function addMaterial($data)
    {
        DB::table("material")->insert($data);
    }
    function deleteMaterial($id)
    {
        DB::table("material")->where("material_id",$id)->delete();
    }
    function updateMaterial($id,$data)
    {
        DB::table("material")->where("material_id",$id)->update($data);
    }
    function getOneMaterial($id)
    {
        $data = DB::table("material")->where("material_id",$id)->get()->first();
        return $data;
    }
    
}
