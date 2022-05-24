<template>
  <li class="item" @click="goSource">
    <div class="tag">{{ newsObj.pubDateStr }}</div>
    <div class="content">
      <div class="title">
        {{ newsObj.title }}
      </div>
      <p>{{ newsObj.summary }}</p>
    </div>
    <span href="javascript:;">></span>
  </li>
</template>

<script>
  export default {
  name: 'NewsItem',
  props: {
    newsObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    goSource() {
      // 打开新窗口
      window.location.href = this.newsObj.sourceUrl
    }
  }
  }
</script>

<style scoped>
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0.16rem;
    border-bottom: 1px solid #f1f1f1;
  }
  .tag {
    display: flex;
    flex: none; /* 很重要 */
    justify-content: center;
    width: 0.5rem;
    height: 0.17rem;
    margin-top: 0.02rem;
    padding: 0 0.04rem;
    background-color: #f74c31;
    border-radius: 0.03rem;
    color: #fff;
    font-weight: 700;
  }
  .content {
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    margin: 0 0.07rem;
  }
  .content .title {
    color: #333;
    font-size: 0.16rem;
    font-weight: 700;
  }
  .content p {
    overflow: hidden;
    width: 2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
  }
  .item span {
    margin: 0 0.06rem;
  }
</style>>
