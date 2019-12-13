<template>
    <div class="expected-wrap">
        <div class="most-expected">
            <p class="title">近期最受期待</p>
            <div class="most-expected-list">
                <div>
                    <div 
                        class="expected-item" 
                        v-for="movie in expectedList"
                        :key="movie.id"
                    >
                        <div class="poster default-img-bg">
                            <img :src="movie.img | wh(340.640)"
                                onerror="this.style.visibility='hidden'">
                            <span class="wish-bg"></span>
                            <span class="wish"><span class="wish-num">{{movie.wish}}</span>人想看</span>
                            <div class="toggle-wish" data-wishst="0" data-movieid="1217023">
                                <span></span>
                            </div>
                        </div>
                        <h5 class="name line-ellipsis">{{movie.nm}}</h5>
                        <p class="date">{{movie.comingTitle}}</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { get } from 'utils/http';
    import BScroll from 'better-scroll';
    import { Toast } from 'vant';
    export default {
        data() {
            return {
                expectedList: ""
            }
        },

        beforeCreate() {
            this.limit = 10,
            // 记录上一次请求是否完成
            this.isLoaded = true
        },

        async loadData(offset){
            return await get({
                url: "/ajax/mostExpected",
                params: {
                    ci: 1,
                    limit: this.limit,
                    offset: offset * this.limit,
                    token: ""
                }
            })
        },

        async mounted() {

            let page = 0

            let firstPageResult = await this.$options.loadData.call(this,page)

            this.expectedList = firstPageResult.coming
            let bScroll = new BScroll(".most-expected-list",{
                scrollX: true
            })

            bScroll.on("scrollEnd",async () => {
                let { x, maxScrollX } = bScroll
                if( x <= maxScrollX && this.isLoaded ){
                    // 阻止上一次请求未完成的情况系发起下一次请求
                    this.isLoaded = false
                    page++ 
                    let nthPageResult = await this.$options.loadData.call(this,page)
                    if( nthPageResult.coming.length > 0  ){
                        this.expectedList = [
                            ...this.expectedList,
                            ...nthPageResult.coming
                        ]
                        await this.$nextTick()
                        bScroll.refresh()
                        this.isLoaded = true
                    } else {
                        Toast({
                            message: '没有更多数据！！！',
                            position: "right",
                            duration: 1000
                        })
                    }
                }
            })
        },
    }
</script>

<style lang="stylus">
    .most-expected-list > div{
        width: max-content;
    }
    .expected-wrap {
        padding-bottom: 3px;
        background: #eee;
        margin-right: 15px;
    }

    .most-expected {
        padding: 12px 0 12px 15px;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .most-expected .title {
        margin: 0;
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
    }

    .most-expected-list {
        overflow: scroll;
        white-space: nowrap;
    }

    .expected-item {
        display: inline-block;
        width: 85px;
        overflow: hidden;
        margin-right: 10px;
    }

    .expected-item .poster {
        width: 85px;
        height: 115px;
        position: relative;
        margin-bottom: 6px;
    }

    .expected-item .name {
        margin: 0;
        font-size: 13px;
        color: #222;
        margin-bottom: 3px;
    }

    .expected-item .date {
        margin: 0;
        font-size: 12px;
        color: #999;
    }

    .expected-item .poster img {
        height: 100%;
    }

    .expected-item .poster .wish-bg {
        display: inline-block;
        width: 100%;
        height: 35px;
        position: absolute;
        bottom: 0;
        background-image: -webkit-linear-gradient(top, rgba(77, 77, 77, 0), #000);
        background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
    }

    .expected-item .poster .wish {
        position: absolute;
        left: 4px;
        bottom: 2px;
        color: #faaf00;
        font-size: 11px;
        font-weight: 600;
    }

    .expected-item .poster .toggle-wish {
        width: 28px;
        line-height: 28px;
        background: rgba(61, 63, 71, .6);
        text-align: center;
        border-bottom-right-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .expected-item .poster .toggle-wish span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-size: 100%;
        background-repeat: no-repeat;
    }
</style>