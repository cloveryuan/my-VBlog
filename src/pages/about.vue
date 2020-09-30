<template>
  <Layout class="about">
    <el-tabs v-model="activeName">
    <el-tab-pane label="留下脚印" name="first">
      <div v-for="item in list" :key="item.node.id" class="wrap">
        <div class="tit">
          <h3>{{item.node.title}}</h3>
          <p class="time">{{item.node.updated_at | date}}</p>
        </div>
        <p v-html="item.node.content"></p>
       <p class="name">{{item.node.name}}</p>
      </div>
      <Pager :info="$page.allStrapiAboutList.pageInfo" />
    </el-tab-pane>
    <el-tab-pane label="编辑脚印" name="second">
      <el-form ref="form" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <quill-editor 
            v-model="form.content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" 
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor> -->
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.content">
          </el-input>
        </el-form-item>
      </el-form>
      <p style="position:absolute;top:-80px;right:0;">
        <el-button type="primary" @click="createAbout">提交</el-button>
      </p>
    </el-tab-pane>
  </el-tabs>
  </Layout>
</template>

<page-query>
query($page:Int){
  allStrapiAboutList(perPage: 8, page: $page) @paginate {
    pageInfo{
       totalPages
      currentPage
    }
    edges{
      node{
        title
        id
        name
        content
        created_at
        updated_at
        
      }
    } 
  }
}
</page-query>

<script>
import tool from "../mixin/tool"
import { Pager } from 'gridsome'
// import { quillEditor } from "vue-quill-editor"
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import axios from "axios"
export default {
  name: 'aboutpage',
  data () {
    return {
      activeName: 'first',
      form:{
        name:'',
        title:'',
         content: '',
      },
      rules:{
        name: [
          { required: true, message: '请输入用户名或者昵称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入脚印标题名', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
      },
      editorOption: {}
    }
  },
  mixins:[tool],
  computed: {
    list(){
      return this.$page.allStrapiAboutList.edges
    }
  },
  components: {
    Pager,
    // quillEditor
  },
  mounted(){
    // this.$nextTick(()=>this.$util.addQuillTitle())
  },
  methods: {
    onEditorReady(editor) { // 准备编辑器
 
    },
    onEditorBlur(){
      this.$refs.form.validateField('content')
    }, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件
    createAbout(){
      this.$refs.form.validate( async (valid)=>{
        if(valid){
          try{
            const {data} = await axios({
              method: 'POST',
              url: this.GRIDSOME_API_URL + '/about-lists',
              data: this.form
            })
            this.$message.success('发送成功，因为是静态博客，自动部署后才会更新数据');
          }catch(e){
            this.$message.error('发送失败，请稍后重试');
          }
        }
      })
    }
  },
}
</script>

<style>
.wrap{
  border-bottom:1px solid #ccc;
}
.wrap .tit{
  display: flex;
  justify-content: space-between;
  align-items:center;
}
.wrap .name{
  color:#999;
  text-align:right;
   font-size:12px;
}
.wrap .time{
  color:#ccc;
  font-size:14px;
}
.about .el-tabs__content{
  overflow: inherit;
}
.about #pane-first nav{
  text-align:right;
}
.about #pane-first nav>a{
 padding-right: 6px;
}
</style>
