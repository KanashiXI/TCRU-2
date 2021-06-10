<?php

namespace App\Exports;
use DB;
use App\Order;
use App\orderDetail;
use App\users;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;

class ExcelAddress implements FromCollection, WithHeadings, WithEvents
{
    /**
    * @return \Illuminate\Support\Collection
    */
    use Exportable;

    public function __construct(string $from, string $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->setCellValue('E'. ($event->sheet->getHighestRow()+1), '=SUM(E2:E'.$event->sheet->getHighestRow().')');
            }
        ];
    }

    public function collection()
    {
        // $getdb = DB::table('order_detail')
        // ->join('product', 'product.product_id', '=', 'order_detail.product_id')
        // ->join('users', 'users.id', '=', 'order_detail.user_id')
        // // ->join('order', 'order.order_id', '=', 'order_detail.order_id')
        // ->select( 'order_detail.order_id','order_detail.product_id as product_id', 'product.product_name as product_name', 
        //         'order_detail.product_quantity', 'product.retail_price as retail_price', 
        //         'order_detail.created_at as created_at',
        //         'users.firstname', 'users.lastname',
                
        //         // DB::raw('sum(product_quantity*product.retail_price) as total')
        //         )
        // ->whereDate('order_detail.created_at','<=', $this->from)
        // ->whereDate('order_detail.created_at','>=', $this->to)
        // ->get();
        $getall = DB::table('order')
            ->join('order_detail', 'order_detail.order_id', '=', 'order.order_id' )
            ->join('status', 'status.id', '=', 'order.status')
            ->join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->join('address', 'address.address_id', '=', 'order.address_id')
            ->join('provinces', 'provinces.id', '=', 'address.province_id')
            ->join('amphures', 'amphures.id', '=', 'address.amphures_id')
            ->join('districts', 'districts.id', '=', 'address.districts_id')
            ->join('users', 'users.id', '=', 'order.user_id')

            ->select('order.order_id', 'order.order_date',            
                    // 'status.name as status_name',
                    'users.firstname','users.lastname',
                    'address.address', 'address.firstname', 'address.lastname', 'address.telephone', 
                    'provinces.name_th as province', 'amphures.name_th as amphures', 
                    'districts.name_th as districts', 'address.postal_code as postal_code','address.telephone',
                    'order.shipping_price'
            )
                              
            ->groupBy('order.order_id')
            ->where('order.status', 1)
            ->get(); 
        return $getall;
    }

    public function headings(): array 
    {
        return [
            'เลขที่สั่งซื้อ',
            'วันที่สั่งซื้อ',
            'ชื่อ',
            'สกุล',
            'ที่อยู่',
            'จังหวัด',
            'อำเภอ',
            'ตำบล',
            'รหัสไปรษณีย์',
            'เบอร์โทร',
            'ค่าจัดส่ง',
        ];
    }



}