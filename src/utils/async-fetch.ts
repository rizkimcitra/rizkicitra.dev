import axios, { type AxiosRequestConfig } from 'axios'

type Config = Omit<Omit<AxiosRequestConfig, 'url'>, 'method'>
type ExtendConfig = Config & {
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
}

export const asyncFetchJSON = async <T = unknown>(url: string, config?: ExtendConfig) => {
  try {
    const res = await axios<T>({
      url,
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (res.status !== 200) {
      throw new Error(res.statusText)
    }

    return [res.data as T, null] as const
  } catch (e) {
    return [null, e as unknown as Error] as const
  }
}