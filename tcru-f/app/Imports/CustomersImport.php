<?php

namespace App\Imports;

use App\Customers;

class CustomersImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        var_dump($row);
        // return new Customers([
        //     'customer_id' => $row['customer_id'],
        //     'firstname' => $row['firstname'],
        //     'lastname' => $row['lastname'],
        //     'address' => $row['address'],
        //     'phoneNumber' => $row['phonenumber']
        // ]);
        return true;
    }
}
