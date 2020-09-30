<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" >
        <el-menu-item
          v-for="item in constantRouterMap"
          :key="item.node.path"
          :index="item.node.path"
        >
          <g-link :to="item.node.path?'/'+item.node.path:'/'">
            <i :class="item.node.meta.icon"></i>
            {{item.node.path}}防护乳
            <span slot="title">{{ item.node.meta.title }}</span>
          </g-link>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<static-query>
query{
  allStrapiMenu{
    edges{
      node{
        path
        meta{
          title
          icon
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  data(){
    return {
      active: ""
    }
  },
  computed:{
    constantRouterMap(){
      return this.$static.allStrapiMenu.edges
    }
  },
  mounted() {
    let arr = this.$route.path.split("/")
    this.active = "/" + arr[1] + "/" + arr[2]
  }
}
</script>
<style scoped>
  .el-menu-item a:not(.active--exact){
    color:#303133;
  }
</style>