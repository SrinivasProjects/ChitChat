"use client";

import { useState } from "react";
import { Chat } from "@/lib/dummy-data";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";
import { SmartReplySuggestions } from "./smart-reply-suggestions";

interface ChatViewProps {
  chat: Chat;
  onSendMessage: (content: string) => void;
}

export function ChatView({ chat, onSendMessage }: ChatViewProps) {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false); // In a real app, this would be based on WebSocket events

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
    // You might want to automatically send the suggestion or just populate the input
    // For now, we'll just populate.
  };

  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages messages={chat.messages} />
      
      <div className="border-t border-border/30 p-4">
        {isTyping && <TypingIndicator />}
        
        <SmartReplySuggestions
          chatHistory={chat.messages}
          onSelectSuggestion={handleSuggestionSelect}
        />
        
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
