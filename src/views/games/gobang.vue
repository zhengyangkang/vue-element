<template>
	<div id="canvas-box" style="height: 100%; text-align: center;"></div>
</template>
<script>
	export default {
		data() {
			return {
				casWidth: 0, // 画布宽
				casHeight: 0, // 画布高
				ctx: "", // 画布
				winSize: 5, // 五子棋所以5个
				lattice: [], // 所有小格子的左上角起点坐标
				sSize: 50 // 每个格子的宽高(正方形)
			}
		},
		mounted() {
			this.createCanvas();
		},
		methods: {
			createCanvas() {
				var $that = this,
					box = document.getElementById("canvas-box");
				// 创建画布节点
				var canvas = document.createElement("canvas");
				$that.ctx = canvas.getContext("2d");
				// 设置画布宽高
				canvas.width = $that.casWidth = box.offsetWidth % $that.sSize == 0 ? box.offsetWidth : box.offsetWidth - box.offsetWidth % $that.sSize;
				canvas.height = $that.casHeight = box.offsetHeight % $that.sSize == 0 ? box.offsetHeight : box.offsetHeight- box.offsetHeight % $that.sSize;
				// 插入画布节点
				box.appendChild(canvas);
				//添加事件响应   
				canvas.addEventListener('click', function(e) {
					var p = $that.getEventPosition(e);
					$that.createGra(p);
				}, false);   
				$that.createLattice();
			},
			getEventPosition(ev) {
				var x, y;
				if (ev.layerX || ev.layerX == 0) {
					x = ev.layerX;
					y = ev.layerY;
				}else if (ev.offsetX || ev.offsetX == 0) { // Opera
					x = ev.offsetX;
					y = ev.offsetY;
				};
				return {x: x, y: y}; 
			}, // 获取点击的坐标
			createLattice() {
				var $that = this,
					xArr = [],
					yArr = [];
				$that.ctx.strokeRect(0, 0, $that.casWidth, $that.casHeight);//画一个矩形
				// 画横
				for(let i = 1; i < $that.casWidth / $that.sSize + 1; i++){
					xArr.push($that.sSize * (i - 1));
					$that.ctx.moveTo(0, $that.sSize * i);
					$that.ctx.lineTo($that.casWidth, $that.sSize * i);
				};
				// 画竖
				for(let j = 1; j < $that.casHeight / $that.sSize + 1; j++){
					yArr.push($that.sSize * (j - 1));
					$that.ctx.moveTo($that.sSize * j, 0);
					$that.ctx.lineTo($that.sSize * j, $that.casHeight);
				};
				// 组合所有小格子起点坐标放入数组
				for(var k = 0; k < yArr.length; k++) {
					for(var p = 0; p < xArr.length; p++) {
						$that.lattice.push({x: xArr[p], y: yArr[k], user: -1}); // user=-1代表未选中,1圆，2叉
					};
				};
				$that.ctx.stroke();
			},//画格子
			createGra(p) {
				var $that = this,
					startP = {
						x: parseInt(p.x / $that.sSize) * $that.sSize,
						y: parseInt(p.y / $that.sSize) * $that.sSize
					}; // 选中的框起点坐标
				for(var i = 0; i < $that.lattice.length; i++) {
					if($that.lattice[i].x == startP.x && $that.lattice[i].y == startP.y) {
						if($that.lattice[i].user != -1) {
							// 当前选中的格子已经被选中过了
							alert("这个位置已经选中了，请重新选择");
						} else {
							$that.lattice[i].user = 1;
							$that.ctx.beginPath();
							$that.ctx.arc(startP.x + $that.sSize / 2, startP.y + $that.sSize / 2, $that.sSize / 2 * 0.8, 0, 2 * Math.PI); //画圆
							$that.ctx.stroke();
							if($that.isWin(1)) {
								alert("恭喜，你赢了！");
							} else {
								$that.getRandomP();
							};
						};
						break;
					};
				};
			}, // 用户画圈
			createFork(p) {
				var $that = this,
					startP = {
						x: parseInt(p.x / $that.sSize) * $that.sSize,
						y: parseInt(p.y / $that.sSize) * $that.sSize
					}; // 选中的框起点坐标
				for(var i = 0; i < $that.lattice.length; i++) {
					if($that.lattice[i].x == startP.x && $that.lattice[i].y == startP.y) {
						if($that.lattice[i].user != -1) {
							// 当前选中的格子已经被选中过了
							alert("这个位置已经选中了，请重新选择");
						} else {
							$that.lattice[i].user = 2;
							$that.ctx.moveTo(startP.x + $that.sSize * 0.2, startP.y + $that.sSize * 0.2);
							$that.ctx.lineTo(startP.x + $that.sSize * 0.8, startP.y + $that.sSize * 0.8);
							$that.ctx.moveTo(startP.x + $that.sSize * 0.2, startP.y + $that.sSize * 0.8);
							$that.ctx.lineTo(startP.x + $that.sSize * 0.8, startP.y + $that.sSize * 0.2);
							$that.ctx.stroke();
							if($that.isWin(2)) {
								if(confirm("你输了！")){
									$that.resetP();
								} else {
									$that.resetP();
								};
							};
						};
						break;
					};
				};
			}, // 系统画叉
			resetP() {
				var $that = this;
				for(var i = 0; i < $that.lattice.length; i++) {
					$that.lattice[i].user = -1;
				};
			}, // 重置格子
			getRandomP() {
				var $that = this,
					randomNum= 0,
					surplusArr = []; // 未被选中的小格子数组
				for(var i = 0; i < $that.lattice.length; i++) {
					if($that.lattice[i].user == -1) {
						surplusArr.push($that.lattice[i]);
					};
				};
				randomNum = Math.floor(Math.random() * surplusArr.length);
				$that.createFork(surplusArr[randomNum]); // 将系统生成的位置画出来
			}, // 获取系统随机位置
			isWin(type) {
				var $that = this,
					isWin = false, // 是否赢
					rows = $that.casWidth / $that.sSize,
					continuityNum = 0; // 当前连续数量
				for(var i = 0; i < $that.lattice.length; i++) {
					if(continuityNum == $that.winSize) {
						break;
					};
					continuityNum = 0;
					if($that.lattice[i].user == type) { // 当前选中
						for(var j = 1; j < $that.winSize; j++) {
							if($that.lattice[i].y == $that.lattice[i + j].y && $that.lattice[i + j].user == type){ // 在同一行上,从左到右
								continuityNum++;
								if(continuityNum >= $that.winSize) {
									isWin = true;
									break;
								};
							} else {
								break;
							};
							if($that.lattice[i + rows * j] && $that.lattice[i + rows * j].user == type){ // 在同一竖上,从上往下
								continuityNum++;
								if(continuityNum >= $that.winSize) {
									isWin = true;
									break;
								};
							} else {
								break;
							};
						};
					};
				};
				return isWin;
			} // 判断是否赢了游戏
		}
	}
</script>