// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports={
  // configureWebpack:{
  //   resolve:{
  //     path:false,
  //   }
  // },
  runtimeCompiler:true,
  pluginOptions:{
    electronBuilder:{
      builderOptions:{
        productName: "Client",
        appId: "sgcc.Client",
        copyright: "sgccClient@20221209",
        directories: {
          output: "dist_electron",
          buildResources: "build",
          app: "dist_electron/bundled"
        },
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true,
          shortcutName: "SGCC",
          createStartMenuShortcut: true
        },
        win:{
          target:"nsis",
        },
        publish: {
          provider: "generic",
          url: "http://127.0.0.1:4000/build_out"
        },
      }
    }
  }
}