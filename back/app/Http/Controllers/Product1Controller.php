<?php
namespace App\Http\Controllers;
use App\Models\categoryP;
use Illuminate\Http\Request;

use App\Models\Producttcru;
class Product1Controller extends Controller
{


    public function getProduct(Request $request)
    {
        $skip = $request->skip;
        $limit = $request->limit;
        $productModel = new Producttcru();
        $data =  $productModel->getProduct($skip,$limit);
        $totalCount = $productModel->getTotalProduct();
        $response["data"] = $data;
        $response["totalRecord"] = $totalCount;
        return response()->json($response);

        // $productModel = new product();
        // $data =  $productModel->getProduct();
        // return response()->json($data); 
    }

    public function addProduct(Request $request)
    {
        $file = $request->file('file');
        $uploadPath = "public/image";
        $originalImage = $file->getClientOriginalName();
        $file->move($uploadPath, $originalImage);
        $productData = json_decode($request->data,true);
        $productData["image"] =  $originalImage;
       
        $productModel = new Producttcru();
        $data =  $productModel->addProduct($productData);
    }

    public function getOneProduct(Request $request)
    {
        $id=$request->id;
        $productModel = new Producttcru();
        $data =  $productModel->getOneProduct($id);
        return response()->json($data); 
    }

    public function updateProduct(Request $request, $id)
    {
        $id=$request->id;
        $productModel = new Producttcru();
        $productModel->updateProduct($id,$request->all());
        return response()->json([ 'id' => $id]);
    }

    public function destroyp(Request $request)
    {
        $id=$request->id;
        $productModel = new Producttcru();
        $productModel->deleteProduct($id);
        return response()->json([ 'id' => $id]);
    }


}
