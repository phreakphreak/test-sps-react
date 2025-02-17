import React from 'react'
import { useUsers } from '@/hooks/useUsers'
import { ListUsers } from '@/components/ListUsers'
import { Skeleton } from '@/components/ui/skeleton'
import Layout from '@/pages/layout'
import { CreateUserDialog } from '@/components/DeleteUserDialog'

function Users() {
  const { data: users, isPending } = useUsers()
  return (
    <Layout>
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        <header className="flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold"> Usuarios</h1>
          <section className="w-full max-w-[150px]">
            <CreateUserDialog />
          </section>
        </header>
        <div className="text-lg text-slate-900">Lista de usuarios</div>

        {isPending ? (
          <Skeleton className="w-full h-[400px]" />
        ) : (
          <section className="w-full ">
            {users && <ListUsers data={users} />}
          </section>
        )}
      </div>
    </Layout>
  )
}

export default Users
