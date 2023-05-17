import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Space, Spin, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

interface MessageCardProps {
  message: string
  isLoading?: boolean
}

const AnswerMessageCard: React.FC<MessageCardProps> = ({message, isLoading}) => {
  return <Space
    style={{
      display: 'flex',
      maxWidth: '80%',
      alignItems: 'flex-end'
    }}
  >
    <Avatar icon={<UserOutlined />} size={42}/>
    <Card
      bordered={false}
      style={{
        borderTopLeftRadius: 0,
        backgroundColor: '#f3f3f5',
        width: 'fit-content'
      }}
      bodyStyle={{
        padding: 10
      }}
    >
      {isLoading == null 
        ? <Space
            direction='vertical'
          >
            {message.split('\n').map((paragraph, index) => <Text key={index}>{paragraph}</Text>)}
          </Space>
        : <Spin/>
      }
    </Card>
  </Space>
}

export default AnswerMessageCard
