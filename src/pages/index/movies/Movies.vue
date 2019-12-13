<template>
    <div class="movie-wrap">
        <transition
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutLeft"
        >
            <router-view></router-view>
        </transition>
        <!-- <transition
            enter-active-class="animated ${enterClassName}"
            leave-active-class="animated ${leaveClassName}"
        >
            <router-view></router-view>
        </transition> -->
    </div>
</template>

<script>
    import MovieList from 'components/movielist/MovieList';
    export default {
        data() {
            return {
                enterClassName: "",
                leaveClassName: ""
            }
        },
        components:{
            MovieList
        },
        watch: {
           $route(to,from){
               if( to.meta > from.meta ){
                   this.enterClass = "slideInRight"
                   this.leaveClass = "slideOutLeft"
               }else{
                   this.enterClass = "slideInLeft"
                   this.leaveClass = "slideOutRight"
               }
           }
        },
    };
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/border.styl';

    .movie-wrap {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }
       
    
</style>