<template>
	<div>
		<div v-for="(item, index) in dataList" :key="index">
			<h3>{{ index + 1 }}、{{ item.title }}</h3>
			<div class="h-con1" v-if="item.isArry">
				<p v-if="item.tip">{{ item.tip }}</p>
				<div v-for="(io, idx) in item.item" :key="idx">
					<h5>{{ io.title }}</h5>
					<div class="h-con1">
						<p v-if="io.list && io.list.length > 0" v-for="(im, ik) in io.list" :key="ik">{{ im }}</p>
						<canvas :id="getIds(index, idx + 1)" width="100px" height="50px"></canvas>
						<canvas v-if="io.isNeedTwo" :id="getIds(index, idx + 1, '1')" width="100px" height="50px"></canvas>
					</div>
				</div>
			</div>
			<div class="h-con1" v-else>
				<p v-if="item.item && item.item.length > 0" v-for="(io, im) in item.item" :key="im">{{ io }}</p>
				<img v-if="item.pic" :src="item.pic" id="scream" />
				<canvas :id="getIds(index)" width="100px" height="50px"></canvas>
				<canvas v-if="item.isNeedTwo" :id="getIds(index, '1')" width="100px" height="50px"></canvas>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
    	    return {
				dataList: [
					{
						title: "填充画布",
						item: [
							'var cav = document.getElementById("canvas1");',
							'var ctx = cav.getContext("2d");',
							'ctx.fillStyle = "red";==============fillStyle属性可以是CSS颜色，渐变，或图案。fillStyle 默认设置是#000000（黑色）。',
							'ctx.fillRect(0, 0, 100, 50);==========fillRect(x, y, width, height) 方法定义了矩形当前的填充方式。'
						]
					},{
						title: "画线",
						item: [
							'var cav = document.getElementById("canvas2");',
							'var ctx = cav.getContext("2d");',
							'ctx.moveTo(0, 0);==============moveTo(x, y) 定义线条开始坐标',
							'ctx.lineTo(200, 100);============lineTo(x, y) 定义线条结束坐标',
							'ctx.stroke();'
						]
					},{
						title: "画圆",
						item: [
							'var cav = document.getElementById("canvas3");',
							'var ctx = cav.getContext("2d");',
							'ctx.beginPath();',
							'ctx.arc(50, 25, 20, 0, 2 * Math.PI);=============arc(x, y, r, start, stop)--弧的圆形的三点钟位置是 0 度，起始角设置为 0，结束角设置为 2 * Math.PI',
							'ctx.stroke();'
						]
					},{
						title: "文本",
						isNeedTwo: true,
						item: [
							'var cav = document.getElementById("canvas4");',
							'var ctx = cav.getContext("2d");',
							'ctx.font = "15px Arial";===================使用 "Arial" 字体在画布上绘制一个高10px的文字',
							'ctx.fillText("Hello World", 10, 30);===========在canvas上绘制实心的文本',
							'//ctx.strokeText("Hello World", 10, 30);=======在canvas上绘制空心的文本'
						]
					},{
						title: "渐变",
						isArry: true,
						tip: "渐变对象，必须使用两种或两种以上的停止颜色",
						item: [
							{
								title: "矩形渐变",
								list: [
									'var cav = document.getElementById("canvas5-1");',
									'var ctx = cav.getContext("2d");',
									'var grd = ctx.createLinearGradient(0, 0, 100, 0);=======创建并设置线条渐变(渐变开始的x坐标，渐变开始的y坐标,渐变结束的x坐标,渐变结束的y坐标)',
									'grd.addColorStop(0, "red");=======设置开始颜色,参数使用坐标来描述，可以是0至1',
									'grd.addColorStop(1, "white"); =======设置结束颜色,参数使用坐标来描述，可以是0至1',
									'ctx.fillStyle = grd;=======填充渐变',
									'ctx.fillRect(0, 0, 100, 50);=======填充渐变'
								]
							},{
								title: "径向/圆渐变",
								list: [
									'var grd = ctx.createRadialGradient(50, 25, 0, 50, 25, 25);=======创建并设置径向/圆渐变(渐变开始圆心x坐标，渐变开始圆心y坐标,开始圆的半径,渐变结束圆心x坐标,渐变结束圆心y坐标,结束时圆的半径)'
								]
							},{
								title: "文本渐变",
								isNeedTwo: true,
								list: [
									'strokeStyle配合strokeText实现空心渐变：'
								]
							},{
								title: "线渐变"
							}
						]
					},{
						title: "图片",
						pic: "/static/images/fbb2.jpg",
						item: [
							'ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);=======sx/sy:裁剪开始位置，sw/sh:裁剪的图片宽高,x/y:距离画布左上角距离(必填),w/h:图片缩小/放大后的宽高'
						]
					},{
						title: "画矩形",
						item: [
							'ctx.strokeRect(0, 0, 100, 100)=======使用strokeRect画矩形(距离画布左上角的x坐标，距离画布左上角的y坐标，矩形宽，矩形高)',
        					'ctx.strokeStyle = **=======可以使用strokeStyle设置矩形的颜色、渐变或模式'
						]
					}
				]
    	    }
    	},
		mounted() {
			this.canvas1();
			this.canvas2();
			this.canvas3();
			this.canvas4();
			this.canvas5();
			this.canvas6();
			this.canvas7();
		},
		methods: {
			getIds(idx, str, cidx) {
				var $idx = idx + 1,
					$str = str ? "-" + str : "",
					$cidx = cidx ? "-" + cidx : "";
				return "canvas" + $idx + $str + $cidx;
			},
			canvas1() {
				var c = document.getElementById('canvas1');
				var ctx = c.getContext('2d');
				ctx.fillStyle = "red";
				ctx.fillRect(0, 0, 100, 50);
			},//矩形
			canvas2() {
				var cav = document.getElementById('canvas2');
				var ctx = cav.getContext('2d');
				ctx.moveTo(0, 0);
				ctx.lineTo(100, 50);
				ctx.stroke();
			},//线
			canvas3() {
				var cav = document.getElementById('canvas3');
				var ctx = cav.getContext('2d');
				ctx.beginPath();
				ctx.arc(50, 25, 20, 0, 2 * Math.PI);
				ctx.stroke();
			},//圆
			canvas4() {
				var cav = document.getElementById('canvas4');
				var ctx = cav.getContext('2d');
				ctx.font = "15px Arial";
				ctx.fillText("Hello World", 10, 30);  
		
				var cav2 = document.getElementById('canvas4-1');
				var ctx2 = cav2.getContext('2d');
				ctx2.font = "15px Arial";
				ctx2.strokeText("Hello World", 10, 30);  
			},//字体
			canvas5() {
				// 矩形渐变
				var cav = document.getElementById('canvas5-1');
				var ctx = cav.getContext("2d");
				// 创建渐变
				var grd = ctx.createLinearGradient(0, 0, 100, 0);
				grd.addColorStop(0, "red");
				grd.addColorStop(1, "white"); 
				// 填充渐变
				ctx.fillStyle = grd;
				ctx.fillRect(0, 0, 100, 50);

				// 径向/圆渐变
				var cav2 = document.getElementById('canvas5-2');
				var ctx2 = cav2.getContext("2d");
				var grd2 = ctx2.createRadialGradient(50, 25, 0, 50, 25, 25);
				grd2.addColorStop(0, "red");
				grd2.addColorStop(1, "white"); 
				ctx2.fillStyle = grd2;
				ctx2.fillRect(0, 0, 100, 50);

				// 实心文本渐变
				var cav3 = document.getElementById('canvas5-3');
				var ctx3 = cav3.getContext("2d");
				var grd3 = ctx3.createRadialGradient(50, 25, 0, 50, 25, 50);
				grd3.addColorStop(0, "red");
				grd3.addColorStop(1, "blue"); 
				ctx3.fillStyle = grd3;
				ctx3.fillText("Hello World", 10, 30);  
		
				// 空心文本渐变
				var cav4 = document.getElementById('canvas5-3-1');
				var ctx4 = cav4.getContext("2d");
				var grd4 = ctx4.createRadialGradient(50, 25, 0, 50, 25, 50);
				grd4.addColorStop(0, "red");
				grd4.addColorStop(1, "blue"); 
				ctx4.strokeStyle = grd4;
				ctx4.strokeText("Hello World", 10, 30);  

				// 线渐变
				var cav5 = document.getElementById('canvas5-4');
				var ctx5 = cav5.getContext("2d");
				var grd5 = ctx5.createRadialGradient(50, 25, 0, 50, 25, 50);
				grd5.addColorStop(0, "red");
				grd5.addColorStop(1, "blue"); 
				ctx5.strokeStyle = grd5;
				ctx5.moveTo(0, 0);
				ctx5.lineTo(100, 50);
				ctx5.stroke();
			},//渐变
			canvas6(){
				var c = document.getElementById("canvas6");
				var ctx = c.getContext("2d");
				var img = document.getElementById("scream");
				img.onload = function() {
					ctx.drawImage(img, 270, 40, 100, 50, 0, 0, 100, 50);
				};
			},//图片
			canvas7() {
				var c = document.getElementById("canvas7");
				var ctx = c.getContext("2d");
				ctx.strokeRect(0, 0, 100, 50);
			}
		}
	}
</script>