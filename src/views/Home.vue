<template>
  <div>
    <Header />
    <Covid19Info/>
    <Covid19Num :covidNum="covidNum" />
    <Map />
    <MySwiper></MySwiper>
    <Travel></Travel>
    <HotNews :newsList="newsList"></HotNews>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Covid19Info from '@/components/Covid19Info.vue'
import Covid19Num from '@/components/Covid19Num.vue'
import Map from '@/components/Map.vue'
import MySwiper from '@/components/MySwiper.vue'
import Travel from '@/components/Travel.vue'
import HotNews from '../components/HotNews.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Covid19Info,
    Covid19Num,
    Map,
    MySwiper,
    Travel,
    HotNews
  },
  data() {
    return {
      covidNum: {
        // 现存确诊
        currentConfirmedCount: 0,
        // 累计确诊
        confirmedCount: 0,
        // 累计境外输入
        suspectedCount: 0,
        // 累计治愈
        curedCount: 0,
        // 累计死亡
        deadCount: 0,
        // 现存无症状
        seriousCount: 0,
        // 较昨日
        currentConfirmedIncr: 0,
        confirmedIncr: 0,
        suspectedIncr: 0,
        curedIncr: 0,
        deadIncr: 0,
        seriousIncr: 0,
        // 截止日期
        modifyTime: 0
      },
      newsList: []
    }
  },
  async created() {
    const { data } = await this.$api.getNocv({
      key: '0e3d907bca0c0cabc0b8669a2068ff58'
    })
    if(data.code === 200) {
      const desc = data.newslist[0].desc
      // 疫情热点新闻
      this.newsList = data.newslist[0].news
      // 今日数据
      this.covidNum.currentConfirmedCount = desc.currentConfirmedCount
      this.covidNum.confirmedCount = desc.confirmedCount
      this.covidNum.suspectedCount = desc.suspectedCount
      this.covidNum.curedCount = desc.curedCount
      this.covidNum.deadCount = desc.deadCount
      this.covidNum.seriousCount = desc.seriousCount
      // 较昨日新增
      this.covidNum.currentConfirmedIncr = desc.currentConfirmedIncr
      this.covidNum.confirmedIncr = desc.confirmedIncr
      this.covidNum.suspectedIncr = desc.suspectedIncr
      this.covidNum.curedIncr = desc.curedIncr
      this.covidNum.deadIncr = desc.deadIncr
      this.covidNum.seriousIncr = desc.seriousIncr
      // 截至日期
      this.covidNum.modifyTime = desc.modifyTime
    }
  }
}
</script>

<style>
</style>