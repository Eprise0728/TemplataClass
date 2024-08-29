<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  mounted() {
    this.initCharts();
  },
  methods: {
    async initCharts() {
      try {
        const quizId = this.$route.params.id;

        const searchResponse = await axios.post(
          "http://localhost:8080/quiz/search",
          {}
        );

        const searchData = searchResponse.data;
        const quizResList = searchData.quizResList;

        const quizData = quizResList.find((quiz) => quiz.id === Number(quizId));
        const quesList = quizData.quesList;

        const statisticsResponse = await axios.post(
          `http://localhost:8080/quiz/statistics?quizId=${quizId}`,
          {
            quizId: quizId,
          }
        );

        const statisticsData = statisticsResponse.data;
        const statisticsList = statisticsData.statisticsList;

        this.$refs.chartContainer.innerHTML = "";

        quesList.forEach((question, index) => {
          const options = question.options.split(";");
          const optionCounts =
            statisticsList.find((stat) => stat.quId === question.id)
              ?.optionCountMap || {};

          const chartData = options.map((option) => ({
            value: optionCounts[option] || 0,
            name: option,
          }));

          const chartContainer = document.createElement("div");
          chartContainer.style.width = "800px";
          chartContainer.style.height = "600px";
          this.$refs.chartContainer.appendChild(chartContainer);

          const myChart = echarts.init(chartContainer);
          const option = {
            title: {
              text: question.id + "." + question.qu,
              left: "center",
              top: "15%",
              textStyle: {
                fontSize: 25,
              },
            },
            tooltip: {
              trigger: "item",
              backgroundColor: "rgba(0,0,0,0.7)",
              textStyle: {
                color: "#fff",
                fontSize: 20,
              },
              padding: [35, 35],
              formatter: (params) => {
                return `${params.name}: ${params.value}`;
              },
            },

            legend: {
              orient: "vertical",
              left: "0",
              top: "center",
              textStyle: {
                color: "#000000",
                fontSize: 18,
              },
            },
            series: [
              {
                name: "Quiz Options",
                type: "pie",
                radius: "50%",
                data: chartData.filter((item) => item.value > 0),
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
                label: {
                  show: true,
                  position: "outside",
                  formatter: "{b}: {c} ({d}%)",
                  textStyle: {
                    color: "#000000",
                    fontSize: 18,
                  },
                },
                labelLine: {
                  show: true,
                  smooth: true,
                  lineStyle: {
                    width: 2,
                  },
                },
              },
            ],
          };

          myChart.setOption(option);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<template>
  <router-link to="./PlayerFirstList"
    ><i class="fa-solid fa-left-long"></i
  ></router-link>
  <div
    ref="chartContainer"
    style="display: flex; flex-direction: column; align-items: center"
  ></div>
</template>

<style scoped lang="scss">
.fa-left-long {
  font-size: 4dvw;
  position: absolute;
  top: 5%;
  left: 3%;
  color: black;
  position: fixed;
}
</style>
