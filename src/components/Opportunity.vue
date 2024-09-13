<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示几条数据
const dataCount = ref(0); // 符合条件的数据数量
const arrTableData = ref([] as any); // 显示在表格里的数据数组

const { proxy } = getCurrentInstance() as any;
const obtainDataMethodForList = async () => { // 向后端获取列表数据列表
    try {
        // =========>第1处需要修改的地方：调用后端查询列表数据方法的路径<=========
        let { data: { code, msg, dataCount: dc, list } } = await proxy.$axios.post("opportunity/list", 'strCurrentPageNo=' + currentPage.value + '&strPageSize=' + pageSize.value);
        if (code == 1 && msg == "SUCCESS") {
            arrTableData.value.splice(0, arrTableData.value.length);
            dataCount.value = dc;
            for (let i = 0; i < list.length; i++) {
                arrTableData.value.push(list[i]); // 将从后端获取到的列表数据列表放入显示在表格里的数据数组
            }
        } else {
            proxy.$message.warning(`读取列表数据失败。`);
        }
    } catch (error) {
        proxy.$message.warning(`系统繁忙。请稍后。`);
        console.log("error:", error);
    }
}

onMounted(() => { // 需要在组件完成初始渲染并创建DOM节点后运行的代码
    obtainDataMethodForList(); // 向后端获取数据列表
});

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
    pageSize.value = val;
    obtainDataMethodForList();
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    currentPage.value = val;
    obtainDataMethodForList();
};

// 定义需要新增或修改的对象
// =========>第2处需要修改的地方：将此对象的属性改成与后端对应实体类的属性一样<=========
const entityObject = reactive({
    id: 0,
    source: '',
    information: '',
    contact: '',
    description: '',
    stage: '',
});

const drawer = ref(false); // 抽屉是否显示
const elDrawerTitle = ref('新增'); // 抽屉的标题
const direction = ref('rtl'); // 抽屉的打开方向：rtl(left to right);ltr(right to left);ttb(top to bottom);btt(bottom to top) 

const handleInsert = (op: string) => { // 将抽屉的标题改为新增并清空对象中的数据
    if (op == 'insert') {
        elDrawerTitle.value = '新增';
        drawer.value = true;
        // =========>第3处需要修改的地方：新增前清空对象的各个属性值<=========
        entityObject.id = 0;
        entityObject.source = '';
        entityObject.information = '';
        entityObject.contact = '';
        entityObject.description = '';
        entityObject.stage = '';

    }
}

const isValidUsername = ref(true); // 是否有效的数据(数据库中还不存在此数据)




const handleCancel = (formName: string) => { // 点击取消按钮后调用的方法
    proxy.$refs[formName].resetFields();
    drawer.value = false;
};

const addEntity = async () => { // 调用后端新增的方法
    try {
        // =========>第5处需要修改的地方：调用后端新增方法的路径<=========
        let { data: { code, msg, idJustInserted } } = await proxy.$axios.post("opportunity/add", entityObject);
        if (code == 1 && msg == "SUCCESS") {
            console.log('idJustInserted:', idJustInserted);
            obtainDataMethodForList();
        } else {
            proxy.$message.error(`新增数据失败！`);
        }
    } catch (error) {
        proxy.$message.warning(`系统繁忙。请稍后。`);
    }
};

const doInsert = (formName: string) => { // 新增对象的方法
    if (!isValidUsername.value) {
        proxy.$message.warning(`此数据已存在，请修改数据后再进行操作！`);
        return;
    }
    proxy.$refs[formName].validate((valid: any) => {
        if (valid) {
            console.log('valid submit!');
            addEntity(); // 调用后端新增对象的方法
        } else {
            console.log('invalid submit!');
            return false;
        }
        handleCancel(formName);
    })
};

const handleEdit = (index: number, row: any) => { // 将抽屉的标题改为修改并将修改那行的数据赋给对象
    console.log(index, row);
    elDrawerTitle.value = '修改';
    drawer.value = true;
    // =========>第6处需要修改的地方：修改前将对象的各个属性设置为要修改的那条数据所对应的值<=========
    entityObject.id = row.id;
    entityObject.source = row.source;
    entityObject.information = row.information;
    entityObject.contact = row.contact;
    entityObject.description = row.description;
    entityObject.stage = row.stage;
};

const modifyEntity = async () => { // 调用后端修改对象的方法
    try {
        // =========>第7处需要修改的地方：调用后端修改方法的路径<=========
        let { data: { code, msg } } = await proxy.$axios.post("opportunity/modify", entityObject);
        if (code == 1 && msg == "SUCCESS") {
            obtainDataMethodForList();
        } else {
            proxy.$message.error(`修改数据失败！`);
        }
    } catch (error) {
        proxy.$message.warning(`系统繁忙。请稍后。`);
    }
}

const doEdit = (formName: string) => { // 修改实体的方法
    proxy.$refs[formName].validate((valid: boolean) => {
        if (valid) {
            console.log('valid submit!');
            modifyEntity(); // 调用后端修改实体的方法
        } else {
            console.log('invalid submit!');
            return false;
        }
        handleCancel(formName);
    })
};

const doOperation = (formName: string) => { // 点击提交按钮后调用的方法
    if (elDrawerTitle.value == '新增') { // 如果标题为新增则调用新增方法
        doInsert(formName);
    } else if (elDrawerTitle.value == '修改') { // 如果标题为修改则调用修改方法
        doEdit(formName);
    }
}

const removeEntity = async (id: string) => { // 调用后端删除实体的方法
    try {
        // =========>第8处需要修改的地方：调用后端删除方法的路径<=========
        let { data: { code, msg } } = await proxy.$axios.post("opportunity/remove", 'id=' + id);
        if (code == 1 && msg == "SUCCESS") {
            obtainDataMethodForList();
        } else {
            proxy.$message.error(`删除数据失败！`);
        }
    } catch (error) {
        proxy.$message.warning(`系统繁忙。请稍后。`);
        console.log("error:", error);
    }
}

const handleDelete = (index: number, row: any) => { // 在确认是否删除对话框中点是调用的方法
    console.log(index, row);
    removeEntity(row.id); // 调用后端删除的方法
};

const cancelEvent = () => { // 在确认是否删除对话框中点否调用的方法
    console.log('cancel!')
}
</script>

<template>
    <div class="opportunity">
        <el-table :data="arrTableData" style="width: 100%">



            <!-- =========>第9处需要修改的地方：将显示列表表格的列改为展示对应实体的属性<========= -->
            <el-table-column prop="id" label="机会编号" width="90"> </el-table-column>
            <el-table-column prop="source" label="机会来源" width="180"></el-table-column>
            <el-table-column prop="information" label="客户信息" width="180"></el-table-column>
            <el-table-column prop="contact" label="联系方式" width="180"></el-table-column>
            <el-table-column prop="description" label="需求描述" width="180"></el-table-column>
            <el-table-column prop="stage" label="进展阶段" width="180"></el-table-column>

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

                    <!-- =========>第10处需要修改的地方：将抽屉里的表单项改为对应实体的属性(主键属性不需要修改)<========= -->
                    <el-form-item label="机会来源" prop="source" :rules="[
                        { required: true, message: 'Value is required', trigger: 'blur' },
                        { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
                    ]">
                        <el-input v-model="entityObject.source" placeholder="线索来源"></el-input>
                    </el-form-item>

                    <el-form-item label="客户信息" prop="information" :rules="[
                        { required: true, message: 'Value is required', trigger: 'blur' },
                        { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
                    ]">
                        <el-input v-model="entityObject.information" placeholder="客户信息"></el-input>
                    </el-form-item>

                    <el-form-item label="联系方式" prop="contact" :rules="[
                        { required: true, message: 'Value is required', trigger: 'blur' },
                        { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
                    ]">
                        <el-input v-model="entityObject.contact" placeholder="联系方式"></el-input>
                    </el-form-item>

                    <el-form-item label="需求描述" prop="description" :rules="[
                        { required: true, message: 'Value is required', trigger: 'blur' },
                        { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
                    ]">
                        <el-input v-model="entityObject.description" placeholder="需求描述"></el-input>
                    </el-form-item>

                    <el-form-item label="进展阶段" prop="stage" :rules="[
                        { required: true, message: 'Value is required', trigger: 'blur' },
                        { min: 1, max: 45, message: 'Length should be 1 to 45', trigger: 'blur' },
                    ]">
                        <el-input v-model="entityObject.stage" placeholder="进展阶段"></el-input>
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
