import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services'

export function useDeleteUser({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await userService.delete(id)
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
