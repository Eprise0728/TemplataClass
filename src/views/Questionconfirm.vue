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
          alert("問卷創建成功！");
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
    <div class="quiz-info">
      <p class="datebox">{{ startDate }} ~ {{ endDate }}</p>
      <p class="quiztittle">{{ quizName }}</p>
      <p class="textdesc"><strong>問卷說明:</strong>{{ quizDescription }}</p>
    </div>
    <div class="playerdata">
      <p>姓名:<input type="text" disabled="true" /></p>
      <p>手機:<input type="text" disabled="true" /></p>
      <p>
        E-mail:<input type="text" style="margin-left: 1.5%" disabled="true" />
      </p>
      <p>年齡:<input type="text" disabled="true" /></p>
    </div>
    <div v-if="questions.length > 0">
      <div class="question" v-for="(question, index) in questions" :key="index">
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
          <label v-for="(option, index) in question.options" :key="index">
            <input
              type="radio"
              :name="'question' + question.id"
              :value="option"
              disabled="true"
            />{{ option }}
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
          <label v-for="(option, index) in question.options" :key="index">
            <input
              type="checkbox"
              :name="'question' + question.id"
              :value="option"
              disabled="true"
            />
            {{ option }}
          </label>
        </p>

        <p v-else-if="question.type === '簡答題'">
          <textarea
            :name="'question' + question.id"
            placeholder="請輸入答案"
            readonly
          ></textarea>
        </p>
      </div>
    </div>

    <div class="nextbtn">
      <button @click="submitQuiz(false)">儲存問卷</button>
      <button @click="submitQuiz(true)">儲存問卷並發佈</button>
    </div>
  </div>
</template>

<style scoped = "scss">
*{
        background-color: #9A9590;
}
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
  font-size: 1.5dvw;
  input {
    width: 30dvw;
    font-size: 1dvw;
    margin-top: 20px;
    margin-left: 3%;
  }
}
.question {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1%;
  font-size: 1.5dvw;
  .questionans{
    margin-top: 1%;
    margin-left: 1%;
    display: flex;
    flex-direction: column;
  }
  textarea {
    margin-top: 0.5%;
    width: 50%;
    height: 20dvh;
    overflow-wrap: break-word;
    resize: none;
    margin-left: 2%;
    font-size: 2dvw;
    padding-left: 1%;
    padding-right: 1%;
    border: 1px solid black;
  }
}
.nextbtn {
  display: flex;
  justify-content: end;
  margin-right: 2%;
  margin-bottom: 2%;
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
input {
  border: 1px solid black;
  padding: 1%;
}
</style>
