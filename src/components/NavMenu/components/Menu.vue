<template>
  <component :is="menuComponent" v-if="!item.hidden" :route="item">
    <template v-if="item.children && item.children.length">
      <Menu v-for="route in item.children" :key="route.path" :item="route" />
    </template>
  </component>
</template>

<script>
import Item from './Item'
import Submenu from './Submenu'
export default {
  name: 'Menu',
  components: {
    Item,
    Submenu,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menuComponent: 'Item',
    }
  },
  created() {
    if (this.item.children && this.item.children.length) {
      if (this.item.children.length === 1) {
        this.menuComponent = 'Item'
      } else if (this.item.children.length > 1) {
        this.menuComponent = 'Submenu'
      }
    }
  },
}
</script>
