<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active">
        <el-menu-item
          v-for="item in routerMap"
          :key="item.path"
          :index="item.path"
        >
          <g-link :to="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </g-link>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
      routerMap: [
        {
          id: 0,
          path: "/",
          meta: {
            title: "最新动态",
            icon: "el-icon-star-off",
          },
        },
        {
          id: 1,
          path: "/about",
          meta: {
            title: "社交圈",
            icon: "el-icon-mobile-phone",
          },
        },
        {
          id: 2,
          path: "/list",
          meta: {
            title: "博客列表",
            icon: "el-icon-edit-outline",
          },
        },
        {
          id: 3,
          path: "/project",
          meta: {
            title: "开源项目",
            icon: "el-icon-service",
          },
        },
      ],
    };
  },
  mounted() {
    let arr = this.$route.path.split("/");
    this.active = "/" + arr[1] + "/" + arr[2] ;
  },
};
</script>
<style scoped>
.el-menu-item a:not(.active--exact) {
  color: #303133;
}
</style>