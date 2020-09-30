<template>
  <Layout>
    <el-card class="box-card" v-for="item in allStudyNews" :key="item.id">
      <div slot="header" class="clearfix">
        <span>{{item.node.updated_at | date}}</span>
      </div>
      <div  class="text item" v-html="getMD(item.node.content)"></div>
    </el-card>
  </Layout>
</template>

<page-query>
query{
  allStrapiStudyNew{
    edges{
      node{
        updated_at
      	content
        id
      }
    } 
  }
}
</page-query>

<script>
import MarkDownIt from 'markdown-it'
import tool from "../mixin/tool"
export default {
  metaInfo: {
    title: "clover 小飞侠",
  },
  mixins:[tool],
  computed:{
    allStudyNews(){
      return this.$page.allStrapiStudyNew.edges
    }
  },
  methods:{
    getMD(content){
      const md = new MarkDownIt()
      return md.render(content)
    }
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
