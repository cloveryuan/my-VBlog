// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: '四叶草',
  titleTemplate:'四叶草',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['menu','study-new','about-list','project-list','tag'],//后面在strapi上建的集合
        singleTypes: ['configguration'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '',
          password: ''
        }
      }
    }
  ],
  templates:{
    // StrapiProjectList为上面Plugin中配置的typeName和contentTypes的组合
    StrapiProjectList: [
      {
        path: '/project/:id',
        component: './src/templates/projectInfo.vue'
      }
    ],
  }
}
