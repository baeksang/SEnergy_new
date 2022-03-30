<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ config('app.name') }} | Registration Page</title>

    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossorigin="anonymous"/> --}}

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">



</head>

<body class="hold-transition register-page">
    <div class="register-box">
        <div class="register-logo">
            {{-- <a href="{{ url('/home') }}"><b>{{ config('app.name') }}</b></a> --}}
            <b>Scope</b>Energy</a>
        </div>

        <div class="card">
            <div class="card-body register-card-body">
                <p class="login-box-msg">Register a new membership</p>

                <form method="post" action="{{ route('register') }}">
                    @csrf


                    <div class="form-group">
                        {{-- User ID section --}}
                        <div class="input-group mb-3">
                            <input type="text" class="form-control @error('user_id') is-invalid @enderror" id="user_id"
                                name="user_id" placeholder="User ID" value="{{ old('user_id') }}"
                                autocomplete="user_id" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-id-badge"></span>
                                </div>
                            </div>
                            @error('user_id')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- User Name section --}}
                        <div class="input-group mb-3">
                            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror"
                                name="name" placeholder="User Name" value="{{ old('name') }}" required
                                autocomplete="name">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                            @error('name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- User Email Section --}}
                        <div class="input-group mb-3">
                            <input id="email" type="text" class="form-control @error('email') is-invalid @enderror"
                                name="email" placeholder="User Email" value="{{ old('email') }}" required
                                autocomplete="email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- User Company Name Section --}}
                        <div class="input-group mb-3">
                            <input id="company" type="text" class="form-control @error('company') is-invalid @enderror"
                                name="company" placeholder="Company Name" value="{{ old('company') }}" required
                                autocomplete="company">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-building"></span>
                                </div>
                            </div>
                            @error('company')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>


                        {{-- User locale Section --}}
                        {{-- <div class="input-group mb-3" placeholder="{{ __('Locale') }}">
                            <select name="locale" id="locale" class="form-control @error('locale') is-invalid @enderror"
                                placeholder="Nation" value="{{ old('locale') }}" required
                               ">
                                <option value="" disabled selected>User Nation</option>
                                <option type="text" value="82">Korea</option>
                            </select>
                            @error('locale')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-globe-asia"></span>
                                </div>
                            </div>
                        </div> --}}

                        {{-- User Office Phone Section --}}
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <select name="ITU_office_phone_number" id="ITU_office_phone_number"
                                    class="form-control @error('ITU_office_phone_number') is-invalid @enderror"
                                    required>
                                    <option value="02" type="text">02</option>
                                    <option value="031" type="text">031</option>
                                    <option value="032" type="text">032</option>
                                    <option value="033" type="text">033</option>
                                    <option value="041" type="text">041</option>
                                    <option value="042" type="text">042</option>
                                    <option value="043" type="text">043</option>
                                    <option value="044" type="text">044</option>
                                    <option value="051" type="text">051</option>
                                    <option value="052" type="text">052</option>
                                    <option value="053" type="text">053</option>
                                    <option value="054" type="text">054</option>
                                    <option value="055" type="text">055</option>
                                    <option value="061" type="text">061</option>
                                    <option value="062" type="text">062</option>
                                    <option value="063" type="text">063</option>
                                    <option value="064" type="text">064</option>
                                </select>
                            </div>
                            <input type="text" id="office_phone_number"
                                onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Office Phone Number"
                                class="form-control @error('office_phone_number') is-invalid @enderror"
                                name="office_phone_number" value="{{ old('office_phone_number') }}"
                                autocomplete="office_phone_number">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-phone"></span>
                                </div>
                            </div>
                            @error('office_phone_number')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- User mobile Phone Section --}}
                        <div class="input-group mb-3">

                            <input type="text" id="mobile_phone_number"
                                onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" placeholder="Mobile Phone Number"
                                class="form-control @error('mobile_phone_number') is-invalid @enderror"
                                name="mobile_phone_number" value="{{ old('mobile_phone_number') }}"
                                autocomplete="mobile_phone_number" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-mobile-alt"></span>
                                </div>
                            </div>
                            @error('mobile_phone_number')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- User Password Section --}}
                        <div class="input-group mb-3">
                            <input id="password" type="password" class="form-control"
                                placeholder="Please enter at least 8 characters"
                                class="form-control @error('password') is-invalid @enderror" name="password" required
                                autocomplete="new-password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- User Password Confirm Section --}}
                        <div class="input-group mb-3">
                            <input id="password-confirm" type="password" class="form-control"
                                placeholder="Re enter password"
                                class="form-control @error('password') is-invalid @enderror"
                                name="password_confirmation" required autocomplete="new-password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>


                        {{-- User Role Section --}}

                        <div class="input-group mb-3" placeholder="">

                            <select name="role" id="select-role" class="select2_role" multiple="multiple"
                                data-placeholder="권한 선택" style="width: 100%;" required>
                                @if (isset($roles))
                                    @foreach ($roles as $key => $role)
                                        <option value="{{ $role['id'] }}">{{ $role['name'] }}</option>
                                    @endforeach
                                @endif
                            </select>
                            @error('role')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>


                        {{-- User Region Section --}}

                        <div class="input-group mb-3" placeholder="">

                            <select name="region" id="select-region" class="select2_region" multiple="multiple"
                                data-placeholder="담당할 지역" style="width: 100%;" required>
                                <option value=""></option>
                            </select>
                            @error('region')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        {{-- <button class="btn btn-primary" onclick="stepper.previous()">이전</button> --}}
                        <button type="submit" class="btn btn-primary  float-right">등록</button>

                    </div>

                </form>

                <a href="{{ route('login') }}" class="text-center">I already have a membership</a>
            </div>
            <!-- /.form-box -->
        </div><!-- /.card -->

        <!-- /.form-box -->
    </div>
    <!-- /.register-box -->



    <script src="{{ mix('js/app.js') }}"></script>
    <script src="{{ mix('js/auth.js') }}"></script>
    <script>
        const regions = {!! json_encode($regions) !!};
    </script>
</body>


</html>















































{{-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ config('app.name') }} | Registration Page</title>

    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossorigin="anonymous"/>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

</head>
<body class="hold-transition register-page">
<div class="register-box">
    <div class="register-logo">
        <a href="{{ url('/home') }}"><b>{{ config('app.name') }}</b></a>
    </div>

    <div class="card">
        <div class="card-body register-card-body">
            <p class="login-box-msg">Register a new membership</p>

            <form method="post" action="{{ route('register') }}">
                @csrf

                <div class="input-group mb-3">
                    <input type="text"
                           name="name"
                           class="form-control @error('name') is-invalid @enderror"
                           value="{{ old('name') }}"
                           placeholder="Full name">
                    <div class="input-group-append">
                        <div class="input-group-text"><span class="fas fa-user"></span></div>
                    </div>
                    @error('name')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="input-group mb-3">
                    <input type="email"
                           name="email"
                           value="{{ old('email') }}"
                           class="form-control @error('email') is-invalid @enderror"
                           placeholder="Email">
                    <div class="input-group-append">
                        <div class="input-group-text"><span class="fas fa-envelope"></span></div>
                    </div>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="input-group mb-3">
                    <input type="password"
                           name="password"
                           class="form-control @error('password') is-invalid @enderror"
                           placeholder="Password">
                    <div class="input-group-append">
                        <div class="input-group-text"><span class="fas fa-lock"></span></div>
                    </div>
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="input-group mb-3">
                    <input type="password"
                           name="password_confirmation"
                           class="form-control"
                           placeholder="Retype password">
                    <div class="input-group-append">
                        <div class="input-group-text"><span class="fas fa-lock"></span></div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                            <input type="checkbox" id="agreeTerms" name="terms" value="agree">
                            <label for="agreeTerms">
                                I agree to the <a href="#">terms</a>
                            </label>
                        </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Register</button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

            <a href="{{ route('login') }}" class="text-center">I already have a membership</a>
        </div>
        <!-- /.form-box -->
    </div><!-- /.card -->

    <!-- /.form-box -->
</div>
<!-- /.register-box -->

<script src="{{ mix('js/app.js') }}" defer></script>

</body>
</html> --}}
