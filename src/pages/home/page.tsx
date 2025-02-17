import React from 'react'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../layout'
import { isAdmin, isAuthenticated } from '@/lib/utils'
import { CreateUserDialog } from '@/components/DeleteUserDialog'
import { UserCard } from '@/components/UserCard'

export default function HomePage() {
  return (
    <Layout>
      {isAuthenticated() ? (
        <>
          {isAdmin() ? (
            <section className="flex max-w-[250px] w-full flex-col gap-3 items-center justify-center">
              <CreateUserDialog />
              <Link to="/users" className="w-full">
                <Button className="gap-2 flex w-full">Ver Usuarios</Button>
              </Link>
            </section>
          ) : (
            <UserCard />
          )}
        </>
      ) : (
        <Link to="/signin">
          <Button className="gap-2 pr-3">
            Iniciar sesión <User className="w-5 h-5" />
          </Button>
        </Link>
      )}
    </Layout>
  )
}
