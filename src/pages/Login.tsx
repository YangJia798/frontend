import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { setToken } from '../utils'
import { useMediaQuery } from 'react-responsive'

const { Title } = Typography

const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true)
    // 纯前端验证，不请求后端接口
    setTimeout(() => {
      try {
        if (values.username === 'admin' && values.password === 'admin') {
          const token = 'frontend_mock_token_for_admin'
          setToken(token)
          message.success(t('message.loginSuccess'))
          // 跳转到首页
          navigate('/')
        } else {
          message.error(t('message.loginFailed') || '用户名或密码错误')
        }
      } catch (error) {
        console.error('登录失败:', error)
        message.error(t('message.loginFailed'))
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: isMobile ? '20px' : '40px',
      background: '#f0f2f5'
    }}>
      <Card
        style={{
          width: isMobile ? '100%' : '400px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          {t('login.title')}
        </Title>
        <Form
          form={form}
          onFinish={handleLogin}
          layout="vertical"
          size={isMobile ? 'large' : 'middle'}
        >
          <Form.Item
            name="username"
            label={t('login.username')}
            rules={[
              { required: true, message: t('login.usernameRequired') }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t('login.usernamePlaceholder')}
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('login.password')}
            rules={[
              { required: true, message: t('login.passwordRequired') }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('login.passwordPlaceholder')}
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size={isMobile ? 'large' : 'middle'}
            >
              {t('login.title')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
