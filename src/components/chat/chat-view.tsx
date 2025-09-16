"use client";

import { useState, useTransition } from "react";
import { Chat, Message } from "@/lib/dummy-data";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";
import { SmartReplySuggestions } from "./smart-reply-suggestions";
import { generateImage } from "@/ai/flows/image-generation";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface ChatViewProps {
  chat: Chat;
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'user' | 'isRead'>) => void;
}

export function ChatView({ chat, onSendMessage }: ChatViewProps) {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false); // In a real app, this would be based on WebSocket events
  const [isGenerating, startImageGeneration] = useTransition();
  const { toast } = useToast();

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage({ content: inputValue.trim() });
      setInputValue("");
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
    // You might want to automatically send the suggestion or just populate the input
    // For now, we'll just populate.
  };

  const handleGenerateImage = () => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    if (!lastMessage || !lastMessage.content) {
      toast({
        title: "Cannot generate image",
        description: "There are no messages to generate an image from.",
        variant: "destructive",
      });
      return;
    }

    startImageGeneration(async () => {
      try {
        toast({
          title: "Generating Image...",
          description: "The AI is creating an image based on the last message. This may take a moment.",
        });

        const result = await generateImage({ prompt: lastMessage.content });
        onSendMessage({
          content: `Image generated from: "${lastMessage.content}"`,
          imageUrl: result.imageUrl
        });

      } catch (error) {
        console.error("Image generation failed:", error);
        toast({
          title: "Image Generation Failed",
          description: "There was an error generating the image. Please try again.",
          variant: "destructive",
        });
      }
    });
  };


  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages messages={chat.messages} />
      
      <div className="border-t border-border/30 p-4">
        {isGenerating && (
            <Alert className="mb-3">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Image Generation in Progress</AlertTitle>
              <AlertDescription>
                The AI is currently generating an image. Please wait a moment.
              </AlertDescription>
            </Alert>
        )}
        {isTyping && <TypingIndicator />}
        
        <SmartReplySuggestions
          chatHistory={chat.messages}
          onSelectSuggestion={handleSuggestionSelect}
        />
        
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSend}
          onGenerateImage={handleGenerateImage}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
