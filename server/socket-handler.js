const { streamGeminiResponse } = require('../lib/gemini-client');

//Setting up Socket.io event handlers
function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle user messages
    socket.on('user_message', async (data) => {
      try {
        const { message, messageId } = data;
        
        if (!message || !message.trim()) {
          socket.emit('error', { 
            message: 'Message cannot be empty',
            messageId 
          });
          return;
        }

        console.log('Received message:', message);
        try {
          for await (const chunk of streamGeminiResponse(message)) {
            socket.emit('ai_chunk', {
              chunk,
              messageId,
            });
          }

          // Emit completion
          socket.emit('ai_complete', {
            messageId,
          });
        } catch (error) {
          console.error('Error streaming Gemini response:', error);
          socket.emit('error', {
            message: error instanceof Error ? error.message : 'Failed to get AI response',
            messageId,
          });
        }
      } catch (error) {
        console.error('Error handling user message:', error);
        socket.emit('error', {
          message: error instanceof Error ? error.message : 'An error occurred',
          messageId: data.messageId || 'unknown',
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Handle connection errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
}

module.exports = { setupSocketHandlers };

