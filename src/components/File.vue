<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, reactive } from 'vue';

const handlePreview = (file:any) => {
    console.log('--------->handlePreview:点击文件列表中已上传的文件时的钩子<---------');
    let labelA = document.createElement('a');
    labelA.href = file.url;
    labelA.click();

    // console.log(file);
}

const fileList = ref([] as any);
const beforeRemove = (file:any, fileList:any) => {
    console.log('--------->beforeRemove:删除文件之前的钩子，参数为上传的文件和文件列表。 若返回 false 或者返回 Promise 且被 reject，则终止删除。<---------');
    // return proxy.$confirm(`确定要删除文件“${file.name}”吗?`);
    // proxy.$message.warning(`您没有权限删除已上传的文件。`);
    return true;
}
const removeFile = async (fileName:string) => {
    try {
        let { data: { code, msg } } = await proxy.$axios.post("file/remove", 'fileFullName=' + fileName);
        if (code == 1 && msg == "SUCCESS") {
            console.log(`删除文件“${fileName}”成功。`);
        } else {
            console.log(`删除文件“${fileName}”失败。`);
        }
    } catch (error) {
        proxy.$message.warning(`系统繁忙。请稍后。`);
        console.log("error:", error);
    }
}
const handleRemove = (file:any, fileList:any) => {
    console.log('--------->handleRemove:文件列表移除文件时的钩子<---------');
    // console.log(file, fileList);
    removeFile(file.name);
}

const { proxy } = getCurrentInstance() as any;
const handleExceed = (files:any, fileList:any) => {
    console.log('--------->handleExceed:文件超出个数限制时的钩子<---------');
    proxy.$message.warning(`最多只能上传 ${fileList.length} 个文件。想上传其他文件请先删除已上传的文件。`);
}

const handleChange = (file:any, fileList:any) => {
    console.log('--------->handleChange:文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用<---------');
    // console.log('file:', file);
    // console.log('fileList:', fileList);
    // fileList = fileList.slice(-3);
}
const handleSuccess = (response:any, file:any, fileList:any) => {
    console.log('--------->handleSuccess:文件上传成功时的钩子<---------');
    if (file.response.code == 1 && file.response.msg == 'SUCCESS') {
        file.url = 'http://localhost:8083/his/file/download?fileFullName=' + file.name;
    }
    // console.log('response:', response);
    // console.log('file:', file);
    // console.log('fileList:', fileList);
    // fileList = fileList.slice(-3);
}
const beforeAvatarUpload = (file:any) => {
    console.log('--------->beforeAvatarUpload:传文件之前的钩子，参数为上传的文件。 若返回 false 或者返回 Promise 且被 reject，则终止上传。<---------');
    let isValidFileType = false;
    if (file.type === 'image/x-icon') {
        isValidFileType = true; // ico
    } else if (file.type === 'image/jpeg') {
        isValidFileType = true; // jpeg或jpg
    } else if (file.type === 'audio/mpeg') {
        isValidFileType = true; // mp3
    } else if (file.type === 'video/mp4') {
        isValidFileType = true; // mp4
    } else if (file.type === 'image/png') {
        isValidFileType = true; // png
    }
    const isValidFileSize = file.size / 1024 / 1024 < 9; // 小于9M
    if (!isValidFileType) {
        proxy.$message.error(`您上传的文件类型非法。`)
    }
    if (!isValidFileSize) {
        proxy.$message.error(`您上传的文件超过大小限制。`);
    }
    return isValidFileType && isValidFileSize;
}

const obtainDataMethodForFileList = async () => {
    try {
        let { data: { code, msg, list } } = await proxy.$axios.post("file/list", 'strCurrentPageNo=&strPageSize=');
        if (code == 1 && msg == "SUCCESS") {
            fileList.value.splice(0, fileList.value.length);
            for (let i = 0; i < list.length; i++) {
                fileList.value.push({ name: list[i], url: 'http://localhost:8083/his/file/download?fileFullName=' + list[i] });
            }
        } else {
            proxy.$message.error(`读取文件列表数据失败。`);
        }
    } catch (error) {
        proxy.$message.warning(`系统繁忙。请稍后。`);
        console.log("error:", error);
    }
}
onMounted(() => {
    obtainDataMethodForFileList();
});

</script>

<template>
    <div class="file">
        <el-upload class="upload-demo" drag action="http://localhost:8083/his/file/upload" :on-preview="handlePreview"
            :before-remove="beforeRemove" :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed"
            :on-change="handleChange" :on-success="handleSuccess" :before-upload="beforeAvatarUpload"
            :file-list="fileList">
            <div class="el-upload__text">
                将文件拖拽到此处松开鼠标左键或者 <em>单击这里上传文件。</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    可上传的文件类型：ico/jpeg/jpg/png/mp3/mp4。
                    可上传的文件大学：小于9MB。
                    总共可以上传的文件数量：3个。
                </div>
            </template>
        </el-upload>
    </div>
</template>


<style scoped></style>