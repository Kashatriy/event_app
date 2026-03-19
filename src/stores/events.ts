import { defineStore } from "pinia"
import { searchEvents, getEventDetail } from "../api/ticketmaster"

export const useEventsStore = defineStore("events", {
  state: () => ({
    list: [] as any[],
    page: 0,
    totalPages: 0,
    loading: false,
    error: "",
  }),

  getters: {
    hasMore: (state) => state.totalPages > 0 && state.page + 1 < state.totalPages,
  },

  actions: {
    async fetchEvents(reset = false) {
      if (this.loading) return
      this.loading = true
      this.error = ""
      try {
        const currentPage = reset ? 0 : this.page
        const data = await searchEvents({ page: currentPage, size: 20 })
        const list = data?._embedded?.events || []
        const pageInfo = data?.page || {}
        if (reset) {
          this.list = list
          this.page = 0
        } else {
          this.list = currentPage === 0 ? list : this.list.concat(list)
          this.page = currentPage
        }
        this.totalPages = pageInfo.totalPages ?? 0
      } catch {
        this.error = "Failed to load events, please try again"
      } finally {
        this.loading = false
        uni.stopPullDownRefresh()
      }
    },

    loadMore() {
      if (!this.hasMore) return
      this.page += 1
      this.fetchEvents(false)
    },
  },
})

export const useEventDetailStore = defineStore("eventDetail", {
  state: () => ({
    detail: null as any,
    loading: false,
    error: "",
  }),

  actions: {
    async fetchDetail(id: string) {
      this.loading = true
      this.error = ""
      this.detail = null
      try {
        const data = await getEventDetail(id)
        this.detail = data
        if (data?.name) {
          uni.setNavigationBarTitle({ title: data.name })
        }
      } catch {
        this.error = "Failed to load event details"
      } finally {
        this.loading = false
      }
    },
  },
})
