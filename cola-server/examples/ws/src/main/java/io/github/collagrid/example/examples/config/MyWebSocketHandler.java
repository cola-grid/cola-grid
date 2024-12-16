package io.github.collagrid.example.examples.config;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 连接建立后的逻辑
        System.out.println("Connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 处理接收到的消息
        String payload = message.getPayload();
        System.out.println("Received: " + payload);
        session.sendMessage(new TextMessage("Reply: " + payload));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 连接关闭后的逻辑
        System.out.println("Disconnected: " + session.getId());
    }
}
