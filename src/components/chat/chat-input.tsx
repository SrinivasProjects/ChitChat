"use client";

import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React from "react";

interface ChatInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative">
      <Textarea
        placeholder="Type a message..."
        className="min-h-[48px] resize-none rounded-2xl border-border/40 bg-background py-3 pl-4 pr-24 shadow-sm"
        rows={1}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Emoji">
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <p className="text-sm text-muted-foreground">Emoji picker coming soon!</p>
          </PopoverContent>
        </Popover>
        <Button onClick={onSend} size="icon" aria-label="Send Message" className="rounded-full h-9 w-9">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
