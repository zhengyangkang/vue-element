<template>
    <el-container>
        <el-header :style="{'line-height': headerHeight, 'height': headerHeight}">
            <div class="time">{{ time }}</div>
        </el-header>
        <el-container>
            <el-aside :width="menuWidth + 'px'">
                <el-menu default-active="2" class="el-menu-vertical-demo" :router="isRouter" :collapse="isCollapse" background-color="#444856" text-color="#fff" active-text-color="#0bc5de" :unique-opened="isOnlyOpenOne">
                    <span class="shrink" @click="switchLeftMenu">
                        <i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"></i>
                    </span>
                    <template v-for="(val, ids) in menuData">
                        <el-submenu v-if="val.item && val.item.length > 0" :index="ids + ''" :key="ids">
                            <template slot="title">
                                <i :class="val.icon"></i>
                                <span>{{ val.text }}</span>
                            </template>
                            <el-menu-item v-for="(io, idx) in val.item" :index="io.href" :key="ids + '-' + idx" @click="setPageIndex(io.href)">{{ io.text }}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="val.href" :key="ids + ''" @click="setPageIndex(val.href)">
                            <i :class="val.icon"></i>
                            <span slot="title">{{ val.text }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
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
                menuWidth: 200,
                isRouter: true, // 是否使用vue-router
                isOnlyOpenOne: true,// 是否只打开一个子菜单
                menuData: menuData,// 数据源
                isCollapse: false, // 是否水平折叠收起菜单，只有是垂直排列的可用
                time: ""
            }
        },
        mounted() {
            this.getNowTime();
        },
        methods: {
            switchLeftMenu() {
                var $that = this;
                $that.isCollapse = !$that.isCollapse;
                console.log("click event");
            },
            setPageIndex() {
                console.log("click event2");
            },
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