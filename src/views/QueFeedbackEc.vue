<script>
import axios from "axios";

export default {
  data() {
    return {
      feedbackList: [], 
      quizName: null, 
      quizId: null,
      quizDescription: null, 
      quesList: [],
      showEmail: false, 
      startDate: null, 
      endDate: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchFeedback() {
      const quizId = this.$route.params.id; 
      const filterEmail = this.$route.params.email; 

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
            console.log("Initial Feedback List:", feedbackList); 

            if (filterEmail) {
              feedbackList = feedbackList.filter(
                (item) => item.email === filterEmail
              );
              console.log("Filtered Feedback List:", feedbackList); 
            }

            
            this.feedbackMap = feedbackList.reduce((map, feedback) => {
              if (!map[feedback.quId]) {
                map[feedback.quId] = [];
              }
              map[feedback.quId].push(feedback.ans);
              return map;
            }, {});

            this.feedbackList = feedbackList;
            
            this.showEmail = feedbackList.length > 0;
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
    async fetchData() {
      try {
        const quizId = this.$route.params.id;

        
        const searchResponse = await axios.post(
          "http://localhost:8080/quiz/search",
          {}
        );

        const searchData = searchResponse.data;
        const quizResList = searchData.quizResList;

        
        const quizData = quizResList.find((quiz) => quiz.id === Number(quizId));
        if (!quizData) {
          console.error("Quiz data not found");
          return;
        }

        const { name, id, description, quesList, startDate, endDate } =
          quizData;
        console.log("Quiz Name:", name);
        console.log("Quiz ID:", id);
        console.log("Quiz Description:", description);
        console.log("Quiz Start Date:", startDate);
        console.log("Quiz End Date:", endDate);

        this.quizName = name;
        this.quizId = id;
        this.quizDescription = description;
        this.quesList = quesList;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fetchFeedback();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<template>
  <div>
    <i class="fa-solid fa-left-long" @click="goBack"></i>

    <div v-if="quizName && quizId && quizDescription">
      <p class="date">{{ startDate }}~{{ endDate }}</p>
      <h2 class="tittle">問卷名稱: {{ quizName }}</h2>
      <p class="textdesc">問卷說明: {{ quizDescription }}</p>
    </div>

    <div
      v-if="feedbackList.length > 0 && showEmail"
      class="feedback-info playerdata"
    >
      <p class="feedback-name">姓名: {{ feedbackList[0].name }}</p>
      <p class="feedback-phone">電話: {{ feedbackList[0].phone }}</p>
      <p class="feedback-email">電子郵件: {{ feedbackList[0].email }}</p>
      <p class="feedback-age">年齡: {{ feedbackList[0].age }}</p>
    </div>

    <div
      v-if="quesList.length > 0 || feedbackList.length > 0"
      class="data-container"
    >
      <div v-if="quesList.length > 0">
        <h1 style="margin-top: 1%; margin-left: 1%">問題列表</h1>
        <div
          class="question-item"
          v-for="(question, index) in quesList"
          :key="question.id"
        >
          <p class="question-text">{{ question.id }}.{{ question.qu }}</p>

          <div
            v-if="
              feedbackMap[question.id] && feedbackMap[question.id].length > 0
            "
          >
            <p
              class="feedback-ans ans"
              v-for="(ans, i) in feedbackMap[question.id]"
              :key="i"
            >
              {{ ans }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-item {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1%;
  font-size: 1.5dvw;
  .ans {
    margin-top: 1%;
    margin-left: 1%;
  }
}

.date {
  position: absolute;
  right: 1%;
  top: 1%;
  font-size: 1.5dvw;
}
.tittle {
  font-size: 3dvw;
  text-align: center;
}
.textdesc {
  font-size: 2dvw;
  text-align: start;
  margin-left: 2%;
  margin-right: 2%;
}
.playerdata {
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  font-size: 1.5dvw;
  p {
    font-size: 1.5dvw;
    margin-top: 20px;
  }
}
.fa-left-long {
  font-size: 4dvw;
  color: black;
  cursor: pointer;
  top: 5%;
  left: 3%;
}
</style>
