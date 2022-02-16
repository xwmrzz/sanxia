<template>
  <div class="my-item">
    <el-menu-item :index="route.path">
      <template>
        <el-badge
          class="mark"
          :value="badge.value"
          :max="badge.max"
        >
          <i :class="route.meta ? route.meta.icon : null" />
          <span>{{ route.meta.title }}</span>
        </el-badge>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    route: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      badge: {},
    }
  },
  watch: {
    route: {
      handler(nv, ov) {
        if (nv.badge) {
          this.badge = nv.badge
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (this.route.badge) {
      Object.assign(this.badge, this.route.badge)
    }
  },
}
</script>

<style scoped>
.my-item {
  //display: inline-block;
}
</style>
