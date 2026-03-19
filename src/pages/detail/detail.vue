<template>
  <view class="page">
    <view v-if="store.loading" class="state">Loading...</view>
    <view v-else-if="store.error" class="state error">{{ store.error }}</view>

    <view v-else-if="store.detail" class="content">
      <image
        class="hero"
        :src="store.detail.images && store.detail.images[0] ? store.detail.images[0].url : ''"
        mode="aspectFill"
      />
      <view class="section">
        <text class="name">{{ store.detail.name }}</text>
        <text class="datetime">
          {{ formatDateTime(store.detail.dates?.start?.localDate, store.detail.dates?.start?.localTime) }}
        </text>
      </view>

      <view class="section">
        <text class="label">Venue</text>
        <text class="value">{{ venueName }}</text>
      </view>

      <view class="section" v-if="store.detail.info">
        <text class="label">About</text>
        <text class="value">{{ store.detail.info }}</text>
      </view>

      <button class="link" @tap="openUrl">Buy Tickets</button>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { useEventDetailStore } from "../../stores/events"
import { formatDateTime } from "../../utils/format"

const store = useEventDetailStore()

const venueName = computed(() => {
  const venues = store.detail?._embedded?.venues || []
  if (venues.length === 0) return "Unknown venue"
  return venues[0].name || "Unknown venue"
})

const openUrl = () => {
  const url = store.detail?.url
  if (!url) return
  if (typeof window !== "undefined") {
    window.open(url, "_blank")
    return
  }
  uni.navigateTo({ url: `/pages/webview/webview?url=${encodeURIComponent(url)}` })
}

onLoad((options) => {
  if (!options?.id) {
    store.error = "Missing event ID"
    return
  }
  store.fetchDetail(decodeURIComponent(options.id))
})
</script>

<style>
.page {
  padding-bottom: 32rpx;
}
.hero {
  width: 100%;
  height: 420rpx;
  background-color: #eaeaea;
}
.content {
  padding: 24rpx;
}
.section {
  margin-bottom: 24rpx;
}
.name {
  font-size: 34rpx;
  font-weight: 600;
  color: #222222;
  display: block;
  margin-bottom: 12rpx;
}
.datetime {
  font-size: 26rpx;
  color: #666666;
}
.label {
  font-size: 26rpx;
  color: #888888;
  display: block;
  margin-bottom: 8rpx;
}
.value {
  font-size: 28rpx;
  color: #333333;
  line-height: 1.6;
}
.state {
  text-align: center;
  color: #666666;
  padding: 60rpx 0;
}
.error {
  color: #d93025;
}
.link {
  margin-top: 16rpx;
  background-color: #1b74e4;
  color: #ffffff;
}
</style>
