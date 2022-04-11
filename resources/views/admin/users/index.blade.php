@extends('layouts.app')

@section('third_party_stylesheets')
    <style>
        /* .table th,
                                                    .table td {
                                                        padding: 0.75rem;
                                                        vertical-align: middle;
                                                        text-align: center;
                                                        border-top: 1px solid #dee2e6;
                                                    } */

    </style>
@endsection

@section('content')
    <!-- Content Wrapper. Contains page content -->

    <!-- Content Header (Page header) -->
    <div class="content-header">

    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">@lang('public.UserList')</h3>

                        </div>
                        <div class="card-body table-responsive p-0">
                            @if (isset($users))
                                <table class="table table-hover text-nowrap responsive nowrap" id="usersTable"
                                    sytle="text-align:center, vertical-align:middle">
                                    <thead class="" sytle="text-align:center, vertical-align:middle">
                                        <tr>
                                            <th scope="col" style="width:15vw;">@lang('public.UserName')</th>
                                            <th scope="col" style="width:15vw;">@lang('public.UserID')</th>
                                            <th scope="col" style="width:15vw;">@lang('public.Role')</th>
                                            <th scope="col" style="width:10vw;">@lang('public.UserApproval')</th>
                                            <th scope="col" style="width:10vw;">@lang('public.Remark')</th>
                                        </tr>
                                    </thead>
                                    <tbody sytle="text-align:center, vertical-align:middle">
                                        @foreach ($users as $user)
                                            <tr sytle="text-align:center, vertical-align:middle">
                                                <td id="tdtest" sytle="text-align:center, vertical-align:middle">
                                                    {{ $user->name }}</td>
                                                <td>{{ $user->user_id }}</td>

                                                <td>{{ implode(', ',$user->roles()->orderBy('id', 'ASC')->get()->pluck('name')->toArray()) }}
                                                </td>
                                                <td>
                                                    @if ($user->approved == 1)
                                                        Yes
                                                    @else
                                                        No
                                                    @endif
                                                </td>
                                                <td>
                                                    @can('manage_members')
                                                        <a href="{{ route('admin.users.show', $user->id) }}"><button
                                                                type="button" class="btn btn-outline-info float-center mr-2"><i
                                                                    class="fas fa-search"></i>
                                                                @lang('public.VIEW')</button></a>
                                                    @endcan
                                                    @can('delete-users')
                                                        <form action="{{ route('admin.users.destroy', $user) }}" method="POST"
                                                            class="float-left">
                                                        @endcan
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            @else
                                @if (session()->has('message'))
                                    <p class="alert alert-info">
                                        {{ session()->get('message') }}
                                    </p>
                                @endif
                            @endif

                        </div>
                        <div class="card-footer clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- // Modal Page -->
    <div class="modal fade" id="modal-lg">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">

                </div>
                <div class="modal-body overflow-hidden">

                </div>
            </div>
        </div>
    </div>
@endsection


@push('page_scripts')
    <script src="{{ mix('js/userIndex.js') }}" type="module"></script>
@endpush
