<template>
    <el-container>
        <el-header :style="{'line-height': headerHeight, 'height': headerHeight}">
            <div class="time">
                <span>{{ time }}</span>
                <span v-if="unReadNum" class="unRead">
                    <el-badge :value="unReadNum" class="item"></el-badge>
                </span>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="menuWidth">
                <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" :router="isRouter" :collapse="isCollapse" background-color="#2c3941" text-color="#ddd" active-text-color="#0bc5de" :unique-opened="isOnlyOpenOne">
                    <span class="shrink" @click="isCollapse = !isCollapse">
                        <i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"></i>
                    </span>
                    <template v-for="(val, ids) in menuData">
                        <el-submenu v-if="val.item && val.item.length > 0" :index="ids + ''" :key="ids">
                            <template slot="title">
                                <i :class="val.icon"></i>
                                <span>{{ val.text }}</span>
                            </template>
                            <!-- index 作为 path 进行路由跳转 -->
                            <el-menu-item v-for="(io, idx) in val.item" :index="io.href" :key="ids + '-' + idx">{{ io.text }}</el-menu-item>
                        </el-submenu>
                        <!-- index 作为 path 进行路由跳转 -->
                        <el-menu-item v-else :index="val.href" :key="ids + ''">
                            <i :class="val.icon"></i>
                            <span slot="title">{{ val.text }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main id="el-main">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import menuData from '../../static/javascripts/menuData'
    export default {
        data() {
            return {
                headerHeight: "40px",
                menuWidth: "auto",
                isRouter: true, // 是否使用vue-router
                isOnlyOpenOne: true,// 是否只打开一个子菜单
                menuData: menuData,// 数据源
                isCollapse: false, // 是否水平折叠收起菜单，只有是垂直排列的可用
                time: "",
                unReadNum: 0 // 没有阅读的消息数量
            }
        },
        sockets: {
            receiveMsg(val) {
                if(this.$route.path == "/websocket")
                    this.unReadNum = 0;
                else
                    this.unReadNum += 1;
            }
        },
        computed: {
            activeIndex: function() {
                return this.$route.path || "/";
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
<style scoped>
    .unRead {
        cursor: pointer;
    }
</style>
