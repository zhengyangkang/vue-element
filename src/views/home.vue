<template>
	<div>					
		<div id="echarts" style="height: 500px;"></div>
		<div class="fontMiddle">echarts官网例子：http://echarts.baidu.com/examples.html</div>
	</div>
</template>
<script>
	export default {
    	data() {
    	    return {
				defaultData: [
					{
						"date": 1474214400000,
						"weight": 55,
						"son": "杨大侠"
					},{
						"date": 1474300800000,
						"weight": 57,
						"son": "杨大侠"
					},{
						"date": 1474732800000,
						"weight": 60,
						"son": "杨大侠"
					},{
						"date": 1474819200000,
						"weight": 58,
						"son": "杨大侠"
					},{
						"date": 1474214400000,
						"weight": 64,
						"son": "二狗"
					},{
						"date": 1474300800000,
						"weight": 67,
						"son": "二狗"
					},{
						"date": 1474819200000,
						"weight": 75,
						"son": "二狗"
					}
				]
    	    }
    	},
    	mounted() {
    	    var obj = {
    	        nameList: ['heroyang', 'wodertian'],
    	        timeList: ['2017/02/01', '2017/02/02', '2017/02/03'],
    	        dataList: [
					{
						name: 'heroyang',
						type: 'line',
						connectNulls: true,//其中connectNulls:true是把两个数据之间没有数据的两个点也链接起来
						data: ['55', '64', '57'],
					},{
						name: 'wodertian',
						type: 'line',
						connectNulls: true,
						data: ['67', '', '51'],
					}
				]
    	    };            
    	    this.setChart(obj);
    	},		
		methods: {
			setChart(obj) {
				var $that = this;
				var options = {
					title: {
						text: 'I And My Son',
						subtext: '纯属虚构'
					},
					tooltip: {
						trigger: 'axis'//鼠标经过时显示数值
					},
					legend: {
						data: obj.nameList
					},
					toolbox: {
						feature: {
							saveAsImage: {}//保存为图片
						}
					},
					xAxis: {
						name: "日期",
						splitLine: {
							show: false//是否显示边框线--默认false
						},
						data: obj.timeList
					},
					yAxis: {
						//name: "体重",
						type: "value",
						axisLabel: {
							formatter: '{value} 斤'
						}
					},
					series: obj.dataList
				};
				var weightChart = $that.$echarts.init(document.getElementById("echarts"));
				weightChart.setOption(options);
			}
		}
	}
</script>
