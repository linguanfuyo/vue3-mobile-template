import axios from 'axios'
import { CT } from '@/config/config'
import { Toast } from 'vant'
import router from '@/router'

// 创建 axios 实例 https://github.com/axios/axios
const request: any = axios.create({
  // prefix: '/assets', // 路径前缀
  timeout: CT.timeout // 请求超时时间
})

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队',
  204: '删除数据成功',
  400: '发出的请求有错误',
  401: '用户没有权限',
  403: '访问被禁止',
  404: '请求不存在！',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '发生一个验证错误',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
}

// 20019 20020 未登录，-10002 未注册, 40029 invalid code
const loginCode = [20019, 20020, -10002, 40029]

// 异常拦截处理器
const errorHandler = (error: any) => {
  if (error.response) {
    // const data = error.response.data
    const errorText = codeMessage[error.response.status]
    Toast(errorText)
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config: any) => {
  // 自定义全局header
  config.headers = config.headers ? config.headers : {}
  config.headers['Content-Type'] = 'application/json'
  // config.headers['authority-token'] = ''
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(async (response: any) => {
  try {
    const { config, data } = response
    if (config.showLoading) {
      // vm.$hideLoading()
    }
    console.log(response)
    if (loginCode.includes(data.code)) {
      Toast(data.message || '登录超时，请重新从工作台进入系统')
      localStorage.setItem('authority-token', '')
      router.replace('/login')
    } else if (data.code && data.code !== 200) {
      Toast({
        message: data.message || '请求错误！'
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    return response
  }
}, errorHandler)

export default request
