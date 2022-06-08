import React from 'react'
import { ConfigProvider, Layout, Menu } from 'antd'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import './App.css'

moment.locale('zh-cn')

const { Sider } = Layout

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="container">
        <Sider>
          
        </Sider>
        <Layout></Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App