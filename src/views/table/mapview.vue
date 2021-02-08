<template>
  <div id="mapview" />
</template>

<script lang="ts">
import { loadModules } from 'esri-loader'
import pests from '@/api/table'

export default {
  data() {
    return {
      list: null // 查询之后接口返回集合
    }
  },
  mounted() {
    this.createView()
  },
  created() {
    this.getList()
  },
  methods: {
    createView() {
      const options = {
        url: 'https://js.arcgis.com/4.15/',
        css: 'https://js.arcgis.com/4.15/esri/themes/light/main.css'
      }

      loadModules(
        [
          'esri/config',
          'esri/Map',
          'esri/layers/WebTileLayer',
          'esri/views/SceneView',
          'esri/Graphic',
          'esri/layers/GraphicsLayer'
        ],
        options
      ).then(
        ([
          esriConfig,
          Map,
          WebTileLayer,
          SceneView,
          Graphic,
          GraphicsLayer
        ]) => {
          // 天地图服务地址
          const tiandituBaseUrl = 'http://{subDomain}.tianditu.gov.cn'
          // 天地图管网申请token
          var token = '17738246ec9ad63711f1a7c09742bdf8'
          const map = new Map({
            basemap: 'streets',
            ground: 'world-elevation'
          })

          const view = new SceneView({
            container: 'mapview',
            map: map,
            center: [120.52, 31.53],
            zoom: 8
          })
          // 球面墨卡托投影矢量底图
          var tiledLayer = new WebTileLayer({
            urlTemplate:
              tiandituBaseUrl +
              '/DataServer?T=img_w/wmts&x={col}&y={row}&l={level}&tk=' +
              token,
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
          })
          // 矢量标注(球面墨卡托投影)
          var tiledLayerAnno = new WebTileLayer({
            urlTemplate:
              tiandituBaseUrl +
              '/DataServer?T=cia_w?T=vec_c/wmts&x={col}&y={row}&l={level}&tk=' +
              token,
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
          })
          // 将天地图底图添加到map上
          map.add(tiledLayer)
          // 标注添加到map上
          map.add(tiledLayerAnno)

          const graphicsLayer = new GraphicsLayer()
          map.add(graphicsLayer)

          pests.getList().then((response) => {
            this.list = response.data.items
            console.log(this.list)
            this.list.forEach(element => {
              const point = {
                // Create a point
                type: 'point',
                longitude: element.longitude,
                latitude: element.latitude
              }
              const simpleMarkerSymbol = {
                type: 'simple-marker',
                color: [226, 119, 40], // Orange
                outline: {
                  color: [255, 255, 255], // White
                  width: 1
                }
              }
              console.log(element.toString())
              const popupTemplate = {
                title: '{Name}',
                content: `<div id="selected_rcds_detail" style="">
                  <table class="field_value_tbl" id="select_detail_basic_tbl">
                    <tbody>
                      <tr>
                        <td class="name_column">采集时间</td>
                        <td class="value_column">2021/1/13 上午10:23:06</td>
                      </tr>
                      <tr>
                        <td class="name_column">采集设备</td>
                        <td class="value_column">ID10972 ( 陈冬冬 )</td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    class="field_value_tbl"
                    id="selected_rcd_detail_pp_tbl"
                    data-recordid="14638"
                  >
                    <tbody>
                      <tr>
                        <td class="name_column">备注</td>
                        <td class="value_column"></td>
                      </tr>
                      <tr>
                        <td class="name_column">树径</td>
                        <td class="value_column">10-20cm</td>
                      </tr>
                      <tr>
                        <td colspan="2" class="photo_column">
                          <div
                            class="photo_box loaded"
                            data-ossfile="mpld_3_73_rcd_14638_606.jpg"
                            style="height: 380px;"
                          >
                            <img
                              src="{fellPic}"
                            />
                            <div class="photo_name">砍倒照片</div>
                            <div class="photo_failed_msg" style="display: none;">
                              无法加载此图片！
                            </div>
                            <div class="photo_busy_ind" style="display: none;"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="photo_column">
                          <div
                            class="photo_box loaded"
                            data-ossfile="mpld_3_73_rcd_14638_606.jpg"
                            style="height: 380px;"
                          >
                            <img
                              src="{stumpPic}"
                            />
                            <div class="photo_name">树桩照片</div>
                            <div class="photo_failed_msg" style="display: none;">
                              无法加载此图片！
                            </div>
                            <div class="photo_busy_ind" style="display: none;"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="photo_column">
                          <div
                            class="photo_box loaded"
                            data-ossfile="mpld_3_73_rcd_14638_607.jpg"
                            style="height: 380px;"
                          >
                            <img
                              src="{finishPic}"
                            />
                            <div class="photo_name">处理好照片</div>
                            <div class="photo_failed_msg" style="display: none;">
                              无法加载此图片！
                            </div>
                            <div class="photo_busy_ind" style="display: none;"></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="name_column">镇</td>
                        <td class="value_column">内厝镇</td>
                      </tr>
                      <tr>
                        <td class="name_column">村</td>
                        <td class="value_column">许厝村</td>
                      </tr>
                      <tr>
                        <td class="name_column">作业人</td>
                        <td class="value_column">龙英han</td>
                      </tr>
                      <tr>
                        <td class="name_column">小班</td>
                        <td class="value_column">
                          <div class="action_text record_detail_link" data-recordid="17499">
                            020
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="name_column">大班</td>
                        <td class="value_column">02</td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="field_value_tbl" data-recordid="14638">
                    <tbody>
                      <tr>
                        <td class="name_column">二维码编号</td>
                        <td class="value_column">
                          <div class="action_text entity_detail_link" data-entityid="17499">
                            15385
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="delete_rcd_button button">删除记录</div>
                </div>`
              }
              const attributes = {
                Name: '节点' + element.id,
                appId: element.appId,
                bagNumber: element.bagNumber,
                db: element.db,
                deviceId: element.deviceId,
                fellPic: element.fellPic,
                finishPic: element.finishPic,
                gmtCreate: element.gmtCreate,
                gmtModified: element.gmtModified,
                id: element.id,
                isDeleted: element.isDeleted,
                latitude: element.latitude,
                longitude: element.longitude,
                operator: element.operator,
                pestsType: element.pestsType,
                positionError: element.positionError,
                projectId: element.projectId,
                qrcode: element.qrcode,
                stime: element.stime,
                stumpPic: element.stumpPic,
                town: element.town,
                treeWalk: element.treeWalk,
                userId: element.userId,
                village: element.village,
                xb: element.xb
              }

              const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: attributes,
                popupTemplate: popupTemplate
              })
              graphicsLayer.add(pointGraphic)
            })
          })

          console.info(view, 11111)
        }
      )
    },
    getList() {
      pests.getList().then((response) => {
        this.list = response.data.items
        console.log(this.list)
      })
    }
  }
}
</script>
<style>
  #mapview {
    position: absolute;
    width: 100%;
    height: 100%;
  }

      .name_column {
        min-width: 120px;
        border-right: 1px solid #ececec;
        background-color: #fafafa;
      }
      .value_column {
        width: 50%;
        padding: 0.6em;
        border-bottom: 1px solid #ececec;
      }
      .field_value_tbl {
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0 0 0;
      }
      .photo_column {
        padding: 0;
        background-color: #fafafa;
        overflow: hidden;
      }
      .photo_box {
        position: relative;
        min-height: 150px;
      }
      .photo_name {
        position: absolute;
        padding: 4px 16px;
        top: 15px;
        left: 15px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.38);
        color: white;
      }
      .photo_failed_msg {
        display: none;
        position: relative;
        margin-top: 32px;
        color: #f41616;
      }
      .photo_busy_ind {
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        height: 40px;
        width: 40px;
        margin-left: -20px;
        margin-top: -20px;
        -webkit-animation: rotation 0.6s infinite linear;
        -moz-animation: rotation 0.6s infinite linear;
        -o-animation: rotation 0.6s infinite linear;
        animation: rotation 0.6s infinite linear;
        border-left: 4px solid #c3c3c3;
        border-right: 4px solid #c3c3c3;
        border-bottom: 4px solid #c3c3c3;
        border-top: 4px solid #777;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        -ms-border-radius: 100%;
        -o-border-radius: 100%;
        border-radius: 100%;
      }
      .delete_rcd_button {
        margin: 1em 0;
        padding: 0.8em;
        background-color: red;
        border-radius: 4px;
      }
      .button {
        text-align: center;
        cursor: pointer;
        overflow: visible;
        text-decoration: none;
        color: white;
        background-color: #007aff;
      }
  .action_text{
    color: #007aff;
    text-decoration: none;
    cursor: pointer;
  }
</style>
