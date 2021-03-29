<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class transportation extends Model
{
    protected $table  = 'transportation_fee';
    protected $primaryKey = 'transportation_id'; // ตั้งค่า primarykey สำหรับquery เมื้อ where ด้วย id
}