<template>
    <div>
        <router-view></router-view>
        <v-header title="好吃首页"></v-header>
        <div class="hoho">
            <div class="bibi">
                home
            </div>
        </div>
        <slider class="eat-home-slide">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
        </slider>
    </div>    
</template>

<script>
import VHeader from 'components/v-header/v-header'
import RatingStar from 'components/ratingStar/ratingStar'
import Slider from 'components/slider/slider'

export default {
	data(){
        return {
            
        }
    },
    mounted(){
        console.log('首页')
    },
    components: {
        VHeader,
        Slider,
        RatingStar
    },
    computed: {

    },
    methods: {

    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    .eat-home-slide{
        width: 100%;
        overflow: hidden;
    }
    .hoho{
        background: #ccc;
        .bibi{
            color: red;
        }
    }
</style>
