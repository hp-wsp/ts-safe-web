import {mapGetters} from 'vuex';

export default {
  data: function () {
    return {
      filters:{
        biaoqian:'',
        zhuangtai:'',
        startNow:0,
        endNow:0
      },
      sels: [],
      addForm: {},
      addFormVisible: false,
      //编辑界面数据
      editForm: {},
      editFormVisible: false,
      //预览
      actObj:null,
      previewVisible:false
    }
  },
  created() {
  }
}
