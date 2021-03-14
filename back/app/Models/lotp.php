<?php

namespace App\Models;

use DB;

class lotp
{
    function getlotp($product_id)
    {
        $data=DB::table('lot_product')->where('product_id',$product_id)
        ->Join('producttcru','producttcru.id', '=', 'lot_product.product_id')
        ->Join('employee','employee.id', '=', 'lot_product.employee_id')
        ->get();
                return $data;
    }
    function getstock_product()
    {
        $data = DB::table("stock_product")->get();
        return $data;
    }
    function getlotp1()
    {
        $data = DB::table("lot_product")->get();
        return $data;
    }
    function addlotp($data)
    {
        DB::table("lot_product")->insert($data);
    }
    function getOnelotp($product_id)
    {
        $data = DB::table("lot_product")->where("product_id",$product_id)->get()->first();
        return $data;
    }
    function getlotp11()
    {
        // $data = DB::table('lot_product')
        //         ->group_by('stock_product', 'lot_product.product_id', '=', 'stock_product.product_id')
        //         // ->group_by('lot_product.product_id')
        //         ->select( DB::raw('count(lot_product.product_id) as sumproduct'))
        //         ->get();
        //         return $data;

                $data = DB::table('lot_product')
                ->Join('producttcru','producttcru.id', '=', 'lot_product.product_id')
                ->select('lot_product.product_id','producttcru.product_name', DB::raw('SUM(final_amount) as sumproduct'))
                ->groupBy('lot_product.product_id','producttcru.product_name')
                // ->havingRaw('SUM(final_amount) > ?', [2500])
                ->get();
                return $data;

        // $users = DB::table('users')
        //     ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
        //     ->get();

        // $data = DB::table('lot_product')->where('product_id',$product_id)
        // ->get()->sum('final_amount')->insert('stock_product', 'stock_product.id');
        
    }
}
