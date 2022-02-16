<template>
  <div class="TD" >
    <iframe  src="
    https://app.modaiyun.com/embedded/1483972679120470016?viewport=false&autoplay=false&autorotate=false&hideTools=false&showBIM=false&showBBoxSize=false&showKooRender=false&showSettings=false" style="width: 100%;height: 100%;" frameborder="0" ></iframe>
<!--    <Threejs id="three-obj" :models="models" :camera-param="camera" style="display: inline-block;text-align: center;height: 100%;"/>-->
    <div class="button"
         style="position: relative;width: 25vh;height: 25vh;margin-top: -70vh;float: right">
      <dv-border-box-13 backgroundColor="#9fc4f0">
      <el-button @click="Digital"style="background-color:#1f83f8 ;color: white;margin-top: 3vh;">数值模拟</el-button>
        <el-button @click="out"style="background-color:#1f83f8 ;color: white;margin-top: 3vh;">返回上一层</el-button>
      </dv-border-box-13 >
    </div>
  </div>
</template>

<script>
import Threejs from '@/Threejs'

export default {
  name: 'TD',
  components: {
    Threejs,
  },
  data() {
    return {
      camera: {
        fov: 50,
        aspect: null,
        near: 0.1,
        far: 800,
        pos: {x: -10, y: -120, z: 100},
      },
      models: {
        id: 'threeObj',
        name: 'three-obj',
        data: [
          {
            type: 'obj',
            mtl: {
              path: '/objs/104-1/',
              name: '104-1_simplified_3d_mesh.mtl',
            },
            obj: {
              path: '/objs/104-1/',
              name: '104-1_simplified_3d_mesh.obj',
              pos: {
                x: 0,
                y: -10,
                z: 80,
              },
              ms: 0.3,
            },
          },
        ],
      },
    }
  },
methods:{
  Digital(){
    this.$router.replace('/DigitalAnalogue')
  },
  out(){
    this.$router.replace('/')
  }
}
}
</script>

<style lang="scss" scoped>
.TD {
  //height: auto !important;
  position: absolute;
  width: 100%;
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
