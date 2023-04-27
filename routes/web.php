<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/dashboard')->group(function () {

        Route::any('/{any?}', function () {
            return view('dashboard.layouts.app');
        })->where(['any' => '.*']);

    });
});


//Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'view_dashboard'])->name('dashboard');
