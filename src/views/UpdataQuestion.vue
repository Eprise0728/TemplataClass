<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      showQuestionForm: false,
      quizId: Number(this.id),
      quizName: "",
      startDate: "",
      endDate: "",
      quizzes: [],
      newQuestion: {
        qu: "",
        type: "",
        necessary: false,
        options: "",
      },
      editingQuestion: null,
      questionTypeLabels: {
        單選題: "單選題",
        多選題: "多選題",
        簡答題: "簡答題",
      },
      currentPage: 0,
      itemsPerPage: 4,
      selectedQuestions: [],
      selectAll: false,
    };
  },
  computed: {
    paginatedQuestions() {
      if (this.quizzes.length === 0) return [];
      const quiz = this.quizzes[0];
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return (quiz.quesList || []).slice(start, end);
    },
  },
  created() {
    this.searchQuiz();
  },
  methods: {
    async searchQuiz() {
      try {
        const response = await axios.post("http://localhost:8080/quiz/search", {
          quizId: this.quizId,
          quizName: this.quizName,
          startDate: this.startDate,
          endDate: this.endDate,
        });
        this.quizzes = response.data.quizResList.filter(
          (quiz) => quiz.id === this.quizId
        );

        if (this.quizzes.length > 0) {
          const quiz = this.quizzes[0];
          if (this.editingQuestion) {
            this.newQuestion = { ...this.editingQuestion };
          } else {
            this.newQuestion = {
              qu: "",
              type: "單選題",
              necessary: false,
              options: "",
            };
          }
        }
      } catch (error) {
        console.error("搜索時發生錯誤:", error);
      }
    },
    addOrUpdateQuestion() {
      const quiz = this.quizzes[0];

      if (this.editingQuestion) {
        // 編輯模式
        const index = quiz.quesList.findIndex(
          (q) => q.id === this.editingQuestion.id
        );
        if (index !== -1) {
          quiz.quesList[index] = {
            ...this.newQuestion,
            id: this.editingQuestion.id,
          };
        }
        this.editingQuestion = null;
      } else {
        // 新增模式
        const maxId = quiz.quesList.reduce((max, q) => Math.max(max, q.id), 0);
        const newId = maxId + 1;
        if (!quiz.quesList) quiz.quesList = [];
        quiz.quesList.push({ ...this.newQuestion, id: newId });
      }

      sessionStorage.setItem("quiz", JSON.stringify(this.quizzes));
      this.resetForm();
    },
    editQuestion(question) {
      this.newQuestion = { ...question };
      this.editingQuestion = question;
    },
    deleteSelectedQuestions() {
      const quiz = this.quizzes[0];

      quiz.quesList = quiz.quesList.filter(
        (q) => !this.selectedQuestions.includes(q.id)
      );

      quiz.quesList.forEach((q, index) => {
        q.id = index + 1;
      });

      this.selectedQuestions = [];

      sessionStorage.setItem("quiz", JSON.stringify(this.quizzes));
    },
    toggleAll() {
      if (this.selectAll) {
        this.selectedQuestions = this.paginatedQuestions.map(
          (question) => question.id
        );
      } else {
        this.selectedQuestions = [];
      }
    },
    resetForm() {
      this.newQuestion = {
        qu: "",
        type: "單選題",
        necessary: false,
        options: "",
      };
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (
        (this.currentPage + 1) * this.itemsPerPage <
        (this.quizzes[0]?.quesList || []).length
      ) {
        this.currentPage++;
      }
    },
    async submit() {
      try {
        const quiz = this.quizzes[0] || {};
        const updatedQuiz = {
          id: this.quizId,
          name: this.quizName || quiz.name,
          description: quiz.description || "",
          startDate: this.startDate || quiz.startDate,
          endDate: this.endDate || quiz.endDate,
          published: quiz.published || false,
          quesList: quiz.quesList || [],
        };

        // 儲存整個問卷對象到 sessionStorage
        sessionStorage.setItem("quiz", JSON.stringify(updatedQuiz));

        this.$router.push("/Updatafirm");
      } catch (error) {
        console.error("送出時發生錯誤:", error);
      }
    },
    goBack() {
      this.$router.push("/FirstList");
    },
  },
};
</script>

<template>
  <div class="updataview">
    <div class="updataviewbox">
      <div v-show="!showQuestionForm">
        <div v-for="quiz in quizzes" :key="quiz.id">
          <p class="text1">問卷名稱: <input v-model="quiz.name" /></p>
          <div class="text2box">
            <p class="text2">問卷說明:</p>
            <textarea
              v-model="quiz.description"
              style="resize: none"
              class="textareades"
            ></textarea>
          </div>
          <p class="text3">
            開始時間: <input type="date" v-model="quiz.startDate" />
          </p>
          <p class="text4">
            結束時間: <input type="date" v-model="quiz.endDate" />
          </p>
          <button @click="showQuestionForm = true" class="nextbtn1">
            下一步
          </button>
          <button @click="goBack" class="backlistbtn">取消</button>
        </div>
      </div>

      <div v-show="showQuestionForm">
        <p class="qu">
          問題:
          <input v-model="newQuestion.qu" />
        </p>

        <div class="selectbox">
          <select class="select1" name="單選題" v-model="newQuestion.type">
            <option value="單選題">單選題</option>
            <option value="多選題">多選題</option>
            <option value="簡答題">簡答題</option>
          </select>
          <input type="checkbox" v-model="newQuestion.necessary" />
          <span>必填</span>
        </div>
        <p class="textopt">選項: (多個答案請以; 分隔)</p>
        <textarea
          v-model="newQuestion.options"
          style="resize: none"
          class="textareaopt"
        ></textarea>

        <button @click="addOrUpdateQuestion" class="newqubtn">
          {{ editingQuestion ? "編輯問題" : "新增問題" }}
        </button>

        <div class="text3box">
          <div class="texttitle">
            <div class="deletebox">
              <input type="checkbox" v-model="selectAll" @change="toggleAll" />
            </div>
            <div class="number1">編號</div>
            <div class="name1">內容</div>
            <div class="state1">問卷種類</div>
            <div class="star1">必填</div>
            <div class="end1">編輯</div>
          </div>
          <div
            v-for="question in paginatedQuestions"
            :key="question.id"
            class="fakedata"
          >
            <div class="deletebox">
              <input
                type="checkbox"
                :value="question.id"
                v-model="selectedQuestions"
              />
            </div>
            <div class="number2">{{ question.id }}</div>
            <div class="name2">{{ question.qu }}</div>
            <div class="state2">
              {{ questionTypeLabels[question.type] || "未知類型" }}
            </div>
            <div class="star2">{{ question.necessary ? "是" : "否" }}</div>
            <div class="end2">
              <button
                @click="editQuestion(question)" style="  padding: 1px 2px; font-size: 1.1dvw"
              >
                編輯
              </button>
            </div>
          </div>
        </div>

        <div class="pagination">
          <button type="button" @click="prevPage" :disabled="currentPage === 0">
            &lt;
          </button>
          <button
            type="button"
            @click="nextPage"
            :disabled="
              (currentPage + 1) * itemsPerPage >=
              (quizzes[0]?.quesList || []).length
            "
          >
            &gt;
          </button>
        </div>

        <button @click="showQuestionForm = false" class="backbtn">
          上一步
        </button>
        <button @click="submit" class="nextbtn2">送出</button>
        <i
          class="fa-solid fa-trash-can icon1"
          @click="deleteSelectedQuestions"
        ></i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  background-color: #9a9590;
}
.updataview {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  .updataviewbox {
    width: 80%;
    height: 85%;
    border: 1px solid black;
    margin-top: 5%;
    .tittle1 {
      font-size: 2dvw;
      position: absolute;
      top: 5%;
    }
    .text1 {
      font-size: 2dvw;
      position: absolute;
      top: 20%;
      left: 13%;
      input {
        width: 50dvw;
        height: 7dvh;
        font-size: 2dvw;
        border: 1px solid black;
        padding-left: 1%;
      }
    }
    .text2 {
      font-size: 1.5dvw;
      position: absolute;
      top: 35%;
      left: 13%;
      font-size: 2dvw;
    }
    .textareades {
      width: 50dvw;
      height: 35dvh;
      overflow-wrap: break-word;
      font-size: 2dvw;
      position: absolute;
      top: 35%;
      left: 23%;
      border: 1px solid black;
      padding-left: 0.5%;
      padding-right: 1%;
    }
    .text3 {
      font-size: 2dvw;
      position: absolute;
      bottom: 20%;
      left: 13%;
      input {
        font-size: 1.5dvw;
      }
    }
    .text4 {
      font-size: 2dvw;
      position: absolute;
      bottom: 10%;
      left: 13%;
      input {
        font-size: 1.5dvw;
      }
    }
    .nextbtn {
      font-size: 2dvw;
      position: absolute;
      right: 13%;
      bottom: 7%;
    }
    .tittle2 {
      font-size: 2dvw;
      position: absolute;
      top: 5%;
    }
    .qu {
      font-size: 2dvw;
      position: absolute;
      top: 18%;
      left: 16%;
      input {
        width: 40dvw;
        height: 7dvh;
        font-size: 2dvw;
        border: 1px solid black;
        padding: 1%;
      }
    }
    .selectbox {
      width: 20%;
      height: 20%;
      font-size: 1.5dvw;
      display: flex;
      align-items: center;
      position: absolute;
      right: 10.4%;
      input {
        margin-left: 10%;
        width: 10%;
        height: 15%;
      }
      select {
        font-size: 1.5dvw;
        border: 1px solid black;
      }
    }
    .textopt {
      position: absolute;
      top: 28%;
      left: 16%;
      font-size: 2dvw;
    }
    .textareaopt {
      width: 55dvw;
      height: 20dvh;
      overflow-wrap: break-word;
      font-size: 2dvw;
      position: absolute;
      top: 35%;
      left: 22%;
      border: 1px solid black;
      padding-left: 0.5%;
      padding-right: 1%;
    }
    .icon1 {
      font-size: 2dvw;
      position: absolute;
      top: 59%;
      left: 22.5%;
      cursor: pointer;
    }
    .newqubtn {
      font-size: 2dvw;
      position: absolute;
      top: 42%;
      right: 14%;
    }
    .text3box {
      width: 55dvw;
      height: 25dvh;
      border: 1px solid black;
      position: absolute;
      bottom: 11%;
      left: 22%;
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
    .pagination {
      position: absolute;
      bottom: 5%;
      left: 46%;
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
    }
    .nextbtn1 {
      font-size: 2dvw;
      position: absolute;
      bottom: 6%;
      right: 12%;
    }
    .backlistbtn {
      font-size: 2dvw;
      position: absolute;
      bottom: 6%;
      right: 20%;
    }
    .nextbtn2 {
      font-size: 2dvw;
      position: absolute;
      bottom: 5%;
      right: 12%;
    }
    .backbtn {
      font-size: 2dvw;
      position: absolute;
      bottom: 5%;
      right: 17%;
    }
  }
}
button {
  background-color: #bebab7;
  border-radius: 10px;
  cursor: pointer;
}
</style>
