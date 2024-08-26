<script>
export default {
  data() {
    return {
      quizName: '', 
      quizDescription: '', 
      startDate: '',
      endDate: '' 
    };
  },
  mounted() {
    this.setDefaultDates();
  },
  methods: {
    setDefaultDates() {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + 2);
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);

      this.startDate = this.formatDate(startDate);
      this.endDate = this.formatDate(endDate);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    validateDates() {
      const today = new Date().setHours(0, 0, 0, 0);
      const startDate = new Date(this.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(this.endDate).setHours(0, 0, 0, 0);

      if (startDate < today || endDate < today) {
        alert('開始時間和結束時間不能是今天或更早。');
        return false;
      }
      if (startDate > endDate) {
        alert('開始時間不能晚於結束時間。');
        return false;
      }
      return true;
    },
    submitForm() {
      if (this.validateDates() && this.quizName && this.quizDescription && this.startDate && this.endDate) {
        sessionStorage.setItem('quizData', JSON.stringify({
          quizName: this.quizName,
          quizDescription: this.quizDescription,
          startDate: this.startDate,
          endDate: this.endDate
        }));
        this.$emit('go-to-view2');
      } else {
        alert('請填寫所有必填欄位。');
      }
    }
  }
};
</script>


<template>
  <div>
    <p class="text1">
      問卷名稱:
      <input v-model="quizName" type="text" />
    </p>
    <div class="text2box">
      <p class="text2">問卷說明:</p>
      <textarea v-model="quizDescription" style="resize: none;"></textarea>
    </div>
    <p class="text3">
      開始時間:
      <input v-model="startDate" type="date" />
    </p>
    <p class="text4">
      結束時間:
      <input v-model="endDate" type="date" />
    </p>
    <button @click="submitForm" class="nextbtn">下一步</button>
  </div>
</template>

<style scoped lang="scss">

.text1 {
  font-size: 2dvw;
  position: absolute;
  top: 10%;
  left: 10%;
  input {
    width: 50dvw;
    height: 7dvh;
    font-size: 2dvw;
  }
}
.text2 {
  font-size: 1.5dvw;
  position: absolute;
  top: 25%;
  left: 10%;
  font-size: 2dvw;
}
textarea {
  width: 50dvw;
  height: 35dvh;
  overflow-wrap: break-word;
  font-size: 2dvw;
  position: absolute;
  top: 25%;
  left: 21.3%;
}
.text3 {
  font-size: 2dvw;
  position: absolute;
  bottom: 20%;
  left: 10%;
  input {
    font-size: 1.5dvw;
  }
}
.text4 {
  font-size: 2dvw;
  position: absolute;
  bottom: 10%;
  left: 10%;
  input {
    font-size: 1.5dvw;
  }
}
.nextbtn{
  font-size: 2dvw;
  position: absolute;
  right: 8%;
  bottom: 5%;
}
</style>
