<template>
  <div class="bScroll" ref="bScroll">
    <div>
      <div class="coming-list" v-if="type=='comingsoon' && tempList.length > 0">
        <slot></slot>
        <div v-for="(value,key) in movieMap" :key="key">
          <p class="group-date">{{key}}</p>
          <MovieItem v-for="(movie,index) in value" :key="movie.id" :movie="movie" :index="index" :bscroll="bScroll"></MovieItem>
        </div>
      </div>
      <div v-else-if="type == 'intheaters' && movieList.length > 0">
        <MovieItem v-for="(movie,index) in movieList" :key="movie.id" :movie="movie" :index="index" :bscroll="bScroll"></MovieItem>
      </div>
      <!-- <div class="coming-list" v-if="type=='comingsoon'">
        <slot></slot>
        <div v-for="(value,key) in movieMap" :key="key">
          <p class="group-date">{{key}}</p>
          <MovieItem v-for="(movie,index) in value" :key="movie.id" :movie="movie" :index="index"></MovieItem>
        </div>
      </div>
      <div v-else-if="type == 'intheaters'">
        <MovieItem v-for="(movie,index) in movieList" :key="movie.id" :movie="movie" :index="index"></MovieItem>
      </div> -->
      <van-loading v-if="(type=='comingsoon' && tempList.length == 0) || (type == 'intheaters' && movieList.length == 0)" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import BScroll from "better-scroll";
import { get } from "utils/http";
import MovieItem from "./MovieItem";

import { Loading, Toast } from "vant";
import { PullRefresh } from "vant";

Vue.use(Loading).use(Toast);

export default {
  props: ["type"],
  data() {
    return {
      movieList: [],
      movieMap: {},
      isLoading: false,
      count: 0,
      tempList: [],
      bScroll: null
    };
  },

  components: {
    MovieItem
  },

  async mounted() {
    let url;
    let offset;
    if (this.type == "intheaters") {
      url = "/ajax/movieOnInfoList";
      offset = 12;
    } else {
      url = "/ajax/comingList";
      offset = 10;
    }

    let result = await get({
      url,
      params: {
        token: "",
        ci: 1,
        limit: 10
      }
    });
    //    const scroll = this.$refs.bScroll
    // this.movieList = result.movieList;
    this.$options.genData.call(this, result);

    let movieIds = _.chunk(result.movieIds.slice(offset), 10);

    await this.$nextTick();
    this.bScroll = new BScroll(".bScroll", {
      pullUpLoad: true,
      click: true,
      probeType: 2
    });

    let page = 0;

    this.bScroll.on("pullingUp", async () => {
      if (page < movieIds.length) {
        let result = await get({
          url: "/ajax/moreComingList",
          params: {
            token: "",
            ci: 1,
            movieIds: movieIds[page].join(",")
          }
        });

        // this.movieList = result.movieList;
        this.$options.genData.call(this, result);

        this.bScroll.refresh();

        page++;
        // 告诉浏览器，本次上拉已经加载完毕
      } else {
        Toast({
          message: "到底了！！！",
          position: "bottom",
          duration: 1000
        });
      }
      this.bScroll.finishPullUp();
    });

    this.bScroll.on("scroll", () => {
      this.$store.commit("setSticky", this.bScroll.y < -120);
    });
  },

  genData(result) {
    if (this.type == "intheaters") {
      if (this.movieList.length == 0) {
        this.movieList = result.movieList;
      } else {
        this.movieList = [...this.movieList, ...result.coming];
      }
    } else {
      this.tempList = [...this.tempList, ...result.coming];
      this.movieMap = _.groupBy(this.tempList, "comingTitle");
    }
  }
};
</script>

<style lang="stylus">
header {
  height: 44px;
  background: #e54847;
  color: #FFFFFF;
  text-align: center;
  line-height: 44px;
  font-size: 18px;
}

.van-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -0.2rem;
  width: 0.4rem;
  height: 0.4rem;
}

.bScroll {
  width: 100%;
  height: 100%;
}

.page {
  position: stacic !important;
}

section {
  flex: 1;
  position: static !important;

  .main-block {
    padding-right: 0.16rem;
  }

  .tab-content .list-wrap .item .content-wrapper {
    height: 1.16rem;
    max-height: 1.16rem;
  }

  .page-wrap {
    height: 100%;

    // position:static !important;
    .tab-block {
      height: 100%;

      .tab-content {
        height: 100%;
        overflow-y: scroll;
      }
    }
  }
}
</style>