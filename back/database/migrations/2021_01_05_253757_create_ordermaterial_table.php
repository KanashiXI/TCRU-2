<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdermaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordermaterial', function (Blueprint $table) {
            $table->increments('id');
            // $table->integer('Employees_id')->unsigned();
            // $table->foreign('Employees_id')->references('id')->on('Employees');
            $table->integer('material_id')->unsigned();
            // $table->foreign('material_id')->references('id')->on('material_id');
            // $table->integer('status_id')->unsigned()->default(1);
            $table->integer('quantity')->nullable();
            // $table->foreign('status_id')->references('id')->on('statuses');
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
        Schema::dropIfExists('ordermaterial');
    }
}
