import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
})

function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const mutation = useAuth({
    onSuccess: () => {
      navigate('/')
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <div className="flex w-full flex-col gap-10 py-10 px-10">
      <div className="w-full flex items-center justify-center">
        <Card className="w-full max-w-sm min-h-[300px] p-10 items-center flex flex-col rounded-3xl gap-6">
          <CardTitle className="text-xl capitalize font-semibold">
            SPS REACT TEST
          </CardTitle>
          <CardContent className="p-0 px-3 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
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
                  Iniciar sesión
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage
