<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\product;
class ProductController extends Controller
{

    function getProduct1(Request $request)
    {
         
         
          $skip = $request->skip;
          $limit = $request->limit;
          $productModel = new product();
          $data =  $productModel->getProduct1($skip,$limit);
          $totalCount = $productModel->getTotalProduct();
          $response["data"] = $data;
          $response["totalRecord"] = $totalCount;
          return response()->json($response);
    }

    public function getProduct()
    {
        $productModel = new product();
        $data =  $productModel->getProduct();
        return response()->json($data); 
    }

    public function addProduct(Request $request)
    {
        $file = $request->file('file');
        $uploadPath = "public/image";
        $originalImage = $file->getClientOriginalName();
        $file->move($uploadPath, $originalImage);
        $productData = json_decode($request->data,true);
        $productData["image"] =  $originalImage;
       
        $productModel = new product();
        $data =  $productModel->addProduct($productData);
    }

    public function getOneProduct(Request $request)
    {
        $id=$request->product_id;
        $productModel = new product();
        $data =  $productModel->getOneProduct($id);
        return response()->json($data); 
    }

    public function updateProduct(Request $request, $id)
    {
        $id=$request->product_id;
        $productModel = new product();
        $productModel->updateProduct($id,$request->all());
        return response()->json([ 'id' => $id]);
    }

    public function destroyp(Request $request)
    {
        $id=$request->product_id;
        $productModel = new product();
        $productModel->deleteProduct($id);
        return response()->json([ 'id' => $id]);
    }


}
