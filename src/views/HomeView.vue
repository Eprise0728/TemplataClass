<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        published: false,
        questions: [], // 初始化為空數組
      },
      responseMessage: "",
      responseClass: "",
    };
  },
  methods: {
    addQuestion() {
      this.form.questions.push({
        text: "",
        type: "TEXT", // 預設類型
        necessary: false,
        options: "", // 預設選項
      });
    },
    removeQuestion(index) {
      this.form.questions.splice(index, 1);
    },
    async createQuiz() {
      const data = {
        name: this.form.name,
        description: this.form.description,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        published: this.form.published,
        quesList: this.form.questions.map((q, index) => ({
          quizId: 1, 
          id: index + 1,
          qu: q.text,
          type: q.type,
          necessary: q.necessary,
          options: q.options,
        })),
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/quiz/create",
          data
        );
        this.responseMessage = "問卷創建成功";
        this.responseClass = "success";
        console.log("創建成功:", response.data);
      } catch (error) {
        this.responseMessage = "問卷創建失敗";
        this.responseClass = "error";
        if (error.response) {
          console.error("響應錯誤:", error.response.data);
        } else if (error.request) {
          console.error("請求錯誤:", error.request);
        } else {
          console.error("錯誤:", error.message);
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>創建問卷</h1>
    <form @submit.prevent="createQuiz">
      <label for="name">問卷名稱:</label>
      <input type="text" v-model="form.name" required /><br /><br />

      <label for="description">問卷描述:</label>
      <textarea v-model="form.description" required></textarea><br /><br />

      <label for="startDate">開始日期:</label>
      <input type="date" v-model="form.startDate" required /><br /><br />

      <label for="endDate">結束日期:</label>
      <input type="date" v-model="form.endDate" required /><br /><br />

      <label for="published">發佈狀態:</label>
      <input type="checkbox" v-model="form.published" /><br /><br />

      <div v-for="(question, index) in form.questions" :key="index">
        <label :for="'question' + index">問題 {{ index + 1 }}:</label>
        <input
          type="text"
          v-model="question.text"
          placeholder="問題文本"
          required
        />
        <label>
          類型:
          <select v-model="question.type">
            <option value="TEXT">文本</option>
            <option value="SINGLE">單選</option>
            <option value="MULTI">多選</option>
          </select>
        </label>
        <label v-if="question.type === 'SINGLE' || question.type === 'MULTI'">
          選項:
          <input
            type="text"
            v-model="question.options"
            placeholder="選項，用分號分隔"
          />
        </label>
        <label>
          必填:
          <input type="checkbox" v-model="question.necessary" />
        </label>
        <button @click.prevent="removeQuestion(index)">刪除問題</button>
        <br /><br />
      </div>

      <button @click.prevent="addQuestion">添加問題</button><br /><br />

      <button type="submit">提交問卷</button>
    </form>
    <p v-if="responseMessage" :class="responseClass">{{ responseMessage }}</p>
  </div>
</template>


<style scoped>
.success {
  color: green;
}

.error {
  color: red;
}
</style>
