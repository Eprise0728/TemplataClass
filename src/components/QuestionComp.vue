<script>
export default{
    data(){
        return{
            test:""
        }   
    }
}
</script>

<template>
    <button type="button" @click="this.test">btn</button>

    <div class="test1"></div>
</template>

<style scoped lang="scss">
.test1{
    width: 100dvw;
    height: 30dvh;
    background-color: black;
}
</style>
