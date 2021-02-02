<?php

namespace App\Models;

use DB;

class category 
{
    function getcategory()
    {
        $data = DB::table("categorymaterial")->get();
        return $data;
    }
    
}
