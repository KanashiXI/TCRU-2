<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\status;
use DB;

class StatusController extends Controller {

    public function getStatus() {
        $getall = status::all();
        return response()->json($getall,200);
    }
}