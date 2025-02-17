import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpClient } from '@/modules/shared/domain/http.client'
import Cookies from 'js-cookie'

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const token = Cookies.get('authToken')
      const response: AxiosResponse<T> = await this.client.get(url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const token = Cookies.get('authToken')
      const response: AxiosResponse<T> = await this.client.post(url, data, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const token = Cookies.get('authToken')
      const response: AxiosResponse<T> = await this.client.put(url, data, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async patch<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const token = Cookies.get('authToken')
      const response: AxiosResponse<T> = await this.client.patch(url, data, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const token = Cookies.get('authToken')
      const response: AxiosResponse<T> = await this.client.delete(url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: any): never {
    if (error.status === 401) {
      throw new UnauthorizedError(error.message)
    }
    if (error.response) {
      console.error('Response error:', error.response.data)
      throw new Error(error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
      throw new Error('No response received from server')
    } else {
      console.error('Request setup error:', error.message)
      throw new Error(error.message)
    }
  }
}
