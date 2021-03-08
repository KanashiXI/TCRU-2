<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\material;
class MaterialController extends Controller
{

    function getMaterial1(Request $request)
    {
         
         
          $skip = $request->skip;
          $limit = $request->limit;
          $materialModel = new material();
          $data =  $materialModel->getMaterial1($skip,$limit);
          $totalCount = $materialModel->getTotalMaterial();
          $response["data"] = $data;
          $response["totalRecord"] = $totalCount;
          return response()->json($response);
    }
    public function getMaterial()
    {
        $materialModel = new material();
        $data =  $materialModel->getMaterial();
        return response()->json($data); 
    }
    public function addMaterial(Request $request)
    {
        $file = $request->file('file');
        $uploadPath = "public/image";
        $originalImage = $file->getClientOriginalName();
        $file->move($uploadPath, $originalImage);
        $materialData = json_decode($request->data,true);
        $materialData["image"] =  $originalImage;
       
        $materialModel = new material();
        $data =  $materialModel->addMaterial($materialData);
    }

    public function getOneMaterial(Request $request)
    {
        $id=$request->material_id;
        $materialModel = new material();
        $data =  $materialModel->getOneMaterial($id);
        return response()->json($data); 
    }

    public function updateMaterial(Request $request, $id)
    {
        
        $id=$request->material_id;
        $materialModel = new material();
        $materialModel->updateMaterial($id,$request->all());
        return response()->json([ 'id' => $id]);
    }

    public function destroy(Request $request)
    {
        $id=$request->material_id;
        $materialModel = new material();
        $materialModel->deleteMaterial($id);
        return response()->json([ 'id' => $id]);
    }
    public function getByname($request)
    { 
        $materialModel = new material();
        $data =  $materialModel->getByname();
        return response()->json($data); 
    }

}
