import React from 'react'
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import logo192 from '../assets/SE_Logo_192.png';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

function Navbar() {
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"72px", alignItems:"center"}}>
      <div>
        <img src={logo192} style={{width:"50px"}}/>
      </div>
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <Menu.Item key="nice" icon={<SettingOutlined />}>
            Navigation Two
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar
