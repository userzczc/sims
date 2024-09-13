<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

// let currentUserObject = reactive(JSON.parse(sessionStorage.getItem('currentUser')));
// if (currentUserObject == null) {
//   currentUserObject = reactive({ id: 0, name: '未知', role: { id: 0, name: 'none' } });
// }
let currentUserObject = reactive(JSON.parse(sessionStorage.getItem('currentUser') as string) || { id: 0, name: '未知', role: { id: 0, name: 'none' } });

const signOutMethod = () => {
  sessionStorage.removeItem("currentUser");
  router.push({ path: '/signin' });
}

const router = useRouter();
const toComponentMethod = (subpath:string) => {
  router.push({ path: '/main' + subpath });
}

</script>

<template>
  <div class="main">
    <el-container>
      <el-header>
        <div class="headerOuter">
          <span>
            <h1>信息管理系统</h1>
          </span>
          <span>
            <el-tag class="ml-2" type="info" size="large" effect="dark" round>{{ currentUserObject.name }}</el-tag>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="signOutMethod" type="primary" plain>退出</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="0">
            <el-menu-item index="1" v-if="currentUserObject.role.name == 'admin'" @click="toComponentMethod('/role')">角色管理</el-menu-item>
            <el-menu-item index="2" v-if="currentUserObject.role.name == 'admin'" @click="toComponentMethod('/user')">用户管理</el-menu-item>
            <!-- 菜单中包含v-if="currentUserObject.role.name == 'admin'"则只有管理员角色才可看见并使用 -->
            <el-menu-item index="3" @click="toComponentMethod('/echarts')">图表展示</el-menu-item>
            <el-menu-item index="4" @click="toComponentMethod('/lead')">线索管理</el-menu-item>
            <el-menu-item index="5" @click="toComponentMethod('/opportunity')">机会管理</el-menu-item>
            <el-menu-item index="6" @click="toComponentMethod('/customer')">客户管理</el-menu-item>
            <el-menu-item index="7" @click="toComponentMethod('/order')">订单管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
}

.el-container {
  width: 100vw;
  height: 100vh;
}

.el-header {
  background-color: #b3c0d1;
}

.headerOuter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
