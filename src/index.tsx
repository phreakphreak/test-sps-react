import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
