import { AuthService } from '@/services/auth.service'
import { httpClient } from '@/modules/shared'
import { UserService } from '@/services/user.service'

export const userService = new UserService(httpClient)
export const authService = new AuthService(httpClient)
