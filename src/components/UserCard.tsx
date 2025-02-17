import { Card, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFindUser } from '@/hooks/useCreateUser'
import Cookies from 'js-cookie'
import { Badge } from '@/components/ui/badge'

export function UserCard() {
  const userId = Cookies.get('id')
  const { data: user } = useFindUser(userId)
  return (
    <Card className="w-full max-w-xs flex p-4 gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col gap-1">
        <header className="w-full flex justify-between items-center">
          <CardTitle className="capitalize">
            {user?.name?.toLowerCase()}
          </CardTitle>
          <Badge className="capitalize">{user?.type}</Badge>
        </header>
        <p className="hover:underline hover:text-blue-500 cursor-pointer">
          {user?.email}
        </p>
      </div>
    </Card>
  )
}
