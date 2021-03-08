<?php

namespace App\Models;

use DB;

class category 
{
    function getcategory()
    {
        $data = DB::table("categorym")->get();
        return $data;
    }
}
