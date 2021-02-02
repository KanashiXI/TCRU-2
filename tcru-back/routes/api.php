<?php

use Illuminate\Http\Request;
use App\Http\Requests ;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/material','MaterialController@addMaterial');
Route::post('/material1','MaterialController@getMaterial1');
// Route::gat('/material','MaterialController@getMaterial');
Route::delete('/delete/{material_id}','MaterialController@destroy');
Route::PATCH('/update/{material_id}','MaterialController@updateMaterial');
Route::get('/getMaterial/{material_id}','MaterialController@getOneMaterial');

Route::post('/product','ProductController@addProduct');
Route::post('/product1','ProductController@getProduct1');
// Route::get('/product','ProductController@getProduct');
Route::delete('/delete1/{product_id}','ProductController@destroyp');
Route::PATCH('/update1/{product_id}','ProductController@updateProduct');
Route::get('/getproduct1/{product_id}','ProductController@getOneProduct');


Route::post('/Customers2','CustomerController2@getcustomer1');
// Route::get('/product','ProductController@getProduct');
Route::delete('/deleteCustomers/{customer_id}','CustomerController2@destroy');
Route::PATCH('/updateCustomers/{customer_id}','CustomerController2@updatecustomer');
Route::get('/getCustomers1/{customer_id}','CustomerController2@getOnecustomer');

Route::get('/Customers', 'CustomerController@getCustomers');
Route::post('/Customers', 'CustomerController@create');

Route::get('/category', 'CategoryController@getcategory');