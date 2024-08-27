<script>
import axios from "axios";

export default {
  data() {
    return {
      quizName: "",
      startDate: "",
      endDate: "",
      quizzes: [],
      currentPage: 1,
      pageSize: 10,
      selectedQuizzes: [],
    };
  },
  created() {
    this.searchQuiz();
  },
  methods: {
    async searchQuiz() {
      try {
        const response = await axios.post("http://localhost:8080/quiz/search", {
          quizName: this.quizName,
          startDate: this.startDate,
          endDate: this.endDate,
        });
        console.log(response.data);
        this.quizzes = response.data.quizResList || [];
      } catch (error) {
        console.error("搜索時發生錯誤:", error);
      }
    },
    async deleteSelected() {
      try {
        const idsToDelete = this.selectedQuizzes.filter((id) => {
          const quiz = this.quizzes.find((q) => q.id === id);
          return quiz && !quiz.published;
        });

        if (idsToDelete.length === 0) {
          alert("沒有符合刪除條件的問卷。");
          return;
        }

        await axios.post("http://localhost:8080/quiz/delete", {
          quizIdList: idsToDelete,
        });
        alert("問卷刪除成功！");

        this.searchQuiz();
      } catch (error) {
        console.error("刪除問卷時發生錯誤:", error);
        alert("刪除問卷失敗，請稍後再試。");
      }
    },
  },

  computed: {
    paginatedQuizzes() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.quizzes.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.quizzes.length / this.pageSize);
    },
  },
};
</script>

<template>
  <div class="firstlist">
    <div class="textBox1">
      <div class="searchbox">
        <span class="text1">問卷名稱:</span>
        <input v-model="quizName" type="text" class="input1" />
      </div>
      <div class="datebox">
        <span>統計時間:</span>
        <input v-model="startDate" type="date" class="date" />
        <span class="datetext">到</span>
        <input v-model="endDate" type="date" class="date" />
        <button @click="searchQuiz" class="datebtn" style="cursor: pointer">
          搜尋
        </button>
      </div>
    </div>

    <div class="icon1">
      <i class="fa-solid fa-trash-can" @click="deleteSelected"></i>
      <RouterLink to="./Question" class="routeitem">
        <i class="fa-solid fa-plus"></i>
      </RouterLink>
    </div>

    <div class="textBox2">
      <div class="texttitle">
        <div class="deletebox"></div>
        <div class="number1">編號</div>
        <div class="name1">名稱</div>
        <div class="state1">狀態</div>
        <div class="star1">開始時間</div>
        <div class="end1">結束時間</div>
        <div class="result1">結果</div>
      </div>

      <div v-for="quiz in paginatedQuizzes" :key="quiz.id" class="fakedata">
        <div class="deletebox">
          <input
            type="checkbox"
            :value="quiz.id"
            v-model="selectedQuizzes"
            :disabled="quiz.published != 0"
          />
        </div>
        <div class="number2">{{ quiz.id }}</div>
        <div class="name2">
          <RouterLink
            v-if="!quiz.published || new Date() < new Date(quiz.startDate)"
            :to="{ name: 'UpdataQuestion', params: { id: quiz.id } }"
            >{{ quiz.name }}
          </RouterLink>
          <span v-else>{{ quiz.name }}</span>
        </div>
        <div class="state2">
          <span
            v-if="
              quiz.published &&
              new Date() >= new Date(quiz.startDate) &&
              new Date() <= new Date(quiz.endDate)
            "
            >進行中</span
          >
          <span
            v-else-if="quiz.published && new Date() > new Date(quiz.endDate)"
            >已結束</span
          >
          <span
            v-else-if="quiz.published && new Date() < new Date(quiz.startDate)"
            >尚未開始</span
          >
          <span v-else>未發佈</span>
        </div>
        <div class="star2">{{ quiz.startDate }}</div>
        <div class="end2">{{ quiz.endDate }}</div>
        <div class="result2">前往</div>
      </div>

      <div v-if="quizzes.length === 0" class="fakedata no-quiz">
        <div class="name2">沒有找到符合條件的問卷。</div>
      </div>
    </div>
    <div class="paginbox">
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">
          上一頁
        </button>
        <span>第 {{ currentPage }} 頁 </span>
        <button @click="currentPage++" :disabled="currentPage === totalPages">
          下一頁
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  display: flex;
  justify-content: center;
  align-items: center;
}
.firstlist {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 1.5dvw;
  .textBox1 {
    width: 70%;
    height: 30%;
    margin-top: 2%;
    border: 1px solid black;
    .searchbox {
      width: 50%;
      height: 8%;
      position: absolute;
      top: 6%;
      left: 20%;
      .input1 {
        width: 80%;
        height: 50%;
        margin-left: 2%;
      }
    }
    .datebox {
      width: 60%;
      height: 8%;
      position: absolute;
      top: 14%;
      left: 21.1%;
      display: flex;
      justify-content: start;
      .date {
        width: 20%;
        height: 50%;
        font-size: 1.1dvw;
        margin-left: 2%;
      }
      .datetext {
        margin-left: 2%;
      }
      .datebtn {
        width: 8%;
        height: 50%;
        font-size: 1.2dvw;
        margin-left: 2%;
      }
    }
  }
  .routeitem {
    color: black;
    text-decoration-line: none;
  }
  .icon1 {
    width: 10%;
    position: absolute;
    left: 14%;
    top: 30%;
    font-size: 1.8dvw;
    display: flex;
    justify-content: space-evenly;
    .fa-trash-can {
      cursor: pointer;
    }
  }
  .textBox2 {
    margin-top: 4%;
    margin-bottom: 3%;
    width: 70%;
    height: 70dvh;
    border: 1px solid black;
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .texttitle {
      width: 100%;
      height: 10%;
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
        width: 30%;
        background-color: rgb(100, 97, 97);
      }
      .state1 {
        width: 10%;
        background-color: rgb(100, 97, 97);
      }
      .star1 {
        width: 20%;
        background-color: rgb(100, 97, 97);
      }
      .end1 {
        width: 20%;
        background-color: rgb(100, 97, 97);
      }
      .result1 {
        width: 10%;
        background-color: rgb(100, 97, 97);
      }
    }
    .fakedata {
      width: 100%;
      height: 10%;
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
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid black;
        a {
          text-decoration: none;
          color: rgb(0, 34, 255);
        }
      }
      .state2 {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid black;
      }
      .star2 {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid black;
      }
      .end2 {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid black;
      }
      .result2 {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid black;
      }
      &.no-quiz {
        border-bottom: none;
        .name2 {
          border-left: none;
        }
      }
    }
  }
}
.paginbox {
  width: 20%;
  height: 10%;
  position: absolute;
  left: 37%;
  bottom: -5%;
  button {
    margin: 0 10px;
    padding: 5px 10px;
    font-size: 1.2dvw;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      background-color: rgb(100, 97, 97);
    }
  }
  span {
    font-size: 1.2dvw;
  }
}
</style>
