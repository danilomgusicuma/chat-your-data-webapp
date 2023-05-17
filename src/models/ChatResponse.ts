export interface ChatResponse {
  sender: 'bot' | 'you'
  message: string
  type: 'start' | 'stream' | 'end' | 'error' | 'info'
}