<script>
import axios from "axios";

export default {
  data() {
    return {
      feedbackList: [], 
      currentPage: 1, 
      itemsPerPage: 5, 
    };
  },
  computed: {
    paginatedFeedbackList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.feedbackList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.feedbackList.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchFeedback() {
      const quizId = this.$route.params.id; 
      const filterEmail = this.$route.query.email;
      console.log("Fetched Quiz ID:", quizId); 
      console.log("Filter Email:", filterEmail);
      if (!quizId) {
        console.error("Quiz ID is missing");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/quiz/feedback?quizId=${quizId}`
        );
        console.log("API response:", response.data);

        if (response.data.code === 200) {
          let feedbackList = response.data.feedbackList;

          if (Array.isArray(feedbackList)) {
            const seenEmails = new Set();
            feedbackList = feedbackList.filter((item) => {
              if (item.email && seenEmails.has(item.email)) {
                return false;
              }
              if (item.email) {
                seenEmails.add(item.email);
              }
              return true;
            });
            this.feedbackList = feedbackList;
          } else {
            console.error("Invalid feedbackList format:", feedbackList);
          }
        } else {
          console.error("Error fetching feedback:", response.data.message);
        }
      } catch (error) {
        console.error(
          "API request failed:",
          error.response ? error.response.data : error.message
        );
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goToEcharts() {
      const feedback = this.feedbackList[0]; 
      if (feedback && feedback.quId) {
        this.$router.push({ name: "Echarts", params: { id: feedback.quId } });
      } else {
        console.error("No feedback available to navigate to Echarts");
      }
    },
  },
  created() {
    this.fetchFeedback();
  },
};
</script>

<template>
  <div>
    
    <div class="icon-container">
      
      <router-link to="./FirstList"
        ><i class="fa-solid fa-left-long"></i
      ></router-link>

      <div v-if="feedbackList.length > 0">
        <button @click="goToEcharts">前往查看數據圖</button>
      </div>
    </div>

    
    <div v-if="feedbackList.length > 0">
      <div
        class="feedback-item"
        v-for="(feedback, index) in paginatedFeedbackList"
        :key="feedback.quId"
      >
        <p class="feedback-id">
          編號: {{ (currentPage - 1) * itemsPerPage + index + 1 }}
        </p>
        <p class="feedback-name">姓名: {{ feedback.name }}</p>
        <p class="feedback-time">
          填寫時間: {{ new Date(feedback.fillinDateTime).toLocaleString() }}
        </p>
        <RouterLink
          :to="{
            name: 'QueFeedbackEc',
            params: { id: feedback.quizId, email: feedback.email },
          }"
          class="result2" style="text-decoration: none; color: blue;"
        >
          前往
        </RouterLink>
      </div>
    </div>
    <p v-else>沒有數據可顯示。</p>

    
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        上一頁
      </button>
      <span>
        {{ currentPage }}
      </span>
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一頁
      </button>
    </div>
  </div>
</template>

<style scoped>
.icon-container {
  text-align: center;
  margin-bottom: 1em;
}

.feedback-item {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.5dvw;
}

.pagination {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 0.5em;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
}

.pagination button:disabled {
  cursor: not-allowed;
  background-color: #ccc;
}

button {
  font-size: 1.2dvw;
  margin-top: 20px;
  margin-left: 10px;
  padding: 10px 20px;
  border: 1px solid black;
  background-color: #bebab7;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid black;
}
.fa-left-long {
  font-size: 4dvw;
  color: black;
  cursor: pointer;
  position: absolute;
  left: 1%;
  text-decoration: none;
}
</style>
