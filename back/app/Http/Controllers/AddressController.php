<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\address;

class AddressController extends Controller
{
    public function getUserShippingAddress($request)
    {
        $getall = address::where('user_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function getOneShippingAddress($request)
    {
        $getall = address::where('address_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function createShippingAddress(Request $request)
    {       
        $new = new address;
        $new->address = $request->input('address');
        $new->user_id = $request->input('user_id');
        $new->amphures_id = $request->input('amphures_id');
        $new->districts_id = $request->input('districts_id');
        $new->postal_code = $request->input('postal_code');
        $new->province_id = $request->input('province_id');
        $new->geographic_id = $request->input('geographic_id');
        $new->status = $request->input('status');            
        $new->telephone = $request->input('telephone');
        $new->firstname = $request->input('firstname'); 
        $new->lastname = $request->input('lastname');             
        $new->save();
        return response()->json(['newitem'=>$new],201);
    }

    public function deleteShippingAddress($request)
    {       
        $address = address::where('address_id', $request);
            if($address)
                $address->delete(); 
            else
            return response()->json(['address not found']);
        return response()->json(['deleted']); 
    }

    public function editShippingAddress(Request $request, address $address)
    {       
        $edit = address::where('address_id', $request->address_id)->first();
        $edit->address=$request->address;
        $edit->amphures_id=$request->amphures_id;
        $edit->districts_id=$request->districts_id;
        $edit->postal_code=$request->postal_code;
        $edit->province_id=$request->province_id;
        $edit->geographic_id=$request->geographic_id;
        $edit->status=$request->status;
        $edit->telephone=$request->telephone;
        $edit->firstname=$request->firstname;
        $edit->lastname=$request->lastname;
        $result = $edit->save();
    }
    
}