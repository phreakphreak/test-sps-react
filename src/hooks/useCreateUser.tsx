import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from '@/modules/user/user.interface'
import { userService } from '@/services'

export function useCreateUser({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (user: Omit<User, 'id'> & { password: string }) => {
      await userService.create(user)
      return true
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] })
      if (onSuccess) {
        onSuccess()
      }
    },
  })
}

export function useUpdateUser({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      user,
    }: {
      id?: string
      user: Partial<Omit<User, 'id'> & { password: string }>
    }) => {
      await userService.update(id!, user)
      return true
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] })
      if (onSuccess) {
        onSuccess()
      }
    },
  })
}

export function useFindUser(id?: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      return await userService.findById(id!)
    },
    enabled: Boolean(id),
  })
}
