import {
  useState,
  useRef,
  useEffect
} from 'react'

import {
  motion,
  AnimatePresence
} from 'framer-motion'

import {
  MessageCircle,
  X,
  Send,
  Bot
} from 'lucide-react'

import {
  useSelector
} from 'react-redux'

function ChatBot() {

  const [open, setOpen] =
    useState(false)

  const [input, setInput] =
    useState('')

  const messagesEndRef =
    useRef(null)

  const [messages, setMessages] =
    useState([
      {
        sender: 'bot',
        text: '👋 Hi! Welcome to Re-Market 💚'
      }
    ])

  const {
    user,
    isAuthenticated
  } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })

  }, [messages])

  /* BODY SCROLL LOCK */

  useEffect(() => {

    if (open && window.innerWidth < 640) {

      document.body.style.overflow =
        'hidden'

    } else {

      document.body.style.overflow =
        ''

    }

    return () => {

      document.body.style.overflow =
        ''

    }

  }, [open])

  const getBotReply =
    (message) => {

      const text =
        message.toLowerCase().trim()

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
        text.includes(
          'how are you'
        )
      ) {

        return '😊 I am doing great! Thanks for asking.'

      }

      if (
        text.includes(
          'who are you'
        )
      ) {

        return '🤖 I am Re-Market AI Assistant.'

      }

      if (
        text.includes('login') ||
        text.includes('sign in')
      ) {

        return '🔐 You can login using Google or Email.'

      }

      if (
        text.includes('order') ||
        text.includes('track')
      ) {

        if (!isAuthenticated) {

          return '✨ Please login first to track orders.'

        }

        return '📦 Open Orders page to track your order.'

      }

      if (
        text.includes('refund') ||
        text.includes('return')
      ) {

        return '💸 Refunds usually take 5-7 working days.'

      }

      if (
        text.includes('payment') ||
        text.includes('upi')
      ) {

        return '💳 We support UPI, Cards and Net Banking.'

      }

      if (
        text.includes('seller') ||
        text.includes('sell')
      ) {

        return '🛍️ Open Seller Dashboard to manage products.'

      }

      if (
        text.includes('profile') ||
        text.includes('account')
      ) {

        if (!isAuthenticated) {

          return '✨ Please login first.'

        }

        return `👤 Hello ${
          user?.name || 'User'
        }! Open Profile page to manage your account.`

      }

      if (
        text.includes('offer') ||
        text.includes('discount')
      ) {

        return '🎁 New offers are available in Deals section.'

      }

      if (
        text.includes(
          'wishlist'
        )
      ) {

        return '❤️ Wishlist items are available in Wishlist page.'

      }

      const smartReplies = [

        '😊 Could you explain a little more?',

        '💚 I am here to help you.',

        '📱 Please ask in a simpler way.',

        '✨ I will try my best to help you.'

      ]

      return smartReplies[
        Math.floor(
          Math.random() *
          smartReplies.length
        )
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
        text: getBotReply(
          userInput
        )
      }

      setMessages((prev) => [
        ...prev,
        botMessage
      ])

    }, 600)

  }

  return (

    <>

      {/* FLOAT BUTTON */}

      <motion.button
        whileHover={{
          scale: 1.08
        }}
        whileTap={{
          scale: 0.92
        }}
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full
        bg-gradient-to-r from-emerald-500 to-green-500
        text-white
        shadow-[0_20px_50px_rgba(34,197,94,0.35)]
        hover:shadow-[0_20px_60px_rgba(34,197,94,0.45)]
        flex items-center justify-center"
      >

        {open ? (

          <X size={24} />

        ) : (

          <MessageCircle size={24} />

        )}

      </motion.button>

      {/* CHAT WINDOW */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.92
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 60,
              scale: 0.92
            }}
            transition={{
              duration: 0.22
            }}
            className="fixed z-[9999]
            bottom-24
            right-2
            sm:right-6

            w-[calc(100vw-16px)]
            sm:w-[380px]

            max-w-[380px]

            h-[78vh]
            sm:h-[650px]

            max-h-[700px]

            rounded-[30px]

            overflow-hidden

            bg-white/95 dark:bg-slate-900/95

            backdrop-blur-2xl

            shadow-[0_25px_70px_rgba(0,0,0,0.28)]

            border border-slate-200 dark:border-white/10

            flex flex-col"
          >

            {/* HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-500 p-5 text-white">

              <div className="absolute top-[-40px] right-[-40px] w-[120px] h-[120px] rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10">

                  <Bot size={28} />

                </div>

                <div>

                  <h2 className="font-black text-lg tracking-tight">

                    Re-Market AI

                  </h2>

                  <p className="text-sm text-emerald-50">

                    🟢 Online now

                  </p>

                </div>

              </div>

            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 space-y-4 bg-slate-50 dark:bg-slate-950">

              {messages.map(
                (msg, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 8
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className={`flex ${
                    msg.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >

                  <div
                    className={`max-w-[84%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-br-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-bl-md border border-slate-200 dark:border-white/5'
                    }`}
                  >

                    {msg.text}

                  </div>

                </motion.div>

              ))}

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}

            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">

              <div className="flex items-center gap-2">

                <input
                  type="text"
                  value={input}
                  onChange={(e) =>
                    setInput(
                      e.target.value
                    )
                  }
                  placeholder="Type your message..."
                  className="flex-1 h-12 px-4 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-4 focus:ring-emerald-500/10"
                  onKeyDown={(e) => {

                    if (
                      e.key === 'Enter'
                    ) {

                      sendMessage()

                    }

                  }}
                />

                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.92
                  }}
                  onClick={sendMessage}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white flex items-center justify-center shadow-lg"
                >

                  <Send size={18} />

                </motion.button>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  )

}

export default ChatBot