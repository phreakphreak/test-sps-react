import { HttpClient } from '@/modules/shared/domain/http.client'
import { User } from '@/modules/user/user.interface'

export class AuthService {
  constructor(private readonly http: HttpClient) {}

  async authenticate(email: string, password: string) {
    type AuthResponse = {
      token: string
      user: User
    }
    return await this.http.post<AuthResponse>('/auth/login', {
      email: email,
      password: password,
    })
  }
}
