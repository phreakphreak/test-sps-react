import React, { useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFindUser, useUpdateUser } from '@/hooks/useCreateUser'
import { Link, useNavigate, useParams } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
  type: z
    .enum(['admin', 'user'], {
      message: "Type must be either 'admin' or 'user'.",
    })
    .optional(),
})

function EditUser() {
  const params = useParams()
  const userQuery = useFindUser(params.userId)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })
  const mutation = useUpdateUser({
    onSuccess: () => {
      navigate('/users')
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      id: params.userId,
      user: {
        email: values.email,
        password: values.password,
        name: values.name,
        type: values.type,
      },
    })
  }

  useEffect(() => {
    if (userQuery.data) {
      const user = userQuery.data
      form.setValue('type', user.type as 'admin')
      form.setValue('name', user.name)
      form.setValue('email', user.email)
    }
  }, [userQuery.data, form])

  return (
    <div className="w-full flex flex-col gap-6 p-10 items-center ">
      <h1 className="text-xl text-slate-800 font-semibold">Editar Usuario</h1>
      {userQuery.isError ? (
        <section className="w-full">
          <p>No se encontro al usuario</p>
          <Link to="/">
            <Button className="w-full">Volver al inicio</Button>
          </Link>
        </section>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-[400px] w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">user</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={mutation.isPending}
              className="w-full"
              type="submit"
            >
              Actualizar Usuario
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default EditUser
