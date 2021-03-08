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
    
}
