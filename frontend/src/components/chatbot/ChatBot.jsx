import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Bot
} from 'lucide-react'

import { useSelector } from 'react-redux'

function ChatBot() {

  const [open, setOpen] = useState(false)

  const [input, setInput] = useState('')

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hi! Welcome to Re-Market 💚'
    }
  ])

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  )

  const getBotReply = (message) => {

    const text = message.toLowerCase().trim()

    // ---------------- NORMAL CHAT ----------------

    if (
      text === 'ok' ||
      text === 'okay' ||
      text === 'hmm' ||
      text === 'yes'
    ) {

      return '😊 Great! Anything else I can help you with?'
    }

    if (
      text === 'thanks' ||
      text === 'thank you' ||
      text === 'thx'
    ) {

      return '💚 You are welcome!'
    }

    if (
      text === 'bye' ||
      text === 'goodbye'
    ) {

      return '👋 Bye! Have a great day 💚'
    }

    if (
      text.includes('how are you')
    ) {

      return '😊 I am doing great! Thanks for asking.'
    }

    if (
      text.includes('who are you')
    ) {

      return '🤖 I am Re-Market AI Assistant.'
    }

    if (
      text.includes('good morning')
    ) {

      return '☀️ Good morning! Hope you have an amazing day.'
    }

    if (
      text.includes('good night')
    ) {

      return '🌙 Good night! Take care and sleep well.'
    }

    if (
      text.includes('i love you')
    ) {

      return '💚 That is so sweet!'
    }

    // ---------------- GREETING ----------------

    if (
      text.includes('hi') ||
      text.includes('hello') ||
      text.includes('hey')
    ) {

      return `👋 Hello ${user?.name || 'there'}! Welcome to Re-Market 💚`
    }

    // ---------------- LOGIN ----------------

    if (
      text.includes('login') ||
      text.includes('sign in')
    ) {

      return '🔐 You can login using Google or Email.'
    }

    // ---------------- ORDER ----------------

    if (
      text.includes('order') ||
      text.includes('track') ||
      text.includes('delivery') ||
      text.includes('parcel')
    ) {

      if (!isAuthenticated) {

        return '✨ Please login first to track orders.'

      }

      return '📦 Open My Orders section to track your order.'
    }

    // ---------------- REFUND ----------------

    if (
      text.includes('refund') ||
      text.includes('return') ||
      text.includes('cancel')
    ) {

      return '💸 Refunds usually take 5-7 working days.'
    }

    // ---------------- PAYMENT ----------------

    if (
      text.includes('payment') ||
      text.includes('upi') ||
      text.includes('card')
    ) {

      return '💳 We support UPI, Cards and Net Banking.'
    }

    // ---------------- SELLER ----------------

    if (
      text.includes('seller') ||
      text.includes('sell')
    ) {

      return '🛍️ You can manage products from Seller Dashboard.'
    }

    // ---------------- PRODUCT ----------------

    if (
      text.includes('mobile') ||
      text.includes('laptop') ||
      text.includes('product')
    ) {

      return '📱 You can explore products from the Products page.'
    }

    // ---------------- PROFILE ----------------

    if (
      text.includes('profile') ||
      text.includes('account')
    ) {

      if (!isAuthenticated) {

        return '✨ Please login first.'

      }

      return `👤 Hello ${user?.name || 'User'}! Open Profile page to manage account settings.`
    }

    // ---------------- OFFERS ----------------

    if (
      text.includes('offer') ||
      text.includes('coupon') ||
      text.includes('discount')
    ) {

      return '🎁 New exciting offers are available in Deals section.'
    }

    // ---------------- WISHLIST ----------------

    if (
      text.includes('wishlist')
    ) {

      return '❤️ Wishlist items are available in Wishlist section.'
    }

    // ---------------- SUPPORT ----------------

    if (
      text.includes('support') ||
      text.includes('help')
    ) {

      return '😊 Please explain your issue in detail.'
    }

    // ---------------- FUNNY ----------------

    if (
      text.includes('haha') ||
      text.includes('lol')
    ) {

      return '😂 Glad you liked it!'
    }

    // ---------------- DEFAULT ----------------

    const smartReplies = [

      '🤔 I think you are asking about your account or products.',

      '😊 Could you explain a little more?',

      '💚 I am here to help you.',

      '📱 Please try asking in a simpler way.',

      '✨ I will try my best to help you.'

    ]

    return smartReplies[
      Math.floor(Math.random() * smartReplies.length)
    ]
  }

  const sendMessage = () => {

    if (!input.trim()) return

    const userMessage = {
      sender: 'user',
      text: input
    }

    setMessages((prev) => [
      ...prev,
      userMessage
    ])

    const userInput = input

    setInput('')

    setTimeout(() => {

      const botMessage = {
        sender: 'bot',
        text: getBotReply(userInput)
      }

      setMessages((prev) => [
        ...prev,
        botMessage
      ])

    }, 800)
  }

  return (
    <>

      {/* FLOAT BUTTON */}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2
        }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[99999] w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow-2xl flex items-center justify-center"
      >

        {open ? (
          <X size={28} />
        ) : (
          <MessageCircle size={28} />
        )}

      </motion.button>

      {/* CHAT WINDOW */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 100,
              scale: 0.8
            }}
            transition={{
              duration: 0.25
            }}
            className="fixed bottom-28 right-6 z-[99999] w-[380px] h-[650px] rounded-3xl overflow-hidden bg-white shadow-2xl flex flex-col border"
          >

            {/* HEADER */}

            <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-5 text-white">

              <div className="flex items-center gap-3">

                <Bot size={30} />

                <div>

                  <h2 className="font-bold text-xl">
                    Re-Market AI
                  </h2>

                  <p className="text-sm">
                    🟢 Online now
                  </p>

                </div>

              </div>

            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              ))}

            </div>

            {/* INPUT */}

            <div className="p-3 border-t bg-white flex items-center gap-2">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-3 outline-none"
                onKeyDown={(e) => {

                  if (e.key === 'Enter') {
                    sendMessage()
                  }

                }}
              />

              <button
                onClick={sendMessage}
                className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center"
              >
                <Send size={20} />
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  )
}

export default ChatBot