<template>
  <div class="city-container">
    <h3 class="title">{{ city }}疫情地图</h3>
    <div id="city"></div>
  </div>
</template>

<script>
export default {
  name: 'City',
  props: {
    city: {
      type: String,
      default: ''
    }
  },
  async mounted() {
    const { data: { retdata } } = await this.$api.getNocvSingleCity({
      city: this.city
    })
    const cityNum = []
    retdata.subList.forEach(item => {
      const temp = {
        name: item.city,
        value: item.confirm
      }
      cityNum.push(temp)
    });
    this.$charts.cityMap('city', this.city, cityNum)
  }
}
</script>

<style scoped>
#city {
  width: 100%;
  height: 500px;
}
.city-container {
  text-align: center;
}
.title {
  font-size: 0.16rem;
  padding: 0.1rem 0 0.08rem 0.16rem;
  border-bottom: 1px solid #ccc;
}
</style>