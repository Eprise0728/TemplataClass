<script>

</script>

<template>
    <p class="text1">問題:
    <input type="text">
    </p>
    <div class="selectbox">
        <select name="" id="" class="select1">
            <option value="">單選題</option>
            <option value="">多選題</option>
            <option value="">簡答題</option>
            <input type="checkbox" name="" id="">
            <span>必填</span>
        </select>
    </div>
    <div class="text2box">
        <p class="text2">選項:(多個答案請以: 分隔)</p>
        <textarea name="" id="" style="resize: none;"></textarea>
    </div>
    <i class="fa-solid fa-trash-can icon1"></i>
    <div class="text3box">
        <div class="texttitle">
            <div class=deletebox></div>
            <div class="number1">編號</div>
            <div class="name1">內容</div>
            <div class="state1">問卷種類</div>
            <div class="star1">必填</div>
            <div class="end1">編輯</div>
        </div>
        <div class="fakedata">
            <div class=deletebox>
                <input type="checkbox">
            </div>
            <div class="number2">#123</div>
            <div class="name2">買水果</div>
            <div class="state2">單選題</div>
            <div class="star2"><input type="checkbox"></div>
            <div class="end2">編輯</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.text1{
    font-size: 2dvw;
    position: absolute;
    top: 5%;
    left: 10%;
    input{
        width: 40dvw;
        height: 7dvh;
        font-size: 2dvw;
    }
    }
.text2{
    font-size: 1.5dvw;
    position: absolute;
    top: 16%;
    left: 10%;
    font-size: 2dvw;
}
textarea{
    width: 50dvw;
    height: 15dvh;
    overflow-wrap: break-word;
    font-size: 2dvw;
    position: absolute;
    top: 25%;
    left: 16.1%;
    }
.selectbox{
    width: 20%;
    height: 20%;
    font-size: 1.5dvw;
    display: flex;
    align-items: center;
    position: absolute;
    right: 8.4%;
    input{
        margin-left: 10%;
        width: 10%;
        height: 20%;
    }
    select{
        font-size: 1.5dvw;
    }
}
.icon1{
    font-size: 1.8dvw;
    position: absolute;
    top: 50%;
    left: 16%;
}
.text3box{
    width: 55dvw;
    height: 25dvh;
    border: 1px solid black;
    position: absolute;
    bottom: 15%;
    left: 16%;
    .texttitle{
            display: flex;
            align-items: center;
            width: 100%;
            height: 20%;
            font-size: 2.5dvh;
            text-align: center;
            background-color: rgb(100, 97, 97);
            .deletebox{
                width: 3%;
            }
            .number1{
                width: 7%;
            }
            .name1{
                width: 40%;
            }
            .state1{
                width: 15%;
            }
            .star1{
                width: 6%;
            }
            .end1{
                width: 10%;
            }
            .result1{
                width: 10%;
            }
        }
        .fakedata{
            width: 100%;
            height: 20%;
            display: flex;
            border-bottom: 1px solid black;
            .deletebox{
                width: 3%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .number2{
                width: 7%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .name2{
                width: 30%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .state2{
                width: 10%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .star2{
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .end2{
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .result2{
                width: 10%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
        }
}
</style>