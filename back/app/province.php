<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use DB;
class province extends Model
{
    protected $table  = 'provinces';
    protected $primaryKey = 'id';

    function getProvince()
    {
        $data=DB::table('provinces')->get();
        return $data;
    }
}