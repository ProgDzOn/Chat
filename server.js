const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// تقديم ملفات الواجهة الأمامية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// إدارة الاتصالات
io.on('connection', (socket) => {
    console.log('مستخدم متصل');

    // استقبال الرسائل من المستخدمين
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // إرسال الرسالة إلى جميع المستخدمين
    });

    // إدارة انفصال المستخدم
    socket.on('disconnect', () => {
        console.log('مستخدم غير متصل');
    });
});

// تشغيل الخادم
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});