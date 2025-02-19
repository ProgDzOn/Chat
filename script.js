// الاتصال بالخادم
const socket = io();

// عناصر DOM
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// إرسال الرسالة
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        appendMessage('أنت: ' + message, 'user');
        socket.emit('chat message', message); // إرسال الرسالة إلى الخادم
        messageInput.value = ''; // مسح حقل الإدخال
    }
});

// استقبال الرسائل من الخادم
socket.on('chat message', (msg) => {
    appendMessage('مستخدم آخر: ' + msg, 'other');
});

// إضافة الرسائل إلى واجهة المستخدم
function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // التمرير إلى الأسفل
}