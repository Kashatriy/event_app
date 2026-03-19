<template>
  <view class="page">
    <view class="header">
      <text class="title">Events</text>
      <button class="refresh" size="mini" @tap="store.fetchEvents(true)">Refresh</button>
    </view>

    <view v-if="store.error" class="state error">{{ store.error }}</view>
    <view v-else-if="store.loading && store.list.length === 0" class="state">Loading...</view>
    <view v-else-if="store.list.length === 0" class="state">No events found</view>

    <view class="grid">
      <view
        v-for="item in store.list"
        :key="item.id"
        class="card"
        @tap="openDetail(item)"
      >
        <image
          class="cover"
          :src="item.images && item.images[0] ? item.images[0].url : ''"
          mode="aspectFill"
        />
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="datetime">
            {{ formatDateTime(item.dates?.start?.localDate, item.dates?.start?.localTime) }}
          </text>
        </view>
      </view>
    </view>

    <view v-if="store.loading && store.list.length > 0" class="state">Loading...</view>
    <view v-else-if="!store.hasMore && store.list.length > 0" class="state no-more">No more events</view>
  </view>
</template>

<script setup>
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
import { useEventsStore } from "../../stores/events"
import { formatDateTime } from "../../utils/format"

const store = useEventsStore()

const openDetail = (item) => {
  if (!item?.id) return
  uni.navigateTo({
    url: `/pages/detail/detail?id=${encodeURIComponent(item.id)}`
  })
}

onLoad(() => {
  store.fetchEvents(true)
})

onPullDownRefresh(() => {
  store.fetchEvents(true)
})

onReachBottom(() => {
  if (!store.hasMore) return
  store.page += 1
  store.fetchEvents(false)
})
</script>

<style>
.page {
  padding: 24rpx;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 600;
  color: #222222;
}
.refresh {
  background-color: #ffffff;
  color: #333333;
  border: 1rpx solid #e5e5e5;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.card {
  width: calc(50% - 10rpx);
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
}
.cover {
  width: 100%;
  height: 220rpx;
  background-color: #eaeaea;
}
.info {
  padding: 16rpx;
}
.name {
  font-size: 28rpx;
  color: #222222;
  display: block;
  margin-bottom: 8rpx;
}
.datetime {
  font-size: 24rpx;
  color: #666666;
}
.state {
  text-align: center;
  color: #666666;
  padding: 40rpx 0;
}
.error {
  color: #d93025;
}
.no-more {
  color: #999999;
  font-size: 24rpx;
}
</style>
