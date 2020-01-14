<template>
    <el-upload
            ref="uploadMoreImage"
            class="avatar-uploader"
            accept="image/png,image/gif,image/jpg,image/jpeg,image/svg"
            :http-request="handleUploadFile"
            list-type="picture-card"
            :action="upload_url"
            :limit="maxLimit"
            :file-list="imageUrls"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
    </el-upload>
</template>

<script>
    import storageHelper from '@/utils/storageHelper.js';

    export default {
        name: "UploadMoreImageCmm",
        data() {
            return {
                upload_url: '',
                imageUrls: []
            }
        },
        props: {
            wxImageList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            maxLimit: {
                type: Number,
                default: 6
            }
        },
        watch: {
            wxImageList(value) {
                let that = this;
                that.imageUrls = []
                value.forEach(function (item) {
                    that.imageUrls.push({
                        name: item,
                        url: that.$baseURL + '/comm/resource/' + item + '?token=' + storageHelper.get('token')
                    });
                });
            }
        },
        created() {
            let that = this;
            that.imageUrls = []
            this.wxImageList.forEach(function (item) {
                that.imageUrls.push({
                    name: item,
                    url: that.$baseURL + '/comm/resource/' + item + '?token=' + storageHelper.get('token')
                });
            });
        },
        methods: {
            handlePictureCardPreview: function () {

            },
            handleRemove(file, fileList) {
                let imgArray = [];
                fileList.forEach(function (item) {
                    imgArray.push(item.name);
                });
                this.$emit('update:wxImageList', imgArray);
            },
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

                    let imgArray = [...this.wxImageList];
                    imgArray.push(res.id)
                    this.$emit('update:wxImageList', imgArray);
                });

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

