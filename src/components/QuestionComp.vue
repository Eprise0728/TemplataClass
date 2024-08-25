<script>
import Questionview1 from './Questionview1.vue';
import Questionview2 from './Questionview2.vue';

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
            <button type="button" @click="Questionview=3" class="btn">問題回饋</button>
            <button type="button" @click="Questionview=4" class="btn">統計</button>
        </div>
        <div class="questionviewbox">

            <div v-show ="Questionview===1">
                <Questionview1 @go-to-view2="Questionview = 2" />
            </div>
            <div  v-show="Questionview===2">
                <Questionview2 />
                <button type="button" @click="Questionview = 1" class="btn">上一步</button>
            </div>
            <div  v-show="Questionview===3">
                <Questionview3 />
            </div>
            <div  v-show="Questionview===4">
                <Questionview4 />
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
        width: 20%;
        height: 20%;
        display: flex;
        position: absolute;
        top: 7%;
        left: 9.8%;
        .btn{
            width: 70%;
            height: 30%;
            margin-left: 1%;
            font-size: 2dvh;
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
</style>
