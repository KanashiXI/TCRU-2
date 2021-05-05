<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class AdminController extends Controller
{
    public function __constructAdmin()
    {
        $this->middleware('autu:api', ['except' => ['login']]);
    }

    public function login()
    {
        $credentials = request(['username', 'password']);

        if(!$token = auth()->attempt($credentials))
        {
            return response()->json(['error' => 'Username or Password does\'t exist'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function meAdmin()
    {
        return response()->json(auth()->admin());
    }

    public function logout()
    {
        ayth()->logout();

        return response()->json(['massage' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'admin' => auth()->admin()->username
        ]);
    }
}
