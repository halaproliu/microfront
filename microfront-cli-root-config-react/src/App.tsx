import React, { FC } from 'react'
import { ConfigProvider, Layout, Menu } from 'antd'
import {
  LinkOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN'
// import Routers from '@/Routes'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './App.css'

moment.locale('zh-cn')

const { Sider, Content } = Layout

const menus = [{
  label: <Link to="/vue">vue</Link>,
  key: '/vue',
  icon: <LinkOutlined />
}, {
  label: <Link to="/vue2">vue2</Link>,
  key: '/vue2'
}, {
  label: <Link to="/react">react</Link>,
  key: '/react'
}]

const defaultSelectedKeys = ['/vue']

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="container">
        <Sider className="sider">
          <Menu theme="dark" defaultSelectedKeys={defaultSelectedKeys} style={{ height: '100%', background: '#001529', color: '#fff' }} items={menus}></Menu>
        </Sider>
        <Layout>
          <Content>
            <div id="singleVue"></div>
            <div id="singleVue2"></div>
            <div id="singleReact"></div>
            {/* <Routes>
              <Route path="/vue">
                <div id="singleVue"></div>
              </Route>
              <Route path="/vue2">
                <div id="singleVue2"></div>
              </Route>
              <Route path="/react">
                <div id="singleReact"></div>
              </Route>
            </Routes> */}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
