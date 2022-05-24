<script>
export default {
  name: 'Content',
  props: {
    tabsArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  render() {
    return (
      <div>
        {this.tabsArr.map((item) => {
          // return item.isActive ? item.$slots.default : ''
          return (
            <div style={{ display: item.isActive ? 'block' : 'none' }}>
              {item.$slots.default}
            </div>
          )
        })}
      </div>
    )
  }
}
</script>

<style>
</style>
