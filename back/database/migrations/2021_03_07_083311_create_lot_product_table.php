<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLotproductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lot_product', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('product_id');
            // $table->foreign('product_id')->references('id')->on('product');
            $table->unsignedBigInteger('production_id');
            // $table->foreign('production_id')->references('id')->on('production');
            $table->unsignedBigInteger('stock_product_id');
            // $table->foreign('stock_product_id')->references('id')->on('stock_product');
            $table->unsignedBigInteger('employee_id');
            // $table->foreign('employee_id')->references('id')->on('employee');
            $table->integer('final_amount');
            $table->string('status')->nullable();
            $table->timestamp('MFG')->nullable();
            $table->timestamp('EXP')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lot_product');
    }
}
