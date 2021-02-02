<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\customer;
use App\users;
use App\User;

class RegisterController extends Controller
{
    
    public function getcustomer()
    {
        // if(isset($request -> id)){
        //     $getCustomerByUsername = customer::find($request -> id);
        // return response()->json($getCustomerByUsername,201); 
        // }
        $getall = customer::all();
        return response()->json($getall,200); 
    }


    
    public function getCustomerByUsername($request)
    {   
        // $id = intval($request);
        // $data = $request->get('username');
        // $data = $request->get('username');

        $getUsernameCustomer = customer::where('username', $request)->get();      
        return response()->json($getUsernameCustomer,200);        
    }

    //เช็คเมลซ้ำใช้อันนี้
    public function getCustomerByEmail($request)
    { 
        $getEmailCustomer = users::where('email', $request)->get();      
        return response()->json($getEmailCustomer,200); 
    }



    public function createcustomer(Request $request)
    {
        $new = new customer;
        $new->username = $request->input('username');
        $new->password = $request->input('password');
        $new->firstname = $request->input('firstname');
        $new->lastname = $request->input('lastname');
        // $new->mail = $request->input('mail');
        $new->telephone = $request->input('telephone');
        $new->role_id = $request->input('role_id');
        
        $new->save();

        return response()->json(['newitem'=>$new],201);
    }
    public function setRoleUser(Request $request, User $users)
    {
        $edit = User::where('id', $request->id)->first();
        $edit->role= 1 ;
        $result = $edit->save();

    }
    
}
