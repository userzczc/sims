<script setup lang="ts">
// 引入reactive和getCurrentInstance
import { reactive, getCurrentInstance } from 'vue';
// 定义和后端User实体类具有相同属性phone和password的对象
const signinObject = reactive({
	phone: '',
	password: ''
});
// 获取实例
const { proxy } = getCurrentInstance() as any;
// 向后端验证用户名是否存在的方法
const checkMethodForUsername = async () => {
	try {
		// 请求后端doctor控制类里的checkUsername方法，并将username这个参数传递过去
		let { data: { code, msg } } = await proxy.$axios.post("user/checkUsername", 'username=' + signinObject.phone);
		// 根据从后端获取到的数据传输工具中存储状态码的值和存储提示信息的值来判断用户名是否存在并给出提示
		if (code == 1 && msg == "INVALID") {
			// proxy.$message.success(`成功提示。`);
			// proxy.$message.info(`正常提示。`);
			// proxy.$message.warning(`警告提示。`);
			// proxy.$message.error(`错误提示。`);
			proxy.$message.info(`无效的用户名。`);
		}
	} catch (error) {
		proxy.$message.warning(`系统繁忙。请稍后。`);
	}
};


// import picHospitalJpeg from '@/assets/hospital.jpeg'


// 引入useRouter
import { useRouter } from 'vue-router';
// 获取路由器
const router = useRouter();
// 调用后端登录的方法
const signinMethod = async () => {
	try {
		// 请求后端doctor控制类里的signin方法，并将signinObject这个对象传递过去
		let { data: { code, msg, entity } } = await proxy.$axios.post("user/signin", signinObject);
		// 根据从后端获取到的数据传输工具中存储状态码的值、存储提示信息的值来判断是否登录成功
		if (code == 1 && msg == "SUCCESS") { // 如果登录成功，
			// 1、将登录的用户对象转换为JSON字符串后存储在会话仓库中
			sessionStorage.setItem('currentUser', JSON.stringify(entity));
			// 2、通过路由器跳转到path为/main所对应的组件(页面)
			router.push({ path: '/main' });
		} else {
			proxy.$message.warning(`无效的用户名或密码。`);
		}
	} catch (error) {
		proxy.$message.warning(`系统繁忙。请稍后。`);
	}
};


// 调用跳转到大屏页面的方法
const goTobtnLargeScreenMethod = () => {
	// 通过路由器跳转到path为/largeScreen所对应的组件(页面)
	router.push({ path: '/largeScreen' });
};

</script>

<template>
	<div class="signin">
		<img id="imgShow" alt="Hospital logo" src="../assets/ERP.jpg">
		<!-- <img alt="Hospital logo" src="http://localhost:8082/sf/ERP.jpeg"> -->

		<!-- 
		账号输入框的值与signinObject对象的username属性进行了双向绑定，一处的值改变后另一处的值也会做相同改变
		当账号输入框失去焦点时，会调用checkMethodForUsername()方法
		-->
		<el-input v-model="signinObject.phone" placeholder="账号" @blur='checkMethodForUsername()' />

		<!-- 密码输入框的值与signinObject对象的password属性进行了双向绑定，一处的值改变后另一处的值也会做相同改变 -->
		<el-input v-model="signinObject.password" placeholder="密码" show-password />

		<!-- 当登录按钮被点击时，会调用signinMethod()方法 -->
		<el-button id="btnSignin" @click="signinMethod" type="danger" plain>登录</el-button>

		<br>
		<!-- 当大屏按钮被点击时，会调用goTobtnLargeScreenMethod()方法 -->
		<el-button id="btnLargeScreen" @click="goTobtnLargeScreenMethod" type="danger" plain>大屏</el-button>

	</div>
</template>

<style scoped>
.signin {
	width: 400px;
	margin: 0 auto;
	/* background-color: blue; */
}

#imgShow {
	width: 400px;
	height: 400px;
}

#btnSignin {
	width: 400px;
}

#btnLargeScreen {
	width: 400px;
}
</style>
