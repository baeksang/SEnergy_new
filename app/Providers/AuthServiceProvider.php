<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //

        // Access Auth
        Gate::define('super-users', function($user){
            return $user->hasRole('super');
        });

        Gate::define('manage_members', function($user){
            return $user->hasAnyRoles(['admin','manager']);
        });

        Gate::define('admin', function($user){
            return $user->hasRole('admin');
        });

        Gate::define('manager', function($user){
            return $user->hasRole('manager');
        });
    }
}
