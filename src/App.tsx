import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import Login from './pages/Login'
import Statistics from './pages/Statistics'
import UserList from './pages/UserList'
import { hasToken } from './utils'

/**
 * 路由保护组件
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'

  if (isAuthPage) {
    return <>{children}</>
  }

  if (!hasToken()) {
    return <Navigate to="/login" replace />
  }

  return <Layout>{children}</Layout>
}

function App() {
  const { i18n } = useTranslation()

  const getAntdLocale = () => {
    const lang = i18n.language || 'zh-CN'
    if (lang.startsWith('zh-CN')) return zhCN
    return zhCN
  }

  return (
    <ConfigProvider locale={getAntdLocale()}>
      <BrowserRouter>
        <Routes>
          {/* 公开路由 */}
          <Route path="/login" element={<Login />} />

          {/* 受保护的路由 */}
          <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />

          {/* 默认重定向 */}
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
