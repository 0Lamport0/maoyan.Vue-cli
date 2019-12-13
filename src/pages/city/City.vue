<template>
  <section id="city-list" class="city-list-container" style="display: block;">
    <van-index-bar :index-list="indexList">
      <section>
        <van-index-anchor index="定位" class="city-title">定位城市</van-index-anchor>
        <div class="city-list city-list-inline clearfix">
          <div class="location-city">定位失败，请点击重试</div>
        </div>
      </section>

      <section class="history-city-list">
        <van-index-anchor class="city-title" index="最近">最近访问城市</van-index-anchor>
        <div class="city-list city-list-inline clearfix">
          <div class="city-item" data-nm="北京" data-id="1">北京</div>

          <div class="city-item" data-nm="南京" data-id="55">南京</div>

          <div class="city-item" data-nm="西安" data-id="42">西安</div>
        </div>
      </section>

      <section>
        <van-index-anchor index="热门" class="city-title">热门城市</van-index-anchor>
        <div class="city-list city-list-inline clearfix">
          <div class="city-item" data-nm="上海" data-id="10">上海</div>

          <div class="city-item" data-nm="北京" data-id="1">北京</div>

          <div class="city-item" data-nm="广州" data-id="20">广州</div>

          <div class="city-item" data-nm="深圳" data-id="30">深圳</div>

          <div class="city-item" data-nm="武汉" data-id="57">武汉</div>

          <div class="city-item" data-nm="天津" data-id="40">天津</div>

          <div class="city-item" data-nm="西安" data-id="42">西安</div>

          <div class="city-item" data-nm="南京" data-id="55">南京</div>

          <div class="city-item" data-nm="杭州" data-id="50">杭州</div>

          <div class="city-item" data-nm="成都" data-id="59">成都</div>

          <div class="city-item" data-nm="重庆" data-id="45">重庆</div>
        </div>
      </section>

      <section>
        <div v-for="(city,key) in cityList" :key="key">
          <van-index-anchor :index="key" class="city-title city-title-letter">{{key}}</van-index-anchor>
          <div class="city-list city-list-block clearfix">
            <div class="city-item" v-for="c in city" :key="c.id">{{c.nm}}</div>
          </div>
        </div>
      </section>

      <!-- <section class="nav">
        <div class="nav-item" data-id="locate">定位</div>

        <div class="nav-item" data-id="history">最近</div>

        <div class="nav-item" data-id="hot">热门</div>

        <div class="nav-letter nav-item" data-id="A">A</div>

        <div class="nav-letter nav-item" data-id="B">B</div>
      </section> -->
    </van-index-bar>
  </section> 
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor } from "vant";
import { get } from "utils/http"
import _ from "lodash"

Vue.use(IndexBar).use(IndexAnchor);
export default {
    data() {
        return {
            
            cityList: {}
        }
    },

    created() {
      this.indexListInit = [
        "定位",
        "最近",
        "热门"
      ]
    },

    computed: {
      indexList(){
        return [
          ...this.indexListInit,
          ...Object.keys(this.cityList).sort()
        ]
      }
    },

    async mounted() {
        let result = await get({
            url: "/dianying/cities.json"
        })
        let chunkResult =  _.groupBy(result.cts,(value)=>{
          // console.log(value)
          return value.py.substring(0,1).toUpperCase()
        })

        let reduceResult = Object.keys(chunkResult).sort().reduce((obj,key)=>{
          // console.log(key)
          // console.log(obj)
          obj[key] = chunkResult[key]
          return obj
        },{}) 

        // console.log(chunkResult)
        this.cityList = reduceResult
    },
};
</script>

<style lang="stylus">
.city-list-container {
  display: none;
  background-color: #ebebeb;
  font-size: 14px;
  color: #333;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1000;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.city-title {
  padding-left: 15px;
  line-height: 30px;
}

.city-list {
  padding-right: 30px;
}

.city-list-inline {
  background-color: #f5f5f5;
  padding-bottom: 8px;
}

.city-list-inline .location-city {
  width: auto;
  min-width: 30%;
  padding: 0 20px;
}

.city-list-inline .city-item, .city-list-inline .location-city {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 4%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clearfix:after {
  content: '';
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}

.city-list-inline {
  background-color: #f5f5f5;
  padding-bottom: 8px;
}

.city-list {
  padding-right: 30px;
}

.city-title-letter {
  padding-left: 25px;
}

.city-list-block {
  background-color: #f5f5f5;
}

.city-list-block .city-item {
  height: 44px;
  line-height: 44px;
  margin-left: 15px;
  border-bottom: 1px solid #c8c7cc;
}

.nav {
  position: fixed !important;
  top: 75px;
  top: 11vh;
  right: 0;
  width: 35px;
  z-index: 10;
  text-align: center;
  font-size: 12px;
}

.nav .nav-item {
  height: 16px;
  height: 2.8vh;
}

.nav .nav-letter {
  width: 15px;
  margin-left: 15px;
}

.nav .nav-item {
  height: 16px;
  height: 2.8vh;
}
</style>