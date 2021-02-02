<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class tax extends Model
{
    protected $table  = 'tax_info';
    protected $primaryKey = 'tax_id'; // ตั้งค่า primarykey สำหรับquery เมื้อ where ด้วย id
}