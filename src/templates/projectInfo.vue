<template>
  <Layout>
    <el-card shadow="hover" style="margin-bottom: 20px">
      <h1 style="text-align:center;">
        <a :href="$page.post.href">{{ $page.post.title }}</a>
      </h1>
      <p style="text-align:right;font-size:14px;" >
        project by
        <a href="https://github.com/cloveryuan" target="_bank" style="margin-right: 6px">{{$page.post.created_by.firstname + $page.post.created_by.lastname }}</a>
        on {{ $page.post.created_at | date }}
      </p
      >
      <div v-html="getMD($page.post.description)"></div>
    </el-card>
  </Layout>
</template>

<page-query>
query($id:ID!){
  post:strapiProjectList(id: $id) {
    id
    title
    description
    href
    created_at
    created_by {
      id
      firstname
      lastname
    }
  }
}
</page-query>


<script>
import tool from "../mixin/tool";
import MarkDownIt from "markdown-it";
export default {
  name: "postjectInfoPage",
  mixins: [tool],
  data() {
    return {};
  },
  computed: {
    postInfo() {
      return this.$page.post;
    },
  },
  methods: {
    getMD(content) {
      const md = new MarkDownIt();
      return md.render(content);
    },
  },
};
</script>

<style scoped>
</style>
