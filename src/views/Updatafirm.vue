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

        this.quiz.quesList.forEach((question) => {
          if (typeof question.options === "string") {
            question.options = question.options.split(";");
          }
        });
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
            options: q.options ? q.options.join(";") : "",
          })),
        };

        await axios.post("http://localhost:8080/quiz/update", requestData);
        alert(published ? "問卷更新並發佈成功！" : "問卷更新成功！");
        this.$router.push("/FirstList");
      } catch (error) {
        console.error("更新問卷時發生錯誤:", error);
        alert(
          published ? "更新並發佈失敗，請稍後再試。" : "更新失敗，請稍後再試。"
        );
        this.$router.push(`/UpdataQuestion${this.quiz.id}`);
      }
    },
  },
};
</script>

<template>
  <div v-if="quiz">
    <div class="quiz-info">
      <p class="datebox">{{ quiz.startDate }} ~ {{ quiz.endDate }}</p>
      <p class="quiztittle">{{ quiz.name }}</p>
      <p class="textdesc">問卷說明:{{ quiz.description }}</p>
    </div>

    <div class="playerdata">
      <p>姓名:<input type="text" disabled="true" /></p>
      <p>手機:<input type="text" disabled="true" /></p>
      <p>
        E-mail:<input type="text" style="margin-left: 1.5%" disabled="true" />
      </p>
      <p>年齡:<input type="text" disabled="true" /></p>
    </div>

    <div v-if="quiz.quesList.length > 0 ">
      <div
        class="question"
        v-for="(question, index) in quiz.quesList"
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
      <button @click="updateQuiz(false)">更新</button>
      <button @click="updateQuiz(true)">更新並發佈</button>
    </div>
  </div>
</template>

<style scoped="scss">
* {
  background-color: #9a9590;
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
