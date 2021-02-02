<?php

namespace App\Models;

use DB;

class categoryP
{
    function getcategory()
    {
        $data = DB::table("categorymaterial")->get();
        return $data;
    }
    
}
