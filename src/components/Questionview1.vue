<script>

</script>

<template>
    <p class="text1">問卷名稱:
    <input type="text">
                </p>
                <div class="text2box">
                    <p class="text2">問卷說明:</p>
                    <textarea name="" id="" style="resize: none;"></textarea>
                </div>
                <p class="text3">開始時間:
                    <input type="date">
                </p>
                <p class="text4">結束時間:
                    <input type="date">
                </p>
</template>

<style scoped lang="scss">
.text1{
            font-size: 2dvw;
            position: absolute;
            top: 10%;
            left: 10%;
            input{
                width: 50dvw;
                height: 7dvh;
                font-size: 2dvw;
            }
        }
        .text2{
            font-size: 1.5dvw;
            position: absolute;
            top: 25%;
            left: 10%;
            font-size: 2dvw;
        }
        textarea{
            width: 50dvw;
            height: 35dvh;
            overflow-wrap: break-word;
            font-size: 2dvw;
            position: absolute;
            top: 25%;
            left: 21.3%;
        }
        .text3{
            font-size: 2dvw;
            position: absolute;
            bottom: 20%;
            left: 10%;
            input{
                font-size: 1.5dvw;
            }
        }
        .text4{
            font-size: 2dvw;
            position: absolute;
            bottom: 10%;
            left: 10%;
            input{
                font-size: 1.5dvw;
            }
        }
</style>