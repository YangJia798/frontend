import { useState } from 'react'
import { Card, Table, Button, Space, Tag, Popconfirm, message, Typography, Modal, Form, Input } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

const { Title } = Typography

interface User {
  id: number
  username: string
  isDefault: boolean
  createdAt: number
  updatedAt: number
}

const initialUsers: User[] = [
  { id: 1, username: 'admin', isDefault: true, createdAt: 1700000000000, updatedAt: 1700000000000 },
  { id: 2, username: 'user1', isDefault: false, createdAt: 1701000000000, updatedAt: 1701000000000 },
  { id: 3, username: 'user2', isDefault: false, createdAt: 1702000000000, updatedAt: 1702000000000 },
]

const UserList: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false)
  const [updateOwnPasswordModalVisible, setUpdateOwnPasswordModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [createForm] = Form.useForm()
  const [updatePasswordForm] = Form.useForm()
  const [updateOwnPasswordForm] = Form.useForm()
  const [nextId, setNextId] = useState(4)

  const handleCreate = (values: { username: string; password: string }) => {
    const newUser: User = {
      id: nextId,
      username: values.username,
      isDefault: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    setUsers(prev => [...prev, newUser])
    setNextId(prev => prev + 1)
    message.success('创建用户成功')
    setCreateModalVisible(false)
    createForm.resetFields()
  }

  const handleUpdatePassword = (_values: { newPassword: string }) => {
    message.success('修改密码成功')
    setUpdatePasswordModalVisible(false)
    setSelectedUser(null)
    updatePasswordForm.resetFields()
  }

  const handleUpdateOwnPassword = (_values: { newPassword: string }) => {
    message.success('修改密码成功')
    setUpdateOwnPasswordModalVisible(false)
    updateOwnPasswordForm.resetFields()
  }

  const handleDelete = (user: User) => {
    setUsers(prev => prev.filter(u => u.id !== user.id))
    message.success('删除用户成功')
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: t('userList.username') || '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: t('userList.role') || '角色',
      dataIndex: 'isDefault',
      key: 'isDefault',
      width: 120,
      render: (isDefault: boolean) => (
        <Tag color={isDefault ? 'red' : 'blue'}>
          {isDefault ? t('userList.defaultAccount') || '默认账户' : t('userList.normalUser') || '普通用户'}
        </Tag>
      )
    },
    {
      title: t('common.createdAt') || '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (timestamp: number) => new Date(timestamp).toLocaleString(i18n.language || 'zh-CN')
    },
    {
      title: t('common.actions') || '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: User) => {
        if (record.isDefault) return null
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedUser(record)
                setUpdatePasswordModalVisible(true)
              }}
            >
              {t('userList.updatePassword') || '修改密码'}
            </Button>
            <Popconfirm
              title={t('userList.deleteConfirm') || '确定要删除这个用户吗？'}
              onConfirm={() => handleDelete(record)}
              okText={t('common.confirm') || '确定'}
              cancelText={t('common.cancel') || '取消'}
            >
              <Button type="link" danger size="small" icon={<DeleteOutlined />}>
                {t('common.delete') || '删除'}
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>{t('userList.title') || '用户管理'}</Title>
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => setUpdateOwnPasswordModalVisible(true)}
            >
              {t('userList.updateMyPassword') || '修改我的密码'}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              {t('userList.addUser') || '新增用户'}
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            pageSize: isMobile ? 10 : 20,
            showSizeChanger: !isMobile,
            showTotal: (total) => `共 ${total} 条`
          }}
          scroll={isMobile ? { x: 600 } : undefined}
        />
      </Card>

      {/* 创建用户弹窗 */}
      <Modal
        title={t('userList.addUser') || '新增用户'}
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false)
          createForm.resetFields()
        }}
        onOk={() => createForm.submit()}
        okText={t('userList.createUser') || '创建'}
        cancelText={t('common.cancel') || '取消'}
      >
        <Form form={createForm} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="username"
            label={t('userList.username') || '用户名'}
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('userList.password') || '密码'}
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password placeholder="至少6位" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 修改其他用户密码弹窗 */}
      <Modal
        title={`修改 ${selectedUser?.username} 的密码`}
        open={updatePasswordModalVisible}
        onCancel={() => {
          setUpdatePasswordModalVisible(false)
          setSelectedUser(null)
          updatePasswordForm.resetFields()
        }}
        onOk={() => updatePasswordForm.submit()}
        okText={t('common.confirm') || '确定'}
        cancelText={t('common.cancel') || '取消'}
      >
        <Form form={updatePasswordForm} onFinish={handleUpdatePassword} layout="vertical">
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password placeholder="至少6位" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 修改我的密码弹窗 */}
      <Modal
        title={t('userList.updateMyPasswordTitle') || '修改我的密码'}
        open={updateOwnPasswordModalVisible}
        onCancel={() => {
          setUpdateOwnPasswordModalVisible(false)
          updateOwnPasswordForm.resetFields()
        }}
        onOk={() => updateOwnPasswordForm.submit()}
        okText={t('common.confirm') || '确定'}
        cancelText={t('common.cancel') || '取消'}
      >
        <Form form={updateOwnPasswordForm} onFinish={handleUpdateOwnPassword} layout="vertical">
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password placeholder="至少6位" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserList
