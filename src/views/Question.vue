<script>
import Questionview1 from '../components/Questionview1.vue';
import Questionview2 from '../components/Questionview2.vue';

export default{
    data(){
        return{
            Questionview:1,
        }   
    },
    components:{
        Questionview1,
        Questionview2,
    }
}
</script>

<template>
    <div class="questionview">
        <div class="quebtnbox">
            <button type="button" @click="Questionview=1" class="btn">問卷</button>
            <button type="button" @click="Questionview=2" class="btn">題目</button>
        </div>
        <div class="questionviewbox">

            <div v-show ="Questionview===1">
                <Questionview1 @go-to-view2="Questionview = 2" />
            </div>
            <div  v-show="Questionview===2">
                <Questionview2 />
                <button type="button" @click="Questionview = 1" class="backbtn">上一步</button>
            </div>
        </div>
    </div>
    

    
</template>

<style scoped lang="scss">
.questionview{
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 5%;
    .quebtnbox{
        width: 15%;
        height: 8%;
        position: absolute;
        top: 5%;
        left: 9.5%;
        
        .btn{
            font-size: 2dvw;
            margin-left: 3%;
        }
    }
    .questionviewbox{
        width: 80%;
        height:95%; 
        border: 1px solid black;
        z-index: 0;
        position: relative;
    }
}
.backbtn{
    font-size: 2dvw;
    position: absolute;
    bottom: 5%;
    right: 12%;
}
</style>
