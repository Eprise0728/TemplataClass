<script>
import axios from "axios";

export default {
  data() {
    return {
      quizId: Number(this.$route.params.id) || 0,
      quizName: "",
      quizDescription: "",
      startDate: "",
      endDate: "",
      questions: [],
      playerData: {
        name: "",
        phone: "",
        email: "",
        age: "",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        // 檢查 sessionStorage 中是否有暫存資料
        const quizData = JSON.parse(sessionStorage.getItem("editQuizData"));

        if (quizData && quizData.quizId === this.quizId) {
          // 使用 sessionStorage 中的資料
          this.quizName = quizData.quizName;
          this.quizDescription = quizData.quizDescription;
          this.startDate = quizData.startDate;
          this.endDate = quizData.endDate;
          this.questions = quizData.questions.map((q) => ({
            ...q,
            options: Array.isArray(q.options)
              ? q.options
              : q.options
              ? q.options.split(";")
              : [],
          }));
          this.playerData = quizData.playerData;
        } else {
          // 從 API 獲取資料
          const response = await axios.post(
            "http://localhost:8080/quiz/search",
            {
              quizId: this.quizId,
              quizName: this.quizName,
              startDate: this.startDate,
              endDate: this.endDate,
            }
          );

          console.log("API 回應:", response.data);

          const quizzes = response.data.quizResList.filter(
            (quiz) => quiz.id === this.quizId
          );

          if (quizzes.length > 0) {
            const selectedQuiz = quizzes[0];
            this.quizName = selectedQuiz.name;
            this.startDate = selectedQuiz.startDate;
            this.endDate = selectedQuiz.endDate;
            this.quizDescription = selectedQuiz.description;
            this.questions = selectedQuiz.quesList.map((q) => ({
              ...q,
              options: q.options ? q.options.split(";") : [],
              selectedOption: "",
              selectedOptions: [],
              answer: "",
            }));
          } else {
            console.log("未找到對應的問卷");
            this.quizName = "";
            this.startDate = "";
            this.endDate = "";
            this.quizDescription = "";
            this.questions = [];
          }
        }
      } catch (error) {
        console.error("加載數據時發生錯誤:", error);
      }
    },
    async submit() {
      const form = this.$refs.form;

      if (form && form.checkValidity()) {
        const invalidQuestions = this.questions.filter((question) => {
          if (question.necessary) {
            if (question.type === "單選題") {
              return !question.selectedOption;
            } else if (question.type === "多選題") {
              return question.selectedOptions.length === 0;
            } else if (question.type === "簡答題") {
              return !question.answer.trim();
            }
          }
          return false;
        });

        if (invalidQuestions.length > 0) {
          alert("請回答所有必填問題");
          return;
        }

        sessionStorage.setItem(
          "quizData",
          JSON.stringify({
            quizName: this.quizName,
            quizDescription: this.quizDescription,
            startDate: this.startDate,
            endDate: this.endDate,
            questions: this.questions,
            playerData: this.playerData,
            quizId: this.quizId,
          })
        );

        this.$router.push({ name: "Fillinfirm" });
      } else {
        form.reportValidity();
      }
    },
    cancel() {
      sessionStorage.removeItem("editQuizData");

      this.$router.push("/PlayerFirstList");
    },
  },
};
</script>

<template>
  <div>
    <div class="quiz-info">
      <p class="datebox">{{ startDate }} ~ {{ endDate }}</p>
      <p class="quiztittle">{{ quizName }}</p>
      <p class="textdesc"><strong>問卷說明:</strong> {{ quizDescription }}</p>
    </div>
    <form ref="form" @submit.prevent="submit">
      <div class="playerdata">
        <p>姓名:<input type="text" v-model="playerData.name" required /></p>
        <p>手機:<input type="text" v-model="playerData.phone" required /></p>
        <p>E-mail:<input type="email" v-model="playerData.email" required /></p>
        <p>年齡:<input type="text" v-model="playerData.age" required /></p>
      </div>
      <div v-if="questions.length > 0">
        <div
          class="question"
          v-for="(question, index) in questions"
          :key="index"
        >
          <p>
            {{ question.id }}.{{ question.qu
            }}<span v-if="question.necessary"> (必填)</span>
          </p>
          <p
            class="questionans"
            v-if="
              question.type === '單選題' &&
              question.options &&
              question.options.length > 0
            "
          >
            <label
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
            >
              <input
                type="radio"
                :name="'question' + question.id"
                :value="option"
                v-model="question.selectedOption"
                :required="question.necessary"
              />
              {{ option }}
            </label>
          </p>

          <p
            class="questionans"
            v-else-if="
              question.type === '多選題' &&
              question.options &&
              question.options.length > 0
            "
          >
            <label
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
            >
              <input
                type="checkbox"
                :name="'question' + question.id"
                :value="option"
                v-model="question.selectedOptions"
              />
              {{ option }}
            </label>
          </p>

          <p v-else-if="question.type === '簡答題'">
            <textarea
              :name="'question' + question.id"
              v-model="question.answer"
              :required="question.necessary"
              placeholder="請輸入答案"
            ></textarea>
          </p>
        </div>
      </div>

      <div class="action-buttons">
        <button type="button" @click="cancel">取消</button>
        <button type="submit">送出</button>
      </div>
    </form>
  </div>
</template>

<style scoped="scss">
.quiz-info {
  margin-top: 20px;
  margin-bottom: 20px;
  .datebox {
    text-align: end;
    margin-right: 1%;
    font-size: 1.5dvw;
  }
  .quiztittle {
    font-size: 3dvw;
    text-align: center;
  }
  .textdesc {
    font-size: 2dvw;
    text-align: start;
    margin-left: 2%;
    margin-right: 2%;
  }
}
.playerdata {
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  font-size: 2dvw;
  input {
    font-size: 2dvw;
    margin-top: 20px;
    margin-left: 4%;
  }
}
.question {
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 2%;
  font-size: 2dvw;
  .questionans {
    display: flex;
    flex-direction: column;
    margin-left: 1%;
  }
  textarea {
    width: 50%;
    height: 20dvh;
    overflow-wrap: break-word;
    resize: none;
    margin-left: 2%;
    font-size: 2dvw;
  }
}
.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-right: 2%;
  margin-bottom: 2%;
  button {
    margin-top: 20px;
    padding: 10px 20px;
    margin-left: 10px;
  }
}
</style>
