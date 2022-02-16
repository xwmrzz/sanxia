<template>
  <div :id="id" />
</template>

<script>
  import * as THREE from 'three'
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

  export default {
    props: {
      id: {
        type: String,
        default: '',
        required: true,
      },
      models: {
        type: Object,
        default: () => {},
        required: true,
      },
      cameraParam: {
        type: Object,
        default: () => {},
        required: true,
      },
      isStats: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        renderer: null,
        camera: null,
        scene: null,
        light: null,
        stats: null,
        controls: null,
        canvasDiv: {
          element: null,
          width: '',
          height: '',
        },
        mesh: null,
        objChildren: [],
        mousePosition: {
          mouseX: 0,
          mouseY: 0,
        },
        raycaster: null,
        mouse: null,
        selectObj: null,
        timer: null,
        animationRenId: null,
        animationAniId: null,
      }
    },
    mounted() {
      this.initThree()
      if (this.models) this.loadData()
      this.render()
    },
    methods: {
      /**
       * @description 初始化容器
       */
      initThree() {
        const _el = document.getElementById(this.id)
        _el.style.width = '100%'
        _el.style.height = '80%'
        this.canvasDiv.element = _el
        this.canvasDiv.width = _el.clientWidth
        this.canvasDiv.height = _el.clientHeight

        this.initScene()
        this.initCamera(this.cameraParam)
        this.initLight()
        this.initRenderer()
        if (this.isStats) this.initStats()
        this.initControls()
      },
      /**
       * @description 初始化场景
       * @param axesHelper - 红-x|绿-y|蓝-z 轴线
       * @param aLight - 灯光
       */
      initScene(axesHelper = false, aLight = false) {
        this.scene = new THREE.Scene()

        if (axesHelper) {
          const axesHelper = new THREE.AxesHelper(15)
          this.scene.add(axesHelper)
        }

        if (aLight) {
          const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
          this.scene.add(ambientLight)
        }
      },
      /**
       * @description 初始化灯光
       */
      initLight() {
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
        this.scene.add(ambientLight)

        this.light = new THREE.PointLight(0xcccccc, 1)
        this.light.position.set(50, 200, 100)
        this.light.position.multiplyScalar(1.3)
        this.light.castShadow = true
        this.light.shadow.mapSize.width = 500
        this.light.shadow.mapSize.height = 500

        const d = 300

        this.light.shadow.camera.left = -d
        this.light.shadow.camera.right = d
        this.light.shadow.camera.top = d
        this.light.shadow.camera.bottom = -d

        this.light.shadow.camera.far = 1000

        this.scene.add(this.light)
      },
      /**
       * @description 加载相机
       * @param param fov - 相机的垂直视角
       *              aspect - 相机视锥体的长宽比
       *              near - 相机视锥体的近平面
       *              far - 相机视锥体的原平面
       *              pos - 相机距离圆点的位置
       *              up - 相机头顶方向
       *              lookAt - 相机的
       */
      initCamera(param) {
        let { fov, aspect, near, far, pos, up, lookAt } = param

        if (!aspect) aspect = this.canvasDiv.width / this.canvasDiv.height

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

        this.camera.position.set(pos.x, pos.y, pos.z)

        if (up) this.camera.up.set(up.x, up.y, up.z)

        if (lookAt) this.camera.lookAt(lookAt.x, lookAt.y, lookAt.z)

        this.scene.add(this.camera)
      },
      /**
       * @description 初始化渲染器
       * @param antialias - 是否开启反锯齿
       * @param alpha - 是否可以设置背景色透明
       * @param precision - 着色精度选择 highp|mediump|lowp
       * @param premultipliedAlpha - 设置像素深度（用来度量图像的分辨率）
       * @param preserveDrawingBuffer - 是否保存绘图缓冲
       * @param maxLights - 最大灯光数
       * @param stencil - 是否使用模板字体或图案
       */
      initRenderer(
        antialias = true,
        alpha = true,
        precision = 'highp',
        premultipliedAlpha = false,
        preserveDrawingBuffer = true,
        maxLights = 3,
        stencil = false
      ) {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          precision: 'highp',
          premultipliedAlpha: false,
          preserveDrawingBuffer: true,
          maxLights: 3,
          stencil: false,
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.canvasDiv.width, this.canvasDiv.height)
        this.canvasDiv.element.appendChild(this.renderer.domElement)
      },
      /**
       * @description 初始化性能监测插件
       */
      initStats() {
        this.stats = new Stats()
        this.stats.dom.style.position = 'absolute'
        this.stats.dom.style.left = '0px'
        this.stats.dom.style.top = '0px'
        this.canvasDiv.element.appendChild(this.stats.dom)
      },
      /**
       * 加载模型
       */
      loadData() {
        const { data } = this.models
        data.map((model) => {
          const { type, mtl } = model
          switch (type) {
            case 'obj':
              const { obj } = model
              this.loadObjWithMtl(mtl, obj)
              break
            case 'particle':
              const {
                name,
                AMOUNTX,
                AMOUNTY,
                AMOUNTZ,
                SEPARATION,
                coordinates,
                offset,
              } = model
              this.loadParticle(
                name,
                AMOUNTX,
                AMOUNTY,
                AMOUNTZ,
                SEPARATION,
                coordinates,
                offset
              )
              break
          }
        })
      },
      loadParticle() {
        const group = new THREE.Group()
        const material = new THREE.SpriteMaterial({
          color: 'rgb(255,255,255)',
          map: getTexture(),
        })
        let sprite = null
        const sprites = []
        const mountX = 50,
          mountY = 50,
          mountZ = 0,
          step = 2

        group.name = 'particleGroup'

        for (let i = -mountX; i <= mountX; i += step) {
          for (let j = -mountY; j <= mountY; j += step) {
            sprite = new THREE.Sprite(material)
            sprite.position.set(i, j, mountZ)
            group.add(sprite)
            sprites.push(sprite)
          }
        }

        this.scene.add(group)

        let count = 0.1
        function render() {
          for (let i = 0, len = sprites.length; i < len; i++) {
            const s = sprites[i]
            s.position.z = z2c(s.position.x, s.position.y, count)
            s.scale.x = z2c(s.position.x, s.position.y, count)
            s.scale.y = z2c(s.position.x, s.position.y, count)
            count += 50
          }
        }

        function z2c(x, y, count) {
          return (
            Math.sin((x + count) * 100) * 0.3 + Math.sin((y + count) * 50) * 0.5
          )
        }

        function animate() {
          requestAnimationFrame(animate)
          render()
        }

        animate()

        function getTexture() {
          const PI2 = Math.PI * 2
          const canvas = document.createElement('canvas')
          canvas.width = 48
          canvas.height = 48

          const context = canvas.getContext('2d')
          const gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
          )
          gradient.addColorStop(0, 'rgba(255,255,255,1)')
          gradient.addColorStop(0.2, 'rgba(0,255,255,1)')
          context.fillStyle = gradient
          context.beginPath()
          context.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 3,
            0,
            PI2,
            true
          )
          context.fill()

          const texture = new THREE.Texture(canvas)
          texture.needsUpdate = true
          return texture
        }
      },
      /**
       * @description 加载模型
       * @param material - 材质
       *                :path - 材质路径
       *                :name - 材质名称
       * @param object - OBJ 格式模型
       *              :path - 模型路径
       *              :name - 模型名称
       */
      loadObjWithMtl(material, object) {
        const objLoader = new OBJLoader()
        const mtlLoader = new MTLLoader()

        if (material) {
          if (material.path && material.name) {
            mtlLoader.setPath(material.path).load(material.name, (mtl) => {
              mtl.preload()
              console.log(mtl)

              if (object) {
                if (object.path && object.name) {
                  objLoader
                    .setMaterials(mtl)
                    .setPath(object.path)
                    .load(
                      object.name,
                      (obj) => {
                        const { pos, ms } = object
                        console.log(pos, ms)
                        obj.position.set(pos.x, pos.y, pos.z)
                        obj.scale.multiplyScalar(ms)
                        this.scene.add(obj)
                      },
                      (xhr) => {
                        this.onProgress(xhr)
                      },
                      (err) => {
                        console.error(err)
                      }
                    )
                }
              }
            })
          }
        } else {
          if (object) {
            if (object.path && object.name) {
              objLoader.setPath(object.path).load(
                object.name,
                (obj) => {
                  const { pos, ms } = object
                  obj.position.set(pos.x, pos.y, pos.z)
                  obj.scale.multiplyScalar(ms)
                  this.scene.add(obj)
                },
                (xhr) => {
                  this.onProgress(xhr)
                },
                (err) => {
                  console.error(err)
                }
              )
            }
          }
        }
      },
      /**
       * @description 进程
       */
      onProgress(xhr) {
        if (xhr.lengthComputable) {
          let percentComplete = (xhr.loaded / xhr.total) * 100
          console.log(Math.round(percentComplete, 2) + '% downloaded')
        }
      },
      /**
       * @description 渲染
       */
      render() {
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.render)
        if (this.stats) this.stats.update()
      },
      /**
       * @description 用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
       */
      initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement) // , this.renderer.domElement

        // 如果使用animate方法时，将此函数删除
        // this.controls.addEventListener('change', this.render)
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.controls.enableDamping = true
        // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
        // controls.dampingFactor = 0.25;
        // 是否可以缩放
        this.controls.enableZoom = true
        // 是否自动旋转
        this.controls.autoRotate = false
        // 设置相机距离原点的最远距离
        this.controls.minDistance = 1
        // 设置相机距离原点的最远距离
        this.controls.maxDistance = 1000
        // 是否开启右键拖拽
        this.controls.enablePan = true
      },
      /**
       * @description 鼠标跟随事件
       */
      onDocumentMouseMove(event) {
        event.preventDefault()

        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // this.mousePosition.mouseX = (event.clientX - this.canvasDiv.width) / 2
          // this.mousePosition.mouseY = (event.clientY - this.canvasDiv.height) / 2
          // 光标的位置

          this.mouse = new THREE.Vector2()
          this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
          this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

          // 获取焦点
          const raycaster = new THREE.Raycaster()
          if (this.camera) {
            raycaster.setFromCamera(this.mouse, this.camera)
          }
          // console.log(this.scene.children[3])
          if (
            this.scene &&
            this.scene.children &&
            this.scene.children.length > 0
          ) {
            const vPicker =
              this.scene.children[3] !== undefined
                ? this.scene.children[3]['children']
                : []
            const intersects = raycaster.intersectObjects(vPicker)
            // console.log(this.scene.children[3])
            // console.log(this.scene.children[3]['children'])
            // console.log(intersects)
            if (intersects.length > 0) {
              const res = intersects.filter((res) => {
                return res && res.object
              })[0]
              if (res && res.object) {
                this.selectObj = res.object
                // 暂存原有材质颜色
                // var _color = res.object.material.color.getHex()
                // this.selectObj.currentHex = parseInt('0x' + _color)
                // console.log(this.selectObj.currentHex)

                document.getElementsByTagName('body')[0].style.cursor =
                  'pointer' // 移到物体上时鼠标显示为手
                this.selectObj.material.color.setHex('0xffc466')
              }
            } else {
              // 鼠标移除时恢复材质颜色
              if (this.selectObj)
                this.selectObj.material.color.setHex('0xfafafa')
              document.getElementsByTagName('body')[0].style.cursor = 'default' // 移出物体时鼠标显示为默认
              // this.selectObj = null
            }
          }
        }, 200)
      },
    },
  }
</script>
