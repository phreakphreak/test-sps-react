import { AxiosHttpClient } from '@/modules/shared/infrastructure/axios-http.client'

const httpClient = new AxiosHttpClient(process.env.REACT_APP_SERVER_URL ?? '')

export { httpClient }
