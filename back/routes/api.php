<?php
Route::group([
    'middleware' => 'api',
], function () {

    //api auth
    Route::post('me', 'AuthController@me');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('signup', 'AuthController@signup');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('resetPassword', 'ChangePasswordController@process');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    
    //api profile(table'users')
    Route::get('/profile', 'AuthController@userProfile'); 
    Route::get('register','RegisterController@getcustomer'); //get data
    Route::post('/register','RegisterController@createcustomer'); //create data
    Route::post('setrole','RegisterController@setRoleUser');


    Route::post('editprofile','EditprofileController@editprofile');
    Route::get('emailvailate/{email}','RegisterController@getCustomerByEmail'); 
    Route::get('/register/{username}','RegisterController@getCustomerByUsername');    

    //api ใบกำกับภาษี
    Route::post('tax','TaxController@createTax'); //เพิ่มข้อมูลใบกำกับภาษี
    Route::post('edittax','TaxController@editTax');
    Route::get('tax/{userId}', 'TaxController@gettaxById'); //ค้นหาใบกำกับภาษีด้วยไอดีผู้ใช้
    Route::delete('tax/{taxId}', 'TaxController@deleteTax'); //ค้นหาใบกำกับภาษีด้วยไอดีผู้ใช้
    //เพิ่ม
    Route::get('onetax/{tax_id}', 'TaxController@getOneTax');


    //api ที่อยู่จัดส่งสินค้า(dropdown)
    Route::get('province', 'ProvinceController@getprovinces');
    Route::post('amphures', 'AumphureController@getAumphure');
    Route::post('districts', 'DistrictController@getDistrict');

    //api ที่อยู่จัดส่งสินค้า(form)
    //api แสดงที่อยู่จัดส่งสินค้า, เพิ่มที่อยู่จัดส่งสินค้า, ลบที่อยู่จัดส่งสินค้า, แก้ไขที่อยู่จัดส่งสินค้า (table'address') , แก้ไขสถานะการเลือทที่อยู่จัดส่งสินค้า
    Route::get('shipaddress/{userId}', 'AddressController@getUserShippingAddress');
    Route::post('shipaddress','AddressController@createShippingAddress'); //เพิ่มที่อยู่ใน table address
    Route::delete('shipaddress/{address_id}', 'AddressController@deleteShippingAddress');
    Route::post('editshipaddress','AddressController@editShippingAddress');
    Route::post('editAddStatus','AddressController@editAddressStatus');

    //เพิ่ม
    Route::get('oneaddress/{address_id}', 'AddressController@getOneShippingAddress');

    //api product
    Route::get('product','ProductController@getproduct'); //get data
    Route::get('productdetail/{product_id}','ProductController@getOneProduct'); //get data
    Route::get('producttype','ProductController@getproductType'); //get data product type
    Route::get('hotproduct','ProductController@bestsalseProduct'); 

    //api cart 
    // แสดงรายการสินค้าในตะกร้า
    Route::get('cartlist/{user_id}','CartController@getCartByUserId');
    // ลบสินค้าในตะกร้า
    Route::delete('deleteproduct/{cart_id}','CartController@deleteCartByProductId');
    // แก้ไขจำนวนสินค้าในตะกร้า
    Route::post('editproduct','CartController@editCartByProductId');
    // ค้นหาสินค้าชิ้นนั้นๆ
    Route::get('searchproduct/{product_id}/{userId}','CartController@getProductByProductId');
    // เพิ่มสินค้า
    Route::post('addproductcart','CartController@addtoCart');
    // 
    Route::post('updateProductCart','CartController@updateProductInCart');

    // coupon
    Route::get('coupon/{user_id}','CouponController@checkCoupon');

    // ออเดอร์
    Route::post('cartcheckout','OrderController@createOrder');
    Route::post('order','OrderController@fillOrder');
    Route::post('deletefromcart','OrderController@deleteFromCart');
    Route::get('getOrder','OrderController@getOrder');

    //จัดส่งสินค้า
    Route::get('getShippingOrder','ShippingController@getShippingOrder');
    Route::get('getOneShipping/{shipping_id}', 'ShippingController@getOneShipping');
    Route::get('getShipping/{a}', 'ShippingController@getDetailShipping');


        // โปรโมชัน
    Route::get('promotion','PromotionController@getPromotion'); // all promotion
    Route::post('addpromotion','PromotionController@addPromotion'); 
    Route::delete('deletepromotion/{promotion_id}','PromotionController@deletePromotion'); 
    Route::post('editpromotion','PromotionController@editPromotion');
    Route::get('onePromotion/{promotion_id}', 'PromotionController@getOnePromotion');
    Route::get('cartpromotion','PromotionController@getCartPromotion'); //promotion in cart
    

        // วัตถุดิบ
    Route::post('/material','MaterialController@addMaterial');
        // แสดงวัตถุดิบ+ประเภท
    Route::post('/material1','MaterialController@getMaterial1');
    Route::delete('/delete/{material_id}','MaterialController@destroy');
    Route::PATCH('/update/{material_id}','MaterialController@updateMaterial');
    Route::get('/getMaterial/{material_id}','MaterialController@getOneMaterial');
    Route::get('getByname/{material_name}','nameController@getByname');
        // แสดงประเภทไว้เพิ่มข้อมูลวัตถุดิบ
    Route::get('/categorym','CategoryController@getcategory');
    
        //หน่วยนับ
        Route::get('/unit_count', 'CategorypController@getunit_count');

        
    Route::get('/categoryp', 'CategorypController@getcategory');
    Route::post('/producttcru','Product1Controller@addProduct');
        // Route::get('/product','Product1Controller@getProduct');
    Route::post('/product1','Product1Controller@getProduct');
    Route::delete('/delete1/{id}','Product1Controller@destroyp');
    Route::PATCH('/update1/{id}','Product1Controller@updateProduct');
    Route::get('/getproduct1/{id}','Product1Controller@getOneProduct');
    
    
    Route::get('/supplier11','supplierController@getsupplier1');
    Route::post('/supplier','supplierController@addsupplier');
    Route::post('/supplier1','supplierController@getsupplier');
    Route::delete('/delete1/{id}','SupplierController@destroys');
    Route::PATCH('/supplierupdate1/{id}','supplierController@updatesupplier');
    Route::get('/getsupplier1/{id}','supplierController@getOnesupplier');

    Route::get('/lotp/{product_id}','lotpControlle@getlotp');
    Route::post('/lotp','lotpControlle@addlotp');
    Route::get('/lotp1/{product_id}','lotpControlle@getOnelotp');
    Route::get('/lotp111','lotpControlle@getlotp11');
    Route::get('/stock_product','lotpControlle@getstock_product');
    

    


    Route::post('/Customers2','CustomerController2@getcustomer1');
    // Route::get('/product','ProductController@getProduct');
    Route::delete('/deleteCustomers/{customer_id}','CustomerController2@destroy');
    Route::PATCH('/updateCustomers/{customer_id}','CustomerController2@updatecustomer');
    Route::get('/getCustomers1/{customer_id}','CustomerController2@getOnecustomer');

    Route::get('/Customers', 'CustomerController@getCustomers');
    Route::post('/Customers', 'CustomerController@create');

    //ใบสั่งซื้อวัตถุดิบ
    Route::get('/orderMaterials', 'OrderMaterialController@getorderMaterialsall');
    Route::post('/addorderM', 'OrderMaterialController@addOrderMaterials');
    Route::post('/Ordermaterial1', 'OrderMaterialController@getorderMaterialsSkipAndLimit');
    Route::delete('/deleteOrderM/{order_material_id}', 'OrderMaterialController@destroys');
    Route::get('/unit_material', 'OrderMaterialController@getunit_material');

    // login
    Route::post('login', 'AdminController@login');
    Route::post('logout', 'AdminController@logout');
    Route::post('refresh', 'AdminController@refresh');
    Route::post('meAdmin', 'AdminController@meAdmin');
});






















// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'shop'
// ], function () {

// });