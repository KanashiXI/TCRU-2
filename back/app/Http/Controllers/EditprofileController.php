<?php
namespace App\Http\Controllers;
header('Access-Control-Allow-Origin : *');
header('Access-Control-Allow-Methods : *');
header('Access-Control-Allow-Headers : Content-type, X-Auth-Token, Authorization, Origin');
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\users;
use App\User;

class EditprofileController extends Controller
{
    public function editprofile(Request $request, User $user)
    {
        $edit=User::where('email', $request->email)->where('email',$request->email)->first();
        $edit->email=$request->email;
        $edit->name_title=$request->name_title;
        $edit->firstname=$request->firstname;
        $edit->lastname=$request->lastname;
        // $edit->address=$request->address;
        // $edit->postal_code=$request->postal_code;
        // $edit->province=$request->province;
        // $edit->district=$request->district;
        $edit->telephone=$request->telephone;
        // $edit->sub_district=$request->sub_district;       
        $result = $edit->save();
    }
}