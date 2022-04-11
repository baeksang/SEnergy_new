<?php

use App\Models\User;
use App\Mail\WelcomeEMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\Admin\UsersController;


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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::redirect('/','/login');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

/* Localization Route */
Route::get('locale/{lang}', [App\Http\Controllers\LanguageController::class, 'setLang']);
Route::get('/mail', function() {
    $mail ='gumupeba@mailinator.com';
    Mail::to($mail)->send(new WelcomeEMail());
});


// Route::resource('/users', UsersController::class)->except(['create', 'store', 'destroy']);
Route::prefix('admin')->name('admin.')->group(function(){
    // Route::resource('/users',                           'UsersController', ['except' => ['create', 'store']]);
    Route::resource('/users', UsersController::class)->except(['create', 'store', 'destroy']);
});


Route::get('test', function(){

});
