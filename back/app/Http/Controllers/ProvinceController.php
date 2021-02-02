<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\province;

class ProvinceController extends Controller
{
    public function getprovinces()
    {
        $provinceModel=new province();
        $data=$provinceModel->getProvince();
        return response()->json($data);
    }
}