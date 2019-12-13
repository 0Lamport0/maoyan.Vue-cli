<template>
    <div>
        <MovieList type="comingsoon">
            <MostExpected></MostExpected>
        </MovieList>
    </div>
</template>

<script>
import MostExpected from "./MostExpected"
import MovieList from 'components/movielist/MovieList';
export default {
    components:{
        MostExpected,
        MovieList
    }
}
</script>

<style lang="stylus">
    .movie-wrap>div{
        height: 100%;
    }
</style>