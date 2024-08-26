<script>
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
        }));
        this.playerData = quizData.playerData;
        this.quizId = quizData.quizId;
      } else {
        console.log("未找到問卷數據");
      }
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
              :checked="question.selectedOption === option"
              disabled
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
              :checked="question.selectedOptions.includes(option)"
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
    </div>
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
</style>
