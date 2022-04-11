<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {


        if(Session::get("locale") != null)
        {
            App::setLocale(Session::get("locale"));
        } else {
            if( isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
                $browser_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
                Session::put("locale", $browser_lang);
                App::setLocale(Session::get("locale"));
            } else {

            }

        }


        return $next($request);
    }
}
