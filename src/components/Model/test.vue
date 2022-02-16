<template>
  <div class="EarlyWarning">
    <div class="ButtonArea" style="text-align: left">
      <!--一级预警-->
      <el-button type="primary" @click="one()">一级预警</el-button>
      <!--二级预警-->
      <el-button type="success" @click="two()">二级预警</el-button>
      <!--三级预警-->
      <el-button type="warning" @click="three()">三级预警</el-button>
      <!--四级预警-->
      <el-button type="danger" @click="four()">四级预警</el-button>
    </div>
    <!--    <div class="escape">-->
    <!--     -->
    <!--    </div>-->
    <div class="data">
      <el-button class="escape" type="primary" @click="escape">逃生路线</el-button>
      <div v-viewer span="8" class="left" @mousewheel.prevent="rollImg" v-if="index==0">
        <img style="cursor: pointer" src="../../Picture/A.jpg" alt="" class="img" ref="imgDiv" @mousedown="move"/>
      </div>
      <div v-viewer span="8" class="left" @mousewheel.prevent="rollImg" v-if="index==1">
        <img style="cursor: pointer" src="../../Picture/B.jpg" alt="" class="img" ref="imgDiv" @mousedown="move"/>
      </div>
      <div v-viewer span="8" class="left" @mousewheel.prevent="rollImg" v-if="index==2">
        <img style="cursor: pointer" src="../../Picture/C.jpg" alt="" class="img" ref="imgDiv" @mousedown="move"/>
      </div>
      <div v-viewer span="8" class="left" @mousewheel.prevent="rollImg" v-if="index==3">
        <img style="cursor: pointer" src="../../Picture/D.jpg" alt="" class="img" ref="imgDiv" @mousedown="move"/>
      </div>
    </div>
  </div>
</template>
<script>
import VueLazyload from 'vue-lazyload'
import loadingImg1 from'../../Picture/A.jpg'
import loadingImg2 from'../../Picture/B.jpg'
import loadingImg3 from'../../Picture/C.jpg'
import loadingImg4 from'../../Picture/D.jpg'
export default {
  name: "Escapewarning",
  // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
  beforeRouteEnter(to, from, next) {
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  // 去除背景色
  beforeRouteLeave(to, from, next) {

    document.querySelector('body').setAttribute('style', '')
    next()
  },

  data() {
    return {
      index: 0,
    }
  },
  methods: {
    escape(index) {
      let url
      switch (this.index) {
        case 0:
          url = "http://20.ranyuan51.ren/"
          break
        case 1:
          url = "http://ry777.ranyuan51.ren/"
          break
        case 2:
          url = "http://100.ranyuan51.ren/"
          break
        case 3:
          url = "http://kb.ranyuan51.ren/"
          break
      }
      window.open(url)
    },
    one: function () {
      this.index = 0;
    },
    two: function () {
      this.index = 1;
    },
    three: function () {
      this.index = 2;
    },
    four: function () {
      this.index = 3;
    },

    move(e) {
      e.preventDefault();
      // 获取元素
      var left = document.querySelector(".left");
      var img = document.querySelector(".img");
      var x = e.pageX - img.offsetLeft;
      var y = e.pageY - img.offsetTop;
      // 添加鼠标移动事件
      left.addEventListener("mousemove", move);

      function move(e) {
        img.style.left = e.pageX - x + "px";
        img.style.top = e.pageY - y + "px";
      }

      // 添加鼠标抬起事件，鼠标抬起，将事件移除
      img.addEventListener("mouseup", function () {
        left.removeEventListener("mousemove", move);
      });
      // 鼠标离开父级元素，把事件移除
      left.addEventListener("mouseout", function () {
        left.removeEventListener("mousemove", move);
      });
    },
    // 缩放图片
    rollImg() {
      /* 获取当前页面的缩放比 若未设置zoom缩放比，则为默认100%，即1，原图大小 */

      var zoom = parseInt(this.$refs.imgDiv.style.zoom) || 100;
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动 */

      zoom += event.wheelDelta / 12;
      /* 最小范围 和 最大范围 的图片缩放尺度 */

      if (zoom >= 80 && zoom < 500) {
        this.$refs.imgDiv.style.zoom = zoom + "%";
      }
      return false;
    }

  }
}


</script>

<style scoped>
.escape-iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.EarlyWarning {
  width: 100%;
  height: 100%;
  height: auto !important;

}

.ButtonArea {
  width: 100%;
  height: 45px;
  background-color: white;

}

.data {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;

}

.left {
  position: relative;
  width: 100%;
  height: 100%;
  /*padding: 20px;*/
  margin-top: -2vh;
  float: left;
  overflow: hidden;
}

.img {
  position: absolute;
  left: 20%;
  width: 100vh;
  height: 67vh;
  cursor: move;
  zoom: 100%;
}

.el-button {
  color: #000;
}

.escape {
  position: relative;
  text-align: left;
  display: list-item;
  z-index: 1;
}
</style>
