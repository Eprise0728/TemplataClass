<script>
export default {
    data() {
        return {
            text1: '',
            selectedOption: '單選題',
            options: '',
            required: false,
            dataList: [],
            currentPage: 0,
            itemsPerPage: 4
        };
    },
    computed: {
        paginatedData() {
            const start = this.currentPage * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.dataList.slice(start, end);
        }
    },
    methods: {
        addData() {
            this.dataList.push({
                number: `#${this.dataList.length + 1}`,
                text1: this.text1,
                selectedOption: this.selectedOption,
                required: this.required
            });
            this.updatePagination();
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage + 1) * this.itemsPerPage < this.dataList.length) {
                this.currentPage++;
            }
        },
        updatePagination() {
        }
    }
};
</script>

<template>
    <form>
        <p class="text1">問題:
            <input type="text" v-model="text1">
        </p>
        <div class="selectbox">
            <select class="select1" v-model="selectedOption">
                <option value="單選題">單選題</option>
                <option value="多選題">多選題</option>
                <option value="簡答題">簡答題</option>
            </select>
            <input type="checkbox" v-model="required">
            <span>必填</span>
        </div>
        <div class="text2box">
            <p class="text2">選項:(多個答案請以: 分隔)</p>
            <textarea v-model="options" style="resize: none;"></textarea>
        </div>
        <button type="button" @click="addData">加入</button>
        <i class="fa-solid fa-trash-can icon1"></i>
        <div class="pagination">
            <button type="button" @click="prevPage" :disabled="currentPage === 0"><</button>
            <button type="button" @click="nextPage" :disabled="(currentPage + 1) * itemsPerPage >= dataList.length">></button>
        </div>
        <div class="text3box">
            <div class="texttitle">
                <div class="deletebox"></div>
                <div class="number1">編號</div>
                <div class="name1">內容</div>
                <div class="state1">問卷種類</div>
                <div class="star1">必填</div>
                <div class="end1">編輯</div>
            </div>
            <div class="fakedata" v-for="(item, index) in paginatedData" :key="index">
                <div class="deletebox">
                    <input type="checkbox">
                </div>
                <div class="number2">{{ item.number }}</div>
                <div class="name2">{{ item.text1 }}</div>
                <div class="state2">{{ item.selectedOption }}</div>
                <div class="star2">
                    <input type="checkbox" v-model="item.required">
                </div>
                <div class="end2">編輯</div>
            </div>
        </div>
        <button type="button">送出</button>
    </form>
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
                width: 45%;
            }
            .state1{
                width: 25%;
            }
            .star1{
                width: 10%;
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
            input{
                pointer-events: none;
                cursor: not-allowed;
            }
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
                width: 45%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .state2{
                width: 25%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .star2{
                width: 10%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-left: 1px solid black;
            }
            .end2{
                width: 10%;
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