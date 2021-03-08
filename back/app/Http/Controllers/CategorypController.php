<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\categoryP;

class CategorypController extends Controller
{
    public function getcategory()
    {
         
          $categoryModel=new categoryP();
          $data=$categoryModel->getcategory();
          return response()->json($data);
    }
}