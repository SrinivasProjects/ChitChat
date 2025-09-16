"use client";

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Message } from '@/lib/dummy-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './message-bubble';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect ensures the view scrolls to the bottom whenever new messages are added.
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" viewportRef={scrollAreaRef}>
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ScrollArea>
  );
}
