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
            ->select('product.product_name', 'product_in_order.count', 'product.product_description', 
                    'product.retail_price', 'product.weight', 'product.unit'
                    )
            ->get();
        $groups = $getall->groupBy('product_name'); 
        $groupwithcount = $groups->mapWithKeys(function ($group, $key) {
            return [
                    $key =>
                        [
                            'product_name' => $key, 
                            'count' => $group->sum('count'),
                        ]
            ];
        });
        $res = [];
        foreach ($groupwithcount  as $key => $value) {
            $res[] = $value;
        }
        return response()->json($res ,200); 
    }
}

                // Collection::macro('toAssoc', function () {
        //     return $this->reduce(function ($assoc, $keyValuePair) {
        //         list($key, $value) = $keyValuePair;
        //         $assoc[$key] = $value;
        //         return $assoc;
        //     }, new static);
        // });

        // $collection = $groupwithcount->map(function ($item) {
        //     return $item->only(['product_name', 'count']);
        // });

        // $grouped = $getall->groupBy('product_name')->map(function ($item) {
        //     return  [
        //         // 'product_name' => $group->first()['product_name'],
        //         'count' => $item->sum('count'),
        //     ];
        //     // $item->sum('count'); 
        // });


        // $groupwithcount = $groups->map(function ($group) {
        //     return [
        //         'product_name' => $group->first()['product_name'], // opposition_id is constant inside the same group, so just take the first or whatever.
        //         'count' => $group->sum('count'),

        //     ];
        // });  

        // $mappedCollection = collect($data->first())->mapWithKeys(function($item,$key) use($data){
        //     return[
        //        $item => $data->map(function ($mapItem, $mapKey) use($item) {         
        //           return $mapItem[$item];
        //        })
        //     ];
        //  })->mapWithKeys(function($item,$key){
        //     $eachLine = collect($item->first())->mapWithKeys(function($mapItem) use($item){
        //        return[ $mapItem => $item->sum($mapItem)  ];
        //     });       
        //     return [$key =>  $eachLine];
        //  })->all();


        // $scores = $data->mapToDictionary(function ($item, $key) {
        //     return [$item['product_name'] => $item['count']];
        // });

                // $sums = $collection->map(function ($option) {
        //     return $option
        //         ->groupBy('product_name')
        //         ->map(function($group) {
        //            // Loop through each group and reduce them.
        //            $group->reduce(function($carry, $item) {
        //                 // Assume that we always want the last value by using php end() function on array.
        //                 return $carry + end($item);
        //            }, 0);
        //         });
        
        // });

        
        // $sums = $collection->map(function ($group, $key) {
        //     return [$key => $group->sum('count')];
        // });