import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatbotReady, setChatbotReady] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const messagesEndRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check if chatbot is ready on component mount
  useEffect(() => {
    const checkChatbotStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/health`)
        if (response.ok) {
          const data = await response.json()
          setChatbotReady(data.vectorstore_loaded)
          if (data.vectorstore_loaded) {
            setMessages([
              {
                type: 'system',
                content: '✅ RAG Chatbot is ready! Ask me anything about your data.',
              },
            ])
          } else {
            setMessages([
              {
                type: 'system',
                content: '⚠️ Chatbot is starting up. Please wait a moment...',
              },
            ])
          }
        }
      } catch (error) {
        console.error('Error checking chatbot status:', error)
        setMessages([
          {
            type: 'system',
            content: '❌ Unable to connect to chatbot. Please check if the backend server is running.',
          },
        ])
      } finally {
        setCheckingStatus(false)
      }
    }

    checkChatbotStatus()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    if (!chatbotReady) {
      alert('Chatbot is not ready yet. Please wait for it to load the data.')
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { type: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: data.answer },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            content: 'Sorry, I encountered an error. Please try again.',
          },
        ])
      }
    } catch (error) {
      console.error('Query error:', error)
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: 'Error connecting to server. Please check your connection.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="chat-container">
        <div className="header">
          <h1>📊 Dump Register Assistant</h1>
          <p>Ask questions about your dump register data</p>
          {checkingStatus && <p>🔄 Checking chatbot status...</p>}
          {!checkingStatus && chatbotReady && <p>✅ Ready to answer questions!</p>}
          {!checkingStatus && !chatbotReady && <p>⚠️ Loading data, please wait...</p>}
        </div>

        <div className="messages">
          {messages.length === 0 && checkingStatus && (
            <div className="empty-state">
              <p>🔄 Connecting to Dump Register Chatbot...</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              chatbotReady
                ? 'Ask about your dump register data...'
                : 'Waiting for chatbot to load...'
            }
            disabled={!chatbotReady || loading}
            className="message-input"
          />
          <button
            type="submit"
            disabled={!chatbotReady || loading || !input.trim()}
            className="send-btn"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
