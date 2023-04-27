<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->integer('number')->unique();
            $table->date('date')->nullable();
            $table->string('time')->nullable();


            $table->string('patient_code')->nullable();
            $table->foreign('patient_code')->references('code')->on('patients')->onDelete('set null');

            $table->string('doctor_code')->nullable();
            $table->foreign('doctor_code')->references('code')->on('doctors')->onDelete('set null');
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
        Schema::dropIfExists('appointments');
    }
}
