<template>
  <div class="SanxiaModel">
    <!-- <div id="sanxiaModel"></div> -->
    <canvas id="sanxiaModel" style="width: 100%;height: 100%;"></canvas>
    <!-- <div class="numerical" style="position: relative;width: 25vh;height: 25vh;margin-top: -70vh;float: right">
      <el-button type="primary" @click="numerical">数值模拟</el-button>
    </div> -->
  </div>
</template>

<script>
  import * as BABYLON from 'babylonjs';
  import 'babylonjs-loaders';
  // import * as GUI from 'babylonjs-gui';
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
      numerical() {
        this.$router.push({ //核心语句
          path: '/numerical', //跳转的路径
        })
      },
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
          // var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
          BABYLON.SceneLoader.ImportMesh("","static/gltftest/","Tile_+001_+001d.glb",scene,function(mesh){

            console.log(mesh);
          })
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+000_+000.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+000_+001.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+000_+002.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+000_+003.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+001_+000.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+001_+001.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+001_+002.gltf", scene, function(mesh) {
          //   // console.log(mesh);
          //   // for (let i = 0; i < mesh.length; i++) {
          //   // 	mesh[i].actionManager = new BABYLON.ActionManager(scene);
          //   // 	mesh[i].actionManager.registerAction(
          //   // 		new BABYLON.ExecuteCodeAction(
          //   // 			BABYLON.ActionManager.OnPickTrigger,
          //   // 			function(e) {
          //   // 				console.log(mesh[i].uniqueId);
          //   // 			}
          //   //  		)
          //   // 	)
          //   // }
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          //   mesh.doNotSyncBoundingInfo = true;
          //   // GUI
          //   let rect1 = new GUI.Rectangle();
          //   rect1.width = "60px";
          //   rect1.height = "35px";
          //   rect1.cornerRadius = 20;
          //   rect1.color = "Orange";
          // 	 rect1.thickness = 4;
          //   rect1.background = "green";
          //   advancedTexture.addControl(rect1);
          //   rect1.linkWithMesh(mesh[270]);
          //  	rect1.linkOffsetY = -150;

          //   let jc37 = GUI.Button.CreateSimpleButton("jc37", "JC37");
          //   rect1.addControl(jc37);
          //   jc37.onPointerClickObservable.add(function() {
          //  		 console.log("aaa");
          //   });

          //   let target1 = new GUI.Ellipse();
          //   target1.width = "20px";
          //   target1.height = "20px";
          //  	target1.color = "Orange";
          //   target1.thickness = 4;
          //   target1.background = "green";
          //   advancedTexture.addControl(target1);
          //   target1.linkWithMesh(mesh[270]);

          // 	 let line1 = new GUI.Line();
          //  	line1.lineWidth = 4;
          //   line1.color = "Orange";
          // 	 line1.y2 = 20;
          //  	line1.linkOffsetY = -20;
          //   advancedTexture.addControl(line1);
          //   line1.linkWithMesh(mesh[270]);
          // 	 line1.connectedControl = rect1;

          //   // GUI
          //   let rect2 = new GUI.Rectangle();
          //   rect2.width = "60px";
          //   rect2.height = "35px";
          //   rect2.cornerRadius = 20;
          //   rect2.color = "Orange";
          //   rect2.thickness = 4;
          //   rect2.background = "green";
          //   advancedTexture.addControl(rect2);
          //   rect2.linkWithMesh(mesh[88]);
          //   rect2.linkOffsetY = -150;

          //   let jc50 = GUI.Button.CreateSimpleButton("jc50", "JC50");
          //   rect2.addControl(jc50);
          //   jc50.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //  	});

          //   let target2 = new GUI.Ellipse();
          // 	 target2.width = "20px";
          //  	target2.height = "20px";
          //   target2.color = "Orange";
          //   target2.thickness = 4;
          //   target2.background = "green";
          //   advancedTexture.addControl(target2);
          //   target2.linkWithMesh(mesh[88]);

          //   let line2 = new GUI.Line();
          //   line2.lineWidth = 4;
          //   line2.color = "Orange";
          // 	 line2.y2 = 20;
          //   line2.linkOffsetY = -20;
          //   advancedTexture.addControl(line2);
          // 	 line2.linkWithMesh(mesh[88]);
          //   line2.connectedControl = rect2;
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+001_+003.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+001_+004.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+002_+000.gltf", scene, function(mesh) {
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+002_+001.gltf", scene, function(mesh) {
          //   // console.log(mesh);
          //   // for (let i = 0; i < mesh.length; i++) {
          //   // 	mesh[i].actionManager = new BABYLON.ActionManager(scene);
          //   // 	mesh[i].actionManager.registerAction(
          //   // 		new BABYLON.ExecuteCodeAction(
          //   // 			BABYLON.ActionManager.OnPickTrigger,
          //   // 			function(e) {
          //   // 				console.log(mesh[i].uniqueId);
          //   // 			}
          //   //  		)
          //   // 	)
          //   // }
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          //   // GUI
          // 	 let rect1 = new GUI.Rectangle();
          //   rect1.width = "60px";
          //   rect1.height = "35px";
          //   rect1.cornerRadius = 20;
          //  	rect1.color = "Orange";
          //   rect1.thickness = 4;
          //   rect1.background = "green";
          //   advancedTexture.addControl(rect1);
          //   rect1.linkWithMesh(mesh[125]);
          //   rect1.linkOffsetY = -150;

          // 	 let jc17 = GUI.Button.CreateSimpleButton("jc17", "JC17");
          //   rect1.addControl(jc17);
          //   jc17.onPointerClickObservable.add(function() {
          //   		console.log("aaa");
          //   });

          //   let target1 = new GUI.Ellipse();
          //   target1.width = "20px";
          //   target1.height = "20px";
          //   target1.color = "Orange";
          // 	 target1.thickness = 4;
          //   target1.background = "green";
          //   advancedTexture.addControl(target1);
          // 	 target1.linkWithMesh(mesh[125]);

          //   let line1 = new GUI.Line();
          //   line1.lineWidth = 4;
          //   line1.color = "Orange";
          //   line1.y2 = 20;
          //   line1.linkOffsetY = -20;
          //   advancedTexture.addControl(line1);
          //  	line1.linkWithMesh(mesh[125]);
          //   line1.connectedControl = rect1;

          //   // GUI
          //   let rect2 = new GUI.Rectangle();
          //   rect2.width = "60px";
          //   rect2.height = "35px";
          //   rect2.cornerRadius = 20;
          //  	rect2.color = "Orange";
          //   rect2.thickness = 4;
          //   rect2.background = "green";
          //   advancedTexture.addControl(rect2);
          //   rect2.linkWithMesh(mesh[43]);
          // 	 rect2.linkOffsetY = -150;

          //  	let jc18 = GUI.Button.CreateSimpleButton("jc18", "JC18");
          //   rect2.addControl(jc18);
          //   jc18.onPointerClickObservable.add(function() {
          // 		  console.log("aaa");
          //   });

          // 	 let target2 = new GUI.Ellipse();
          //   target2.width = "20px";
          //   target2.height = "20px";
          // 	 target2.color = "Orange";
          //   target2.thickness = 4;
          //   target2.background = "green";
          //   advancedTexture.addControl(target2);
          //  	target2.linkWithMesh(mesh[43]);

          //   let line2 = new GUI.Line();
          //   line2.lineWidth = 4;
          //   line2.color = "Orange";
          //   line2.y2 = 20;
          //  	line2.linkOffsetY = -20;
          //   advancedTexture.addControl(line2);
          //   line2.linkWithMesh(mesh[43]);
          //   line2.connectedControl = rect2;

          // 	 // GUI
          //  	let rect3 = new GUI.Rectangle();
          //   rect3.width = "60px";
          //   rect3.height = "35px";
          //   rect3.cornerRadius = 20;
          //   rect3.color = "Orange";
          //   rect3.thickness = 4;
          //   rect3.background = "green";
          //   advancedTexture.addControl(rect3);
          //   rect3.linkWithMesh(mesh[129]);
          // 	 rect3.linkOffsetY = -150;

          //   let jc21 = GUI.Button.CreateSimpleButton("jc21", "JC21");
          //   rect3.addControl(jc21);
          //   jc21.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target3 = new GUI.Ellipse();
          //   target3.width = "20px";
          //   target3.height = "20px";
          //   target3.color = "Orange";
          //   target3.thickness = 4;
          //   target3.background = "green";
          // 	 advancedTexture.addControl(target3);
          //  	target3.linkWithMesh(mesh[129]);

          //   let line3 = new GUI.Line();
          // 	 line3.lineWidth = 4;
          //  	line3.color = "Orange";
          //   line3.y2 = 20;
          //   line3.linkOffsetY = -20;
          // 	 advancedTexture.addControl(line3);
          //   line3.linkWithMesh(mesh[129]);
          //   line3.connectedControl = rect3;

          // 	 // GUI
          //   let rect4 = new GUI.Rectangle();
          //   rect4.width = "60px";
          //   rect4.height = "35px";
          //  	rect4.cornerRadius = 20;
          //   rect4.color = "Orange";
          //   rect4.thickness = 4;
          //   rect4.background = "green";
          //   advancedTexture.addControl(rect4);
          //   rect4.linkWithMesh(mesh[53]);
          // 	 rect4.linkOffsetY = -150;

          //   let jc52 = GUI.Button.CreateSimpleButton("jc52", "JC52");
          //   rect4.addControl(jc52);
          //   jc52.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //  	let target4 = new GUI.Ellipse();
          //   target4.width = "20px";
          //   target4.height = "20px";
          //   target4.color = "Orange";
          //   target4.thickness = 4;
          //   target4.background = "green";
          //   advancedTexture.addControl(target4);
          //   target4.linkWithMesh(mesh[53]);

          //   let line4 = new GUI.Line();
          // 	 line4.lineWidth = 4;
          //   line4.color = "Orange";
          //   line4.y2 = 20;
          // 	 line4.linkOffsetY = -20;
          //   advancedTexture.addControl(line4);
          //   line4.linkWithMesh(mesh[53]);
          //   line4.connectedControl = rect4;

          //   // GUI
          //   let rect5 = new GUI.Rectangle();
          //   rect5.width = "60px";
          //  	rect5.height = "35px";
          //   rect5.cornerRadius = 20;
          //   rect5.color = "Orange";
          //  	rect5.thickness = 4;
          //   rect5.background = "green";
          //   advancedTexture.addControl(rect5);
          //   rect5.linkWithMesh(mesh[85]);
          //   rect5.linkOffsetY = -150;

          //   let jc22 = GUI.Button.CreateSimpleButton("jc22", "JC22");
          // 	 rect5.addControl(jc22);
          //  	jc22.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target5 = new GUI.Ellipse();
          //   target5.width = "20px";
          //   target5.height = "20px";
          //   target5.color = "Orange";
          //   target5.thickness = 4;
          //   target5.background = "green";
          //   advancedTexture.addControl(target5);
          //   target5.linkWithMesh(mesh[85]);

          //   let line5 = new GUI.Line();
          //   line5.lineWidth = 4;
          //   line5.color = "Orange";
          //   line5.y2 = 20;
          //   line5.linkOffsetY = -20;
          //   advancedTexture.addControl(line5);
          //   line5.linkWithMesh(mesh[85]);
          //   line5.connectedControl = rect5;

          //   // GUI
          //   let rect6 = new GUI.Rectangle();
          //   rect6.width = "60px";
          //   rect6.height = "35px";
          //   rect6.cornerRadius = 20;
          // 	 rect6.color = "Orange";
          //  	rect6.thickness = 4;
          //   rect6.background = "green";
          // 	 advancedTexture.addControl(rect6);
          //  	rect6.linkWithMesh(mesh[103]);
          //   rect6.linkOffsetY = -150;

          //   let jc46 = GUI.Button.CreateSimpleButton("jc46", "JC46");
          // 	 rect6.addControl(jc46);
          //   jc46.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target6 = new GUI.Ellipse();
          //   target6.width = "20px";
          //   target6.height = "20px";
          //   target6.color = "Orange";
          // 	 target6.thickness = 4;
          //   target6.background = "green";
          //   advancedTexture.addControl(target6);
          //   target6.linkWithMesh(mesh[103]);

          //   let line6 = new GUI.Line();
          //   line6.lineWidth = 4;
          //   line6.color = "Orange";
          //   line6.y2 = 20;
          //   line6.linkOffsetY = -20;
          //  	advancedTexture.addControl(line6);
          // 	 line6.linkWithMesh(mesh[103]);
          //  	line6.connectedControl = rect6;

          //   // GUI
          //   let rect7 = new GUI.Rectangle();
          // 	 rect7.width = "60px";
          //   rect7.height = "35px";
          //   rect7.cornerRadius = 20;
          //   rect7.color = "Orange";
          //   rect7.thickness = 4;
          //   rect7.background = "green";
          //   advancedTexture.addControl(rect7);
          //   rect7.linkWithMesh(mesh[52]);
          //   rect7.linkOffsetY = -150;

          // 	 let jc25 = GUI.Button.CreateSimpleButton("jc25", "JC25");
          //   rect7.addControl(jc25);
          //   jc25.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target7 = new GUI.Ellipse();
          //   target7.width = "20px";
          //   target7.height = "20px";
          //   target7.color = "Orange";
          //  	target7.thickness = 4;
          //   target7.background = "green";
          //   advancedTexture.addControl(target7);
          //   target7.linkWithMesh(mesh[52]);

          //  	let line7 = new GUI.Line();
          //   line7.lineWidth = 4;
          // 	 line7.color = "Orange";
          //   line7.y2 = 20;
          //  	line7.linkOffsetY = -20;
          // 	 advancedTexture.addControl(line7);
          //   line7.linkWithMesh(mesh[52]);
          //   line7.connectedControl = rect7;

          // 	 // GUI
          //  	let rect8 = new GUI.Rectangle();
          //   rect8.width = "60px";
          //   rect8.height = "35px";
          // 	 rect8.cornerRadius = 20;
          //   rect8.color = "Orange";
          //   rect8.thickness = 4;
          // 	 rect8.background = "green";
          //   advancedTexture.addControl(rect8);
          //   rect8.linkWithMesh(mesh[27]);
          //   rect8.linkOffsetY = -150;

          //   let jc51 = GUI.Button.CreateSimpleButton("jc51", "JC51");
          //   rect8.addControl(jc51);
          //   jc51.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          // 	 let target8 = new GUI.Ellipse();
          //   target8.width = "20px";
          //   target8.height = "20px";
          //   target8.color = "Orange";
          //   target8.thickness = 4;
          //   target8.background = "green";
          // 	 advancedTexture.addControl(target8);
          //  	target8.linkWithMesh(mesh[27]);

          //   let line8 = new GUI.Line();
          //   line8.lineWidth = 4;
          // 	 line8.color = "Orange";
          //   line8.y2 = 20;
          //   line8.linkOffsetY = -20;
          //   advancedTexture.addControl(line8);
          //   line8.linkWithMesh(mesh[27]);
          //   line8.connectedControl = rect8;

          //   // GUI
          //   let rect9 = new GUI.Rectangle();
          //   rect9.width = "60px";
          //   rect9.height = "35px";
          //   rect9.cornerRadius = 20;
          //   rect9.color = "Orange";
          //   rect9.thickness = 4;
          // 	 rect9.background = "green";
          //   advancedTexture.addControl(rect9);
          //   rect9.linkWithMesh(mesh[1]);
          //   rect9.linkOffsetY = -150;

          //   let jc19 = GUI.Button.CreateSimpleButton("jc19", "JC19");
          //   rect9.addControl(jc19);
          // 	 jc19.onPointerClickObservable.add(function() {
          // 		  console.log("aaa");
          //   });

          //   let target9 = new GUI.Ellipse();
          //   target9.width = "20px";
          //   target9.height = "20px";
          // 	 target9.color = "Orange";
          //   target9.thickness = 4;
          //   target9.background = "green";
          //   advancedTexture.addControl(target9);
          //  	target9.linkWithMesh(mesh[1]);

          //   let line9 = new GUI.Line();
          //   line9.lineWidth = 4;
          //   line9.color = "Orange";
          //   line9.y2 = 20;
          //   line9.linkOffsetY = -20;
          // 	 advancedTexture.addControl(line9);
          //   line9.linkWithMesh(mesh[1]);
          //   line9.connectedControl = rect9;
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+002_+002.gltf", scene, function(mesh) {
          //   // console.log(mesh);
          //  	// for (let i = 0; i < mesh.length; i++) {
          //   // 	mesh[i].actionManager = new BABYLON.ActionManager(scene);
          //   // 	mesh[i].actionManager.registerAction(
          //   // 		new BABYLON.ExecuteCodeAction(
          //   // 			BABYLON.ActionManager.OnPickTrigger,
          //   // 			function(e) {
          //   // 				console.log(mesh[i].uniqueId);
          //   // 			}
          // 	 // 		)
          //   // 	)
          //   // }
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          //   // GUI
          //   let rect1 = new GUI.Rectangle();
          //   rect1.width = "60px";
          //   rect1.height = "35px";
          //   rect1.cornerRadius = 20;
          //   rect1.color = "Orange";
          //   rect1.thickness = 4;
          //   rect1.background = "green";
          //   advancedTexture.addControl(rect1);
          //   rect1.linkWithMesh(mesh[1]);
          //   rect1.linkOffsetY = -150;

          // 	 let jc45 = GUI.Button.CreateSimpleButton("jc45", "JC45");
          //   rect1.addControl(jc45);
          //   jc45.onPointerClickObservable.add(function() {
          // 	   console.log("aaa");
          //   });

          //   let target1 = new GUI.Ellipse();
          //   target1.width = "20px";
          //   target1.height = "20px";
          //   target1.color = "Orange";
          //   target1.thickness = 4;
          //   target1.background = "green";
          //  	advancedTexture.addControl(target1);
          // 	 target1.linkWithMesh(mesh[1]);

          //   let line1 = new GUI.Line();
          //   line1.lineWidth = 4;
          //   line1.color = "Orange";
          //   line1.y2 = 20;
          //   line1.linkOffsetY = -20;
          //   advancedTexture.addControl(line1);
          //   line1.linkWithMesh(mesh[1]);
          //   line1.connectedControl = rect1;

          //   // GUI
          // 	 let rect2 = new GUI.Rectangle();
          //   rect2.width = "60px";
          //   rect2.height = "35px";
          // 	 rect2.cornerRadius = 20;
          //   rect2.color = "Orange";
          //   rect2.thickness = 4;
          //   rect2.background = "green";
          //   advancedTexture.addControl(rect2);
          //   rect2.linkWithMesh(mesh[159]);
          //   rect2.linkOffsetY = -150;

          //   let jc43 = GUI.Button.CreateSimpleButton("jc43", "JC43");
          //   rect2.addControl(jc43);
          //   jc43.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target2 = new GUI.Ellipse();
          //  	target2.width = "20px";
          //   target2.height = "20px";
          //   target2.color = "Orange";
          //   target2.thickness = 4;
          //  	target2.background = "green";
          // 	 advancedTexture.addControl(target2);
          //  	target2.linkWithMesh(mesh[159]);

          //   let line2 = new GUI.Line();
          // 	 line2.lineWidth = 4;
          //  	line2.color = "Orange";
          //   line2.y2 = 20;
          //   line2.linkOffsetY = -20;
          // 	 advancedTexture.addControl(line2);
          //   line2.linkWithMesh(mesh[159]);
          //   line2.connectedControl = rect2;

          // 	 // GUI
          //   let rect3 = new GUI.Rectangle();
          //   rect3.width = "60px";
          //   rect3.height = "35px";
          //  	rect3.cornerRadius = 20;
          //   rect3.color = "Orange";
          //   rect3.thickness = 4;
          //   rect3.background = "green";
          //  	advancedTexture.addControl(rect3);
          //   rect3.linkWithMesh(mesh[49]);
          //   rect3.linkOffsetY = -150;

          //   let jc40 = GUI.Button.CreateSimpleButton("jc40", "JC40");
          //   rect3.addControl(jc40);
          //   jc40.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //  	let target3 = new GUI.Ellipse();
          //   target3.width = "20px";
          //   target3.height = "20px";
          //   target3.color = "Orange";
          //   target3.thickness = 4;
          //   target3.background = "green";
          //   advancedTexture.addControl(target3);
          //   target3.linkWithMesh(mesh[49]);

          //   let line3 = new GUI.Line();
          // 	 line3.lineWidth = 4;
          //   line3.color = "Orange";
          //   line3.y2 = 20;
          // 	 line3.linkOffsetY = -20;
          //   advancedTexture.addControl(line3);
          //   line3.linkWithMesh(mesh[49]);
          //   line3.connectedControl = rect3;

          //   // GUI
          //   let rect4 = new GUI.Rectangle();
          //   rect4.width = "60px";
          //  	rect4.height = "35px";
          //   rect4.cornerRadius = 20;
          //   rect4.color = "Orange";
          //  	rect4.thickness = 4;
          //   rect4.background = "green";
          //   advancedTexture.addControl(rect4);
          //   rect4.linkWithMesh(mesh[89]);
          //  	rect4.linkOffsetY = -150;

          //   let jc47 = GUI.Button.CreateSimpleButton("jc47", "JC47");
          // 	 rect4.addControl(jc47);
          //  	jc47.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target4 = new GUI.Ellipse();
          //   target4.width = "20px";
          // 	 target4.height = "20px";
          //   target4.color = "Orange";
          //   target4.thickness = 4;
          //   target4.background = "green";
          //   advancedTexture.addControl(target4);
          //   target4.linkWithMesh(mesh[89]);

          //   let line4 = new GUI.Line();
          //   line4.lineWidth = 4;
          //   line4.color = "Orange";
          //   line4.y2 = 20;
          //   line4.linkOffsetY = -20;
          //   advancedTexture.addControl(line4);
          //   line4.linkWithMesh(mesh[89]);
          //   line4.connectedControl = rect4;

          //  	// GUI
          //   let rect5 = new GUI.Rectangle();
          // 	 rect5.width = "60px";
          //  	rect5.height = "35px";
          //   rect5.cornerRadius = 20;
          //   rect5.color = "Orange";
          //   rect5.thickness = 4;
          //   rect5.background = "green";
          //   advancedTexture.addControl(rect5);
          // 	 rect5.linkWithMesh(mesh[85]);
          //   rect5.linkOffsetY = -150;

          //   let jc31 = GUI.Button.CreateSimpleButton("jc31", "JC31");
          //   rect5.addControl(jc31);
          //   jc31.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target5 = new GUI.Ellipse();
          //   target5.width = "20px";
          //   target5.height = "20px";
          //   target5.color = "Orange";
          //   target5.thickness = 4;
          //   target5.background = "green";
          //  	advancedTexture.addControl(target5);
          //   target5.linkWithMesh(mesh[85]);

          //   let line5 = new GUI.Line();
          //   line5.lineWidth = 4;
          //   line5.color = "Orange";
          //   line5.y2 = 20;
          //   line5.linkOffsetY = -20;
          //   advancedTexture.addControl(line5);
          //   line5.linkWithMesh(mesh[85]);
          // 	 line5.connectedControl = rect5;

          //   // GUI
          //   let rect6 = new GUI.Rectangle();
          //   rect6.width = "60px";
          //  	rect6.height = "35px";
          //   rect6.cornerRadius = 20;
          //   rect6.color = "Orange";
          //  	rect6.thickness = 4;
          //   rect6.background = "green";
          //   advancedTexture.addControl(rect6);
          //  	rect6.linkWithMesh(mesh[36]);
          //   rect6.linkOffsetY = -150;

          //   let jc28 = GUI.Button.CreateSimpleButton("jc28", "JC28");
          //   rect6.addControl(jc28);
          //   jc28.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target6 = new GUI.Ellipse();
          //   target6.width = "20px";
          //  	target6.height = "20px";
          //   target6.color = "Orange";
          //   target6.thickness = 4;
          //   target6.background = "green";
          //   advancedTexture.addControl(target6);
          //   target6.linkWithMesh(mesh[36]);

          //   let line6 = new GUI.Line();
          //   line6.lineWidth = 4;
          //   line6.color = "Orange";
          //   line6.y2 = 20;
          //   line6.linkOffsetY = -20;
          //   advancedTexture.addControl(line6);
          // 	 line6.linkWithMesh(mesh[36]);
          //   line6.connectedControl = rect6;

          //   // GUI
          // 	 let rect7 = new GUI.Rectangle();
          //   rect7.width = "60px";
          //   rect7.height = "35px";
          //   rect7.cornerRadius = 20;
          //  	rect7.color = "Orange";
          //   rect7.thickness = 4;
          //   rect7.background = "green";
          //   advancedTexture.addControl(rect7);
          //   rect7.linkWithMesh(mesh[86]);
          //   rect7.linkOffsetY = -150;

          // 	 let jc24 = GUI.Button.CreateSimpleButton("jc24", "JC24");
          //  	rect7.addControl(jc24);
          //   jc24.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          //   let target7 = new GUI.Ellipse();
          //   target7.width = "20px";
          //   target7.height = "20px";
          //   target7.color = "Orange";
          // 	 target7.thickness = 4;
          //   target7.background = "green";
          //   advancedTexture.addControl(target7);
          //   target7.linkWithMesh(mesh[86]);

          //   let line7 = new GUI.Line();
          //   line7.lineWidth = 4;
          //   line7.color = "Orange";
          //   line7.y2 = 20;
          //   line7.linkOffsetY = -20;
          //   advancedTexture.addControl(line7);
          //   line7.linkWithMesh(mesh[86]);
          //   line7.connectedControl = rect7;

          //   // GUI
          //   let rect8 = new GUI.Rectangle();
          //   rect8.width = "60px";
          //   rect8.height = "35px";
          //   rect8.cornerRadius = 20;
          //   rect8.color = "Orange";
          //   rect8.thickness = 4;
          // 	 rect8.background = "green";
          //   advancedTexture.addControl(rect8);
          //   rect8.linkWithMesh(mesh[260]);
          // 	 rect8.linkOffsetY = -150;

          //  	let jc26 = GUI.Button.CreateSimpleButton("jc26", "JC26");
          //   rect8.addControl(jc26);
          //   jc26.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          //   });

          // 	 let target8 = new GUI.Ellipse();
          //   target8.width = "20px";
          //   target8.height = "20px";
          // 	 target8.color = "Orange";
          //   target8.thickness = 4;
          //   target8.background = "green";
          //   advancedTexture.addControl(target8);
          //  	target8.linkWithMesh(mesh[260]);

          //   let line8 = new GUI.Line();
          //   line8.lineWidth = 4;
          //   line8.color = "Orange";
          //   line8.y2 = 20;
          //   line8.linkOffsetY = -20;
          // 	 advancedTexture.addControl(line8);
          //   line8.linkWithMesh(mesh[260]);
          //   line8.connectedControl = rect8;

          // 	 // GUI
          //  	let rect9 = new GUI.Rectangle();
          //   rect9.width = "60px";
          //   rect9.height = "35px";
          //   rect9.cornerRadius = 20;
          //   rect9.color = "Orange";
          //   rect9.thickness = 4;
          //   rect9.background = "green";
          //   advancedTexture.addControl(rect9);
          //   rect9.linkWithMesh(mesh[25]);
          //   rect9.linkOffsetY = -150;

          //   let jc30 = GUI.Button.CreateSimpleButton("jc30", "JC30");
          //   rect9.addControl(jc30);
          //   jc30.onPointerClickObservable.add(function() {
          //     console.log("aaa");
          // 	 });

          //   let target9 = new GUI.Ellipse();
          //   target9.width = "20px";
          //   target9.height = "20px";
          //  	target9.color = "Orange";
          //   target9.thickness = 4;
          //   target9.background = "green";
          //   advancedTexture.addControl(target9);
          //   target9.linkWithMesh(mesh[25]);

          //   let line9 = new GUI.Line();
          //   line9.lineWidth = 4;
          //   line9.color = "Orange";
          //   line9.y2 = 20;
          //   line9.linkOffsetY = -20;
          //  	advancedTexture.addControl(line9);
          //   line9.linkWithMesh(mesh[25]);
          // 	 line9.connectedControl = rect9;

          //  	// GUI
          //   let rect10 = new GUI.Rectangle();
          //   rect10.width = "60px";
          //   rect10.height = "35px";
          //   rect10.cornerRadius = 20;
          //   rect10.color = "Orange";
          // 	 rect10.thickness = 4;
          //   rect10.background = "green";
          //   advancedTexture.addControl(rect10);
          //   rect10.linkWithMesh(mesh[163]);
          //  	rect10.linkOffsetY = -150;

          //   let jc29 = GUI.Button.CreateSimpleButton("jc29", "JC29");
          //   rect10.addControl(jc29);
          //   jc29.onPointerClickObservable.add(function() {
          //  		 console.log("aaa");
          //   });

          //   let target10 = new GUI.Ellipse();
          //   target10.width = "20px";
          //   target10.height = "20px";
          //   target10.color = "Orange";
          //   target10.thickness = 4;
          // 	 target10.background = "green";
          //  	advancedTexture.addControl(target10);
          //   target10.linkWithMesh(mesh[163]);

          //   let line10 = new GUI.Line();
          //   line10.lineWidth = 4;
          //   line10.color = "Orange";
          //   line10.y2 = 20;
          // 	 line10.linkOffsetY = -20;
          //   advancedTexture.addControl(line10);
          //   line10.linkWithMesh(mesh[163]);
          //   line10.connectedControl = rect10;
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+002_+003.gltf", scene, function(mesh) {
          //   // 模型添加成功后，执行场景对象的一些方法
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+002_+004.gltf", scene, function(mesh) {
          //   // 模型添加成功后，执行场景对象的一些方法
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+003_+001.gltf", scene, function(mesh) {
          //   // 模型添加成功后，执行场景对象的一些方法
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+003_+002.gltf", scene, function(mesh) {
          //   // 模型添加成功后，执行场景对象的一些方法
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+003_+003.gltf", scene, function(mesh) {
          //   // 模型添加成功后，执行场景对象的一些方法
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
          // BABYLON.SceneLoader.ImportMesh("", "static/gltftest/", "Tile_+003_+004.gltf", scene, function(mesh) {
          //   // 模型添加成功后，执行场景对象的一些方法
          //   mesh.doNotSyncBoundingInfo = true;
          //   BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed(),
          //   function() {
          //      // On success
          //   }, function() {
          //      // FPS target not reached
          //   });
          // });
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
      Digital() {
        this.$router.replace('/DigitalAnalogue')
      },
      out() {
        this.$router.replace('/')
      }
    }
  }
</script>

<style  scoped>
</style>
