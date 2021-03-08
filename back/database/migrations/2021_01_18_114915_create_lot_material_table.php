<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLotMaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lot_material', function (Blueprint $table) {
            $table->bigIncrements('id');
            // $table->unsignedBigInteger('product_id');
            // $table->foreign('product_id')->references('id')->on('product');
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
        Schema::dropIfExists('lot_material');
    }
}
