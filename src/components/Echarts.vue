<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => { // 需要在组件完成初始渲染并创建DOM节点后运行的代码
  let chart1 = echarts.init(document.getElementById('echart1'));
  chart1.setOption(
    {
      title: {
        text: '产品销量对比'
      },
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
  );

  obtainDataMethodForSeriesData2();

  window.addEventListener('resize', function() {
    chart1.resize();
    chart2.resize();
  });
  
});

const { proxy } = getCurrentInstance() as any;

let chart2 = null as any;
const obtainDataMethodForSeriesData2 = async () => { // 向后端获取数据列表
  let seriesData2 = [] as any;
  try {
    let { data: { code, msg, list } } = await proxy.$axios.post("echarts/series2", '');
    if (code == 1 && msg == "SUCCESS") {
      console.log('list:',list);
      seriesData2 = list; // 将从后端获取到的数据列表放入变量
      console.log('seriesData2:',seriesData2);
    } else {
      proxy.$message.warning(`读取列表数据失败。`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
    console.log("error:", error);
  }
  chart2 = echarts.init(document.getElementById('echart2'));
  chart2.setOption(
    {
      title: {
        text: '产品销量对比'
      },
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: seriesData2
    }
  );
}

</script>

<template>
  <div class="echarts">
    <div id="echart1" style="width: 600px;height:400px;"></div>
    <div id="echart2" style="width: 600px;height:400px;"></div>
  </div>
</template>

<style scoped></style>
