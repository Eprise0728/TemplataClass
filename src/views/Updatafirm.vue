<script>
import axios from "axios";

export default {
  data() {
    return {
      quiz: null,
      quizName: "",
      questionTypeLabels: {
        單選題: "單選題",
        多選題: "多選題",
        簡答題: "簡答題",
      },
    };
  },
  mounted() {
    this.loadQuiz();
  },
  methods: {
    loadQuiz() {
      const quizData = sessionStorage.getItem("quiz");
      if (quizData) {
        this.quiz = JSON.parse(quizData);
        console.log("Quiz Data:", this.quiz);
      } else {
        console.error("未找到問卷資料");
      }
    },
    async updateQuiz(published = false) {
      try {
        const requestData = {
          id: this.quiz.id,
          name: this.quiz.name,
          description: this.quiz.description,
          startDate: this.quiz.startDate,
          endDate: this.quiz.endDate,
          published: published,
          quesList: this.quiz.quesList.map((q) => ({
            quizId: this.quiz.id,
            id: q.id,
            qu: q.qu,
            type: q.type,
            necessary: q.necessary,
            options: q.options,
          })),
        };

        await axios.post("http://localhost:8080/quiz/update", requestData);
        alert(published ? "問卷更新並發佈成功！" : "問卷更新成功！");
      } catch (error) {
        console.error("更新問卷時發生錯誤:", error);
        alert(
          published ? "更新並發佈失敗，請稍後再試。" : "更新失敗，請稍後再試。"
        );
      }
    },
  },
};
</script>

<template>
  <div v-if="quiz">
    <h2>預覽頁</h2>
    <p>問卷名稱: {{ quiz.name }}</p>
    <p>問卷描述: {{ quiz.description }}</p>
    <p>開始日期: {{ quiz.startDate }}</p>
    <p>結束日期: {{ quiz.endDate }}</p>

    <div v-for="question in quiz.quesList" :key="question.id">
      <p>編號: {{ question.id }}</p>
      <p>問題內容: {{ question.qu }}</p>
      <p>問卷種類: {{ questionTypeLabels[question.type] }}</p>
      <p>必填: {{ question.necessary ? "是" : "否" }}</p>
      <p>
        選項:
        {{
          Array.isArray(question.options)
            ? question.options.join(", ")
            : question.options
        }}
      </p>
    </div>

    <button @click="updateQuiz(false)">更新</button>
    <button @click="updateQuiz(true)">更新並發佈</button>
  </div>
</template>

<style scoped></style>
