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
      playerData: {
        name: "",
        phone: "",
        email: "",
        age: "",
      },
      quizId: null,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const quizData = JSON.parse(sessionStorage.getItem("quizData"));
      if (quizData) {
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
          selectedOptions: q.selectedOptions ? q.selectedOptions : [],
        }));
        this.playerData = quizData.playerData;
        this.quizId = quizData.quizId;
      } else {
        console.log("未找到問卷數據");
      }
    },
    submit() {
      const offset = 8;
      const now = new Date();
      const localTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
      const fillinDateTime = localTime.toISOString();

      const feedbackList = this.questions.map((question) => ({
        quizId: this.quizId,
        quId: question.id,
        name: this.playerData.name,
        phone: this.playerData.phone,
        email: this.playerData.email,
        age: this.playerData.age,
        ans:
          question.answer ||
          question.selectedOption ||
          question.selectedOptions.join(";"),
        fillinDateTime: fillinDateTime,
      }));

      axios
        .post("http://localhost:8080/quiz/fillin", { feedbackList })
        .then((response) => {
          if (response.status === 200 && response.data.message === "Success!") {
            console.log("提交成功", response.data);
            alert("提交成功！");
            this.$router.push({ name: "PlayerFirstList" });
            console.log(fillinDateTime);
          } else {
            console.error("提交失敗", response.data);
            alert("提交失敗：Email重複使用");
          }
        })
        .catch((error) => {
          let errorMessage = "未知錯誤";

          if (error.response) {
            const responseData = error.response.data;
            errorMessage = responseData.message;

            if (
              error.response.status === 400 &&
              errorMessage.includes("email duplicate")
            ) {
              alert("Email 重複，請檢查您的 email。");
            } else {
              console.error("提交失敗", errorMessage);
              alert("提交失敗：" + errorMessage);
            }
          }
        });
    },
    edit() {
      sessionStorage.setItem(
        "editQuizData",
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
      this.$router.push({ name: "Fillin", params: { id: this.quizId } });
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
    <div class="playerdata">
      <p>姓名: {{ playerData.name }}</p>
      <p>手機: {{ playerData.phone }}</p>
      <p>E-mail: {{ playerData.email }}</p>
      <p>年齡: {{ playerData.age }}</p>
    </div>
    <div v-if="questions.length > 0">
      <div class="question" v-for="(question, index) in questions" :key="index">
        <p>
          {{ question.id }}.{{ question.qu }}
          <span v-if="question.necessary"> (必填)</span>
        </p>
        <p
          class="questionans"
          v-if="question.type === '單選題' && question.options.length > 0"
        >
          <label v-if="question.selectedOption">
            <input
              type="radio"
              :name="'question' + question.id"
              :value="question.selectedOption"
              :checked="true"
              disabled
            />
            {{ question.selectedOption }}
          </label>
        </p>
        <p
          class="questionans"
          v-else-if="question.type === '多選題' && question.options.length > 0"
        >
          <label
            v-for="(option, optionIndex) in question.selectedOptions"
            :key="optionIndex"
          >
            <input
              type="checkbox"
              :name="'question' + question.id"
              :value="option"
              :checked="true"
              disabled
            />
            {{ option }}
          </label>
        </p>
        <p v-else-if="question.type === '簡答題'">
          <textarea
            :name="'question' + question.id"
            :value="question.answer"
            disabled
          ></textarea>
        </p>
      </div>
    </div>
    <div class="action-buttons">
      <button @click="edit">修改</button>
      <button @click="submit">提交</button>
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
    font-size: 1.5dvw;
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
    font-size: 1.5dvw;
    margin-top: 20px;
    margin-left: 4%;
  }
}

.question {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1%;
  font-size: 1.5dvw;
  .questionans {
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
    font-size: 1.5dvw;
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
    border: 1px solid black;
  }
}
button {
  margin: 0 10px;
  padding: 5px 10px;
  font-size: 1.2dvw;
  background-color: #bebab7;
  border-radius: 10px;
  cursor: pointer;
}
</style>
