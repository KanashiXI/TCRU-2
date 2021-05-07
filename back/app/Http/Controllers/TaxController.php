<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\tax;
use DB;

class TaxController extends Controller
{
    // public function gettaxById($request)
    // {       
    //     $getall = tax::where('user_id', $request)->get();  
    //     return response()->json($getall,200); 
    // }

    public function gettaxById($request)
    {       
    
        $getall = DB::table('tax_info')
            ->join('provinces', 'provinces.id', '=', 'tax_info.province_id')
            ->join('amphures', 'tax_info.amphures_id', '=', 'amphures.id')
            ->join('districts', 'tax_info.districts_id', '=', 'districts.id')
            ->join('users', 'users.id', '=', 'tax_info.user_id')
            ->select('tax_info.status', 'tax_info.postal_code', 'tax_info.user_id', 'tax_info.firstname', 'tax_info.lastname', 'tax_info.tax_id', 'tax_info.address' , 'provinces.name_th as province_name', 'amphures.name_th as amphure_name', 'districts.name_th as districts_name', 'tax_info.company_name')
            ->where('tax_info.user_id', $request)
            ->groupBy('tax_info.tax_id')
            ->get();

        return response()->json($getall,200);

    }

    public function createTax(Request $request)
    {       
        $new = new tax;
        // $new->firstname = $request->input('firstname');
        // $new->lastname = $request->input('lastname');
        
        $new->company_name = $request->input('company_name');
        $new->address = $request->input('address');
        $new->postal_code = $request->input('postal_code');
        $new->province_id = $request->input('province_id');
        $new->amphures_id = $request->input('amphures_id');
        $new->districts_id = $request->input('districts_id');
        $new->telephone = $request->input('telephone');
        $new->vat_identification_number = $request->input('vat_identification_number');       
        $new->user_id = $request->input('user_id');       
        $new->save();
        return response()->json(['newitem'=>$new],201);
    }

    public function deleteTax($request)
    {       
        $tax = tax::where('tax_id', $request);
            if($tax)
                $tax->delete(); 
            else
            return response()->json(['tax not found']);
        return response()->json(['deleted']); 
    }

    public function editTax(Request $request, tax $tax)
    {       
        $edit = tax::where('tax_id', $request->tax_id)->first();
        $edit->firstname=$request->firstname;
        $edit->lastname=$request->lastname;
        $edit->company_name=$request->company_name;
        $edit->address=$request->address;
        $edit->postal_code=$request->postal_code;
        $edit->province_id=$request->province_id;
        $edit->amphures_id=$request->amphures_id;
        $edit->districts_id=$request->districts_id;
        $edit->telephone=$request->telephone;
        $edit->vat_identification_number=$request->vat_identification_number;
        $edit->user_id=$request->user_id;      
        $result = $edit->save();
    }

    public function getOneTax($request)
    {
        $getall = tax::where('tax_id', $request)->get();  
        return response()->json($getall,200); 
    }
}