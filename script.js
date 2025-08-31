document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const closeButton = document.getElementById('close-button');
    const chatBody = document.getElementById('chat-body');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Toggle chat widget visibility
    chatToggleButton.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            userInput.focus();
        }
    });

    closeButton.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    // Create a new message element
    function createMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(`${sender}-message`);

        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        messageContent.appendChild(paragraph);

        const timestampSpan = document.createElement('span');
        timestampSpan.classList.add('timestamp');
        timestampSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageContent.appendChild(timestampSpan);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatBody.appendChild(messageDiv);

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Get a more advanced bot response
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return 'Hi there! How can I assist you today?';
        } else if (lowerCaseMessage.includes('your name') || lowerCaseMessage.includes('who are you')) {
            return "I am an advanced chatbot assistant. I'm here to help you with common questions and tasks.";
        } else if (lowerCaseMessage.includes('features')) {
            return 'I can provide information, answer basic questions, and help you navigate this website. What would you like to know?';
        } else if (lowerCaseMessage.includes('how are you')) {
            return 'I am an AI, so I don’t have feelings, but I am functioning perfectly. Thanks for asking!';
        } else if (lowerCaseMessage.includes('help')) {
            return 'I can help with a variety of topics. Try asking me "what are your features?" or "how can I contact support?".';
        } else if (lowerCaseMessage.includes('contact support')) {
            return 'You can contact our support team at support@example.com or call us at 1-800-123-4567.';
        } else {
            return "I'm sorry, I don't understand that. You can try asking about my features or how to contact support.";
        }
    }

    // Handle sending a message
    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === '') return;

        createMessage(userText, 'user');

        const botResponse = getBotResponse(userText);
        setTimeout(() => {
            createMessage(botResponse, 'bot');
        }, 800);

        userInput.value = '';
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

