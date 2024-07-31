<script>

</script>

<template>
<div class="firstlist">
    <div class="textBox1">
        <div class="searchbox">
            <span class="text1">問卷名稱:</span>
            <input type="text" class="input1">
        </div>
        <div class="datebox">
            <span>統計時間:</span>
            <input type="date" class="date">
            <span class="datetext">到</span>
            <input type="date" class="date">
            <button class="datebtn">搜尋</button>
        </div>
    </div>
    <div class="icon1">
        <i class="fa-solid fa-trash-can"></i>
        <RouterLink to="./Question" class="routeitem">
            <i class="fa-solid fa-plus"></i>
        </RouterLink>
    </div>
    <div class="textBox2">
        <div class="texttitle">
            <div class=deletebox></div>
            <div class="number1">編號</div>
            <div class="name1">名稱</div>
            <div class="state1">狀態</div>
            <div class="star1">開始時間</div>
            <div class="end1">結束時間</div>
            <div class="result1">結果</div>
        </div>
        <div class="fakedata">
            <div class=deletebox>
                <input type="checkbox">
            </div>
            <div class="number2">#123</div>
            <div class="name2">買水果</div>
            <div class="state2">尚未開始</div>
            <div class="star2">1000/01/01</div>
            <div class="end2">3000/01/01</div>
            <div class="result2">前往</div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.firstlist{
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    font-size: 1.5dvw;
    .textBox1{
        width: 70%;
        height: 30%;
        border: 1px solid black;
        .searchbox{
            width: 50%;
            height: 8%;
            position: absolute;
            top: 6%;
            left: 20%;
            .input1{
                width: 80%;
                height: 50%;
                margin-left: 2%;
            }
        }
        .datebox{
            width: 65%;
            height: 8%;
            position: absolute;
            top: 14%;
            left: 20%;
            .date{
                width: 20%;
                height: 50%;
                font-size: 1.1dvw;
                margin-left: 2%;
            }
            .datetext{
                margin-left: 2%;
            }
            .datebtn{
                width: 8%;
                height: 50%;
                font-size: 1.2dvw;
                margin-left: 2%;
            }
        }
    }
    .routeitem{
        color :black;
        text-decoration-line: none;
    }
    .icon1{
        width: 10%;
        position: absolute;
        left: 14%;
        top: 30%;
        font-size: 1.8dvw;
        display: flex;
        justify-content: space-evenly;
    }
    .textBox2{
        margin-top: 6%;
        margin-bottom: 3%;
        width: 70%;
        height: 70dvh;
        border: 1px solid black;
        .texttitle{
            display: flex;
            align-items: center;
            width: 100%;
            height: 10%;
            text-align: center;
            background-color: rgb(100, 97, 97);
            .deletebox{
                width: 3%;
            }
            .number1{
                width: 7%;
            }
            .name1{
                width: 30%;
            }
            .state1{
                width: 10%;
            }
            .star1{
                width: 20%;
            }
            .end1{
                width: 20%;
            }
            .result1{
                width: 10%;
            }
        }
        .fakedata{
            width: 100%;
            height: 10%;
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
}
</style>