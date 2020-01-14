<template>
    <el-upload
            ref="uploadSingleImage"
            class="avatar-uploader"
            accept="image/png,image/gif,image/jpg,image/jpeg,image/svg"
            :http-request="handleUploadFile"
            :action="upload_url"
            :show-file-list="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import storageHelper from '@/utils/storageHelper.js';

    export default {
        name: "UploadSingleImageCmm",
        data() {
            return {
                upload_url: '',
                imageUrl: ''
            }
        },
        props: {
            wxImageUrl: {
                type: String,
                default: ''
            }
        },
        watch: {
            wxImageUrl(value) {
                this.imageUrl = this.$baseURL + '/comm/resource/' + value + '?token=' + storageHelper.get('token');
            }
        },
        created() {
            this.imageUrl = this.$baseURL + '/comm/resource/' + this.wxImageUrl + '?token=' + storageHelper.get('token');
        },
        methods: {
            handleUploadFile(params) {
                const isLt2M = params.file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error("请上传10M以下的图片文件");
                    return false;
                }
                // 根据后台需求数据格式
                const form = new FormData();
                form.append("file", params.file);
                // 文件对象
                this.$store.dispatch('uploadResource', form).then((res) => {
                    this.imageUrl = this.$baseURL + '/comm/resource/' + res.id + '?token=' + storageHelper.get('token');
                    this.$emit('update:wxImageUrl', res.id);
                });

                this.imageUrl = URL.createObjectURL(params.file);
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 30px;
        border: 1px dashed #8c939d;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        text-align: center;
    }

    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }
</style>

