// const{contextBridge,ipcRenderer}=require("electron")
// const electron = require('electron');
window.ipcRenderer = require('electron').ipcRenderer;
console.log(window.ipcRenderer)
window.remote = require('electron').remote;

window.ipcRenderer.on('message',(event,arg)=>{
    console.log(event)
    console.log(arg)
})

// const test=()=>{
//     ipcRenderer.invoke("test")
// }

// const updateMounted=()=>{
//     console.log(456)
//     ipcRenderer.on('message',(event,Message)=>{
//         console.log(Message)
//     })
// }

// const updateProcess=()=>{
//     console.log(456)
//     ipcRenderer.on('downloadProgress',(event,Message)=>{
//         console.log(Message)
//     })
// }
// contextBridge.exposeInMainWorld('zyt',{
//     test,
//     // updateMounted,
//     // updateProcess
// })