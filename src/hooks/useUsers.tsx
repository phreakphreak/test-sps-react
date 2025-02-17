import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services'
import { UnauthorizedError } from '@/modules/shared/infrastructure/axios-http.client'
import { useNavigate } from 'react-router-dom'

export function useUsers() {
  const navigate = useNavigate()
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await userService.list()
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate('/logout')
          return
        }
        throw error
      }
    },
  })
}
