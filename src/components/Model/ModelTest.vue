<template>
  <div class="SanxiaModel">
    <!-- <div id="sanxiaModel"></div> -->
    <canvas id="sanxiaModel" style="width: 100%;height: 100%;"></canvas>

  </div>
</template>

<script>
  import * as BABYLON from 'babylonjs';
  import 'babylonjs-loaders';

  export default {
    name: 'SanxiaModel',

    data() {
      return {

      }
    },
    mounted() {
      this.init();
    },
    methods: {

      init() {
        // Get the canvas DOM element
        var canvas = document.getElementById('sanxiaModel');
        // Load the 3D engine
        var engine = new BABYLON.Engine(canvas, true, {
          preserveDrawingBuffer: true,
          stencil: true
        });

        // CreateScene function that creates and return the scene
        var createScene = function() {
          const scene = new BABYLON.Scene(engine);
          const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON
            .Vector3(0, 0, 2000));
          camera.setTarget(BABYLON.Vector3.Zero());
          camera.attachControl(canvas, true);
          const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
          BABYLON.SceneOptimizer.OptimizeAsync(scene);
          BABYLON.SceneLoader.ShowLoadingScreen = true;
          BABYLON.SceneLoader.ImportMesh("","static/gltftest/","Tile_+001_+001d.glb",scene,function(mesh){
            console.log(mesh);
          });
          return scene;
        }
        // call the createScene function
        var scene = createScene();
        // run the render loop
        engine.runRenderLoop(function() {
          if (scene) {
            scene.render();
          }
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function() {
          engine.resize();
        });
      },
    }
  }
</script>

<style scoped>

</style>
