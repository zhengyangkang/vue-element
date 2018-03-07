<template>
	<div>
		<canvas id="canvas1" :width="casWidth" :height="casHeight"></canvas>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				casWidth: 300,//画布宽
				casHeight: 300,//画布高
				xNum: 3,//x轴分几个格子
				yNum: 3,//y轴分几个格子
			}
		},
		mounted() {
			var c = document.getElementById('canvas1');
			var ctx = c.getContext('2d'),
				sDivW = this.casWidth / this.xNum,
				sDivH = this.casHeight / this.yNum;
			this.createLattice(ctx, sDivW, sDivH);
			this.createGra(ctx, sDivW, sDivH);
		},
		methods: {
			createLattice(ctx, sDivW, sDivH) {
				ctx.strokeRect(0, 0, this.casWidth, this.casHeight);//画一个矩形
				for(let i = 1; i < this.yNum; i++){
					ctx.moveTo(0, sDivH * i);
					ctx.lineTo(this.casWidth, sDivH * i);
				};
				for(let j = 1; j < this.xNum; j++){
					ctx.moveTo(sDivW * j, 0);
					ctx.lineTo(sDivW * j, this.casHeight);
				};
				ctx.stroke();
			},//画格子
			createGra(ctx, sDivW, sDivH) {
				var r = sDivW >= sDivH ? sDivH : sDivW;
				ctx.beginPath();
				ctx.arc(sDivW / 2, sDivH / 2, r / 2 * 0.8, 0, 2 * Math.PI);//画圆
				ctx.moveTo(120, 20);
				ctx.lineTo(180, 80);
				ctx.moveTo(180, 20);
				ctx.lineTo(120, 80);
				ctx.stroke();
			}//画圈和叉
		}
	}
</script>