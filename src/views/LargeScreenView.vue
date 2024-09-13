<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

import * as echarts from 'echarts';
// import '@/assets/china.js';
import china from '../assets/china.json';

let dataList = ref([]);

// 初始化图表的方法
const initEChartsMethod = () => {
  // 在容器echart1中生成图表
  let chart1 = echarts.init(document.getElementById('echart1'));
  chart1.setOption(
    {
	//   title: {
	// 	text: 'Referer of a Website',
	// 	subtext: 'Fake Data',
	// 	left: 'center'
	//   },
	//   tooltip: {
	// 	trigger: 'item'
	//   },
	//   legend: {
	// 	orient: 'vertical',
	// 	left: 'left'
	//   },
	  series: [
		{
		name: 'Access From',
		type: 'pie',
		radius: ['20%', '50%'], // 只设置一个外半径为圆饼，同时设置内半径和外半径后为圆环
		data: [
			{ value: 1048, name: '衬衫' },
			{ value: 735, name: '羊毛衫' },
			{ value: 580, name: '袜子' },
			{ value: 484, name: '裤子' },
			{ value: 300, name: '高跟鞋' }
		],
		emphasis: {
			itemStyle: {
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
		}
	  ]
	}
  );

  // 在容器echart2中生成图表
  let chart2 = echarts.init(document.getElementById('echart2'));
  chart2.setOption(
	{
	//   title: {
	// 	text: '周销售趋势',
	// 	subtext: '副标题',
	// 	left: 'center'
	//   },
	  // 网格配置  grid可以控制线形图 柱状图 图表大小
	  grid: {
		left: '3%',
		right: '4%',
		top: '9%',
		bottom: '3%',
		// 是否显示刻度标签 如果是true 就显示 否则反之
		containLabel: true
	  },
	  xAxis: {
		type: 'category',
		boundaryGap:false,
		data: ['衬衫', '羊毛衫', '袜子', '裤子', '高跟鞋']
	  },
	  yAxis: {
		type: 'value'
	  },
	  series: [
		{
		data: [150, 230, 224, 218, 135],
		type: 'line'
		}
	  ]
	}
  );

  // 在容器echart3中生成图表
  let chart3 = echarts.init(document.getElementById('echart3'));
  chart3.setOption(
    {
	//   title: {
	// 	text: '主标题',
	// 	subtext: '副标题',
	// 	left: 'center'
	//   },
	  // 网格配置  grid可以控制线形图 柱状图 图表大小
	  grid: {
		left: '3%',
		right: '9%',
		top: '9%',
		bottom: '3%',
		// 是否显示刻度标签 如果是true 就显示 否则反之
		containLabel: true
	  },
	  xAxis: {
		type: 'value'
	  },
	  yAxis: {
		type: 'category',
		data: ['第一季度', '第二季度', '第三季度', '第四季度']
	  },
	  series: [
		{
		data: [1200, 2000, 1500, 800],
		type: 'bar'
		}
	  ]
	}
  );

  // 在容器echart4中生成图表
  let chart4 = echarts.init(document.getElementById('echart4'));
  chart4.setOption(
    {
	//   title: {
	// 	text: '主标题',
	// 	subtext: '副标题',
	// 	left: 'center'
	//   },
	  // 网格配置  grid可以控制线形图 柱状图 图表大小
	  grid: {
		left: '3%',
		right: '4%',
		top: '9%',
		bottom: '3%',
		// 是否显示刻度标签 如果是true 就显示 否则反之
		containLabel: true
	  },
	  xAxis: {
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	  },
	  yAxis: {
		type: 'value'
	  },
	  series: [
		{
		data: [120, 200, 150, 80, 70, 110, 130],
		type: 'bar'
		}
	  ]
	}
  );

  // 在容器echart5中生成图表
  let chart5 = echarts.init(document.getElementById('echart5'));
  chart5.setOption(
    {
    //   title: {
    //     text: '中国地图',
	// 	textStyle:{
	// 		color:"#FFFFFF",
	// 		fontSize:14
	// 	}
    //   },
      tooltip: {
		trigger:'item' // 鼠标悬浮时显示提示信息
	  },
      legend: {
        data: ['销量'] // series里面有了 name值则 legend里面的data可以删掉
      },
	  // 网格配置  grid可以控制线形图 柱状图 图表大小
	//   grid: {
	// 	left: '3%',
	// 	right: '4%',
	// 	bottom: '3%',
	// 	// 是否显示刻度标签 如果是true 就显示 否则反之
	// 	containLabel: true
	//   },
      visualMap:{
		min:0, // 最小值
		max:1000, // 最大值
		// left:'left', // 位置
		// top:'bottom', // 位置
		text:['高','低'], // 文本
		calculable:true // 是否显示拖拽用的手柄
	  },
      series: [
        {
          name: '销量',
          type: 'map',
		  map:'china',
		//   itemStyle: {
		// 	// 调整中国地图的大小
		// 	normal: {
		// 	  areaStyles: {
		// 		areaSize: ['60%', '80%'] // 宽度和高度，百分比显示
		// 	  }
		// 	}
        //   },
		  zoom:1.2,
		  lable:{
			show:true // 显示地图区域名称
		  },
          data: [
			{name:'北京市',value:999}, 
			{name:'天津市',value:200}, 
			{name:'河北省',value:500},
			{name:'山西省',value:520},
			{name:'内蒙古自治区',value:120},
			{name:'辽宁省',value:210},
			{name:'吉林省',value:620},
			{name:'黑龙江省',value:20},
			{name:'上海市',value:300}, 
			{name:'江苏省',value:700},
			{name:'浙江省',value:320},
			{name:'安徽省',value:420},
			{name:'福建省',value:90},
			{name:'江西省',value:110},
			{name:'山东省',value:920},
			{name:'河南省',value:800},
			{name:'湖北省',value:720},
			{name:'湖南省',value:810},
			{name:'广东省',value:900},
			{name:'广西壮族自治区',value:90},
			{name:'海南省',value:200},
			{name:'重庆市',value:20},
			{name:'四川省',value:240},
			{name:'贵州省',value:190},
			{name:'云南省',value:360},
			{name:'西藏自治区',value:90},
			{name:'陕西省',value:210},
			{name:'甘肃省',value:190},
			{name:'青海省',value:90},
			{name:'宁夏回族自治区',value:120},
			{name:'新疆维吾尔自治区',value:130},
			{name:'台湾省',value:270},
			{name:'香港特别行政区',value:180},
			{name:'澳门特别行政区',value:180},
		  ]
        }
      ]
    }
  );

  // 在容器echart6中生成图表
//   let chart6 = echarts.init(document.getElementById('echart6'));
//   chart6.setOption(
//     {
//       title: {
//         text: '',
// 		textStyle:{
// 			color:"#FFFFFF",
// 			fontSize:14
// 		}
//       },
//       tooltip: {},
//       legend: {
//         data: ['销量'] // series里面有了 name值则 legend里面的data可以删掉
//       },
// 	  // 网格配置  grid可以控制线形图 柱状图 图表大小
// 	  grid: {
// 		left: '3%',
// 		right: '4%',
// 		bottom: '3%',
// 		// 是否显示刻度标签 如果是true 就显示 否则反之
// 		containLabel: true
// 	  },
//       xAxis: {
//         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//       },
//       yAxis: {},
//       series: [
//         {
//           name: '销量',
//           type: 'bar',
//           data: [5, 20, 36, 10, 10, 20]
//         }
//       ]
//     }
//   );

  // 在容器echart7中生成图表
//   let chart7 = echarts.init(document.getElementById('echart7'));
//   chart7.setOption(
//     {
//       title: {
//         text: '',
// 		textStyle:{
// 			color:"#FFFFFF",
// 			fontSize:14
// 		}
//       },
//       tooltip: {},
//       legend: {
//         data: ['销量'] // series里面有了 name值则 legend里面的data可以删掉
//       },
// 	  // 网格配置  grid可以控制线形图 柱状图 图表大小
// 	  grid: {
// 		left: '3%',
// 		right: '4%',
// 		bottom: '3%',
// 		// 是否显示刻度标签 如果是true 就显示 否则反之
// 		containLabel: true
// 	  },
//       xAxis: {
//         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//       },
//       yAxis: {},
//       series: [
//         {
//           name: '销量',
//           type: 'bar',
//           data: [5, 20, 36, 10, 10, 20]
//         }
//       ]
//     }
//   );

  // 窗口大小发生变动时调整图表的大小
  window.addEventListener('resize', function() {
	// console.log('resize_begin');
    chart1.resize();
	chart2.resize();
	chart3.resize();
	chart4.resize();
	chart5.resize();
	// generateChinaMapMethod();
	// chart6.resize();
	// chart7.resize();
	// window.location.reload();
	// console.log('resize_end');
  });
};


// const generateChinaMapMethod = () => {

//   let chart5 = echarts.getInstanceByDom(document.getElementById('echart5') as any);
//   if(chart5 != null && chart5 != undefined ){
//     chart5.dispose();
//   }
//   // 在容器echart5中生成图表
//   chart5 = echarts.init(document.getElementById('echart5'));
//   chart5.setOption(
//     {
//       title: {
//         text: '中国地图',
// 		textStyle:{
// 			color:"#FFFFFF",
// 			fontSize:14
// 		}
//       },
//       tooltip: {
// 		trigger:'item' // 鼠标悬浮时显示提示信息
// 	  },
//       legend: {
//         data: ['销量'] // series里面有了 name值则 legend里面的data可以删掉
//       },
// 	  // 网格配置  grid可以控制线形图 柱状图 图表大小
// 	//   grid: {
// 	// 	left: '3%',
// 	// 	right: '4%',
// 	// 	bottom: '3%',
// 	// 	// 是否显示刻度标签 如果是true 就显示 否则反之
// 	// 	containLabel: true
// 	//   },
//       visualMap:{
// 		min:0, // 最小值
// 		max:1000, // 最大值
// 		// left:'left', // 位置
// 		// top:'bottom', // 位置
// 		text:['高','低'], // 文本
// 		calculable:true // 是否显示拖拽用的手柄
// 	  },
//       series: [
//         {
//           name: '销量',
//           type: 'map',
// 		  map:'china',
// 		//   itemStyle: {
// 		// 	// 调整中国地图的大小
// 		// 	normal: {
// 		// 	  areaStyles: {
// 		// 		areaSize: ['60%', '80%'] // 宽度和高度，百分比显示
// 		// 	  }
// 		// 	}
//         //   },
// 		  zoom:1.2,
// 		  lable:{
// 			show:true // 显示地图区域名称
// 		  },
//           data: [
// 			{name:'北京市',value:999}, 
// 			{name:'天津市',value:200}, 
// 			{name:'河北省',value:500},
// 			{name:'山西省',value:520},
// 			{name:'内蒙古自治区',value:120},
// 			{name:'辽宁省',value:210},
// 			{name:'吉林省',value:620},
// 			{name:'黑龙江省',value:20},
// 			{name:'上海市',value:300}, 
// 			{name:'江苏省',value:700},
// 			{name:'浙江省',value:320},
// 			{name:'安徽省',value:420},
// 			{name:'福建省',value:90},
// 			{name:'江西省',value:110},
// 			{name:'山东省',value:920},
// 			{name:'河南省',value:800},
// 			{name:'湖北省',value:720},
// 			{name:'湖南省',value:810},
// 			{name:'广东省',value:900},
// 			{name:'广西壮族自治区',value:90},
// 			{name:'海南省',value:200},
// 			{name:'重庆市',value:20},
// 			{name:'四川省',value:240},
// 			{name:'贵州省',value:190},
// 			{name:'云南省',value:360},
// 			{name:'西藏自治区',value:90},
// 			{name:'陕西省',value:210},
// 			{name:'甘肃省',value:190},
// 			{name:'青海省',value:90},
// 			{name:'宁夏回族自治区',value:120},
// 			{name:'新疆维吾尔自治区',value:130},
// 			{name:'台湾省',value:270},
// 			{name:'香港特别行政区',value:180},
// 			{name:'澳门特别行政区',value:180},
// 		  ]
//         }
//       ]
//     }
//   );
// }

onMounted(() => { // 需要在组件完成初始渲染并创建DOM节点后运行的代码
  echarts.registerMap('china',china as any);
//   generateChinaMapMethod();
  initEChartsMethod();
});


let annualSalesVolume = ref(4091436);
let annualSalesTarget = ref(9000000);
let targetCompletionRate = ref(0);
let showAnnualSalesTarget = ref('');
let showTargetCompletionRate = ref('');
const simulateMQTTMethod = setInterval(() => {
	// console.log('simulateMQTTMethod_begin');
	annualSalesVolume.value=annualSalesVolume.value+1000;
	// console.log('simulateMQTTMethod_annualSalesVolume.value:',annualSalesVolume.value);
	showAnnualSalesTarget.value=annualSalesVolume.value.toLocaleString();
	// console.log('simulateMQTTMethod_showAnnualSalesTarget.value:',showAnnualSalesTarget.value);
	targetCompletionRate.value = annualSalesVolume.value * 100 / annualSalesTarget.value;
	showTargetCompletionRate.value = targetCompletionRate.value.toFixed(2)+'%';
	// console.log('simulateMQTTMethod_end');
},1000);
// clearInterval(simulateMQTTMethod);



</script>

<template>
	<div class="largeScreen">
		<div class="lshead">
			<span>数据中心</span>
		</div>
		<div class="lsbody">
			<div class="column1">
				<div class="panel1">
					<div class="pltitle">
						销售概况:
					</div>
					<div class="plcontent">
						<table>
							<tr>
								<td>销售地区</td>
								<td>销售省份</td>
							</tr>
							<tr>
								<td>5</td>
								<td>31</td>
							</tr>
							<tr>
								<td>订单总数</td>
								<td>在售产品数</td>
							</tr>
							<tr>
								<td>1,082</td>
								<td>8</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="panel2">
					<div class="pltitle">
						销售对比:
					</div>
					<div class="plcontent" id="echart1"></div>
				</div>
				<div class="panel3">
					<div class="pltitle">
						销售对比:
					</div>
					<div class="plcontent" id="echart2"></div>
				</div>
			</div>
			<div class="column2">
				<div class="panel1">
					<div class="pltitle">
						信息展示:
					</div>
					<div class="plcontent">
						<table>
							<tr>
								<td>年度销售量</td>
								<td>年度销售目标</td>
								<td>目标完成率</td>
							</tr>
							<tr>
								<td>{{showAnnualSalesTarget}}</td>
								<td>{{ annualSalesTarget.toLocaleString() }}</td>
								<td>{{showTargetCompletionRate}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="panel2">
					<div class="pltitle">
						信息展示:
					</div>
					<div class="plcontent" id="echart5"></div>
				</div>
			</div>
			<div class="column3">
				<div class="panel1">
					<div class="pltitle">
						销售数据:
					</div>
					<div class="plcontent">
						<table>
							<tr>
								<td>名次</td>
								<td>省份</td>
								<td>数量</td>
							</tr>
							<tr>
								<td>1</td>
								<td>北京市</td>
								<td>999</td>
							</tr>
							<tr>
								<td>2</td>
								<td>山东省</td>
								<td>920</td>
							</tr>
							<tr>
								<td>3</td>
								<td>广东省</td>
								<td>900</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="panel2">
					<div class="pltitle">
						销售数据:
					</div>
					<div class="plcontent" id="echart3"></div>
				</div>
				<div class="panel3">
					<div class="pltitle">
						销售数据:
					</div>
					<div class="plcontent" id="echart4"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.largeScreen {
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	width: 100vw;
	height: 100vh;

	/* background: url(../assets/bg.jpg) no-repeat top center; */
	background-color: black;
	/* line-height: 1.15; */
}

.lshead {
	width: 100vw;
	height: 7vh;
	font-size: 2vw;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: red; */
}

.lshead span{
	color: white;
}

.lsbody {
	width: 99vw; /* 防止出现滚动条 */
	height: 93vh;
	font-size: 1vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: white;
	background-color: orange;
}

.lsbody .column1{
	width: 29vw;
	height: 88vh;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	background-color: yellow;
}

.lsbody .column1 .panel1{
	height: 28vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 0, 1vw, 1vw, 0;
	background-color: green;
}

.lsbody .column1 .panel1 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column1 .panel1 .plcontent {
	height: 24vh;
	/* background-color: gray; */
}

.lsbody .column1 .panel1 .plcontent table{
	width: 29vw;
	height: 24vh;
	text-align: center;
}

.lsbody .column1 .panel2{
	height: 28vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 5vw, 5vw, 5vw, 5vw;
	background-color: cyan;
}

.lsbody .column1 .panel2 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column1 .panel2 .plcontent {
	height: 24vh;
	/* background-color: gray; */
}

.lsbody .column1 .panel3{
	height: 28vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 0, 1vw, 1vw, 0;
	background-color: white;
}

.lsbody .column1 .panel3 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column1 .panel3 .plcontent {
	height: 24vh;
	/* background-color: gray; */
}

.lsbody .column2{
	width: 40vw;
	height: 88vh;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	background-color: yellow;
}

.lsbody .column2 .panel1{
	height: 18vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 0, 1vw, 1vw, 0;
	background-color: green;
}

.lsbody .column2 .panel1 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column2 .panel1 .plcontent {
	height: 14vh;
	/* background-color: gray; */
}

.lsbody .column2 .panel1 .plcontent table{
	width: 40vw;
	height: 14vh;
	text-align: center;
}

.lsbody .column2 .panel2{
	height: 68vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 5vw, 5vw, 5vw, 5vw;
	background-color: cyan;
}

.lsbody .column2 .panel2 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column2 .panel2 .plcontent {
	height: 64vh;
	background-color: gray; 
}




.lsbody .column3{
	width: 29vw;
	height: 88vh;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	background-color: yellow;
}

.lsbody .column3 .panel1{
	height: 28vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 0, 1vw, 1vw, 0;
	background-color: green;
}

.lsbody .column3 .panel1 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column3 .panel1 .plcontent {
	height: 24vh;
	/* background-color: gray; */
}

.lsbody .column3 .panel1 .plcontent table{
	width: 29vw;
	height: 24vh;
	text-align: center;
}


.lsbody .column3 .panel2{
	height: 28vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 5vw, 5vw, 5vw, 5vw;
	background-color: cyan;
}

.lsbody .column3 .panel2 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column3 .panel2 .plcontent {
	height: 24vh;
	/* background-color: gray; */
}

.lsbody .column3 .panel3{
	height: 28vh;
	border: 1px solid rgba(25, 186, 139, 0.17);
	padding: 0, 1vw, 1vw, 0;
	background-color: white;
}

.lsbody .column3 .panel3 .pltitle {
	height: 4vh;
	text-align: center;
	line-height: 4vh;
	background-color: purple;
}

.lsbody .column3 .panel3 .plcontent {
	height: 24vh;
	/* background-color: gray; */
}

</style>
