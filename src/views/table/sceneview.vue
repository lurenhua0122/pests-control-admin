<template>
  <div id="SceneView" />
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
  data() {
    return {}
  },
  mounted() {
    this.createView()
  },
  methods: {
    // 创建视图
    createView() {
      const options = {
        url: 'https://js.arcgis.com/4.15/',
        css: 'https://js.arcgis.com/4.15/esri/themes/light/main.css'
      }

      loadModules(['esri/Map', 'esri/views/SceneView'], options).then(
        ([Map, SceneView]) => {
          const map = new Map({
            basemap: 'streets',
            ground: 'world-elevation'
          })

          const view = new SceneView({
            container: 'SceneView', // Reference to the DOM node that will contain the view
            map: map // References the map object created in step 3
          })

          console.info(view, 111)
        }
      )
    }
  }
}
</script>

<style>
#SceneView {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
