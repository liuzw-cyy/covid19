<template>
  <li class="tab" :class="{active:isActive}" @click="changeTab">
    {{ label }}
  </li>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      label: {
        type: String,
        default: 'tab'
      },
      name: {
        type: String,
        default: 'hello'
      }
    },
    computed: {
      isActive() {
        return this.$parent.currentTab === this.name
      }
    },
    methods: {
      changeTab() {
        this.$parent.getCurrentTab(this.name)
      }
    },
    mounted() {
      this.$parent.tabsArr.push(this)
    }
  }
</script>

<style scoped>
  .tab {
  flex: 1;
  list-style: none;
  line-height: 40px;
  position: relative;
  text-align: center;
  }

  .tab.active {
    border-bottom: 2px solid blue;
  }
</style>
