import { Card, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

const { Title } = Typography

interface User {
  id: number
  username: string
  isDefault: boolean
  createdAt: number
}

const users: User[] = [
  { id: 1, username: 'admin', isDefault: true, createdAt: 1700000000000 },
]

const UserList = () => {
  const { t, i18n } = useTranslation()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: t('userList.username') || 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('userList.role') || 'Role',
      dataIndex: 'isDefault',
      key: 'isDefault',
      width: 120,
      render: (isDefault: boolean) => (
        <Tag color={isDefault ? 'red' : 'blue'}>
          {isDefault ? t('userList.defaultAccount') || 'Default account' : t('userList.normalUser') || 'Normal user'}
        </Tag>
      ),
    },
    {
      title: t('common.createdAt') || 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (timestamp: number) => new Date(timestamp).toLocaleString(i18n.language || 'zh-CN'),
    },
  ]

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>
            {t('userList.title') || 'User management'}
          </Title>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            pageSize: isMobile ? 10 : 20,
            showSizeChanger: !isMobile,
            showTotal: (total) => `Total ${total}`,
          }}
          scroll={isMobile ? { x: 600 } : undefined}
        />
      </Card>
    </div>
  )
}

export default UserList
