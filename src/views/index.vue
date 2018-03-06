<template>
    <el-container>
        <el-header style="line-height: 40px; height: 40px;">
            <div class="time">{{ time }}</div>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                time: ""
            }
        },
        mounted() {
            this.getNowTime();
        },
        methods: {
            getNowTime() {
                var $that = this,
                    $date =  new Date(),
                    $fullYear = $date.getFullYear(),
                    $month = $date.getMonth() + 1,
                    $month = $month < 10 ? "0" + $month : $month,
                    $day = $date.getDate(),
                    $day = $day < 10 ? "0" + $day : $day;
                $that.time = $fullYear + "年" + $month + "月" + $day + "日";
            }
        }
    }
</script>