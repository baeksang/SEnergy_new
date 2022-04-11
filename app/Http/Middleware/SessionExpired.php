<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Session\Store;

class SessionExpired
{
    protected $session;
    protected $timeout = 60*60*2;

    public function __construct(Store $session)
    {
        $this->session = $session;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {


        $isLoggedIn = $request->path() != 'dashboard/logout';
        if(!session('lastActivityTime'))
        {
            $this->session->put('lastActivityTime', time());
        }
        elseif(time() - $this->session->get('lastActivityTime') > $this->timeout)
        {
            $this->session->forget('lastActivityTime');
            $cookie = cookie('intend', $isLoggedIn ? url()->current() : 'dashboard');
            //$email = $request->user()->email;
            auth()->logout();
            //return message('You had not activity in '.$this->timeout/60 .' minutes ago.', 'warning', 'login')->withInput(compact('email'))->withCookie($cookie);
        }

        $isLoggedIn ? $this->session->put('lastActivityTime', time()) : $this->session->forget('lastActivityTime');

        return $next($request);
    }
}
