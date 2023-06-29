import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as Api  from '@/api/home'
import '@/icons' // icon
import '@/permission' // permission control
import '@/assets/iconfont/font.css'
import HintButton from '@/components/HintButton'
import JsonViewer from 'vue-json-viewer'
//  引入xml的格式化
import vkbeautify from 'vkbeautify';
// 引入xml的高亮
import hljs from 'highlight.js'
//样式文件，可选择node_modules-highlight.js-styles文件夹里其他高亮样式css
import 'highlight.js/styles/atom-one-dark.css'
 
 
Vue.directive('highlight',function(el){  //自定义指令
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    })
})

// 以插件的形式引入
Vue.use(JsonViewer)
// 或者注册组件
// components: {JsonViewer}



/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.component(HintButton.name,HintButton)
Vue.use(ElementUI)




Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$Api = Api,
    Vue.prototype.$vkbeautify = vkbeautify;

  }
})
