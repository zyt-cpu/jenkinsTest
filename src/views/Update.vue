<template>
    <div class="systemExample width100 height100">
         <main>
             <div class="right-side">
                 <div class="doc">
                     <div class="title alt">您可以点击的按钮测试功能</div>
                     <el-button type="primary" round @click="CheckUpdate()">检查更新, 不可用于开发环境</el-button>
                     <div>测试成功</div>
                 </div>
             </div>
         </main>
         <el-dialog
                 title="下载进度"
                 :visible.sync="dialogVisible"
                 :show-close="true"
                 :close-on-press-escape="false"
                 :close-on-click-modal="false"
                 center
                 width="50%"
                 top="45vh">
             <div class="conten">
                 <el-progress :percentage="percentage" ></el-progress>
             </div>
             <el-button @click="add()">+</el-button>
         </el-dialog>
         <el-dialog
                 title="下载进度"
                 :visible.sync="updateConfirm"
                 :show-close="true"
                 :close-on-press-escape="false"
                 :close-on-click-modal="false"
                 center
                 width="50%"
                 top="45vh">
             <el-button @click="update()">update</el-button>
             <el-button @click="cancel()">cancel</el-button>
         </el-dialog>
     </div>
  </template>
  <script>
  const ipcRenderer=window.ipcRenderer
  export default {
      name: "index",
      data() {
        return {
          percentage: 0,
          dialogVisible:false,
          updateConfirm:false,
        };
      },
      created () {
        // console.log(window.ipcRenderer)
        ipcRenderer.on('message',(event,arg)=>{
          if(arg.status==0)
          {
            console.log('checking')
          }else if(arg.status==1){
            console.log('yes')
          }else if(arg.status==2){
            console.log('no')
          }
          console.log(arg);
          console.log(event)
        })
        ipcRenderer.on('downloadProgress',(event,arg)=>{
          console.log(arg);
          console.log(event)
        }),
        ipcRenderer.on('update-downloaded',(event,arg)=>{
          this.updateConfirm=true;
          console.log(arg);
          console.log(event);
        })
      // console.log(ipcRenderer);
      // console.log(window.ipcRenderer)
      //   ipcRenderer.send('message','123')
      },
      mounted(){
        // zyt.updateProcess();
      },
      methods: {
        CheckUpdate(){
          this.dialogVisible=true
          // zyt.test()
        },
        add(){
          // if(this.percentage<200){this.percentage++;}
        },
        update(){
          // ipcRenderer.send('isUpdateNow');
          this.updateConfirm=false;
        },
        cancel(){
          this.updateConfirm=false;
        }
      }
    }
  </script>
  
  <style>
  .update {
    padding: 10px;
  }
  </style>
    