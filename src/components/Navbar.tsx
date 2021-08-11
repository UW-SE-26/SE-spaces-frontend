import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import logo192 from '../assets/SE_Logo_192.png';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

function Navbar() {

  const [selected, setSelected] = useState <string[]>([])
  const handleClick = (e: any) => {
    setSelected([e.key])
  }

  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height: "56px", alignItems:"center", padding: "0 70px", borderBottom: "1px solid #F0F0F0", marginTop: "10px", boxShadow: "0 15px 20px rgba(158, 158, 158, 0.1)"}}>
      <Link to="/" onClick={handleClick}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}> 
          <img src={logo192} style={{width:"40px", paddingBottom: "10px"}} alt="UW SE Logo"/>
          <h1 style={{fontWeight: 700, fontSize: "14px", marginLeft: "10px"}}> Book<span style={{color: "#BB78FE"}}>Spaces</span></h1>
        </div>
      </Link>
      <div>
        <Menu mode="horizontal" onClick={handleClick} selectedKeys={selected} >

          <Menu.Item key="explore" style={{paddingBottom: "10px"}}>
            <Link to="/explore"> Explore Spaces </Link>
          </Menu.Item>
          
          <Menu.Item key="booked" style={{paddingBottom: "10px"}}>
            <Link to="/booked"> View Bookings </Link>
          </Menu.Item>

          <Menu.Item key="logOut" style={{paddingBottom: "10px"}}>
            Log Out
          </Menu.Item>
          
        </Menu>
      </div>
    </div>
  )
}

export default Navbar
