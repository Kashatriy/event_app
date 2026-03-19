const BASE_URL = "https://app.ticketmaster.com/discovery/v2"
const DEFAULT_API_KEY = "AJIubp2Y9E8NY4rBrYmVt2nJqHjghF8S"

const getApiKey = (): string => {
  return uni.getStorageSync("ticketmasterApiKey") || DEFAULT_API_KEY
}

const request = <T = any>(path: string, params: Record<string, any> = {}): Promise<T> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${path}`,
      data: {
        apikey: getApiKey(),
        ...params
      },
      success: (res: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else {
          reject(res)
        }
      },
      fail: (err: any) => reject(err)
    })
  })
}

interface SearchEventsParams {
  page?: number
  size?: number
}

export const searchEvents = ({ page = 0, size = 20 }: SearchEventsParams = {}): Promise<any> => {
  return request("/events.json", {
    page,
    size,
    sort: "date,asc"
  })
}

export const getEventDetail = (id: string): Promise<any> => {
  return request(`/events/${id}.json`)
}
