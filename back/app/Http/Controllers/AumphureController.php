<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\amphures;

class AumphureController extends Controller
{
    public function getAumphure(Request $request)
    {
        $province_id = $request->id;
        $amphuresModel=new amphures();
        $data=$amphuresModel->getAmphures($province_id);
        return response()->json($data);
    }

}