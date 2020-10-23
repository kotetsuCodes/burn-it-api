import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export class AuthorizedRequest {
  success: boolean
  error: string

  constructor(success: boolean, error: string) {
    this.success = success
    this.error = error
  }
}

export class Auth {
  public static authorizeRequest(req: any): AuthorizedRequest {

    try {
      const authHeader: string = req.header("Authorization")
      const decodedJwt = Auth.verifyJwt(authHeader)

      return new AuthorizedRequest(true, '')
    } catch (error) {
      return new AuthorizedRequest(false, error)
    }
  }

  public static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void): void {
    bcrypt.hash(password, rounds, (error, hash) => {
      callback(error, hash)
    })
  }

  public static comparePassword(password: string, inPassword: string, callback: (error: Error, result: boolean) => void): void {
    bcrypt.compare(password, inPassword, (error: Error, result: boolean) => {
      callback(error, result)
    })
  }

  public static generateJwt(email: string, id: number): string {
    const jwtToken = jwt.sign({
      email: email,
      _id: id
    }, process.env.JWT_SECRET)

    return jwtToken
  }

  public static verifyJwt(token: string): string | object {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}