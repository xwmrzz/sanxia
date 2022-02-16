<template>
  <div class="TD">
    <Threejs id="three-obj" :models="models" :camera-param="camera" />
  </div>
</template>

<script>
  import Threejs from '@/Threejs/components/Threejs'
  export default {
    name: 'TD',
    components: {
      Threejs,
    },
    data() {
      return {
        camera: {
          fov: 100,
          aspect: null,
          near: 0.1,
          far: 1000,
          pos: { x: 0, y: 100, z: 50 },
        },
        models: {
          id: 'threeObj',
          name: 'three-obj',
          data: [
            {
              type: 'obj',
              mtl: {
                path: '/mtl/',
                name: '104-1_simplified_3d_mesh.mtl',
              },
              obj: {
                path: '/models/',
                name: '104-1_simplified_3d_mesh.obj',
                pos: {
                  x: -50,
                  y: 0,
                  z: 0,
                },
                ms: 0.3,
              },
            },
          ],
        },
      }
    },
    mounted() {},
  }
</script>

<style lang="scss" scoped>
  .TD {
    position: absolute;
    width: 100%;
    height: 100%;
    //background-image: url('~@/assets/background/background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: $base-transition;
    transform: scale(0);
    animation: login-scale 800ms;
    animation-fill-mode: forwards;

    @keyframes login-scale {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  }
</style>
