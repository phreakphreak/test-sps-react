import { User } from '@/modules/user/user.interface'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { DeleteUserDialog } from '@/components/DeleteUserDialog'
import { Link } from 'react-router-dom'

export function ActionsMenu({ user }: { user: User }) {
  const [open, setOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  return (
    <>
      <DropdownMenu
        open={open}
        onOpenChange={(value) => {
          setOpen(value)
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <Link to={`/users/${user.id}`}>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setDeleteOpen(true)
              setOpen(false)
            }}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteUserDialog
        user={user}
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false)
        }}
      />
    </>
  )
}
