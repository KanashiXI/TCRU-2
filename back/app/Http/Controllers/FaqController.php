<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\faq;
use DB;

class FaqController extends Controller
{
    public function addFaq(Request $request)
    {
        $new = new faq;
        $new->ask = $request->input('ask');
        $new->answer = $request->input('answer');            
        $new->save();
        return response()->json(['newitem'=>$new],201);
    }

    public function getFaq()
    {
        $getall = faq::all();
        return response()->json($getall,200); 
    }

    public function deleteFaq($request)
    {
        $faq = faq::where('faq_id', $request);
            if($faq)
                $faq->delete(); 
            else
            return response()->json(['faq not found']);
        return response()->json(['deleted']); 
    }

    public function getOneFaq($request)
    {
        $getall = faq::where('faq_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function editFaq(Request $request, faq $faq)
    {       
        $edit = faq::where('faq_id', $request->faq_id)->first();
        $edit->ask = $request->input('ask');
        $edit->answer = $request->input('answer');
        $result = $edit->save();
    }
}