<?php

namespace App\Imports;

use App\Customers;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class Import implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // dd($row);
        return new Customers([
            'customer_id' => $row['customer_id'],
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'houseNo.' => $row['houseNo'],
            'subdistrict' => $row['subdistrict'],
            'district' => $row['district'],
            'province' => $row['province'],
            'postalcode' => $row['postalcode'],
            'phoneNumber' => $row['phonenumber']
        ]);
    }
}
