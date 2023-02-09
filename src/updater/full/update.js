const{ autoUpdater } =require ("electron-updater")
const { ipcMain } =require( "electron")
const log =require('electron-log')

//electron-log5.0.0-beta.16.的有点问题，报引入不正确的错误，4.4.8没问题

let mainWindow = null;
// 更新
function handleUpdate(window,feedUrl){
  mainWindow=window
  // console.log(__dirname)
  log.info(feedUrl)
  console.log(mainWindow)
  const returnData = {
    error: { status: -1, msg: '检测更新查询异常' },
    checking: { status: 0, msg: '正在检查应用程序更新' },
    updateAva: { status: 1, msg: '检测到新版本，正在下载，请稍后' },
    updateNotAva: { status: -1, msg: '您现在使用的版本为最新版本，无需更新!' },
    updateConfirm:{statue:2,msg:'下载完成，可以更新'}
  }

  autoUpdater.setFeedURL(feedUrl)
  autoUpdater.getFeedURL();

  // 更新错误
  autoUpdater.on('error',function(error){
    console.log("error")
    log.info(error)
    sendUpdateMessage(returnData.error)
  })

  // 检查中
  autoUpdater.on('checking-for-update',function(){
    console.log("checking-for-update")
    log.info("checking-for-update")
    sendUpdateMessage(returnData.checking)
  })

  // 发现新版本
  autoUpdater.on('update-available',function(info){
    console.log("update-available")
    log.info('update-available')
    sendUpdateMessage(returnData.updateAva)
  })


  // 当前版本为最新版
  autoUpdater.on('update-not-available',function(info){
    console.log("update-not-available")
    log.info("update-not-available")
    sendUpdateMessage(returnData.updateNotAva)
  })


  // 正在更新下载，返回进度
  autoUpdater.on('download-progress', function(progressObj){
    console.log("download-process")
    console.log(progressObj)
    log.info("download-process")
    log.info(progressObj)
    mainWindow.webContents.send('downloadProgress', progressObj)
  })


  // 下载完成，给主进程绑定isUpdateNow 事件，用户选择安装可以(调用isUpdateNow方法)
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    mainWindow.webContents.send('update-downloaded',returnData.updateConfirm)
    ipcMain.on('isUpdateNow', (e, arg) => {
      //autoUpdater.quitAndInstall()方法，可实现立即关闭程序并安装
      autoUpdater.quitAndInstall();
    });
  })


  // 执行更新检查，将执行上边你的各项更新配置
  autoUpdater.checkForUpdates()
  // 应用在关闭后自动安装（默认是false）
  autoUpdater.autoInstallOnAppQuit = true

  // ipcMain.on('checkForUpdate',(e,arg)=>{
  //   if(arg){
  //     autoUpdater.autoDownload = true;
  //   }
  //   autoUpdater.checkForUpdates();
  // })
}


// 发送给renderer进行，更新状态
function sendUpdateMessage(text){
  log.info(text)
  mainWindow.webContents.send('message',text)
}


module.exports = handleUpdate ;
