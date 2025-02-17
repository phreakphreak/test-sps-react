import { User } from '@/modules/user/user.interface'
import { useDeleteUser } from '@/hooks/useDeleteUser'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import * as React from 'react'
import { useState } from 'react'
import { UserForm } from '@/components/UserForm'
import { Button } from '@/components/ui/button'

export function DeleteUserDialog({
  open,
  onClose,
  user,
}: {
  user: User
  open: boolean
  onClose: () => void
}) {
  const mutation = useDeleteUser({
    onSuccess: () => {
      onClose()
    },
  })
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
          <AlertDialogDescription>
            El usuario se eliminará permanentemente. Esta acción no se puede
            deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutation.mutate({ id: user.id })
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function CreateUserDialog() {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true)
          }}
          className="w-full"
        >
          Agregar usuario
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar usuario</AlertDialogTitle>
          <AlertDialogDescription>
            Agregar la informacion del usuario
          </AlertDialogDescription>
        </AlertDialogHeader>
        <UserForm
          onSuccess={() => {
            setOpen(false)
          }}
        />
        <AlertDialogFooter className="w-full flex flex-col gap-3">
          <AlertDialogCancel
            className="w-full"
            onClick={() => {
              setOpen(false)
            }}
          >
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
