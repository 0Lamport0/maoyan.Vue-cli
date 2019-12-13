<template>
    <div class="item" @click="handleClick">
        <div class="item-left-img">
            <img :src="movie.img | wh" onerror="this.style.visibility='hidden'" >
        </div>
        <div class="item-movie-message">
            <div class="movie-message">
                <div class="movie-message-title">
                    <h3>{{movie.nm}}</h3>
                </div>
                <div class="score line-ellipsis"> 
                    <span class="score-suffix">观众评 </span>
                    <span class="grade">{{movie.sc}}</span>
                </div>
                <div class="actor line-ellipsis">{{movie.star}}</div>
                <div class="show-info line-ellipsis">{{movie.showInfo}}</div>
            </div>
            <div class="btn-shopping">
                <Button :movie="movie"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "./Button";
export default {
  props: {
    movie: {
      type: Object
    },
    index: Number,
    bscroll: Object
  },
  methods: {
    handleClick() {
      console.log(this.bscroll.y)
      this.$router.push("/details");
    }
  },
 
  components: {
    Button
  }
};
</script>

<style lang="stylus">
main{
	flex: 1;
	overflow-y: scroll;
	background: #FFFFFF;
}
main .item{
	display: flex;
	padding: 0 15px;
	padding-top: 12px;
	justify-content: space-between;
}
.item-left-img{
	width: 64px;
	height: 90px;
}
.item-left-img img{
	width: 100%;
	height: 100%;
}
.item-movie-message{
	display: flex;
	flex: 1;
	width: 80%;
	padding-bottom: 12px;
	padding-left: 5px;
	border-bottom: 1px solid #CCC;
	justify-content: space-between;
	align-items: center;
}
.movie-message{
	flex: 1;
	width: 80%;
	height: 100%;
}
.movie-message-title{
	max-height: 24px;
    margin-bottom: 7px;
    line-height: 24px;
    overflow: hidden;
}
.movie-message h3{
	padding-right: 5px;
	font-size: 17px;
	color: #333333;
	max-height: 24px;
    margin-bottom: 7px;
    line-height: 24px;
}
.movie-message span{
	display: block;
	background-size: contain;
    background-repeat: no-repeat;
    height: 14px;
    display: inline-block;
    margin-right: 3px;
}

.score{
	font-size: 13px;
	color: #666666;
}
.actor,.show-info{
	color: #666666;
	font-size: 13px;
	margin-top: 6px;
    line-height: 15px;
}
.btn-shopping{
	width: 47px;
    height: 27px;
    line-height: 28px;
	margin-right: 15px;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 12px;
    cursor: pointer;
}
.grade{
	font-weight: 700;
    color: #faaf00;
    font-size: 15px;
}
</style>