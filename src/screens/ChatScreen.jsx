import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { analyzeQRContent } from '../utils/groqApi';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I am your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setMessage(''); // Clear input field

      // Show typing indicator
      setIsTyping(true);
      scrollViewRef.current?.scrollToEnd({ animated: true });

      // Get bot response
      console.log('Sending message to API:', message.trim());
      const botResponse = await analyzeQRContent(message.trim());
      console.log('Received response:', botResponse);

      // Add bot response
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: error.message || 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={[
                  styles.messageText,
                  msg.sender === 'bot' && styles.botMessageText
                ]}>{msg.text}</Text>
                <Text style={[
                  styles.timestamp,
                  msg.sender === 'bot' && styles.botTimestamp
                ]}>{formatTime(msg.timestamp)}</Text>
              </View>
            </View>
          ))}
          {isTyping && (
            <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
              <View style={[styles.messageBubble, styles.botMessage, styles.typingIndicator]}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={[styles.messageText, styles.botMessageText, styles.typingText]}>
                  Typing...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={1000}
            onSubmitEditing={sendMessage}
            editable={!isTyping}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || isTyping) && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || isTyping}
          >
            <Ionicons
              name="send"
              size={24}
              color={message.trim() && !isTyping ? '#ffffff' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  botMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 4,
  },
  botMessageText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
  },
  botTimestamp: {
    color: 'rgba(31, 41, 55, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  typingText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default ChatScreen;