<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link href="{{ mix('css/admin-lte.css') }}" rel="stylesheet">
    {{-- <link href="{{ mix('css/app.css') }}" rel="stylesheet"> --}}


    @yield('third_party_stylesheets')

    @stack('page_css')
</head>

<body class="hold-transition sidebar-mini layout-fixed">
    <div class="dark-mode">
        <div class="wrapper">
            <!-- Main Header -->
            @include('layouts.mainheader')

            <!-- Left side column. contains the logo and sidebar -->
            @include('layouts.sidebar')

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <section class="content">
                    @yield('content')
                </section>
            </div>

            <!-- Main Footer -->
            @include('layouts.footer')
        </div>
    </div>

    @section('scripts')
        {{-- <script src="{{ mix('js/app.js') }}"></script> --}}
        <script src="{{ mix('/js/manifest.js') }}" charset="utf-8"></script>
        <script src="{{ mix('/js/vendor.js') }}" charset="utf-8"></script>
        @yield('third_party_scripts')
        <script src="{{ mix('js/admin-lte.js') }}"></script>
        @stack('page_scripts')
    </body>

    </html>
