<?php

namespace App\Models;

use DB;

class categoryP
{
    function getcategory()
    {
        $data = DB::table("categoryp")->get();
        return $data;
    }
    function getunit_count()
    {
        $data = DB::table("unit_count")->get();
        return $data;
    }
    
}
