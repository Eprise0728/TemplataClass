<script>
export default {
  data() {
    return {
      qu: "",
      type: "單選題",
      options: "",
      necessary: false,
      dataList: [],
      currentPage: 0,
      itemsPerPage: 4,
      id: null,
      selectedQuestions: [],
      isAllSelected: false,
    };
  },
  computed: {
    paginatedData() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.dataList.slice(start, end);
    },
  },
  mounted() {
    this.loadQuizData();
  },
  methods: {
    loadQuizData() {
      const quizData = sessionStorage.getItem("quizData");
      if (quizData) {
        const { quizName, quizDescription, startDate, endDate } =
          JSON.parse(quizData);
        this.quizName = quizName;
        this.quizDescription = quizDescription;
        this.startDate = startDate;
        this.endDate = endDate;
      }
    },
    addData() {
      if (this.id !== null) {
        // 編輯模式
        this.dataList[this.id] = {
          id: this.id + 1,
          qu: this.qu,
          type: this.type,
          options: this.options,
          necessary: this.necessary,
        };
        this.id = null;
      } else {
        // 新增模式
        this.dataList.push({
          id: this.dataList.length + 1,
          qu: this.qu,
          type: this.type,
          options: this.options, // 儲存選項
          necessary: this.necessary,
        });
      }
      this.resetForm();
      this.updatePagination();
    },
    editData(index) {
      const item = this.dataList[index];
      this.qu = item.qu;
      this.type = item.type;
      this.options = item.options; // 編輯模式中顯示選項
      this.necessary = item.necessary;
      this.id = index;
    },
    deleteData(index) {
      this.dataList.splice(index, 1);
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
    resetForm() {
      this.qu = "";
      this.type = "單選題";
      this.options = ""; // 重置選項
      this.necessary = false;
    },
    updatePagination() {},
    submit() {
      sessionStorage.setItem("questions", JSON.stringify(this.dataList));
      this.$router.push("/Questionconfirm");
    },
    deleteSelectedQuestions() {
      this.dataList = this.dataList.filter(
        (item) => !this.selectedQuestions.includes(item.id)
      );
      this.selectedQuestions = [];
      this.isAllSelected = false;
      this.dataList.forEach((item, index) => {
        item.id = index + 1;
      });
      this.updatePagination();
    },
    toggleSelectAll(event) {
      this.isAllSelected = event.target.checked;
      this.selectedQuestions = this.isAllSelected
        ? this.dataList.map((item) => item.id)
        : [];
    },
  },
};
</script>

<template>
  <form>
    <p class="qu">
      問題:
      <input type="text" v-model="qu" />
    </p>
    <div class="selectbox">
      <select class="select1" v-model="type">
        <option value="單選題">單選題</option>
        <option value="複選題">多選題</option>
        <option value="簡答題">簡答題</option>
      </select>
      <input type="checkbox" v-model="necessary" />
      <span>必填</span>
    </div>
    <div class="text2box">
      <p class="text2">選項:(多個答案請以; 分隔)</p>
      <textarea v-model="options" style="resize: none"></textarea>
    </div>
    <button type="button" @click="addData" class="addbtn">
      {{ id !== null ? "編輯" : "加入" }}
    </button>
    <i class="fa-solid fa-trash-can icon1" @click="deleteSelectedQuestions"></i>
    <div class="pagination">
      <button type="button" @click="prevPage" :disabled="currentPage === 0">
        &lt;
      </button>
      <button
        type="button"
        @click="nextPage"
        :disabled="(currentPage + 1) * itemsPerPage >= dataList.length"
      >
        &gt;
      </button>
    </div>
    <div class="text3box">
      <div class="texttitle">
        <div class="deletebox">
          <input
            type="checkbox"
            :checked="isAllSelected"
            @change="toggleSelectAll"
          />
        </div>
        <div class="number1">編號</div>
        <div class="name1">內容</div>
        <div class="state1">問卷種類</div>
        <div class="star1">必填</div>
        <div class="end1">編輯</div>
      </div>

      <div class="fakedata" v-for="(item, index) in paginatedData" :key="index">
        <div class="deletebox">
          <input type="checkbox" v-model="selectedQuestions" :value="item.id" />
        </div>
        <div class="number2">{{ item.id }}</div>
        <div class="name2">{{ item.qu }}</div>
        <div class="state2">{{ item.type }}</div>
        <div class="star2">{{ item.necessary ? "是" : "否" }}</div>
        <div class="end2">
          <button type="button" @click="editData(index)">編輯</button>
        </div>
      </div>
    </div>
    <button type="button" @click="submit" class="nextbtn">送出</button>
  </form>
</template>

<style scoped lang="scss">
.qu {
  font-size: 2dvw;
  position: absolute;
  top: 5%;
  left: 10%;
  input {
    width: 40dvw;
    height: 7dvh;
    font-size: 2dvw;
  }
}
.text2 {
  font-size: 1.5dvw;
  position: absolute;
  top: 16%;
  left: 10%;
  font-size: 2dvw;
}
textarea {
  width: 50dvw;
  height: 15dvh;
  overflow-wrap: break-word;
  font-size: 2dvw;
  position: absolute;
  top: 25%;
  left: 16.1%;
}
.selectbox {
  width: 20%;
  height: 20%;
  font-size: 1.5dvw;
  display: flex;
  align-items: center;
  position: absolute;
  right: 8.4%;
  input {
    margin-left: 10%;
    width: 10%;
    height: 20%;
  }
  select {
    font-size: 1.5dvw;
  }
}
.icon1 {
  font-size: 1.8dvw;
  position: absolute;
  top: 50%;
  left: 16%;
}
.text3box {
  width: 55dvw;
  height: 25dvh;
  border: 1px solid black;
  position: absolute;
  bottom: 15%;
  left: 16%;
  .texttitle {
    display: flex;
    align-items: center;
    width: 100%;
    height: 20%;
    font-size: 2.5dvh;
    text-align: center;
    background-color: rgb(100, 97, 97);
    .deletebox {
      width: 3%;
      background-color: rgb(100, 97, 97);
    }
    .number1 {
      width: 7%;
      background-color: rgb(100, 97, 97);
    }
    .name1 {
      width: 45%;
      background-color: rgb(100, 97, 97);
    }
    .state1 {
      width: 25%;
      background-color: rgb(100, 97, 97);
    }
    .star1 {
      width: 10%;
      background-color: rgb(100, 97, 97);
    }
    .end1 {
      width: 10%;
      background-color: rgb(100, 97, 97);
    }
  }
  .fakedata {
    width: 100%;
    height: 20%;
    display: flex;
    border-bottom: 1px solid black;
    .deletebox {
      width: 3%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .number2 {
      width: 7%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid black;
    }
    .name2 {
      width: 45%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid black;
    }
    .state2 {
      width: 25%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid black;
    }
    .star2 {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid black;
    }
    .end2 {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid black;
    }
  }
}
.addbtn {
  font-size: 2dvw;
  position: absolute;
  top: 30%;
  right: 15%;
}
.nextbtn {
  font-size: 2dvw;
  position: absolute;
  bottom: 5%;
  right: 5%;
}
.pagination {
  position: absolute;
  bottom: 5%;
  left: 48%;
  button {
    font-size: 2dvw;
  }
}
</style>
