<script>
import axios from "axios";

export default {
  data() {
    return {
      quizName: "",
      quizDescription: "",
      startDate: "",
      endDate: "",
      questions: [],
      responseMessage: "",
      responseClass: "",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const quizData = JSON.parse(sessionStorage.getItem("quizData"));
      const questionData = JSON.parse(sessionStorage.getItem("questions"));

      if (quizData) {
        this.quizName = quizData.quizName;
        this.quizDescription = quizData.quizDescription;
        this.startDate = quizData.startDate;
        this.endDate = quizData.endDate;
      }

      if (questionData) {
        this.questions = questionData.map((q) => ({
          ...q,
          options: q.options ? q.options.split(";") : [],
        }));
      }
    },
    submitQuiz(published) {
      const requestData = {
        name: this.quizName,
        description: this.quizDescription,
        startDate: this.startDate,
        endDate: this.endDate,
        published: published,
        quesList: this.questions.map((q) => ({
          id: q.id,
          qu: q.qu,
          type: q.type,
          necessary: q.necessary,
          options: q.options ? q.options.join(";") : "",
        })),
      };

      axios
        .post("http://localhost:8080/quiz/create", requestData)
        .then((response) => {
          this.responseMessage = "問卷創建成功！";
          this.responseClass = "success";
          this.$router.push("/FirstList");
        })
        .catch((error) => {
          this.responseMessage = "問卷創建失敗，請稍後再試。";
          this.responseClass = "error";
        });
    },
  },
};
</script>

<template>
  <div>
    <h2>問卷確認</h2>
    <div class="quiz-info">
      <p><strong>問卷名稱:</strong> {{ quizName }}</p>
      <p><strong>問卷說明:</strong> {{ quizDescription }}</p>
      <p><strong>開始時間:</strong> {{ startDate }}</p>
      <p><strong>結束時間:</strong> {{ endDate }}</p>
    </div>

    <h3>問題列表:</h3>
    <div v-if="questions.length > 0">
      <div class="question" v-for="(question, index) in questions" :key="index">
        <p><strong>編號:</strong> {{ question.id }}</p>
        <p><strong>問題內容:</strong> {{ question.qu }}</p>
        <p><strong>問卷種類:</strong> {{ question.type }}</p>
        <p><strong>必填:</strong> {{ question.necessary ? "是" : "否" }}</p>
        <p v-if="question.options && question.options.length > 0">
          <strong>選項:</strong> {{ question.options.join(", ") }}
        </p>
      </div>
    </div>

    <div>
      <button @click="submitQuiz(false)">儲存問卷</button>
      <button @click="submitQuiz(true)">儲存問卷並發佈</button>
    </div>

    <div v-if="responseMessage">
      <p :class="responseClass">{{ responseMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.quiz-info {
  margin-bottom: 20px;
}
.question {
  margin-bottom: 10px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
}
.error {
  color: red;
}
</style>
