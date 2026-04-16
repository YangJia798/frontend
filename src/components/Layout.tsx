import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu, Drawer, Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import {
  TeamOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { ReactNode } from 'react'
import { removeToken } from '../utils'

const { Header, Content, Sider } = AntLayout

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getSelectedKeys = (): string[] => {
    return [location.pathname]
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: t('menu.users') || '用户管理'
    },
    {
      key: '/statistics',
      icon: <BarChartOutlined />,
      label: t('menu.statistics') || '统计信息'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('menu.logout') || '退出登录'
    }
  ]

  const handleLogout = () => {
    removeToken()
    navigate('/login', { replace: true })
  }

  const handleLogoutConfirm = () => {
    Modal.confirm({
      title: t('menu.logoutConfirm') || '确认退出',
      content: t('menu.logoutConfirmDesc') || '确定要退出登录吗？',
      okText: t('common.confirm') || '确定',
      cancelText: t('common.cancel') || '取消',
      onOk: () => {
        handleLogout()
        if (isMobile) {
          setMobileMenuOpen(false)
        }
      }
    })
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      handleLogoutConfirm()
      return
    }
    navigate(key)
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  if (isMobile) {
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <Header style={{
          background: '#001529',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/signalx-logo.svg" alt="logo" style={{ width: 28, height: 28 }} />
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>SignalxAdmin</span>
          </div>
          <Button
            type="text"
            icon={<MenuOutlined />}
            style={{ color: '#fff' }}
            onClick={() => setMobileMenuOpen(true)}
          />
        </Header>
        <Content style={{
          padding: '12px 8px',
          background: '#f0f2f5',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </Content>
        <Drawer
          title="导航"
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ border: 'none' }}
          />
        </Drawer>
      </AntLayout>
    )
  }

  return (
    <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider
        width={200}
        style={{
          background: '#001529',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <img src="/signalx-logo.svg" alt="logo" style={{ width: 32, height: 32, flexShrink: 0 }} />
          <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>SignalxAdmin</span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            height: 'calc(100vh - 61px)',
            borderRight: 0,
            overflowY: 'auto'
          }}
        />
      </Sider>
      <AntLayout style={{ marginLeft: 200, height: '100vh' }}>
        <Content style={{
          padding: '24px',
          background: '#f0f2f5',
          height: '100vh',
          overflowY: 'auto'
        }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
