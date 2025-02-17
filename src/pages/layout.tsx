import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { cn, isAuthenticated } from '@/lib/utils'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-10 py-10 px-10">
      <header
        className={cn(
          'w-full flex items-center',
          isAuthenticated() ? 'justify-between' : 'justify-center'
        )}
      >
        <h1 className="text-2xl font-semibold">SPS REACT TEST</h1>
        {isAuthenticated() && (
          <Link to="/logout">
            <Button className="gap-2 pr-3 capitalize" variant="ghost">
              Cerrar sesión
            </Button>
          </Link>
        )}
      </header>
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  )
}
