<?php

namespace App\Http\Controllers;
use Excel;
use App\Customers;
use Illuminate\Http\Request;
use App\Imports\CustomersImport;
class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCustomers()
    {
        $getall = customers::all();
        return response()->json($getall,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = array('result'=>true, 'message' => 'success');
        try{
            Excel::load($request->file('fileItem'), function ($reader){
                $reader->each(function($sheet){
                    $row = $sheet->toArray();
                    // check
                    // createtry
            
                    $new = new customers;
                    $new -> customer_id = $row['customer_id'];
                    $new -> firstname = $row['firstname'];
                    $new -> lastname = $row['lastname'];
                    $new -> address = $row['address'];
                    // $new -> houseNo = $row['houseNo'];
                    // $new -> subdistrict = $row['subdistrict'];
                    // $new -> district = $row['district'];
                    // $new -> province = $row['province'];
                    // $new -> postalcode = $row['postalcode'];
                    $new -> phoneNumber = $row['phonenumber'];
                    $new -> save();
                });
            });
        } catch (\Exception $th) {
            //throw $th;
            $data['result'] = false;
            $data['message'] = $th->getMessage();
        }
        // dd(Excel::import(new CustomersImport,$request->file('fileItem')));

        return response()->json($data, 200);

        // return back()->withStatus('success', 'Insert Record successfully.');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customers $customers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $new = customers::find($id);
        return response()->json(['newitem' => $new->delete(), 'id' => $id]);
    }

    public function deleteCustomer (Request $request, $id)
    {
        $deleteCustomer = customers::Where('customer_id', $id)->delete();
        if(isset($deleteCustomer))
        {
            return response()->json([
                'status' => true,
                'message' => 'success',
                'isDelete' => $deleteCustomer
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => false,
                'message' => 'error',
            ], 400);
        }
    }
}
