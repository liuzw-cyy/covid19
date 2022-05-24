<template>
  <div class="news">
    <h3 class="title">疫情新闻热点</h3>
    <div class="card">
      <ul>
        <NewsItem v-for="item in newsList" :key="item.id"
          :newsObj="item"></NewsItem>
      </ul>
    </div>
  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem.vue'

export default {
  name: 'HotNews',
  components: {
    NewsItem
  },
  props: {
    newsList: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.news {
  font-size: 0.12rem;
  background-color: #fff;
}
.news .title {
  font-size: 0.16rem;
  padding: 0 0 0.08rem 0.16rem;
}
.card {
  margin: 0.02rem 0.16rem;
  border-radius: 0.06rem;
  border: 0.005rem solid #ebebeb;
  box-shadow: 0 0.02rem 0.06rem 0 rgb(0 0 0 / 5%);
}
</style>