<?php

namespace App\Exports;
use DB;
use App\Order;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;

class ExcelExport implements FromCollection, WithHeadings, WithEvents
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

        // $styleArray = [
        //     'font' =>  [
        //         'bold' => true,
        //     ]
        // ];
        // return[
        //     AfterSheet::class => function (AfterSheet $event) use ($styleArray){
        //         $event->sheet->getStyle('A1:E1')->applayFromArray($styleArray);
        //         // $event->sheet->setCellValue('E')
        //     },
        // ];


    }

    public function collection()
    {
        // $from = date('2021-03-06');
        // $to = date('2021-03-06');


        $getdb = DB::table('order_detail')
        ->join('product', 'product.product_id', '=', 'order_detail.product_id')
        ->select( 'order_detail.product_id as product_id', 'product.product_name as product_name', 
                'product_quantity', 'product.retail_price as retail_price', 'created_at',
                // DB::raw('sum(product_quantity*product.retail_price) as total')
                )
        ->whereDate('created_at','<=', $this->from)
        ->whereDate('created_at','>=', $this->to)
        ->get(); 


        $groups = $getdb->groupBy('product_id'); 
        $groupwithcount = $groups->mapWithKeys(function ($group, $key) {
            return [
                    $key =>
                        [
                            'product_id' => $key,
                            'product_name'=>$group->pluck('product_name')->first(),
                            'product_quantity' => $group->sum('product_quantity'),
                            'retail_price'=>$group->pluck('retail_price')->first(),
                            // 'total' => $group->sum('total'),
                            // 'created_at'=>$group->pluck('created_at')->first(),
                        ]
            ];
        });
        $sorted = $groupwithcount->sortByDesc('product_quantity');
        // $res = [];
        // foreach ($sorted  as $key => $value) {
        //     $res[] = $value;
        // }


        return $sorted;
    }

    public function headings(): array 
    {
        return [
            'รหัสสินค้า',
            'ชื่อสินค้า',
            'จำนวน',
            'ราคา ต่อชิ้น',
            'รวม'
            // 'วันที่'
        ];
    }
}
