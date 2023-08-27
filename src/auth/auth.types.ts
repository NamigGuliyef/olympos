
export interface userSignUpResponse {
  message: string
}

export interface userSignInResponse {
  email: string
  password: string
}

export interface userTokenResponse {
  token: string
  message: string
}

export interface forgetPassResponse {
  email: string
}

export interface verifyCodeResponse {
  verify_code: number
}

export interface recoveryPassword {
  new_password: string
  repeat_pasword: string
}

