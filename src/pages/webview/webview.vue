<template>
  <view class="page">
    <iframe v-if="url && isH5" class="iframe" :src="url"></iframe>
    <web-view v-else-if="url" :src="url" />
    <view v-else class="state">暂无可用链接</view>
  </view>
</template>

<script setup>
import { ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"

const url = ref("")
const isH5 = typeof window !== "undefined"

onLoad((options) => {
  url.value = options?.url ? decodeURIComponent(options.url) : ""
})
</script>

<style>
.page {
  height: 100%;
}
.iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.state {
  text-align: center;
  color: #666666;
  padding: 60rpx 0;
}
</style>
