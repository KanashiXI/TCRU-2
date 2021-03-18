<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\product;
use App\productType;
use DB;
class ProductController extends Controller
{
    public function getproduct()
    {
        $getall = product::all();
        return response()->json($getall,200); 
    }

    public function getOneProduct($request)
    {
        $getall = product::where('product_id', $request)->get();  
        return response()->json($getall,200); 
    }

    public function getproductType()
    {
        $getall = productType::all();
        return response()->json($getall,200); 
    }

    public function bestsalseProduct()
    {
        $getall = DB::table('product')
            ->join('order_detail', 'product.product_id', '=', 'order_detail.product_id')
            ->select('product.product_id', 'product.product_name', 'order_detail.product_quantity', 'product.product_description', 'product.product_type', 'product.image',
                    'product.retail_price', 'product.weight', 'product.unit'
                    )
            ->get();
        $groups = $getall->groupBy('product_id'); 
        $groupwithcount = $groups->mapWithKeys(function ($group, $key) {
            return [
                    $key =>
                        [
                            'product_id' => $key,
                            'product_quantity' => $group->sum('product_quantity'),
                            'product_name'=>$group->pluck('product_name')->first(),
                            'product_description'=>$group->pluck('product_description')->first(),
                            'retail_price'=>$group->pluck('retail_price')->first(),
                            'weight'=>$group->pluck('weight')->first(),
                            'unit'=>$group->pluck('unit')->first(),
                            'product_type'=>$group->pluck('product_type')->first(),
                            'image'=>$group->pluck('image')->first(),
                            // 'product_value' => $group
                            // 'id' => $group['product_id']
                        ]
            ];
        });
        $sorted = $groupwithcount->sortByDesc('product_quantity');
        $res = [];
        foreach ($sorted  as $key => $value) {
            $res[] = $value;
        }
        $items = array_slice($res, 0,5);
        return response()->json($items, 200); 
    }
}

