<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

const currentPage = ref(1); // 当前页码
const pageSize = ref(2); // 每页显示几条数据
const dataCount = ref(0); // 符合条件的数据数量
const arrTableData = ref([] as any); // 显示在表格里的数据数组

const { proxy } = getCurrentInstance() as any;
const obtainDataMethodForUserList = async () => { // 向后端获取用户数据列表
  try {
    let { data: { code, msg, dataCount: dc, list } } = await proxy.$axios.post("user/list", 'strCurrentPageNo=' + currentPage.value + '&strPageSize=' + pageSize.value);
    if (code == 1 && msg == "SUCCESS") {
      arrTableData.value.splice(0, arrTableData.value.length);
      dataCount.value = dc;
      for (let i = 0; i < list.length; i++) {
        arrTableData.value.push(list[i]); // 将从后端获取到的用户数据列表放入显示在表格里的数据数组
      }
    } else {
      proxy.$message.warning(`读取用户列表数据失败。`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
    console.log("error:", error);
  }
}

const refArrRole = ref([] as any);
const obtainDataMethodForRoleList = async () => { // 向后端获取角色数据列表
  try {
    let { data: { code, msg, dataCount: dc, list } } = await proxy.$axios.post("role/list", 'strCurrentPageNo=1&strPageSize=0');
    if (code == 1 && msg == "SUCCESS") {
      refArrRole.value.splice(0, refArrRole.value.length);
      dataCount.value = dc;
      for (let i = 0; i < list.length; i++) {
        refArrRole.value.push(list[i]); // 将从后端获取到的角色数据列表放入角色数组
      }
    } else {
      proxy.$message.warning(`读取角色列表数据失败。`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
  }
}

onMounted(() => { // 需要在组件完成初始渲染并创建DOM节点后运行的代码
  obtainDataMethodForUserList(); // 向后端获取用户数据列表
  obtainDataMethodForRoleList();// 向后端获取角色数据列表
});

const handleSizeChange = (val:number) => {
  console.log(`${val} items per page`);
  pageSize.value = val;
  obtainDataMethodForUserList();
};
const handleCurrentChange = (val:number) => {
  console.log(`current page: ${val}`);
  currentPage.value = val;
  obtainDataMethodForUserList();
};

// 定义需要新增或修改的对象
const entityObject = reactive({
  id: 0,
  name: '',
  gender: '',
  phone: '',
  password: '',
  role: { id: '', name: '' }
});

const drawer = ref(false); // 抽屉是否显示
const elDrawerTitle = ref('新增'); // 抽屉的标题
const direction = ref('rtl'); // 抽屉的打开方向：rtl(left to right);ltr(right to left);ttb(top to bottom);btt(bottom to top) 

const handleInsert = (op:string) => { // 将抽屉的标题改为新增并清空对象中的数据
  if (op == 'insert') {
    elDrawerTitle.value = '新增';
    entityObject.id = 0;
    entityObject.name = '';
    entityObject.gender = '1';
    entityObject.phone = '';
    entityObject.password = '';
    entityObject.role.id = '';
    drawer.value = true;
  }
}

const isValidUsername = ref(true); // 是否有效的用户名(数据库中还不存在此用户名)
const checkMethodForUsername = async () => { // 向后端验证此用户名是否已经存在
  try {
    let { data: { code, msg } } = await proxy.$axios.post("user/checkUsername", 'username=' + entityObject.phone);
    if (code == 1 && msg == "SUCCESS") {
      isValidUsername.value = false;
      proxy.$message.info(`此账号已经存在！`);
    }
    if (code == 1 && msg == "INVALID") {
      isValidUsername.value = true;
      proxy.$message.info(`此账号目前可用！`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
  }
};

const handleCancel = (formName:string) => { // 点击取消按钮后调用的方法
  proxy.$refs[formName].resetFields();
  drawer.value = false;
};

const addDoctor = async () => { // 调用后端新增用户的方法
  try {
    let { data: { code, msg, idJustInserted } } = await proxy.$axios.post("user/add", entityObject);
    if (code == 1 && msg == "SUCCESS") {
      console.log('idJustInserted:', idJustInserted);
      obtainDataMethodForUserList();
    } else {
      proxy.$message.error(`新增用户数据失败！`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
  }
};

const doInsert = (formName:string) => { // 新增用户的方法
  if (!isValidUsername.value) {
    proxy.$message.warning(`此账号已存在，请修改账号后再进行操作！`);
    return;
  }
  proxy.$refs[formName].validate((valid:any) => {
    if (valid) {
      console.log('valid submit!');
      addDoctor(); // 调用后端新增用户的方法
    } else {
      console.log('invalid submit!');
      return false;
    }
    handleCancel(formName);
  })
};

const handleEdit = (index:number, row:any) => { // 将抽屉的标题改为修改并将修改那行的数据赋给对象
  console.log(index, row);
  elDrawerTitle.value = '修改';
  entityObject.id = row.id;
  entityObject.name = row.name;
  entityObject.gender = row.gender+""; // 需要将数字转换为字符串后单选按钮才能识别
  entityObject.phone = row.phone;
  entityObject.password = row.password;
  entityObject.role.id = row.role.id;
  drawer.value = true;
};

const modifyDoctor = async () => { // 调用后端修改用户的方法
  try {
    let { data: { code, msg } } = await proxy.$axios.post("user/modify", entityObject);
    if (code == 1 && msg == "SUCCESS") {
      obtainDataMethodForUserList();
    } else {
      proxy.$message.error(`修改用户数据失败！`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
  }
}

const doEdit = (formName:string) => { // 修改用户的方法
  proxy.$refs[formName].validate((valid:boolean) => {
    if (valid) {
      console.log('valid submit!');
      modifyDoctor(); // 调用后端修改用户的方法
    } else {
      console.log('invalid submit!');
      return false;
    }
    handleCancel(formName);
  })
};

const doOperation = (formName:string) => { // 点击提交按钮后调用的方法
  if (elDrawerTitle.value == '新增') { // 如果标题为新增则调用新增方法
    doInsert(formName);
  } else if (elDrawerTitle.value == '修改') { // 如果标题为修改则调用修改方法
    doEdit(formName);
  }
}

const removeDoctor = async (id:string) => { // 调用后端删除用户的方法
  try {
    let { data: { code, msg } } = await proxy.$axios.post("user/remove", 'id=' + id);
    if (code == 1 && msg == "SUCCESS") {
      obtainDataMethodForUserList();
    } else {
      proxy.$message.error(`删除用户数据失败！`);
    }
  } catch (error) {
    proxy.$message.warning(`系统繁忙。请稍后。`);
    console.log("error:", error);
  }
}

const handleDelete = (index:number, row:any) => { // 在确认是否删除对话框中点是调用的方法
  console.log(index, row);
  removeDoctor(row.id); // 调用后端删除用户的方法
};

const cancelEvent = () => { // 在确认是否删除对话框中点否调用的方法
  console.log('cancel!')
}
</script>

<template>
  <div class="user">
    <el-table :data="arrTableData" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="90"> </el-table-column>
      <el-table-column prop="name" label="用户姓名" width="90"></el-table-column>
      <el-table-column prop="gender" label="性别" width="90">
        <template #default="scope">{{ scope.row.gender==1?'男':scope.row.gender==0?'女':'未知' }}</template>
      </el-table-column>
      <el-table-column prop="phone" label="登录账号" width="90"> </el-table-column>
      <el-table-column prop="password" label="登录密码" width="90"> </el-table-column>
      <el-table-column prop="role.id" label="角色编号" width="90"></el-table-column>
      <el-table-column prop="role.name" label="角色名称" width="180"></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-button size="small" type="info" @click="handleInsert('insert')">新增</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" type='warning' @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="red" title="你确定要删除吗?"
            @confirm="handleDelete(scope.$index, scope.row)" @cancel="cancelEvent">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-model:currentPage="currentPage" :page-sizes="[1, 2, 9, 10]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataCount" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>


    <el-drawer v-model="drawer" :title="elDrawerTitle" :direction="direction">
      <span>
        <el-form ref="ruleForm1" :model="entityObject" label-width="120px" size="small">
          <el-form-item label="用户姓名" prop="name" :rules="[
            { required: true, message: 'name is required', trigger: 'blur' },
            { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
          ]">
            <el-input v-model="entityObject.name" placeholder="用户姓名"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender" :rules="[
            { required: true, message: 'gender is required', trigger: 'blur' },
          ]">
            <el-radio-group v-model="entityObject.gender">
              <el-radio value="1">男</el-radio>
              <el-radio value="0">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="账号" prop="phone" :rules="[
            { required: true, message: 'phone is required', trigger: 'blur' },
            { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
          ]">
            <el-input v-model="entityObject.phone" placeholder="账号" @blur='checkMethodForUsername()'></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" :rules="[
            { required: true, message: 'password is required', trigger: 'blur' },
            { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
          ]">
            <el-input v-model="entityObject.password" placeholder="密码" show-password></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="role.id" :rules="[
            { required: true, message: 'Please select', trigger: 'change' },
          ]">
            <el-select v-model="entityObject.role.id" placeholder="请选择">
              <el-option v-for="(item, index) in refArrRole" :key="item.id" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item size="large">
            <el-button type="primary" @click="doOperation('ruleForm1')">提交</el-button>
            <el-button @click="handleCancel('ruleForm1')">取消</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-drawer>

  </div>
</template>

<style scoped></style>
