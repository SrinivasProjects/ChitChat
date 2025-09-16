"use client";

import { useState, useEffect, useTransition } from "react";
import { getSmartReplySuggestions, SmartReplySuggestionsOutput } from "@/ai/flows/smart-reply-suggestions";
import { Message } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SmartReplySuggestionsProps {
  chatHistory: Message[];
  onSelectSuggestion: (suggestion: string) => void;
}

export function SmartReplySuggestions({ chatHistory, onSelectSuggestion }: SmartReplySuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // In a real app, you might want to debounce this or trigger it more selectively.
    // For instance, only when the other user sends a new message.
    if (chatHistory.length > 0) {
      startTransition(async () => {
        try {
          const historyString = chatHistory
            .map((msg) => `${msg.user.name}: ${msg.content}`)
            .join("\n");
          
          const result: SmartReplySuggestionsOutput = await getSmartReplySuggestions({
            chatHistory: historyString,
            numberOfSuggestions: 3,
          });

          setSuggestions(result.suggestions);
        } catch (error) {
          console.error("Failed to get smart replies:", error);
          setSuggestions([]);
        }
      });
    }
  }, [chatHistory]);

  if (isPending || suggestions.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <Sparkles className="h-4 w-4 text-primary" />
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="rounded-full h-auto py-1 px-3 text-sm"
            onClick={() => onSelectSuggestion(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
