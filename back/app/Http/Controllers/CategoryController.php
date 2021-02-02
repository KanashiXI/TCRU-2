<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\category;
class CategoryController extends Controller
{

    public function getcategory()
    {
        $categoryModels = new category();
        $data =  $categoryModels->getcategory();
        return response()->json($data); 
    }
    
}
