<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0;">
    <div
      class="map-container"
      :style="{
        left: -canvasLeft - 1200 + 'px',
        top: -canvasTop - 1200 + 'px'
      }"
    >
      <!-- el-chart是中间的地图 -->
      <div id="el-chart" class="canvas-container"></div>
      <div class="site-list" v-if="pixelCoordMap !== null">
        <!-- pop-panel就是需要编辑划入的对应数据框 -->
        <div
          class="pop-panel"
          v-if="selectedTitle !== null"
          :style="{
            left: popPanelLeft + 120 + 'px',
            top: popPanelTop - 100 + 'px'
          }"
        >
          <div class="pop-line-container">
            <img :src="popPanelLine" class="pop-line" />
          </div>
          <div class="pop-title">
            {{ panelTitle && panelTitle.title }}
          </div>
          <PopPanel
            :title="panelTitle"
            :resourceIndics="resourceIndics"
            :pieChartData="pieChartData"
            :topFiveData="topFiveData"
          />
        </div>
        <!-- 八大区 标题 选中显示区域 -->
        <div
          v-for="item in this.regions"
          :key="item.title"
          :style="{
            left: pixelCoordMap[item.title].iconx + 'px',
            top: pixelCoordMap[item.title].icony + 'px'
          }"
          class="region"
        >
          <!-- active1: item.pools.some(v => v.poolCode == selectedTitle) -->
          <img
            :src="item.styles.bg"
            class="province-bg"
            :class="{
              active: item.title === selRegionTitle
            }"
            :style="{
              width: item.styles.width,
              left: item.styles.left,
              top: item.styles.top,
              height: item.styles.height
            }"
          />
          <div
            class="region-title"
            :style="{
              left: item.titleStyles.left + 'px',
              top: item.titleStyles.top + 'px',
              'background-image': 'url(' + regionBg + ')'
            }"
          >
            {{ item.title }}
          </div>
        </div>
        <!-- 可点击的立牌，资源池icon -->
        <!-- :class="{
            active:
              item.belongRegion && item.belongRegion.title === selRegionTitle
          }" -->
        <div
          v-for="item in poolData"
          :key="item.code"
          class="m-site"
          :style="{
            left: pixelCoordMap[item.poolCode].iconx + 'px',
            top: pixelCoordMap[item.poolCode].icony + 'px'
          }"
        >
          <div
            class="title"
            v-if="item.belongPool && item.poolType !== '边缘云'"
            :class="{ active: titleAnima == 1 }"
            :style="{
              right:
                item.styles && item.styles.right ? item.styles.right : null,
              bottom:
                item.styles && item.styles.bottom ? item.styles.bottom : null,
              left: item.styles && item.styles.left ? item.styles.left : null
            }"
            @click="
              go(
                item.poolCode,
                item.belongRegion ? item.belongRegion.zoom : 2.1,
                item
              )
            "
          >
            <!-- {{ item.belongPool.replace(/\-/g, "I").substr(0, 8) }} -->
            {{ item.belongPool.slice(item.belongPool.indexOf("-") + 1) }}
          </div>
          <div
            class="desc-item"
            :class="{ active: pageStatus == 1 }"
            v-if="item.belongRegion && item.belongRegion.poolCodeDesc"
            :style="{
              left: item.belongRegion.poolCodeDesc.styles.left,
              top: item.belongRegion.poolCodeDesc.styles.top
            }"
          >
            <div
              class="desc-item-line"
              :style="item.belongRegion.poolCodeDesc.lineStyle"
            >
              <img :src="yellowLine" class="line" />
            </div>
            {{ item.belongRegion.poolCodeDesc.title }}
          </div>
          <template v-if="item.status === '在建中'">
            <img
              :src="iconZaijian"
              class="site-icon"
              style="width:60px;left:20px;bottom:-8px;height:64px"
              v-if="pageStatus == 0"
            />
            <img
              :src="iconZaijian1"
              class="site-icon"
              style="width:60px;left:20px;bottom:-8px;height:64px"
              v-if="pageStatus == 1"
            />
            <div class="zaijian-title">在建</div>
          </template>
          <template
            v-if="item.status === '使用中' && item.poolType === '边缘云'"
          >
            <img
              :src="iconBianyuan"
              class="site-icon"
              style="width: 64px;height:64px;left: 14px;bottom: -14px;transform: translateX(10px) scale(.9);"
            />
          </template>
          <template v-if="item.status === '使用中' && item.poolType === '中心'">
            <img
              :src="
                item.children.length == 2
                  ? iconCenterStart2
                  : item.children.length >= 3
                  ? iconCenterStart3
                  : iconCenterStart
              "
              class="site-icon"
              :style="
                item.children.length >= 3
                  ? iconSiteStyle.large
                  : item.children.length == 2
                  ? iconSiteStyle.larger
                  : iconSiteStyle.normal
              "
              v-if="pageStatus == 0"
            />
            <img
              :src="
                item.children.length == 2
                  ? iconCenterInterval2
                  : item.children.length >= 3
                  ? iconCenterInterval3
                  : iconCenterInterval
              "
              :style="
                item.children.length >= 3
                  ? iconSiteStyle.large
                  : item.children.length == 2
                  ? iconSiteStyle.larger
                  : iconSiteStyle.normal
              "
              class="site-icon"
              v-if="pageStatus == 1"
              :class="{ iconActive: selectedTitle === item.poolCode }"
            />
          </template>
          <template v-if="item.status === '使用中' && item.poolType === '省级'">
            <img
              :src="
                item.children.length == 2
                  ? iconProvinceStart2
                  : item.children.length >= 3
                  ? iconProvinceStart3
                  : iconProvinceStart
              "
              class="site-icon"
              style="width: 80px;height:60px;left: 14px;bottom: 4px;"
              v-if="pageStatus == 0"
            />
            <img
              :src="
                item.children.length == 2
                  ? iconCenterInterval2
                  : item.children.length >= 3
                  ? iconCenterInterval3
                  : iconProvinceInterval
              "
              class="site-icon"
              style="width: 80px;height:60px;left: 10px;bottom: 4px;"
              v-if="pageStatus == 1"
              :class="{ iconActive: selectedTitle === item.poolCode }"
            />
          </template>
          <template
            v-if="item.status === '使用中' && item.poolType === '合营云'"
          >
            <img
              :src="iconHeying"
              class="site-icon"
              style="width: 64px;height:49px;left: 14px;bottom: 9px;transform: translateX(10px) scale(.8);"
            />
          </template>
        </div>
      </div>
    </div>
    <!-- 左下角图例区域 -->
    <div class="legend-panel">
      <div class="lengend-item">
        <img
          :src="iconCenterInterval"
          class="icon"
          style="transform: translate(10px, 8px) scale(1.5)"
        />
        <div
          class="title"
          @click="switchCenterSite()"
          :style="{ color: isCenterSiteShow ? '#2fd4fe' : '#ddd' }"
        >
          中心资源池({{ poolNumer["中心"] }})
        </div>
      </div>
      <div class="lengend-item">
        <img
          :src="iconProvinceInterval"
          class="icon"
          style="transform: translate(10px, 8px) scale(1.5)"
        />
        <div
          class="title"
          @click="switchProvinceSite()"
          :style="{ color: isProvinceSiteShow ? '#2fd4fe' : '#ddd' }"
        >
          省级资源池({{ poolNumer["省级"] }})
        </div>
      </div>
      <div class="lengend-item">
        <img
          :src="iconBianyuan"
          class="icon"
          style="transform: translate(10px, 25px) scale(.8)"
        />
        <div
          class="title"
          @click="switchBianyuanSite()"
          :style="{ color: isBianyuanSiteShow ? '#2fd4fe' : '#ddd' }"
        >
          边缘资源池({{ poolNumer["边缘云"] }})
        </div>
      </div>
      <div class="lengend-item">
        <img
          :src="iconHeying"
          class="icon"
          style="transform: translate(10px, 14px) scale(.8);"
        />
        <div
          class="title"
          @click="switchHeYingSite()"
          :style="{ color: isHeYingSiteShow ? '#2fd4fe' : '#ddd' }"
        >
          合营资源池({{ poolNumer["合营云"] }})
        </div>
      </div>
      <div style="margin-top:20px;">
        <button
          class="m-btn"
          @click="goRestoreChart()"
          v-if="[0, 1].includes(intervalStatus)"
        >
          复原
        </button>
        <button
          class="m-btn"
          @click="goInterval()"
          v-if="
            [1, 2].includes(intervalStatus) &&
              (isCenterSiteShow || isProvinceSiteShow || isHeYingSiteShow)
          "
        >
          开始轮播
        </button>
        <button
          class="m-btn"
          @click="cancelInterval()"
          v-if="[0].includes(intervalStatus)"
        >
          结束轮播
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import geoJsonprovince from "../../assets/mapData/geo.json";
import PopPanel from "../../components/panel/PopPanel.vue";
import { poolDetail, poolData } from "../../assets/js/dp_axios.js";

export default {
  name: "ChartMap",
  components: {
    PopPanel
  },
  data() {
    this.offsetLng = 0;
    this.offsetLat = 0.3;

    this.iconSiteStyle = {
      large: {
        width: "120px",
        height: "100px",
        left: "-7px",
        bottom: "-5px"
      },
      larger: {
        width: "110px",
        height: "90px"
      },
      normal: {
        width: "100px",
        height: "90px"
      }
    };
    // 地图八大区背景图 网格
    this.mapimg = new Image();
    this.poolResData = [];
    this.regions = [
      {
        title: "内蒙古枢纽",
        children: [
          {
            title: "内蒙古"
          }
        ],
        pools: [
          {
            title: "华北-呼和浩特",
            poolCode: "CIDC-RP-48",
            desc: {
              title: "低成本中心",
              styles: {
                left: "-127px",
                top: "-73px"
              },
              lineStyle: {
                bottom: "-119px",
                right: "-96px",
                transform: "rotate(0deg)"
              }
            }
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/neimenggu.svg`),
          width: "1135px",
          height: "769px",
          left: "-571px",
          top: "-633px",
          longitude: "111.670801",
          latitude: "40.818311",
          zoom: 1.8
        },
        styles1: {
          width: "863px",
          height: "530px",
          left: "-416px",
          top: "-413px"
        },
        titleStyles: {
          left: "-111",
          top: "0"
        }
      },
      {
        title: "京津冀枢纽",
        children: [
          {
            title: "北京"
          },
          {
            title: "天津"
          },
          {
            title: "河北"
          }
        ],
        pools: [
          {
            title: "华北-北京",
            poolCode: "CIDC-RP-03"
          },
          {
            title: "天津",
            poolCode: "CIDC-RP-36",
            align: "rt"
          },
          {
            title: "河北-石家庄",
            poolCode: "CIDC-RP-44"
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/jingjinyi.svg`),
          width: "300px",
          left: "-139px",
          top: "-197px",
          height: "382px",
          longitude: "116.405285",
          latitude: "39.904989",
          zoom: 2.1
        },
        styles1: {
          width: "217px",
          left: "-94px",
          top: "-120px",
          height: "281px"
        },
        titleStyles: {
          left: "-69",
          top: "74"
        }
      },
      {
        title: "甘肃枢纽",
        children: [
          {
            title: "甘肃"
          }
        ],
        pools: [
          {
            title: "甘肃-兰州",
            poolCode: "CIDC-RP-40"
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/gansu.svg`),
          width: "743px",
          height: "584px",
          left: "-521px",
          top: "-422px",
          longitude: "103.823557",
          latitude: "36.058039",
          zoom: 2.1
        },
        styles1: {
          width: "454px",
          height: "355px",
          left: "-316px",
          top: "-241px"
        },
        titleStyles: {
          left: "-13",
          top: "27"
        }
      },
      {
        title: "宁夏枢纽",
        children: [
          {
            title: "宁夏"
          }
        ],
        pools: [],
        styles: {
          bg: require(`../../assets/images/map/province-bg/neimenggu.svg`),
          width: "225px",
          left: "-105px",
          top: "-117px",
          height: "283px",
          longitude: "106.278179",
          latitude: "38.46637",
          zoom: 2.1
        },
        styles1: {
          width: "225px",
          left: "-105px",
          top: "-117px",
          height: "283px"
        },
        titleStyles: {
          left: "-25",
          top: "36"
        }
      },
      {
        title: "成渝枢纽",
        children: [
          {
            title: "四川"
          },
          {
            title: "重庆"
          }
        ],
        pools: [
          {
            title: "西南-成都",
            poolCode: "CIDC-RP-27"
          },
          {
            title: "西南-重庆",
            poolCode: "CIDC-RP-34"
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/chengyu.svg`),
          width: "588px",
          height: "476px",
          left: "-310px",
          top: "-248px",
          longitude: "104.065735",
          latitude: "30.659462",
          zoom: 2.1
        },
        styles1: {
          width: "355px",
          height: "287px",
          left: "-183px",
          top: "-132px"
        },
        titleStyles: {
          left: "-50",
          top: "33"
        }
      },
      {
        title: "长三角枢纽",
        children: [
          {
            title: "上海"
          },
          {
            title: "江苏"
          },
          {
            title: "浙江"
          },
          {
            title: "安徽"
          }
        ],
        pools: [
          {
            title: "华东-上海1",
            poolCode: "CIDC-RP-33"
          },
          {
            title: "华东-苏州",
            poolCode: "CIDC-RP-25"
          },
          {
            title: "华东-淮南",
            poolCode: "CIDC-RP-47"
          },
          {
            title: "华东-杭州",
            poolCode: "CIDC-RP-35"
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/changsanjiao.svg`),
          width: "337px",
          left: "-180px",
          top: "-207px",
          height: "453px",
          longitude: "118.767413",
          latitude: "32.041544",
          zoom: 2.1
        },
        styles1: {
          width: "216px",
          left: "-101px",
          top: "-112px",
          height: "283px"
        },
        titleStyles: {
          left: "-9",
          top: "73"
        }
      },
      {
        title: "贵州枢纽",
        children: [
          {
            title: "贵州"
          }
        ],
        pools: [
          {
            title: "西南-贵阳",
            poolCode: "CIDC-RP-49",
            desc: {
              title: "低成本中心",
              styles: {
                left: "-162px",
                top: "169px"
              },
              lineStyle: {
                right: "-108px",
                top: "-108px",
                transform: "rotate(90deg)"
              }
            }
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/guizhou.svg`),
          width: "296px",
          left: "-154px",
          top: "-206px",
          height: "293px",
          longitude: "106.713478",
          latitude: "26.578343",
          zoom: 2.3
        },
        styles1: {
          width: "192px",
          left: "-96px",
          top: "-109px",
          height: "183px"
        },
        titleStyles: {
          left: "-39",
          top: "7"
        }
      },
      {
        title: "粤港澳枢纽",
        children: [
          {
            title: "广东"
          },
          {
            title: "香港"
          },
          {
            title: "澳门"
          }
        ],
        pools: [
          {
            title: "华南-广州2",
            poolCode: "CIDC-RP-02"
          },
          {
            title: "华南-广州3",
            poolCode: "CIDC-RP-26"
          }
        ],
        styles: {
          bg: require(`../../assets/images/map/province-bg/yuegangao.svg`),
          width: "391px",
          left: "-232px",
          top: "-236px",
          height: "336px",
          longitude: "114.173355",
          latitude: "22.320048",
          zoom: 2.3
        },
        styles1: {
          width: "242px",
          left: "-141px",
          top: "-130px",
          height: "210px"
        },
        titleStyles: {
          left: "12",
          top: 0
        }
      }
    ];

    this.poolStyle = {
      // 北京1
      "CIDC-RP-03": {
        left: "66px",
        bottom: "20px"
      },
      // 廊坊
      "CIDC-RP-2005": {
        left: "10px",
        bottom: "-10px"
      },
      "CIDC-RP-36": {
        // right: "0px"
        left: "71px"
      },
      "CIDC-RP-26": {
        left: "96px"
      },
      "CIDC-RP-30": {
        left: "88px"
      },
      // 济南
      "CIDC-RP-31": {
        left: "71px",
        bottom: "-10px"
      },
      // 上海1
      "CIDC-RP-33": {
        left: "79px"
      },
      // 杭州
      "CIDC-RP-35": {
        left: "71px",
        bottom: "-16px"
      },
      "CIDC-RP-39": {
        left: "71px"
      },
      "CIDC-RP-49": {
        left: "71px"
      },
      "CIDC-RP-29": {
        left: "91px",
        bottom: "30px"
      },
      "CIDC-RP-53": {
        bottom: "-15px"
      },
      "CIDC-RP-46": {
        bottom: "-10px"
      },
      "CIDC-RP-32": {
        bottom: "-21px"
      },
      "CIDC-RP-45": {
        left: "71px"
      },
      "CIDC-RP-44": {
        left: "10px",
        bottom: "29px"
      },
      "CIDC-RP-12": {
        left: "70px"
      },
      // 沈阳 合营
      "CIDC-RP-19": {
        left: "74px"
      },
      // 广东4
      "CIDC-RP-2006": {
        left: "10px",
        bottom: "54px"
      },
      // 重庆
      "CIDC-RP-34": {
        left: "15px"
      },
      // 兰州
      "CIDC-RP-40": {
        left: "64px"
      },
      // 北京2
      "CIDC-RP-11": {
        bottom: "27px",
        left: "-15px"
      }
    };
    this.poolData = [];
    this.el = null;
    this.oCenter = [105.6, 36.206572];
    this.provinceObj = {
      北京: "北京市",
      天津: "天津市",
      河北: "河北省",
      山西: "山西省",
      内蒙古: "内蒙古自治区",
      辽宁: "辽宁省",
      吉林: "吉林省",
      黑龙江: "黑龙江省",
      上海: "上海市",
      江苏: "江苏省",
      浙江: "浙江省",
      安徽: "安徽省",
      福建: "福建省",
      江西: "江西省",
      山东: "山东省",
      河南: "河南省",
      湖北: "湖北省",
      湖南: "湖南省",
      广东: "广东省",
      广西: "广西壮族自治区",
      海南: "海南省",
      重庆: "重庆市",
      四川: "四川省",
      贵州: "贵州省",
      云南: "云南省",
      西藏: "西藏",
      陕西: "陕西省",
      甘肃: "甘肃省",
      青海: "青海省",
      宁夏: "宁夏回族自治区",
      新疆: "新疆",
      台湾: "台湾省",
      香港: "香港特别行政区",
      澳门: "澳门特别行政区"
    };

    this.iconCenterStart = require("../../assets/images/map/site-animate/cs-site.webp");
    this.iconCenterInterval = require("../../assets/images/map/site-animate/ci-site.webp");
    this.iconProvinceStart = require("../../assets/images/map/site-animate/ps-site.webp");
    this.iconProvinceInterval = require("../../assets/images/map/site-animate/pi-site.webp");

    this.iconHeying = require("../../assets/images/map/site-animate/heying.png");
    this.iconBianyuan = require("../../assets/images/map/site-animate/bianyuan.png");

    this.iconCenterStart2 = require("../../assets/images/map/site-animate/cs-site2.webp");
    this.iconCenterInterval2 = require("../../assets/images/map/site-animate/ci-site2.webp");
    this.iconCenterStart3 = require("../../assets/images/map/site-animate/cs-site3.webp");
    this.iconCenterInterval3 = require("../../assets/images/map/site-animate/ci-site3.webp");

    this.popPanelLine = require("../../assets/images/map/poppanelline.png");
    this.yellowLine = require("../../assets/images/map/yellow-line.png");
    this.iconZaijian = require("../../assets/images/map/site-animate/zaijian.webp");
    this.iconZaijian1 = require("../../assets/images/map/site-animate/zaijian1.webp");

    this.areaBg = require("../../assets/images/map/map-area-bg.png");
    this.regionBg = require("../../assets/images/map/region-bg.png");
    this.oZoom = 0.475;
    this.suofang = 0.475;
    this.imageObj = {
      width: 3141,
      height: 2094
    };
    this.timer = null;
    this.goIntervalTimer = null;
    this.poolIndex = 0;
    this.chart = null;
    this.ng = true;
    return {
      intervalStatus: 2, // 0开始轮播 1结束轮播 2复原
      resourceIndics: [
        { name: "计算资源", value: 2691065, unit: "核" },
        { name: "存储资源", value: 2691065, unit: "TB" },
        { name: "网络资源", value: 2691065, unit: "pcs" },
        { name: "资源池带宽", value: 2691065, unit: "Gb" }
      ],
      pieChartData: [
        { value: 35, name: "111" },
        { value: 10, name: "222" },
        { value: 74, name: "33ds" },
        { value: 35, name: "444Ads" }
        // { value: 100, name: "555ngine" }
      ],
      canvasLeft: 0,
      canvasTop: 0,
      pixelCoordMap: null,
      selectedTitle: null,
      pageStatus: 0,
      titleAnima: 0,
      isCenterSiteShow: true,
      isProvinceSiteShow: true,
      isHeYingSiteShow: true,
      isBianyuanSiteShow: true,
      isPopPanelshow: false,
      popPanelLeft: null,
      popPanelTop: null,

      poolNumer: {},

      option: {
        animation: false,
        geo: [
          {
            id: "geo1",
            map: "province",
            z: 1,
            aspectScale: 0.8,
            roam: false,
            center: this.oCenter,
            zoom: this.oZoom,
            itemStyle: {
              areaColor: "rgba(0,85,84,0.2)",
              borderWidth: 0.4,
              borderColor: "rgba(244,253,255,0.6)"
            },
            label: {
              normal: {
                show: false
              }
            },
            emphasis: {
              disabled: true
            }
          },
          {
            id: "geo2",
            map: "province",
            z: 3,
            aspectScale: 0.8,
            roam: false,
            center: this.oCenter,
            zoom: this.oZoom,
            itemStyle: {
              areaColor: "transparent",
              borderColor: "transparent"
            },
            label: {
              normal: {
                show: false
              }
            },
            emphasis: {
              disabled: true
            }
          }
        ]
      },
      topFiveData: []
    };
  },
  methods: {
    /**
     * 点击选中资源池，显示资源卡
     */
    go(code, zoom, data) {
      if (data.status !== "使用中") {
        return null;
      }
      // console.log("被点击的对象地区Code", code, zoom);
      this.selectedTitle = null;
      this.cancelInterval();
      this.drawLines(null);
      this.scale(zoom, code)
        .then(() => {
          this.selectedTitle = code;
          setTimeout(() => {
            document
              .getElementsByClassName("pop-panel")[0]
              .classList.add("pop-panel-active");
          }, 500);
          this.popPanelLeft = this.pixelCoordMap[this.selectedTitle].iconx;
          this.popPanelTop = this.pixelCoordMap[this.selectedTitle].icony;
          this.drawLines("CIDC-RP-25");
          return null;
        })
        .then(() => {
          // 接口请求结果
          this.topFiveData = [];
          poolDetail(code).then(res => {
            this.pieChartData = [
              {
                value: res.data.vcpuSummary,
                name: "计算资源",
                name1: "vCPU已售",
                value1: res.data.vcpuSummary
                  ? (res.data.vcpuSold / res.data.vcpuSummary) * 100
                  : 0,
                unit: "核"
              },
              {
                value1: res.data.bandwidthSpeedUse
                  ? res.data.bandwidthSpeedUse
                  : res.data.bandwidthBwTotal
                  ? (Math.round(res.data.bandwidthSpeed) /
                      Math.round(res.data.bandwidthBwTotal)) *
                    100
                  : 0,
                name1: "宽带已用",
                name: "资源池带宽",
                value: res.data.bandwidthBwTotal,
                unit: "Gb",
                value2: res.data.bandwidthNationBw
              },
              {
                value1: res.data.sdsSummary
                  ? (res.data.sdsSold / res.data.sdsSummary) * 100
                  : 0,
                name1: "存储已售",
                name: "存储资源",
                value: res.data.sdsSummary,
                unit: "TB"
              },
              {
                value1: res.data.ippbSummary
                  ? (res.data.ippbSold / res.data.ippbSummary) * 100
                  : 0,
                // value2: res.data.bandwidthNationBw,
                name1: "公网IPv4已售",
                name: "网络资源",
                value: res.data.ippbSummary,
                unit: "IPV4"
              }
            ];
            this.topFiveData = res.data.customerNames;
            // console.log("资源返回后情况", this.resourceIndics, this.pieChartData);
          });
        });
    },
    interval(fn) {
      if (this.timer === null) {
        return null;
      }
      requestAnimationFrame(() => {
        fn();
        this.interval(fn);
      });
    },
    /**
     * 地图缩放移动
     */
    scale(tZoom, code) {
      return new Promise(resolve => {
        let t = 10,
          n = 10;
        let zoomStep = (tZoom - this.oZoom) / t;
        this.timer = undefined;
        let leftStep =
          ((this.pixelCoordMap[code].xy[0] - this.pixelcenter[0]) * tZoom -
            this.canvasLeft) /
          t;
        let topStep =
          ((this.pixelCoordMap[code].xy[1] - this.pixelcenter[1]) * tZoom -
            this.canvasTop) /
          t;
        if (Math.abs(leftStep) < 0.000001) {
          resolve();
          return null;
        }

        this.interval(() => {
          if (n <= 0) {
            this.timer = null;
            resolve();
            return null;
          }
          n--;
          this.oZoom =
            Math.floor((this.oZoom + zoomStep) * 100000 + 0.5) / 100000;

          this.regions.forEach(item => {
            let site = this.pixelCoordMap[item.title].xy;
            this.pixelCoordMap[item.title].iconx =
              site[0] + (site[0] - this.pixelcenter[0]) * (this.oZoom - 1);
            this.pixelCoordMap[item.title].icony =
              site[1] + (site[1] - this.pixelcenter[1]) * (this.oZoom - 1);
          });

          this.poolData.forEach(item => {
            let site = this.pixelCoordMap[item.poolCode].xy;
            this.pixelCoordMap[item.poolCode].iconx =
              site[0] + (site[0] - this.pixelcenter[0]) * (this.oZoom - 1);
            this.pixelCoordMap[item.poolCode].icony =
              site[1] + (site[1] - this.pixelcenter[1]) * (this.oZoom - 1);
          });
          this.canvasLeft += leftStep;
          this.canvasTop += topStep;
          this.chart.setOption({
            geo: [
              { id: "geo1", zoom: this.oZoom * this.suofang },
              { id: "geo2", zoom: this.oZoom * this.suofang }
            ],
            graphic: [
              {
                id: "bg",
                x:
                  this.imageObj.x -
                  (this.imageObj.width * (this.oZoom - 1)) / 2,
                y:
                  this.imageObj.y -
                  (this.imageObj.height * (this.oZoom - 1)) / 2,

                scaleX: this.oZoom,
                scaleY: this.oZoom
              }
            ]
          });
        });
      });
    },
    /**
     * 地图轮播
     */
    goInterval() {
      if (
        this.poolData[this.poolIndex].status !== "使用中" ||
        this.poolData[this.poolIndex].poolType === "边缘云"
      ) {
        while (this.poolIndex < this.poolData.length) {
          this.poolIndex++;
          if (this.poolData.length <= this.poolIndex) {
            this.poolIndex = 0;
          }
          if (
            (this.poolData[this.poolIndex].status == "使用中" ||
              this.poolData[this.poolIndex].status == null) &&
            this.poolData[this.poolIndex].poolType !== "边缘云"
          ) {
            break;
          }
        }
      }
      if (this.poolData[this.poolIndex].status == null) {
        return null;
      }
      if (this.poolData.length <= this.poolIndex) {
        this.poolIndex = 0;
      }
      if (this.goIntervalTimer !== null) {
        clearTimeout(this.goIntervalTimer);
      }
      let z = this.poolData[this.poolIndex].belongRegion
        ? this.poolData[this.poolIndex].belongRegion.zoom
        : 2.1;
      this.selectedTitle = null;
      this.intervalStatus = 0;
      this.drawLines(null);

      this.scale(z, this.poolData[this.poolIndex].poolCode).then(() => {
        this.selectedTitle = this.poolData[this.poolIndex].poolCode;
        setTimeout(() => {
          document
            .getElementsByClassName("pop-panel")[0]
            .classList.add("pop-panel-active");
        }, 500);
        // this.drawLines(this.poolData[this.poolIndex].poolCode);
        this.drawLines("CIDC-RP-25");

        // 弹框位置确定
        this.popPanelLeft = this.pixelCoordMap[this.selectedTitle].iconx;
        this.popPanelTop = this.pixelCoordMap[this.selectedTitle].icony;
        // 接口请求结果
        this.topFiveData = [];
        poolDetail(this.poolData[this.poolIndex].poolCode).then(res => {
          // this.resourceIndics = [
          //   { name: "计算资源", value: res.data.vcpuSummary, unit: "核" },
          //   { name: "存储资源", value: res.data.sdsSummary, unit: "TB" },
          //   { name: "网络资源", value: res.data.ippbSummary, unit: "pcs" },
          //   { name: "资源池带宽", value: res.data.bandwidthBwTotal, unit: "Gb" }
          // ];
          this.pieChartData = [
            {
              value: res.data.vcpuSummary,
              name: "计算资源",
              name1: "vCPU已售",
              value1: res.data.vcpuSummary
                ? (res.data.vcpuSold / res.data.vcpuSummary) * 100
                : 0,
              unit: "核"
            },
            {
              value1: res.data.bandwidthSpeedUse
                ? res.data.bandwidthSpeedUse
                : res.data.bandwidthBwTotal
                ? (Math.round(res.data.bandwidthSpeed) /
                    Math.round(res.data.bandwidthBwTotal)) *
                  100
                : 0,
              name1: "宽带已用",
              name: "资源池带宽",
              value: res.data.bandwidthBwTotal,
              unit: "Gb",
              value2: res.data.bandwidthNationBw
            },
            {
              value1: res.data.sdsSummary
                ? (res.data.sdsSold / res.data.sdsSummary) * 100
                : 0,
              name1: "存储已售",
              name: "存储资源",
              value: res.data.sdsSummary,
              unit: "TB"
            },
            {
              value1: res.data.ippbSummary
                ? (res.data.ippbSold / res.data.ippbSummary) * 100
                : 0,
              // value2: res.data.bandwidthNationBw,
              name1: "公网IPv4已售",
              name: "网络资源",
              value: res.data.ippbSummary,
              unit: "IPV4"
            }
          ];
          this.topFiveData = res.data.customerNames;
        });
        this.poolIndex++;
        this.goIntervalTimer = setTimeout(() => {
          this.goInterval();
        }, 10000);
      });
    },
    /**
     * 取消地图轮播
     */
    cancelInterval() {
      this.intervalStatus = 1;
      if (this.goIntervalTimer !== null) {
        clearTimeout(this.goIntervalTimer);
        this.goIntervalTimer = null;
        this.poolIndex = 0;
      }
    },
    /**
     * 地图复位
     */
    restoreChart() {
      this.intervalStatus = 2;
      if (this.goIntervalTimer !== null) {
        clearTimeout(this.goIntervalTimer);
        this.goIntervalTimer = null;
        this.poolIndex = 0;
      }
      this.selectedTitle = null;
      return this.scale(1, "restore");
    },
    goRestoreChart() {
      this.drawLines(null);
      this.restoreChart().then(() => {
        this.drawLines("CIDC-RP-25");
      });
    },
    /**
     * 地图画线
     */
    drawLines(title) {
      this.chart.setOption({
        series: [
          {
            id: "lines",
            zlevel: 3,
            data: title ? this.convertToLineData(this.poolData, title) : []
          }
        ]
      });
    },
    /**
     * 地图初始化
     */
    initChart() {
      this.el = document.getElementById("el-chart");
      this.chart = echarts.init(this.el);
      echarts.registerMap("province", geoJsonprovince);
      this.chart.setOption(this.option);
      this.pixelcenter = this.chart.convertToPixel(
        { geoId: "geo1" },
        this.oCenter
      );
    },
    /**
     * 设置地图背景图，区域、连线
     */
    setSite() {
      this.imageObj.x =
        this.chart.convertToPixel({ geoId: "geo1" }, this.oCenter)[0] -
        this.imageObj.width / 2;
      this.imageObj.y =
        this.chart.convertToPixel({ geoId: "geo1" }, this.oCenter)[1] -
        this.imageObj.height / 2;
      let chartRegions = [];
      let chartRegions1 = [];
      this.regions.forEach(item => {
        item.children.forEach(v => {
          chartRegions1.push({
            name: this.provinceObj[v.title],
            itemStyle: {
              areaColor: "rgba(0,0,0,.6)",
              borderColor: "rgba(38,243,255,.85)"
            },
            emphasis: { disabled: true }
          });
          chartRegions.push({
            name: this.provinceObj[v.title],
            itemStyle: {
              borderColor: "#00FFFF",
              borderWidth: 1,
              areaColor: {
                image: this.mapimg,
                repeat: "repeat"
              }
              // areaColor: {
              //   type: "linear",
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: "rgba(17,251,242,.2)"
              //     },
              //     {
              //       offset: 1,
              //       color: "rgba(7,142,246,.2)"
              //     }
              //   ],
              //   global: false
              // }
              // shadowBlur: -1,
              // shadowColor: "rgba(47,212,254,0.4)",
              // shadowOffsetX: -6,
              // shadowOffsetY: 6
            },
            emphasis: { disabled: true }
          });
        });
      });
      this.chart.setOption({
        graphic: [
          {
            id: "bg",
            z: 11,
            type: "group",
            x: this.imageObj.x,
            y: this.imageObj.y,
            children: [
              {
                type: "image",
                style: {
                  image: require("../../assets/images/map/map-bg2.png"),
                  width: this.imageObj.width,
                  height: this.imageObj.height
                }
              }
              // {
              //   type: "image",
              //   style: {
              //     x: 68,
              //     y: -100,
              //     // image: require("../../assets/images/map/map-shadow.png"),
              //     width: 1430,
              //     height: 1450
              //   }
              // }
            ]
          }
        ],
        series: [
          {
            zlevel: 3,
            id: "lines",
            type: "lines",
            lineStyle: {
              normal: {
                color: "rgba(32, 255, 242,.4)",
                width: 0.2, //尾迹线条宽度
                opacity: 0.4, //尾迹线条透明度
                curveness: 0.3 //尾迹线条曲直度
              }
            },
            effect: {
              show: true,
              period: 7, //箭头指向速度，值越小速度越快
              trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 3 //图标大小
            },
            animation: true,
            animationEasing: "cubicOut"
          }
        ],
        geo: [
          { id: "geo1", regions: chartRegions1 },
          { id: "geo2", regions: chartRegions }
        ]
      });
    },
    /**
     * 地图连线数据转换
     */
    convertToLineData(data, selectedTitle) {
      let tem = this.poolData.find(v => v.poolCode == selectedTitle);
      if (tem) {
        let ret = data.map(v => {
          return [
            {
              coord: [tem.longitude, tem.latitude]
            },
            {
              coord: [v.longitude, v.latitude]
            }
          ];
        });
        return ret;
      } else {
        return [];
      }
    },
    /**
     * 地图八大区数据转换
     */
    getRegion(code, data) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].pools && data[i].pools.length > 0) {
          for (let j = 0, len = data[i].pools.length; j < len; j++) {
            if (data[i].pools[j].poolCode == code) {
              let tem = {
                title: data[i].title,
                zoom: data[i].styles.zoom
              };
              if (data[i].pools[j].desc) {
                tem.poolCodeDesc = {
                  title: data[i].pools[j].desc.title,
                  styles: { ...data[i].pools[j].desc.styles },
                  lineStyle: { ...data[i].pools[j].desc.lineStyle }
                };
              }
              return tem;
            }
          }
        }
      }
    },
    includesRegions(v) {
      for (let i = 0; i < this.regions.length; i++) {
        for (let j = 0; j < this.regions[i].pools.length; j++) {
          if (this.regions[i].pools[j].poolCode == v.pool_code) {
            return true;
          }
        }
      }
    },
    /**
     * 地图数据请求数据的处理，赋值poolData，八大区位置坐标设定
     */
    dealData(poolResData) {
      this.poolData = [];
      let me = this;
      poolResData.forEach(v => {
        let tem = me.poolData.find(a => {
          return a.poolCode == v.pool_code;
        });
        const isIncludesRegions = this.includesRegions(v);
        if (tem == null) {
          tem = {
            level: 0,
            province: v.province,
            title: this.provinceObj[v.province],
            city: v.city,
            poolCode: v.pool_code,
            code: v.code,
            belongPool: v.belong_pool,
            longitude: isIncludesRegions
              ? Number(v.longitude) + this.offsetLng
              : v.longitude,
            latitude: isIncludesRegions
              ? Number(v.latitude) + this.offsetLat
              : v.latitude,
            // longitude2: isIncludesRegions
            //   ? Number(v.longitude) + this.offsetLng * 2
            //   : v.longitude,
            // latitude2: isIncludesRegions
            //   ? Number(v.latitude) + this.offsetLat * 2
            //   : v.latitude,
            poolType: v.pool_type,
            status: v.status,
            children: [],
            styles: this.poolStyle[v.pool_code],
            belongRegion: this.getRegion(v.pool_code, this.regions)
          };
          this.poolData.push(tem);
        }
        tem.children.push({
          code: v.code,
          address: v.address,
          name: v.bk_inst_name
        });
        tem.level++;
      });
      this.pixelCoordMap = {};
      this.regions.forEach(item => {
        if (this.pixelCoordMap[item.title] == undefined) {
          this.pixelCoordMap[item.title] = {};
        }
        let site = (this.pixelCoordMap[
          item.title
        ].xy = this.chart.convertToPixel({ geoId: "geo1" }, [
          item.styles.longitude,
          item.styles.latitude
        ]));

        this.pixelCoordMap[item.title].iconx = site[0];
        this.pixelCoordMap[item.title].icony = site[1];
      });
      this.pixelCoordMap.restore = {
        xy: [...this.pixelcenter],
        style: {
          iconx: this.pixelcenter[0],
          icony: this.pixelcenter[1]
        }
      };
      this.poolData.forEach(item => {
        if (this.pixelCoordMap[item.poolCode] == undefined) {
          this.pixelCoordMap[item.poolCode] = {};
        }
        let site = (this.pixelCoordMap[
          item.poolCode
        ].xy = this.chart.convertToPixel({ geoId: "geo1" }, [
          item.longitude,
          item.latitude
        ]));
        this.pixelCoordMap[item.poolCode].iconx = site[0];
        this.pixelCoordMap[item.poolCode].icony = site[1];
      });
    },
    /**
     * 页面最初加载动效
     */
    initAnima() {
      this.pageStatus == 0;
      this.titleAnima = 0;
      setTimeout(() => {
        this.titleAnima = 1;
      }, 1000);
      setTimeout(() => {
        this.pageStatus = 1;
        this.drawLines("CIDC-RP-25");
      }, 5000);

      let n = 10,
        t = 0;
      let step = this.offsetLat / n;
      this.timer = undefined;
      this.interval(() => {
        if (t >= n) {
          this.timer = null;
          return null;
        }
        let a = this.oCenter[1] - step * t;
        this.chart.setOption({
          geo: [
            {
              id: "geo2",
              center: [this.oCenter[0], a]
            }
          ]
        });
        t++;
      });
    },
    switchBianyuanSite() {
      this.drawLines(null);
      this.restoreChart().then(() => {
        this.ng = false;
        this.isBianyuanSiteShow = !this.isBianyuanSiteShow;
        let tem = this.poolResData.filter(v => {
          return (
            (this.isCenterSiteShow && v.pool_type === "中心") ||
            (this.isProvinceSiteShow && v.pool_type === "省级") ||
            (this.isHeYingSiteShow && v.pool_type === "合营云") ||
            (this.isBianyuanSiteShow && v.pool_type === "边缘云") ||
            !v.pool_type
          );
        });
        this.dealData(tem);
        this.drawLines("CIDC-RP-25");
      });
    },
    switchHeYingSite() {
      this.drawLines(null);
      this.restoreChart().then(() => {
        this.ng = false;
        this.isHeYingSiteShow = !this.isHeYingSiteShow;
        let tem = this.poolResData.filter(v => {
          return (
            (this.isCenterSiteShow && v.pool_type === "中心") ||
            (this.isProvinceSiteShow && v.pool_type === "省级") ||
            (this.isHeYingSiteShow && v.pool_type === "合营云") ||
            (this.isBianyuanSiteShow && v.pool_type === "边缘云") ||
            !v.pool_type
          );
        });
        this.dealData(tem);
        this.drawLines("CIDC-RP-25");
      });
    },
    /**
     * 切换中心资源池
     */
    switchCenterSite() {
      this.drawLines(null);
      this.restoreChart().then(() => {
        this.ng = false;
        this.isCenterSiteShow = !this.isCenterSiteShow;
        let tem = this.poolResData.filter(v => {
          return (
            (this.isCenterSiteShow && v.pool_type === "中心") ||
            (this.isProvinceSiteShow && v.pool_type === "省级") ||
            (this.isHeYingSiteShow && v.pool_type === "合营云") ||
            (this.isBianyuanSiteShow && v.pool_type === "边缘云") ||
            !v.pool_type
          );
        });
        this.dealData(tem);
        this.drawLines("CIDC-RP-25");
      });
    },
    /**
     * 切换省级资源池
     */
    switchProvinceSite() {
      this.drawLines(null);
      this.restoreChart().then(() => {
        this.ng = false;
        this.isProvinceSiteShow = !this.isProvinceSiteShow;
        let tem = this.poolResData.filter(v => {
          return (
            (this.isCenterSiteShow && v.pool_type === "中心") ||
            (this.isProvinceSiteShow && v.pool_type === "省级") ||
            (this.isHeYingSiteShow && v.pool_type === "合营云") ||
            (this.isBianyuanSiteShow && v.pool_type === "边缘云") ||
            !v.pool_type
          );
        });
        this.dealData(tem);
        this.drawLines("CIDC-RP-25");
      });
    }
  },
  computed: {
    selRegionTitle() {
      if (this.selectedTitle === null) {
        return null;
      }
      let pool = this.poolData.find(v => v.poolCode == this.selectedTitle);
      if (pool) {
        return pool?.belongRegion?.title;
      }
      return null;
    },
    /**
     * 资源卡标题
     */
    panelTitle() {
      if (this.poolData) {
        let item = this.poolData.find(v => v.poolCode == this.selectedTitle);
        if (item) {
          return {
            title: item.belongPool,
            text: `${item.children.length}AZRegion`,
            subtext: item.children.map(v => v.name)
          };
        }
      }
      return {
        text: "",
        subtext: []
      };
    }
  },
  mounted() {
    this.initChart();
    this.mapimg.onload = () => {
      this.setSite();
      Promise.all([poolData(), poolData("2")]).then(([res, res1]) => {
        const tem = [];
        res.data.forEach(v => {
          if (
            ["省级", "中心", "合营云", "边缘云"].includes(v.pool_type) &&
            v.longitude &&
            v.latitude
          ) {
            if (v.pool_type === "边缘云") {
              // v.pool_code = v.pool_code + "边缘云";
              v.pool_code = v.code;
            }
            if (!tem.some(val => val.code === v.code)) {
              tem.push(v);
            }
          }
        });
        this.poolResData = [...tem, ...res1.data];
        this.dealData(this.poolResData);
        let me = this;
        console.log(me.poolData);
        me.poolData.forEach(item => {
          // 计算图例中资源池的数量
          if (me.poolNumer[item.poolType || item.status] === undefined) {
            me.poolNumer[item.poolType || item.status] = 0;
          }
          me.poolNumer[item.poolType || item.status]++;
        });
        this.initAnima();
      });
    };
    this.mapimg.src = this.areaBg;
  }
};
</script>

<style scoped lang="less">
.map-container {
  position: absolute;
  .canvas-container {
    width: 4280px;
    height: 3480px;
  }
}
.m-site.active {
  transform: translate(-50px, -95px);
}
.m-site {
  position: absolute;
  left: 400px;
  top: 400px;
  width: 0;
  height: 90px;
  z-index: 11;
  transform: translate(-50px, -75px);
  .title {
    width: 26px;
    background-color: rgba(255, 218, 2, 0.15);
    font-size: 14px;
    word-wrap: break-word;
    text-align: center;
    padding: 4px 4px;
    box-sizing: border-box;
    backdrop-filter: blur(3px);
    line-height: 16px;
    position: absolute;
    bottom: 10px;
    transform: translateY(-30px);
    opacity: 0;
    z-index: 11;
    cursor: pointer;
    // &:before {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   background: #ffda02;
    //   width: 2px;
    //   height: 26px;
    // }
    &.rt {
      right: 0;
    }
    &.active {
      opacity: 1;
      transform: translateY(0);
      transition: transform 2s, opacity 1s;
      transition-delay: 1s;
    }
  }
}
.zaijian-title {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: -18px;
  left: 31px;
  line-height: 17px;
  text-align: center;
  width: 40px;
  border-top: 1px solid #caad05;
  border-bottom: 1px solid #caad05;
  font-size: 12px;
  color: #caad05;
}
.site-icon {
  width: 100px;
  height: 90px;
  position: absolute;
  bottom: 0;
  z-index: 10;
}
.province-bg {
  position: absolute;
  z-index: -1;
  opacity: 0;
  transform: translate(0, 10px);

  &.active {
    display: block;
    transform: translate(0, 0);
    opacity: 1;
    transition: transform 2s, opacity 1s;
  }
}
.region {
  position: absolute;
  width: 0;
  height: 0;
  z-index: 1;
  .region-title {
    position: absolute;
    color: rgb(111, 226, 255);
    font-size: 14px;
    // border-top: 1px solid rgb(111, 226, 255);
    // border-bottom: 1px solid rgb(111, 226, 255);
    word-break: keep-all;
    // box-shadow: 0px 0px 15px 2px rgba(16, 255, 253, 0.6);
    // background-color: #000;
    background-size: cover;
    padding: 5px;
  }
}
.legend-panel {
  position: absolute;
  left: 492px;
  bottom: 40px;
  z-index: 21;
  backdrop-filter: blur(1px);
  background-color: rgba(14, 174, 215, 0.15);
  border-radius: 5px;
  .lengend-item {
    display: flex;
    align-items: baseline;
    cursor: pointer;
    height: 50px;
    padding-right: 30px;
    .icon {
      width: 60px;
      height: 60px;
      transform: translate(10px, 12px);
    }
    .title {
      font-size: 14px;
    }
  }
}
.pop-panel {
  position: absolute;
  left: 1223px;
  top: 500px;
  z-index: 101;
  transform: translateY(-20px);
}
.pop-panel-active {
  transform: translateY(0);
  opacity: 1;
  height: auto;
  transition: transform 2s;
}
.pop-line-container {
  position: absolute;
  top: -17px;
  left: -128px;
  width: 0;
  height: 123px;
  overflow: hidden;
}
.pop-panel-active .pop-line-container {
  width: 434px;
  transition: width 2s;
}
.pop-line {
  width: 434px;
  height: 123px;
}
.pop-title {
  position: absolute;
  height: 44px;
  top: -64px;
  border: 3px solid rgba(255, 218, 2, 0.2);
  right: 0;
  left: 0;
  font-size: 22px;
  line-height: 44px;
  background-color: rgba(67, 57, 0, 0.65);
  padding: 0 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // &:before {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: -3px;
  //   background: #ffda02;
  //   width: 2px;
  //   height: 26px;
  // }
}
.m-btn {
  background-color: transparent;
  border: 2px solid#157D96;
  color: #fff;
  padding: 4px 8px;
  cursor: pointer;
  margin-right: 4px;
}
.desc-item {
  border: 1px solid #ffb628;
  background-color: rgba(255, 182, 40, 0.2);
  padding: 4px 6px;
  position: absolute;
  white-space: nowrap;
  opacity: 0;
  .desc-item-line {
    position: absolute;
    bottom: -120px;
    right: -96px;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  &.active {
    opacity: 1;
    transition: opacity 1.5s;
    .desc-item-line {
      width: 96px;
      height: 120px;
      transition: width 1s, height 1s;
    }
  }
}
.iconActive {
  // height: 120px !important;
  bottom: 10px !important;
  // transition: height 1s, bottom 1s;
  transform: scale(1.5);
  transition: transform 1s, bottom 1s;
}
</style>
