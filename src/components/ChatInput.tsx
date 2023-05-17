'use client'
import React from "react"
import Search from "antd/es/input/Search"

interface ChatInputProps {
  value: string
  setValue: (value: string) => void
  onSend: () => void
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({value, setValue, onSend, disabled}) => {
  return <Search
    disabled={disabled}
    value={value}
    onChange={(event) => setValue(event.target.value)}
    onSearch={onSend}
    placeholder="Send a message..."
    allowClear
    enterButton="Send"
    size="large"
  />
}

export default ChatInput
