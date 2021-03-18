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
            ->join('product_in_order', 'product.product_id', '=', 'product_in_order.product_id')
            ->select('product.product_id', 'product.product_name', 'product_in_order.count', 'product.product_description', 
                    'product.retail_price', 'product.weight', 'product.unit'
                    )
            ->get();
        $groups = $getall->groupBy('product_id'); 
        $groupwithcount = $groups->mapWithKeys(function ($group, $key) {
            return [
                    $key =>
                        [
                            'product_id' => $key,
                            'count' => $group->sum('count'),
                        
                            'product_value' => $group
                            // 'id' => $group['product_id']
                        ]
            ];
        });
        $sorted = $groupwithcount->sortByDesc('count');
        $res = [];
        foreach ($sorted  as $key => $value) {
            $res[] = $value;
        }
        $items = array_slice($res, 0,3);
        return response()->json($groupwithcount, 200); 
    }
}

