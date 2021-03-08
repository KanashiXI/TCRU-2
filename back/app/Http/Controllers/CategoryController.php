<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\category;
class CategoryController extends Controller
{
    public function getcategory()
    {
         
          $categoryModel=new category();
          $data=$categoryModel->getcategory();
          return response()->json($data);
    }
}
