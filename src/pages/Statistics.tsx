import { Card, Row, Col, Statistic, Typography } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

const mockStats = {
  totalOrders: 1248,
  totalPnl: '5678.90',
  winRate: '62.5',
  avgPnl: '4.55',
  maxProfit: '892.30',
  maxLoss: '-234.50'
}

const Statistics: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Title level={2} style={{ margin: 0 }}>{t('statistics.title') || '统计信息'}</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('statistics.totalOrders') || '总订单数'}
              value={mockStats.totalOrders.toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('statistics.totalPnl') || '总盈亏'}
              value={parseFloat(mockStats.totalPnl).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix="USDC"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('statistics.winRate') || '胜率'}
              value={mockStats.winRate}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('statistics.avgPnl') || '平均盈亏'}
              value={parseFloat(mockStats.avgPnl).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix="USDC"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('statistics.maxProfit') || '最大盈利'}
              value={parseFloat(mockStats.maxProfit).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix="USDC"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('statistics.maxLoss') || '最大亏损'}
              value={parseFloat(mockStats.maxLoss).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              prefix={<ArrowDownOutlined />}
              valueStyle={{ color: '#cf1322' }}
              suffix="USDC"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Statistics
