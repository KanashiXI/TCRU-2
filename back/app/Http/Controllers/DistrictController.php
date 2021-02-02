<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\districts;

class DistrictController extends Controller
{
    public function getDistrict(Request $request)
    {
        $district_id = $request->id;
        $districtsModel=new districts();
        $data=$districtsModel->getDistrict($district_id);
        return response()->json($data);
    }

}