import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isAuthenticated = () => {
  return !!Cookies.get('authToken')
}

export const isAdmin = () => {
  return Cookies.get('type') === 'admin'
}
