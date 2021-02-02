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
            // $table->unsignedbigInteger('category_id')->unsigned()->nullable();
            // $table->foreign('category_id')->references('id')->on('categoryproduct')->onDelete('cascade');
            $table->string('material_name');
            $table->string('category')->nullable();
            $table->integer('weight')->nullable();
            $table->integer('price')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();

            // $table->foreign('category_id')
            // ->references('id')
            // ->on('categorymaterial')
            // ->onDelete('cascade');
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
