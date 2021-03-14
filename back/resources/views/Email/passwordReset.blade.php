@component('mail::message')
# คำขอเปลี่ยนรหัสผ่าน

กดที่นี่เพื่อเปลี่ยนรหัสผ่านของคุณ

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.$token])
เปลี่ยนรหัสผ่าน
@endcomponent

ขอบคุณ,<br>
{{ config('app.name') }}
@endcomponent
