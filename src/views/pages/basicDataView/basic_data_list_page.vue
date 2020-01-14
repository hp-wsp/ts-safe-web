<template>
    <div>

        <div style="display: flex;justify-content: space-between;background: #ffffff;height: 60px;line-height: 60px;font-size: 16px;font-weight: bold">
            <div style="display: flex">
                <div class="wxmenu" :class="(wmenu==='speIndustryMenu')?'wxmenu_active':''"
                     @click="gotoMenu('speIndustryMenu')">
                    特种行业
                </div>
                <div class="wxmenu" :class="(wmenu==='superviseMenu')?'wxmenu_active':''"
                     @click="gotoMenu('superviseMenu')">
                    监管分类
                </div>
                <div class="wxmenu" :class="(wmenu==='rishChemicalMenu')?'wxmenu_active':''"
                     @click="gotoMenu('rishChemicalMenu')">
                    危化品目录
                </div>
            </div>
        </div>

        <speIndustry-list-cmm v-if="wmenu==='speIndustryMenu'"></speIndustry-list-cmm>
        <supervise-list-cmm v-if="wmenu==='superviseMenu'"></supervise-list-cmm>
        <rishChemical-list-cmm v-if="wmenu==='rishChemicalMenu'"></rishChemical-list-cmm>
    </div>
</template>

<script>
    import basic_data_list_page_bus from './basic_data_list_page_bus.js'

    export default basic_data_list_page_bus

</script>
<style scoped>

</style>
