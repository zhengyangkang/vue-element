<template>
	<div style="height: 100%; text-align: center;" id="retro-snaker-container">
		<div>得分：{{ score }}</div>
		<div id="canvas-box"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				score: 0, // 目前得分
				oneScore: 10, // 吃一个位子的分
				casWidth: 0, //画布宽
				casHeight: 0, //画布高
				sSize: 20, //一个小方块的尺寸(正方形)
				arrowKeyCodes: [37, 38, 39, 40], // 37左，38上，39右，40下
				arrow: -1, // 目前运行方向
				speed: 200, // 速度
				timer: "", // 定时器
				ctx: "", // 画布
				isEat: false, // 是否吃到食物
				arrays: [], // 贪吃蛇每个像素的左上角坐标数组
				numRange: {
					numX: "",
					numY: ""
				}, // 所有点可取的随机数范围
				headSize: {
					x: "",
					y: ""
				}, // 蛇头部坐标
				foodSize: {
					x: "",
					y: ""
				} // 食物起点坐标
			}
		},
		mounted() {
			this.createCanvas();
		},
		methods: {
			createCanvas() {
				var $that = this,
					box = document.getElementById("retro-snaker-container"),
					canvasBox = document.getElementById("canvas-box");
				// 创建画布节点
				var canvas = document.createElement("canvas");
				$that.ctx = canvas.getContext("2d");
				// 设置画布宽高
				canvas.width = $that.casWidth = box.offsetWidth % $that.sSize == 0 ? box.offsetWidth : box.offsetWidth - box.offsetWidth % $that.sSize;
				canvas.height = $that.casHeight = box.offsetHeight % $that.sSize == 0 ? box.offsetHeight : box.offsetHeight- box.offsetHeight % $that.sSize;
				// 插入画布节点
				canvasBox.appendChild(canvas);
				// 所有点可取的随机数范围
				$that.numRange.numX = $that.casWidth / $that.sSize;
				$that.numRange.numY = $that.casHeight / $that.sSize;
				$that.init();
			},
			init() {
				var $that = this;
				// 设置初始运行方向
				$that.arrow = $that.arrowKeyCodes[Math.floor(Math.random() * $that.arrowKeyCodes.length)];
				// 设置蛇头位子(随机数)(上下左右要空出一个格子的距离)
				$that.headSize = {
					x: Math.ceil(Math.random() * ($that.numRange.numX - 1)) * $that.sSize,
					y: Math.ceil(Math.random() * ($that.numRange.numY - 1)) * $that.sSize
				};
				// 设置蛇身体位子
				$that.setSnakeBody();
				// 设置食物位子(随机数)
				$that.setFoodPosition();
				// 监听键盘方向键
				window.addEventListener("keyup", function(e) {
					// 监听按下上下左右方向键并且和运行方向不同
					if(e.keyCode >=37 && e.keyCode <= 40 && ( $that.arrow - e.keyCode) % 2 != 0) {
						$that.arrow = e.keyCode;
						clearInterval($that.timer);
						$that.move();
						$that.timer = setInterval($that.move, $that.speed);
					}
				});
				$that.timer = setInterval($that.move, $that.speed);
			},
			setSnakeBody() {
				var $that = this,
					obj = {
						x: "",
						y: ""
					};
				if($that.arrow == 37){ // 左
					obj.x = $that.headSize.x + $that.sSize;
					obj.y = $that.headSize.y;
				} else if($that.arrow == 38){ // 上
					obj.x = $that.headSize.x;
					obj.y = $that.headSize.y + $that.sSize;
				} else if($that.arrow == 39){ // 右
					obj.x = $that.headSize.x - $that.sSize;
					obj.y = $that.headSize.y;
				} else if($that.arrow == 40){ // 下
					obj.x = $that.headSize.x;
					obj.y = $that.headSize.y - $that.sSize;
				};
				$that.arrays=[obj];
			}, // 仅游戏刚开始时调用一次
			setFoodPosition() {
				var $that = this;
				$that.foodSize.x = Math.floor(Math.random() * $that.numRange.numX) * $that.sSize;
				$that.foodSize.y = Math.floor(Math.random() * $that.numRange.numY) * $that.sSize;
				// 判断这个食物点是否在当前蛇身上
				for(var i = 0; i < $that.arrays.length; i++) {
					if($that.arrays[i].x == $that.foodSize.x && $that.arrays[i].y == $that.foodSize.y) {
						$that.setFoodPosition(); // 重新生成食物的位置
					};
				};
				// 判断这个食物点是否在当前蛇头上
				if($that.headSize.x == $that.foodSize.x && $that.headSize.y == $that.foodSize.y) {
					$that.setFoodPosition(); // 重新生成食物的位置
				};
			}, // 重设下一个食物坐标
			move() {
				var $that = this,
					obj = {
						x: "",
						y:""
					};
				if($that.arrow == 37){ // 左
					obj.x = $that.headSize.x - $that.sSize;
					obj.y = $that.headSize.y;
				} else if($that.arrow == 38){ // 上
					obj.x = $that.headSize.x;
					obj.y = $that.headSize.y - $that.sSize;
				} else if($that.arrow == 39){ // 右
					obj.x = $that.headSize.x + $that.sSize;
					obj.y = $that.headSize.y;
				} else if($that.arrow == 40){ // 下
					obj.x = $that.headSize.x;
					obj.y = $that.headSize.y + $that.sSize;
				};
				if($that.isEat){ // 如果吃到食物则插入之前的蛇头位子
					$that.arrays.unshift($that.headSize);
					$that.isEat =  false;
				} else {
					$that.arrays.splice($that.arrays.length - 1, 1);
					$that.arrays.unshift($that.headSize);
				};
				$that.headSize = obj;
				$that.draw();
			}, // 移动数组
			hitSelf() {
				var $that = this,
					bool = false;
				for(var i = 0; i < $that.arrays.length; i++) {
					if($that.arrays[i].x == $that.headSize.x && $that.arrays[i].y == $that.headSize.y){
						bool = true;
						break;
					};
				};
				return bool;
			}, // 是否撞到自己
			draw() {
				var $that = this;
				// 判断是否撞墙
				if($that.headSize.x >= $that.casWidth || $that.headSize.x < 0 || $that.headSize.y >= $that.casHeight || $that.headSize.y < 0 || $that.hitSelf()) {
					clearInterval($that.timer);
					$that.gameOver();
					return false;
				};
				// 判断是否吃到食物
				if($that.headSize.x == $that.foodSize.x && $that.headSize.y == $that.foodSize.y) {
					$that.isEat = true;
					$that.score += $that.oneScore;
					$that.setFoodPosition();
				};
				// 清空
				$that.ctx.clearRect(0, 0, $that.casWidth, $that.casHeight); // 起点x坐标，起点y坐标，矩形宽，矩形高
				// 填充背景
				$that.ctx.fillStyle = "black";
				$that.ctx.fillRect(0, 0, $that.casWidth, $that.casHeight);
				// 设置食物位置
				$that.ctx.fillStyle = "blue";
				$that.ctx.fillRect($that.foodSize.x, $that.foodSize.y, $that.sSize, $that.sSize)
				// 画蛇头
				$that.ctx.fillStyle = "red";
				$that.ctx.fillRect($that.headSize.x, $that.headSize.y, $that.sSize, $that.sSize)
				// 画蛇
				for(var i = 0; i < $that.arrays.length; i++) {
					$that.ctx.fillStyle = "yellow";
					$that.ctx.fillRect($that.arrays[i].x, $that.arrays[i].y, $that.sSize, $that.sSize);
				};
			}, // 重新画
			gameOver() {
				if(confirm("GameOver,再来一局？")){
					this.init();
				};
			}
		}
	}
</script>