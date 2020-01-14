<template>
    <div>
        <el-date-picker
                v-model="dateRange"
                style="width: 100%"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
                :picker-options="pickerOptions"
                @change="handleDataChange"/>
    </div>
</template>

<script>
    export default {
        name: 'DataPickerCmm',
        props: {
            wxStartData: {
                type: String,
                default: ''
            },
            wxEndData: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                dateRange: []
            }
        },
        watch: {
            wxStartData(val) {
                this.updateTime(val, this.wxEndData);
            },
            wxEndData(val) {
                this.updateTime(this.wxStartData, val);
            }
        },
        created() {
            this.updateTime(this.wxStartData, this.wxEndData);
        },
        methods: {
            updateTime(sDate, eDate) {
                if (sDate && eDate) {
                    this.dateRange = [sDate, eDate];
                }
            },
            handleDataChange(e) {
                console.log(e);
                if (e && e.length > 1) {
                    this.$emit('update:wxStartData', e[0]);
                    this.$emit('update:wxEndData', e[1]);
                }
            }
        }
    }
</script>

<style scoped>

</style>
