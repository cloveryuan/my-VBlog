export default {
    cutStr(str, len) {
        try {
            if (str.length > len) {
                return str.substring(0, len) + '...'
            }
            return str
        } catch (e) {
            return ""
        }
    },
    verifyEmail(str) {
        if (str == null || str == undefined) {
            return false
        }
        let reg = /^[0-9A-Za-z_]+@[0-9A-Za-z]+\.[A-Za-z]+/
        return reg.test(str)
    },
    //yyyy-MM-ddThh-mm-ss.*
    utcToLocal(time) {
        let formatNum = (num)=>{
            return num>=10?num:('0'+num)
        }
        let arr = time.split(/[^0-9]/)
        let worldDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
        let localDate = new Date(worldDate.getTime() + 8 * 60 * 60 * 1000)
        return formatNum(localDate.getFullYear()) + "-"
            + formatNum((localDate.getMonth() + 1)) + "-" 
            + formatNum(localDate.getDate()) + " " 
            + formatNum(localDate.getHours()) + ":" 
            + formatNum(localDate.getMinutes()) + ":" 
            + formatNum(localDate.getSeconds())
    },
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    },
    //s<=r<e
    randomInt(s, e) {
        let d = e - s
        if (d < 0) {
            return s
        }
        let r = Math.random() * d + s
        r = parseInt(r, 10)
        return r
    },
    fullScreen() {
        var element = document.documentElement
        if (window.ActiveXObject) {
            var WsShell = new ActiveXObject('WScript.Shell')
            WsShell.SendKeys('{F11}')
        } else if (element.requestFullScreen) {
            element.requestFullScreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
        }
    },
    fullExit() {
        var element = document.documentElement
        if (window.ActiveXObject) {
            var WsShell = new ActiveXObject('WScript.Shell')
            WsShell.SendKeys('{F11}')
        } else if (element.requestFullScreen) {
            document.exitFullscreen()
        } else if (element.msRequestFullscreen) {
            document.msExitFullscreen()
        } else if (element.webkitRequestFullScreen) {
            document.webkitCancelFullScreen()
        } else if (element.mozRequestFullScreen) {
            document.mozCancelFullScreen()
        }
    },

    parseHeaders(headers) {
        try {
            let linkArr = headers['link'].split(",")
            for (let i = 0; i < linkArr.length; i++) {
                let temp = linkArr[i]
                if (temp.indexOf("rel=\"last\"") < 0) {
                    continue
                }
                let paramArr = temp.split(/[\?&]/)
                for (let j = 0; j < paramArr.length; j++) {
                    let stemp = paramArr[j]
                    let kv = stemp.split("=")
                    if (kv[0] != "page") {
                        continue
                    }
                    return parseInt(kv[1])
                }
            }
        } catch (e) {

        }

        return 0
    },
    copy(message) {
        let doc = document.createElement("input")
        doc.value = message
        document.body.appendChild(doc)
        doc.select()
        let status
        try {
            status = document.execCommand('copy')
        } catch (e) { }
        document.body.removeChild(doc)
        return status
    },
    formatTime(time) {
        let it = parseInt(time)
        let m = parseInt(it / 60)
        let s = parseInt(it % 60)

        return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
    },
    getWindowSize() {
        let windowSize = {}
        windowSize.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth
        windowSize.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight
        return windowSize
    },
    addHttp(url){
        return (url.match(/https?:\/\//i)?'':'https://') + url
    },

    addQuillTitle () {
        const titleConfig = {
          'ql-bold': '加粗',
          'ql-color': '颜色',
          'ql-font': '字体',
          'ql-code': '插入代码',
          'ql-italic': '斜体',
          'ql-link': '添加链接',
          'ql-background': '背景颜色',
          'ql-size': '字体大小',
          'ql-strike': '删除线',
          'ql-script': '上标/下标',
          'ql-underline': '下划线',
          'ql-blockquote': '引用',
          'ql-header': '标题',
          'ql-indent': '缩进',
          'ql-list': '列表',
          'ql-align': '文本对齐',
          'ql-direction': '文本方向',
          'ql-code-block': '代码块',
          'ql-formula': '公式',
          'ql-image': '图片',
          'ql-video': '视频',
          'ql-clean': '清除字体样式'
        }
      
        const oToolBar = document.querySelector('.ql-toolbar'),
          aButton = oToolBar.querySelectorAll('button'),
          aSelect = oToolBar.querySelectorAll('select')
        aButton.forEach(function (item) {
          if (item.className === 'ql-script') {
            item.value === 'sub' ? item.title = '下标' : item.title = '上标'
          } else if (item.className === 'ql-indent') {
            item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进'
          } else {
            item.title = titleConfig[item.classList[0]]
          }
        })
        aSelect.forEach(function (item) {
          item.parentNode.title = titleConfig[item.classList[0]]
        })
      }

}