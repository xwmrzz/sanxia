<template>
  <div class="submenu" role="menuitem">
    <el-submenu :index="route.path" :popper-append-to-body="true">
      <template slot="title">
        <el-badge
          class="mark"
          :value="badge.value"
          :max="badge.max"
        >
          <i :class="route.meta ? route.meta.icon : null" />
          <span>{{ route.meta.title }}</span>
        </el-badge>
      </template>
      <slot />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'Submenu',
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

<style scoped></style>
