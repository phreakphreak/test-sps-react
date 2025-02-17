import { HttpClient } from '@/modules/shared/domain/http.client'
import { User } from '@/modules/user/user.interface'

class UserService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<User[]> {
    return await this.http.get('/users')
  }

  async delete(id: string): Promise<boolean> {
    return await this.http.delete(`/users/${id}`)
  }

  async create(
    user: Omit<User, 'id'> & { password: string }
  ): Promise<boolean> {
    return await this.http.post(`/users`, user)
  }

  async update(
    id: string,
    user: Partial<Omit<User, 'id'> & { password: string }>
  ): Promise<boolean> {
    return await this.http.patch(`/users/${id}`, user)
  }

  async findById(id: string): Promise<User> {
    return await this.http.get<User>(`/users/${id}`)
  }
}

export { UserService }
