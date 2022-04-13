@extends('layouts.app')

@section('third_party_stylesheets')
@endsection

@section('content')
    <!-- Content Wrapper. Contains page content -->

    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">

        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row justify-content-md-center">

                <!-- /.col -->
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header p-2">
                            <ul class="nav nav-pills" id="userMenu">
                                <li class="nav-item" style="padding-left: 2px; padding-right: 2px;">
                                    <a class="nav-link"
                                        href="{{ route('admin.users.index') }}">@lang('public.UserList')</a>
                                </li>
                                <li class="nav-item" style="padding-left: 2px; padding-right: 2px;">
                                    <a class="nav-link active" href="#activity"
                                        data-toggle="tab">@lang('public.UserRole')</a>
                                </li>
                                <li class="nav-item" style="padding-left: 2px; padding-right: 2px;">
                                    {{-- <a class="nav-link" href="#settings" data-toggle="tab"
                                        id="navSettings">@lang('public.Edit')</a> --}}
                                    <a class="nav-link" href="#" data-toggle="tab"
                                        id="editUser">@lang('public.Edit')</a>
                                </li>
                            </ul>
                        </div><!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                                <div class="active tab-pane" id="activity">
                                    <h3 class="profile-username text-center">{{ $user['name'] }}</h3><br>
                                    <ul class="list-group list-group-unbordered mb-3">
                                        <li class="list-group-item">
                                            <b>email</b> <a class="float-right">{{ $user['email'] }}</a>
                                        </li>
                                        {{-- @can('admin') --}}

                                        <li class="list-group-item">
                                            <b><label>@lang('public.Approval')</label></b>
                                            @if ($loginUserRole == 'admin')
                                                <a class="float-right"><input type="checkbox" name="approvalCheckbox"
                                                        data-bootstrap-switch-1 data-on-text="승인" data-off-text="대기"
                                                        style="display: block"></a>
                                            @else
                                                <a class="float-right" id="userApprovalStatus">
                                                    @if ($user['approved'] == 1)
                                                        승인
                                                    @else
                                                        대기
                                                    @endif
                                                </a>
                                            @endif
                                        </li>
                                        {{-- @endcan --}}
                                        <li class="list-group-item">
                                            <b>@lang('public.Role')</b>
                                            @if (!empty($userRole))
                                                <a class="float-right">{{ $userRole['name'] }}</a><br>
                                            @else
                                                <a class="float-right">@lang('public.There_is_no_Registred_roles')</a>
                                            @endif
                                        </li>
                                        <li class="list-group-item">
                                            <b>@lang('public.Level')</b>
                                            @if (!empty($userLevel))
                                                <a class="float-right">{{ $userLevel['kname'] }}</a><br>
                                            @else
                                                <a class="float-right">@lang('public.There_is_no_Registred_roles')</a>
                                            @endif
                                        </li>

                                        <li class="list-group-item">
                                            <b>@lang('public.Region')</b>
                                            @if (!empty($userRegions))
                                                @foreach ($userRegions as $userRegion)
                                                    <a class="float-right">{{ $userRegion['region_name'] }}</a><br>
                                                @endforeach
                                            @else
                                                <a class="float-right">@lang('public.There_is_no_Registred_roles')</a>
                                            @endif
                                        </li>

                                        <li class="list-group-item">
                                            <b>@lang('public.SiteRole')</b> <br>
                                            @if (!empty($userSites))
                                                <div class="card-body p-0">
                                                    <table
                                                        class="table table-striped projects text-nowrap nowrap responsive"
                                                        id="userSitesTable">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 30%">@lang('public.SiteName')</th>
                                                                <th style="width: 30%">@lang('public.RegionName')</th>
                                                                <th style="width: 5%" class="text-center">M</th>
                                                                <th style="width: 5%" class="text-center">S</th>
                                                                <th style="width: 5%" class="text-center">C</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            @foreach ($userSites as $userSite)
                                                                <tr>
                                                                    <td><a>{{ $userSite['site_name'] }}</a></td>
                                                                    <td>{{ $userSite['region_name'] }}</td>

                                                                    @if (in_array('monitoring', $userSite['accessName']))
                                                                        <td class="project-state"><span
                                                                                class="badge badge-success">M</span>
                                                                        </td>
                                                                    @else
                                                                        <td class="project-state"></td>
                                                                    @endif
                                                                    @if (in_array('subscribe', $userSite['accessName']))
                                                                        <td class="project-state"><span
                                                                                class="badge badge-success">S</span>
                                                                        </td>
                                                                    @else
                                                                        <td class="project-state"></td>
                                                                    @endif
                                                                    @if (in_array('control', $userSite['accessName']))
                                                                        <td class="project-state"><span
                                                                                class="badge badge-success">C</span>
                                                                        </td>
                                                                    @else
                                                                        <td class="project-state"></td>
                                                                    @endif

                                                                    {{-- <td class="project-state"><span class="badge badge-success">M</span></td>
                                  <td class="project-state"><span class="badge badge-success">S</span></td>
                                  <td class="project-state"><span class="badge badge-success">C</span></td> --}}
                                                                </tr>
                                                            @endforeach
                                                        </tbody>
                                                    </table>
                                                </div>
                                            @else
                                                <a class="float-right">@lang('public.There_is_no_Registred_roles')</a>
                                            @endif
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- /.tab-content -->
                        </div><!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </section>
    <!-- // Modal Page -->
    <div class="modal fade" id="modal-lg">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>회원 정보 수정</h4>
                    <button type="button" class="close modalCloseBtn" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body overflow-hidden">
                    {{-- <P>bla bla</P> --}}
                    <div class="card card-primary">
                        <form action="">
                            @can('admin')
                                @if ($modifiable == true)
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>@lang('public.Approval')</label>
                                                <a class="float-right"><input type="checkbox" name="approvalCheckbox"
                                                        data-bootstrap-switch data-on-text="승인" data-off-text="대기"
                                                        style="display: none"></a>
                                            </div>
                                            <!-- /.form-group -->
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                @endif
                            @endcan


                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>@lang('public.Role')</label>
                                        <select name="roles[]" id="select-role" class="select2_role float-right "
                                            multiple="multiple" data-placeholder="Select a Role" style="width: 100%;">
                                            @if (isset($roles))
                                                @foreach ($roles as $key => $role)
                                                    <option value="{{ $role['id'] }}">
                                                        {{ $role['name'] }}</option>
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>

                                    {{-- <div class="form-group" id="userLevel" style="display: none"> --}}
                                    <div class="form-group" id="userLevel">
                                        <label>@lang('public.Level')</label>
                                        <select name="levels[]" id="select-level" class="select2_level" multiple="multiple"
                                            data-placeholder="Select a Level" style="width: 100%;">
                                            @if (isset($levels))
                                                @foreach ($levels as $key => $level)
                                                    <option value="{{ $level['id'] }}">
                                                        {{ $level['name'] }}</option>
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>

                                    <div class="form-group" id="userRegion">
                                        <label>@lang('public.Region')</label>
                                        <select name="regions[]" id="select-region" class="select2_region"
                                            multiple="multiple" data-placeholder="Select regions" style="width: 100%;">
                                            @if (isset($regions))
                                                @foreach ($regions as $key => $region)
                                                    <option value="{{ $region['id'] }}">
                                                        {{ $region['region_name'] }}</option>
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>

                                    <div class="form-group" id="userAccess">
                                        <label>현장</label>
                                        <div class="card-body p-0">
                                            <table class="table table-striped projects text-nowrap nowrap responsive"
                                                id="userEditTable">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 20%">@lang('public.Site')
                                                        </th>
                                                        <th style="width: 20%">
                                                            @lang('public.Region')</th>
                                                        {{-- <th style="width: 20%">
                                                            @lang('public.SiteCode')</th> --}}
                                                        <th style="width: 50%" class="text-center">
                                                            @lang('public.Role')</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>



                                </div>
                                <!-- /.col -->
                            </div>
                            <div class="card-footer">
                                @lang('public.You_must_select_one_role_at_least')
                            </div>


                            <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-danger text-uppercase modalCloseBtn"
                                    style="letter-spacing: 0.1em;">취소</button>
                                <button type="button" class="btn btn-info text-uppercase"
                                    style="letter-spacing: 0.1em;">수정</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var user = {!! json_encode($user) !!};
        var userRole = {!! json_encode($userRole) !!};
        var userLevel = {!! json_encode($userLevel) !!};
        var userRegions = {!! json_encode($userRegions) !!};
        var modifiable = {!! json_encode($modifiable) !!};
        var accesses = {!! json_encode($accesses) !!};
    </script>
    <script src="{{ mix('js/user.js') }}"></script>
@endsection
@section('third_party_scripts')
@endsection
