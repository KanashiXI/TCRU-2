<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        Schema::create('material', function (Blueprint $table) {
            
            $table->bigIncrements('material_id');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categorym');
            $table->string('material_name')->unique();
            $table->string('image')->nullable();
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
        Schema::dropIfExists('material');
    }
}
