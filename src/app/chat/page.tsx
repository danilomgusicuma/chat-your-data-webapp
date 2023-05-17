'use client'
import React, { useEffect, useState } from 'react'
import { Button, Layout, Space, Typography, notification } from 'antd'
import MessageCard from '@/components/MessageCard'
import { Content, Footer } from 'antd/es/layout/layout'
import ChatInput from '@/components/ChatInput'
import AnswerMessageCard from '@/components/AnswerMessageCard'
import { useSession } from 'next-auth/react'
import { ChatResponse } from '@/models/ChatResponse'
import { useRouter } from 'next/navigation'

const URL = `ws://localhost:8088/completion`

const {Title, Text} = Typography

const ChatPage: React.FC = () => {
  const { data: session } = useSession()
  const [text, setText] = useState<string>('')
  const [webSocket, setWebSocket] = useState<WebSocket|null>(null)
  const [chat, setChat] = useState<ChatResponse[]>([])
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false)
  const router = useRouter()

  const openNotification = () => {
    notification.info({
      message: `Unable to connect to server`,
      description:<Space direction='vertical'>
        <Text>Please, realod the page</Text>
        <Button onClick={() => router.refresh()}>Reload</Button>
      </Space>,
      placement: 'top'
    })
  }

  const onMessage = (message: MessageEvent<string>) => {
    const { data } = message
    const parsedMessage: ChatResponse = JSON.parse(data)
    if(parsedMessage.type === 'start') {
      setIsChatLoading(true)
    } else if(parsedMessage.type === 'stream') {
      setIsChatLoading(false)
    }
    setChat((prevState) => [...prevState, parsedMessage])
  }

  const mergeStream = (chat: ChatResponse[]) => {
    const chatCopy = []
    let mergedStream = ''
    chat.forEach(response => {
      if(response.sender === 'you') {
        chatCopy.push(response)
      } else if(response.type === 'stream') {
        mergedStream = mergedStream + response.message
      } else if(response.type === 'end') {
        chatCopy.push({sender: 'bot', message: mergedStream, type: 'info'})
        mergedStream = ''
      } 
    })
    if(mergedStream.length > 0) {
      chatCopy.push({sender: 'bot', message: mergedStream, type: 'stream'})
      mergedStream = ''
    }
    return chatCopy
  }

  useEffect(() => {
    const ws = new WebSocket(URL)
    ws.onmessage = onMessage
    setWebSocket(ws)
    return () => {
      webSocket?.close()
    }
  }, [])

  useEffect(() => {
    const socketState = webSocket?.readyState
    if(socketState !== webSocket?.OPEN) {
      setIsChatLoading(false)
    } else if(socketState === webSocket?.CLOSED) {
      openNotification()
    }
    console.log('>>>', socketState)
  }, [webSocket?.readyState])

  const sendMessage = () => {
    setText('')
    webSocket?.send(text)
  }

  return <Layout
    style={{
      backgroundColor: '#fff',
      width: '100%',
      margin: '0 auto'
    }}
  >
    <Content style={{
      overflowY: 'scroll',
      display: 'flex'
    }}>
      <Space
        direction='vertical'
        style={{
          maxWidth: 800,
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Title level={2}>Chat your data</Title>
        {mergeStream(chat).map((response, index) => {
          if(response.sender === 'you') {
            return <MessageCard key={index} imageSrc={session?.user?.image ?? null} message={response.message}/>
          } else if(response.sender === 'bot') {
            return <AnswerMessageCard key={index} message={response.message}/>
          }
        })}
        {isChatLoading ? <AnswerMessageCard isLoading message=''/> : <></>}
      </Space>
    </Content>
    <Footer
      style={{
        backgroundColor: '#fff',
        maxWidth: 800,
        width: '100%',
        margin: '0 auto',
        padding: '8px 0px 40px 0px'
      }}
    >
      <ChatInput
        value={text}
        setValue={(value) => setText(value)}
        onSend={sendMessage}
        disabled={webSocket?.readyState !== webSocket?.OPEN}
      />
    </Footer>
    
  </Layout>
}

export default ChatPage
