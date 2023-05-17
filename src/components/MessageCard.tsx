import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Space, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

interface MessageCardProps {
  message: string
  imageSrc: string | null
}

const MessageCard: React.FC<MessageCardProps> = ({message, imageSrc}) => {
  return <Space
    style={{
      display: 'flex',
      justifyContent: 'flex-end',
      maxWidth: '80%',
      marginLeft: 'auto',
      alignItems: 'flex-end'
    }}
  >
    <Card
      bordered={false}
      style={{
        borderTopRightRadius: 0,
        backgroundColor: '#097BFD',
        width: 'fit-content'
      }}
      bodyStyle={{
        padding: 10
      }}
    >
      <Text style={{color: '#fff'}}>{message}</Text>
    </Card>
    <Avatar src={imageSrc} icon={<UserOutlined />} size={42}/>
  </Space>
}

export default MessageCard
