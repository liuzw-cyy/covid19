<template>
  <div>
    <p class="title"><i></i>疫情地图</p>
    <Tabs @tab-click="handleTabClick">
      <Tab label="国内疫情" name="china">
        <div id="chinaMap"></div>
      </Tab>
      <Tab label="世界疫情" name="world">
        <div id="worldMap"></div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'Map',
  async mounted() {
    const {
      data: { retdata },
    } = await this.$api.getNocvCity();

    const { data: worldData } = await this.$api.getNocvWorld({
      key: "62e34ad34025d5d5127135efa58d4ca8",
    });

    const allCitysNum = [];
    retdata.forEach((item) => {
      const temp = {
        name: item.xArea,
        value: Number(item.curConfirm),
      };
      allCitysNum.push(temp);
    });

    const allCountryNum = [];
    worldData.newslist.forEach((item) => {
      const temp = {
        name: item.provinceName,
        value: item.currentConfirmedCount,
      };
      allCountryNum.push(temp);
    });

    this.$charts.chinaMap("chinaMap", allCitysNum);
    this.$charts.worldMap("worldMap", allCountryNum);
  },
  methods: {
    setColor(value) {
      let color = "";
      // 注意是 true
      switch(true) {
        case value === 0:
          color = "#fff";
          break;
        case value > 0 && value < 10:
          color = "#FDFDCF";
          break;
        case value >= 10 && value < 100:
          color = "#FE9E83";
          break;
        case value >= 100 && value < 500:
          color = "#E55A4E";
          break;
        case value >= 500:
          color = "#4F070D";
          break;
      }
      return color;
    },
    handleTabClick(tab) {
      console.log(tab);
    },
  },
};
</script>

<style scoped>
#chinaMap,
#worldMap {
  width: 375px;
  height: 400px;
}
#worldMap {
  width: 375px;
  height: 400px;
}
.title {
  border-top: 0.005rem solid #ebebeb;
  border-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  height: 0.44rem;
  padding: 0 0.16rem;
  font-weight: 500;
  font-size: 0.17rem;
  line-height: 0.44rem;
  background: #fff;
}
.title::before {
  content: "";
  width: 5px;
  height: 20px;
  background: #4169e2;
  margin-right: 10px;
}
</style>
