<template>
  <div class="travel">
    <h3 class="title">疫情出行政策</h3>
    <div class="cascader">
      <van-field v-model="departure" is-link readonly label="出发地"
        placeholder="请选择出发地" @click="departureShow = true" />
      <van-popup v-model="departureShow" round position="bottom">
        <van-cascader v-model="fromCascaderValue" title="请选择出发地"
          :options="options" @close="departureShow = false"
          @finish="onFinishDeparture" />
      </van-popup>

      <van-field v-model="destination" is-link readonly label="目的地"
        placeholder="请选择目的地" @click="destinationShow = true" />
      <van-popup v-model="destinationShow" round position="bottom">
        <van-cascader v-model="toCascaderValue" title="请选择目的地"
          :options="options" @close="destinationShow = false" active-color="#1989fa"
          @finish="onFinishDestination" />
      </van-popup>
      <van-button type="primary" round block @click="goPolicy">
        查看出行政策
      </van-button>
    </div>
  </div>
</template>

<script>
  import cityId from '@/plugins/cityId'

  export default {
    name: 'Travel',
    data() {
      return {
        departureShow: false,
        destinationShow: false,
        departure: '',
        destination: '',
        fromCascaderValue: '',
        toCascaderValue: '',
        // 选项列表，children 代表子选项，支持多级嵌套
        options: cityId,
        // 出发地和目的地数组
        twoCitys: []
      };
    },
    methods: {
      // 选择出发地完成
      onFinishDeparture({ selectedOptions }) {
        this.departureShow = false;
        this.departure = selectedOptions.map((option) => option.text).join('/');
        this.twoCitys.splice(0, 1, selectedOptions[1])
        this.checkPolicy()
      },
      // 选择目的地完成
      onFinishDestination({ selectedOptions }) {
        this.destinationShow = false;
        this.destination = selectedOptions.map((option) => option.text).join('/');
        this.twoCitys.splice(1, 1, selectedOptions[1])
        this.checkPolicy()
      },
      // 每次选择地点都进行查询，为了能让政策页面拿到数据
      async checkPolicy() {
        if(this.twoCitys.length === 2) {
          const fromId = this.twoCitys[0].value
          const toId = this.twoCitys[1].value
          const policyDetailURL = `https://apis.juhe.cn/springTravel/query?key=ea3295121216b176e1a6b8af7fcd3dcf&from=${fromId}&to=${toId}&callback=policyDetailHandler`
          window.jsonp(policyDetailURL)
        }
      },
      // 前往出行政策详情页
      goPolicy() {
        if(this.twoCitys.length === 2) {
          this.$router.push('/policy')
        } else {
          this.$notify({ type: 'warning', message: '请选择出发地和目的地！' })
        }
      }
    }
  }
</script>

<style scoped>
.travel {
  width: 100%;
  background-color: #fff;
}
.cascader {
  padding: 10px;
  box-sizing: border-box;
}
.travel .title {
  font-size: 0.16rem;
  margin: 0 0 0.08rem 0.16rem;
}
</style>