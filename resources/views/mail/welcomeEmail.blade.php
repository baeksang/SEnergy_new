@component('mail::message')
    GS Energy Monitoring 가입을 축하합니다. <br>
    관리자 승인 이 후, 서비스를 이용할 수 있습니다
    @component('mail::button', ['url' => config('app.url')])
        바로가기
    @endcomponent
    감사합니다,<br>
    {{ config('app.name') }}
@endcomponent
