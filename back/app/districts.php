<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use DB;
class districts extends Model
{
    protected $table  = 'districts';
    protected $primaryKey = 'id';

    function getDistrict($amphure_id)
    {
        $data=DB::table('districts')->where('amphure_id',$amphure_id)->get();
        return $data;
    }

}