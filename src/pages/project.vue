<template>
  <Layout>
    <el-card
      shadow="hover"
      v-for="item in list"
      :key="item.id"
      style="margin-bottom: 20px"
    >
      <div slot="header">
        <el-row>
          <el-col :span="16">
            <span>
              <i class="el-icon-service"></i>&nbsp;&nbsp; {{ item.node.title }}
            </span>
          </el-col>
          <el-col :span="8">
            <div style="text-align: right">
              <g-link
                style="padding: 3px 0"
                :to="'/project/' + item.node.id"
                icon="el-icon-back"
                >前往详情</g-link
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        最近更新 {{ item.node.created_at | date }}
      </div>
      <div
        style="
          font-size: 1.1rem;
          line-height: 1.5;
          color: #303133;
          padding: 10px 0px 0px 0px;
        "
      >
        {{ item.node.description }}
      </div>
      <el-col :span="24" style="text-align: right;padding:20px 0 20px 20px;">
        <el-tag size="small" v-for="(tag,i) in item.node.tags" :key="i">{{tag.title}}</el-tag>
      </el-col>
    </el-card>
  </Layout>
</template>

<page-query>
query{
  allStrapiProjectList{
    edges{
      node{
        title
        id
        description
        created_at
        updated_at
        tags {
          title
          id
        }
      }
    } 
  }
}
</page-query>

<script>
import tool from "../mixin/tool";
export default {
  name: "projectpage",
  mixins: [tool],
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$page.allStrapiProjectList.edges;
    },
  },
  mounted() {},
  components: {},
  methods: {},
};
</script>

<style scoped>
</style>
