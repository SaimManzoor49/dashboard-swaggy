'use client'
import React from 'react';
import { LaptopOutlined, NotificationOutlined, PlusOutlined, ProductFilled, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Content, Sider } = Layout;



const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

// const items2: MenuProps['items'] = [{icon:UserOutlined,label:'Products'}, LaptopOutlined, NotificationOutlined].map(
//   (i, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(i.icon),
//       label: `subnav ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );

const App = ({children}:{children:React.ReactNode}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter()


  

const navs:MenuProps['items'] = [
    {
        key:'1',
        icon:React.createElement(ProductFilled),
        label:'Products',
        children:[
            {
                key:'1.1',
        icon:React.createElement(PlusOutlined),
        label:'Add Product',
        onClick:()=>{
            router.push('/addProduct')
        }
            }
        ],
    },
    {
        key:'2',
        icon:React.createElement(LaptopOutlined),
        label:'Category',
        children:[
            {
                key:'2.1',
        icon:React.createElement(PlusOutlined),
        label:'Add Category',
        onClick:()=>{
            router.push('/addCategory')
        }
            }
        ],
    },
    {
        key:'3',
        icon:React.createElement(NotificationOutlined),
        label:'Stats',
        children:[],
    },
]


// console.log(items2,navs)
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={navs}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              marginTop: 12,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;