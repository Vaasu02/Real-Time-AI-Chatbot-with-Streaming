# Real-Time AI Chatbot with Streaming

A real-time AI chatbot application built with Next.js, TypeScript, Socket.io, and Google Gemini 3 Flash Preview. Features streaming responses, WebSocket-based communication, and a modern, responsive UI.

## Features

### Core Features
- **Real-Time Chat Interface**: Clean, modern chat UI with message bubbles
- **WebSocket Communication**: Socket.io-based real-time bidirectional communication
- **Streaming AI Responses**: Token-by-token streaming display from Google Gemini 3 Flash Preview
- **Connection Management**: Connection status indicator with auto-reconnection
- **State Management**: Robust state management using React hooks and useReducer
- **Auto-Scroll**: Automatically scrolls to latest message
- **Timestamps**: Message timestamps with relative time display

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Real-time**: Socket.io (WebSocket-based)
- **LLM API**: Google Gemini 3 Flash Preview (free tier)

## Setup Instructions

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

## How It Works

1. **User sends message** → Message is added to chat state
2. **Socket.io emits** → Message sent to server via WebSocket
3. **Server processes** → Server receives message and calls Gemini API
4. **Gemini streams** → Response is streamed token-by-token
5. **Real-time updates** → Each chunk is emitted to client via Socket.io
6. **UI updates** → Frontend accumulates chunks and displays in real-time
7. **Completion** → Streaming completes, input is re-enabled

