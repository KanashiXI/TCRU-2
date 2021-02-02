<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use DB;
class amphures extends Model
{
    protected $table  = 'amphures';
    protected $primaryKey = 'id'; 

    function getAmphures($province_id)
    {
        $data=DB::table('amphures')->where('province_id',$province_id)->get();
        return $data;
    }
    
}