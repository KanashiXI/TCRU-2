<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\material;
class NameController extends Controller
{
    public function getByname($request)
    { 
        $name = DB::table('material')->where('material_name', $request)->pluck('material_name');
        return response()->json($name,200); 
    }

}
