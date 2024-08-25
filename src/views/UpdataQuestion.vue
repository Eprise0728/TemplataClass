<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
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
        this.quizzes = response.data.quizResList.filter((quiz) => quiz.id === this.quizId
        );

        if (this.quizzes.length > 0) {
          const quiz = this.quizzes[0];
          console.log("問題列表:", quiz.quesList); // 打印問題列表來檢查每個問題的 type
          if (this.editingQuestion) {
            this.newQuestion = { ...this.editingQuestion };
          } else {
            this.newQuestion = {
              qu: "",
              type: "single",
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
    deleteQuestion(question) {
      const quiz = this.quizzes[0];
      quiz.quesList = quiz.quesList.filter((q) => q.id !== question.id);
      sessionStorage.setItem("quiz", JSON.stringify(this.quizzes));
    },
    resetForm() {
      this.newQuestion = {
        qu: "",
        type: "single",
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
    // 確保這裡的 quiz 物件包含所有必要的字段
    const quiz = this.quizzes[0] || {};
    const updatedQuiz = {
      id: this.quizId,
      name: this.quizName || quiz.name,
      description: quiz.description || "",
      startDate: this.startDate || quiz.startDate,
      endDate: this.endDate || quiz.endDate,
      published: quiz.published || false,
      quesList: quiz.quesList || []
    };

    // 儲存整個問卷對象到 sessionStorage
    sessionStorage.setItem("quiz", JSON.stringify(updatedQuiz));

    // 導航到預覽頁
    this.$router.push("/Updatafirm");
  } catch (error) {
    console.error("送出時發生錯誤:", error);
  }
}
  },
};
</script>

<template>
  <div>
    <h2>問卷 ID: {{ quizId }}</h2>

    <div v-for="quiz in quizzes" :key="quiz.id">
      <input v-model="quiz.name" placeholder="問卷名稱" />
      <textarea v-model="quiz.description" placeholder="問卷描述"></textarea>
      <input type="date" v-model="quiz.startDate" />
      <input type="date" v-model="quiz.endDate" />
    </div>

    <h3>新增或編輯問題</h3>
    <input v-model="newQuestion.qu" placeholder="問題內容" />
    <select v-model="newQuestion.type">
      <option value="單選題">單選題</option>
      <option value="多選題">多選題</option>
      <option value="簡答題">簡答題</option>
    </select>
    <label>
      <input type="checkbox" v-model="newQuestion.necessary" /> 必填
    </label>
    <textarea
      v-model="newQuestion.options"
      placeholder="選項 (用分號;分隔)"
    ></textarea>
    <button @click="addOrUpdateQuestion">
      {{ editingQuestion ? "編輯問題" : "新增問題" }}
    </button>

    <h3>問題列表:</h3>
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
    <div v-for="question in paginatedQuestions" :key="question.id">
      <p>{{ question.id }}. {{ question.qu }}</p>
      <p>類型: {{ questionTypeLabels[question.type] || "未知類型" }}</p>
      <p>必填: {{ question.necessary ? "是" : "否" }}</p>
      <p>選項: {{ question.options }}</p>
      <button @click="editQuestion(question)">編輯</button>
      <button @click="deleteQuestion(question)">刪除</button>
    </div>

    <button @click="submit">送出</button>
  </div>
</template>

<style scoped></style>
