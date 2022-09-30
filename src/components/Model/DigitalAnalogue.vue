<template>
  <div class="DigitalAnalogue">

    <div class="Top">
      <div class="a" v-viewer >
        <dv-border-box-11 title="U位移">
        <img src="../../Picture/u.gif" height="80%" width="92%" style="margin-top: 7vh"/>
        </dv-border-box-11>
      </div>
      <div class="b" v-viewer>
        <dv-border-box-11 title="sat饱和度">
          <img src="../../Picture/sat.gif" height="80%" width="92%" style="margin-top: 7vh"/>
        </dv-border-box-11>
      </div>
      <div class="button">
        <dv-border-box-13 backgroundColor="#9fc4f0">
          <el-button @click="out"style="background-color:#1f83f8 ;color: white;margin-top: 3vh;">返回上一层</el-button>
        </dv-border-box-13 >
      </div>
    </div>
    <div class="Bottom">
      <div class="c" v-viewer>
        <dv-border-box-11 title="por孔隙水压">
          <img src="../../Picture/por.gif" height="80%" width="92%" style="margin-top: 7vh"/>
        </dv-border-box-11>
      </div>
      <div class="d" v-viewer>
        <dv-border-box-11 title="S平均应力">
          <img src="../../Picture/s.gif" height="80%" width="92%" style="margin-top: 7vh"/>
        </dv-border-box-11>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "DigitalAnalogue",
  beforeRouteEnter(to, from, next) {

    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题

    document.querySelector('body').setAttribute('style','margin:0;padding:0')

    next()

  },
  methods: {
    out() {
      this.$router.replace('/model/displacementPrediction')
    },
    setBackGroundImg() {
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame
      })();
      var canvas = document.getElementById("space");
      var c = canvas.getContext("2d");
      var numStars = 1900;
      var radius = '0.' + Math.floor(Math.random() * 9) + 1;
      var focalLength = canvas.width * 2;
      var warp = 0;
      var centerX, centerY;
      var stars = [], star;
      var i;
      var animate = true;
      initializeStars();

      function executeFrame() {
        if (animate)
          window.requestAnimFrame(executeFrame);
        moveStars();
        drawStars();
      }

      function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        stars = [];
        for (i = 0; i < numStars; i++) {
          star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: '0.' + Math.floor(Math.random() * 99) + 1
          };
          stars.push(star);
        }
      }

      function moveStars() {
        for (i = 0; i < numStars; i++) {
          star = stars[i];
          star.z--;

          if (star.z <= 0) {
            star.z = canvas.width;
          }
        }
      }

      function drawStars() {
        var pixelX, pixelY, pixelRadius;

        // Resize to the screen
        if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          initializeStars();
        }
        if (warp === 0) { // 此代码块改背景色为渐变色
          var grd=c.createRadialGradient(canvas.width,canvas.height,canvas.width,canvas.width,canvas.height,1000);
          grd.addColorStop(0,"rgba(0, 18, 41, 0.6)");
          grd.addColorStop(1,"rgba(2, 8, 36, 0.6)");
          c.fillStyle = grd;
          c.fillRect(0, 0, canvas.width, canvas.height);
        }
        c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
        for (i = 0; i < numStars; i++) {
          star = stars[i];

          pixelX = (star.x - centerX) * (focalLength / star.z);
          pixelX += centerX;
          pixelY = (star.y - centerY) * (focalLength / star.z);
          pixelY += centerY;
          pixelRadius = 1 * (focalLength / star.z);

          c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
          c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
          //c.fill();
        }
      }

      executeFrame();
    }
  }
}
</script>

<style scoped>

/*.DigitalAnalogue{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/
.Top{
  margin-top: 2vh;
  width: 100%;
  height: 50%;
  position: absolute;
}
.Bottom{
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0px;
}
.button{
  position: relative;
  height: 25vh;
  width: 25vh;
  margin-top: 5vh;
  float: left;
  margin-left: 3vh;
}
.a{
  width: 40%;
  height: 45vh;
  float: left;
}
.b{
  width: 40%;
  height: 45vh;
  float: left;
  margin-left: 10vh;
}
.c{
  width: 40%;
  height: 45vh;
  float: left;
}
.d{
  width: 40%;
  height: 45vh;
  float: left;
  margin-left: 10vh;
}
.DigitalAnalogue {
  width: 100%;
  height: 100%;
/*background-image: url("");*/
}
</style>
