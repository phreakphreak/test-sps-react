import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services'
import Cookies from 'js-cookie'

export function useAuth({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: async ({
      password,
      email,
    }: {
      email: string
      password: string
    }) => {
      const result = await authService.authenticate(email, password)
      if (result.token) {
        Cookies.set('authToken', result.token)
        Cookies.set('type', result.user.type)
        Cookies.set('id', result.user.id)
      }
      return result
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
    },
  })
}
