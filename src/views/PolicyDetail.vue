<template>
  <div class="policy-detail">
    <div class="top-ban">
    </div>
    <div class="policy-main">
      <van-notice-bar class="notice-bar" left-icon="volume-o"
        scrollable text="出行请提前了解当地防控要求并做好个人防护。" />
      <div class="policy-desc">
        <!-- 出发地政策 -->
        <div class="city-policy">
          <div class="city-header">
            <van-icon name="location" color="red" />
            <span class="city-name">{{ fromInfo.city_name }}</span>
          </div>
          <div class="city-desc">
            <p class="policy-header">进入政策</p>
            <div>
              {{ fromInDesc.length > 90 ? fromInDesc.slice(0, 90) : fromInDesc }}
              <span class="more-click" @click="showMore($event, 1)">
                ...更多
              </span>
            </div>
            <p class="policy-header">外出政策</p>
            <div>
              {{ fromOutDesc.length > 90 ? fromOutDesc.slice(0, 90) : fromOutDesc }}
              <span class="more-click" @click="showMore($event, 2)">
                ...更多
              </span>
            </div>
          </div>
        </div>
        <!-- 目的地政策 -->
        <div class="city-policy">
          <div class="city-header">
            <van-icon name="location" color="red" />
            <span class="city-name">{{ toInfo.city_name }}</span>
          </div>
          <div class="city-desc">
            <p class="policy-header">进入政策</p>
            <div>
              {{ toInDesc.length > 90 ? toInDesc.slice(0, 90) : toInDesc }}
              <span class="more-click" @click="showMore($event, 3)">
                ...更多
              </span>
            </div>
            <p class="policy-header">外出政策</p>
            <div>
              {{ toOutDesc.length > 90 ? toOutDesc.slice(0, 90) : toOutDesc }}
              <span class="more-click" @click="showMore($event, 4)">
                ...更多
              </span>
            </div>
          </div>
        </div>
        <!-- 政策尾部说明文字 -->
        <div class="desc-footer">
          以上政策整理自当地政府等公开发布的信息，如有更新或错漏，
          请以最新政策为准，建议在出行前咨询当地防疫部门、机场、火车站等
        </div>
        <!-- 健康码 -->
        <div class="qr">
          <p class="qr-title">请准备好进出凭证</p>
          <!-- 健康码单元格 -->
          <van-cell-group>
            <van-cell :title="fromInfo.city_name"
              :value="fromInfo.health_code_name" is-link icon="qr"
              @click="showFromPopup" />
            <van-cell :title="toInfo.city_name"
              :value="toInfo.health_code_name" is-link icon="qr"
              @click="showToPopup" />
          </van-cell-group>
          <!-- 出发地健康码弹出框 -->
          <van-dialog v-model="fromShow" message="center"
            confirm-button-text="我知道了" confirm-button-color="#576b95"
            theme="round-button" :title="fromInfo.health_code_desc">
            <div class="qr-image">
              <img :src="fromInfo.health_code_picture" alt="健康凭证" />
            </div>
          </van-dialog>
          <!-- 目的地健康码弹出框 -->
          <van-dialog v-model="toShow" message="center"
            confirm-button-text="我知道了" confirm-button-color="#576b95"
            theme="round-button" :title="toInfo.health_code_desc">
            <div class="qr-image">
              <img :src="toInfo.health_code_picture" alt="健康凭证" />
            </div>
          </van-dialog>
        </div>
      </div>
    </div>
    <div class="footer-right">
      以上政策仅供参考，可能存在更新迟延或错误，请以相关部门最新官方通知为准。
    </div>
  </div>
</template>

<script>
  export default {
  name: 'PolicyDetail',
  computed: {
    fromInDesc() {
      return this.fromInfo.high_in_desc + this.fromInfo.low_in_desc
    },
    fromOutDesc() {
      return this.fromInfo.out_desc
    },
    toInDesc() {
      return this.toInfo.high_in_desc + this.toInfo.low_in_desc
    },
    toOutDesc() {
      return this.toInfo.out_desc
    }
  },
  data() {
    return {
      fromInfo: {},
      toInfo: {},
      fromShow: false,
      toShow: false
    }
  },
  methods: {
    showMore(event, id) {
      let desc = ''
      switch(id) {
        case 1:
          desc = this.fromInDesc
          break
        case 2:
          desc = this.fromOutDesc
          break
        case 3:
          desc = this.toInDesc
          break
        case 4:
          desc = this.toOutDesc
          break
      }
      event.target.parentNode.innerText = desc
    },
    showFromPopup() {
      this.fromShow = true
    },
    showToPopup() {
      this.toShow = true
    }
  },
  created() {
    /*
    // 没有使用 jsonp 处理跨域，只用了代理，生产环境无法解决跨域
    const { data } = await this.$api.getPolicyDetail({
      key: '2fc84fc60f639068c374a9d644ae2da2',
      from: this.twoCitys[0].value,
      to: this.twoCitys[1].value
    })
    if(data.error_code === 0) {
      this.fromInfo = data.result.from_info
      this.toInfo = data.result.to_info
    }
    */

    this.fromInfo = window.policyDetailData.result.from_info
    this.toInfo = window.policyDetailData.result.to_info
  }
  }
</script>

<style scoped>
  .top-ban {
  width: 100%;
  height: 1.95rem;
  background: url(https://huijia.juhekeji.com/img/newban3.png?v=1.1) no-repeat;
  background-size: 100% 100%;
  }
  .notice-bar {
    background-color: #fff;
    border-radius: 15px;
    height: 30px;
    top: -0.18rem;
    margin: 0 0.04rem;
  }
  .policy-desc {
    background-color: #fff;
    margin: -0.1rem 6px 0;
    border-radius: 20px;
    padding: 0.15rem;
  }
  .city-header {
    line-height: 100%;
    padding: 0.1rem 0 0;
  }
  .city-name {
    font-size: 0.16rem;
    font-weight: 600;
    padding-left: 0.06rem;
  }
  .city-desc {
    padding: 0.1rem 0.14rem;
  }
  .city-desc p {
    white-space: pre-wrap;
  }
  .policy-header {
    font-size: 0.128rem;
    font-weight: 600;
    margin: 0.06rem 0;
  }
  .desc-footer {
    margin: 0.1rem 0.14rem;
    padding: 0.1rem 0 0;
    border-top: 1px solid #ccc;
    color: #bbb;
  }
  .more-click {
    font-size: 0.13rem;
    color: #eb512b;
    font-weight: bold;
  }
  .qr-image {
    display: flex;
    justify-content: center;
  }
  .qr-image img {
    width: 50%;
  }
  .qr-title {
    font-weight: 600;
    font-size: 0.14rem;
    padding: 0 0 0.08rem 0.1rem;
  }
  .footer-right {
    color: #ccc;
    padding: 0.1rem 0.3rem;
  }
</style>