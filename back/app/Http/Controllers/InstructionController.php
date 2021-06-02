<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\instruction;
use DB;

class InstructionController extends Controller
{
    public function addInstruction(Request $request)
    {
        $new = new instruction;
        $new->title = $request->input('title');
        $new->detail = $request->input('detail');            
        $new->save();
        return response()->json(['newitem'=>$new],201);
    }

    public function getInstruction()
    {
        $getall = instruction::all();
        return response()->json($getall,200); 
    }

    public function deleteInstruction($request)
    {
        $instruction = instruction::where('instruction_id', $request);
            if($instruction)
                $instruction->delete(); 
            else
            return response()->json(['instruction not found']);
        return response()->json(['deleted']); 
    }

    public function getOneInstruction($request)
    {
        $getall = instruction::where('instruction_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function editInstruction(Request $request, instruction $instruction)
    {       
        $edit = instruction::where('instruction_id', $request->instruction_id)->first();
        $edit->title = $request->input('title');
        $edit->detail = $request->input('detail');
        $result = $edit->save();
    }
}