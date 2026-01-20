# Real-Time AI Chatbot with Streaming

A real-time AI chatbot application built with Next.js, TypeScript, Socket.io, and Google Gemini 3 Flash Preview. Features streaming responses, WebSocket-based communication, and a modern, responsive UI.

## 🚀 Features

### Core Features
- ✅ **Real-Time Chat Interface**: Clean, modern chat UI with message bubbles
- ✅ **WebSocket Communication**: Socket.io-based real-time bidirectional communication
- ✅ **Streaming AI Responses**: Token-by-token streaming display from Google Gemini 3 Flash Preview
- ✅ **Connection Management**: Connection status indicator with auto-reconnection
- ✅ **State Management**: Robust state management using React hooks and useReducer
- ✅ **Auto-Scroll**: Automatically scrolls to latest message
- ✅ **Timestamps**: Message timestamps with relative time display
- ✅ **Responsive Design**: Mobile-friendly responsive layout
- ✅ **Dark Mode**: Built-in dark mode support

### Bonus Features
- ✅ **Markdown Rendering**: AI responses support markdown formatting
- ✅ **Clear Chat**: Button to clear all messages with confirmation
- ✅ **Character Limit**: Input character counter (2000 character limit)
- ✅ **Typing Indicator**: Animated typing indicator while waiting for response
- ✅ **Error Handling**: Comprehensive error handling and user-friendly error messages

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Real-time**: Socket.io (WebSocket-based)
- **LLM API**: Google Gemini 3 Flash Preview (free tier)
- **State Management**: React Hooks (useReducer, useState)
- **Date Formatting**: date-fns
- **Markdown**: react-markdown

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key (free from [Google AI Studio](https://aistudio.google.com/apikey))

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SOCKET_URL=
```

**Note**: 
- Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- `NEXT_PUBLIC_SOCKET_URL` can be left empty for development (uses same origin)

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
project/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main chat page
│   └── globals.css             # Global styles
├── components/
│   └── chat/
│       ├── ChatInterface.tsx   # Main chat container
│       ├── MessageList.tsx     # Messages container
│       ├── MessageBubble.tsx  # Individual message
│       ├── ChatInput.tsx       # Input component
│       ├── ConnectionStatus.tsx # Status indicator
│       ├── TypingIndicator.tsx # Typing animation
│       └── ClearChatButton.tsx # Clear chat button
├── hooks/
│   ├── useChat.ts              # Chat state management
│   ├── useSocket.ts            # Socket.io connection
│   └── useAutoScroll.ts        # Auto-scroll hook
├── lib/
│   └── gemini-client.js        # Gemini API client
├── server/
│   └── socket-handler.js       # Socket.io handlers
├── types/
│   └── chat.types.ts           # TypeScript types
├── utils/
│   ├── socket.ts               # Socket utilities
│   └── date.ts                 # Date formatting
├── server.js                   # Custom Next.js server
└── package.json
```

## 🎯 How It Works

1. **User sends message** → Message is added to chat state
2. **Socket.io emits** → Message sent to server via WebSocket
3. **Server processes** → Server receives message and calls Gemini API
4. **Gemini streams** → Response is streamed token-by-token
5. **Real-time updates** → Each chunk is emitted to client via Socket.io
6. **UI updates** → Frontend accumulates chunks and displays in real-time
7. **Completion** → Streaming completes, input is re-enabled

## 🔌 Socket.io Events

### Client → Server
- `user_message`: Send user message to server
  ```typescript
  { message: string, messageId: string }
  ```

### Server → Client
- `ai_chunk`: Streaming response chunk
  ```typescript
  { chunk: string, messageId: string }
  ```
- `ai_complete`: Streaming completed
  ```typescript
  { messageId: string }
  ```
- `error`: Error occurred
  ```typescript
  { message: string, messageId: string }
  ```

## 🎨 Features Implemented

### Core Requirements ✅
- [x] Chat interface with message display
- [x] Auto-scroll to latest message
- [x] Visual distinction between user/AI messages
- [x] Timestamps on messages
- [x] Text input with send button
- [x] Enter key to send message
- [x] Disable input during streaming
- [x] Character limit indicator
- [x] Clean, readable layout
- [x] Responsive design
- [x] Tailwind CSS styling
- [x] WebSocket connection management
- [x] Connection status indicator
- [x] Auto-reconnection logic
- [x] Real-time streaming display
- [x] Typing indicator
- [x] State management with useReducer

### Bonus Features ✅
- [x] Clear chat functionality
- [x] Markdown rendering in AI responses
- [x] Typing indicator animation
- [x] Dark/light theme support (via system preference)

## 🐛 Troubleshooting

### Connection Issues
- Ensure the server is running (`npm run dev`)
- Check that Socket.io server is properly initialized
- Verify `NEXT_PUBLIC_SOCKET_URL` if using custom server URL

### Gemini API Errors
- Verify `GEMINI_API_KEY` is set in `.env.local`
- Check API key is valid and has quota remaining
- Ensure you're using the free tier (gemini-3-flash-preview model)

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.io server URL | No (defaults to same origin) |

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Note**: For production, you may need to configure Socket.io server separately or use a platform that supports custom servers.

## 📊 Time Spent

- **Planning**: ~1 hour
- **Implementation**: ~8 hours
- **Testing & Polish**: ~1 hour
- **Total**: ~10 hours

## 🎥 Demo Video

[Link to demo video will be added here]

## 📄 License

This project is created for assignment purposes.

## 🙏 Acknowledgments

- Google Gemini API for free tier access
- Socket.io for WebSocket functionality
- Next.js team for the amazing framework

---

**Built with ❤️ for the Internshala Frontend Developer Assignment**
