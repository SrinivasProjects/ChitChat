"use client";

import { cn } from "@/lib/utils";
import { Chat, currentUser } from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPlaceholderImage } from "@/lib/placeholder-images";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onChatSelect }: ChatListProps) {
  return (
    <nav className="flex flex-col gap-1">
      {chats.map((chat) => {
        const otherUser = chat.users.find((user) => user.id !== currentUser.id);
        if (!otherUser) return null;

        const lastMessage = chat.messages[chat.messages.length - 1];
        const userAvatar = getPlaceholderImage(otherUser.avatarId);
        const isSelected = selectedChatId === chat.id;

        return (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-accent",
              isSelected && "bg-primary/20 text-primary-foreground"
            )}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={otherUser.name} data-ai-hint={userAvatar.imageHint} />}
                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {otherUser.isOnline && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-baseline justify-between">
                <p className={cn("font-semibold truncate", isSelected ? 'text-foreground' : '')}>{otherUser.name}</p>
                <p className={cn(
                    "text-xs text-muted-foreground",
                    isSelected ? 'text-foreground/70' : ''
                  )}
                >
                  {lastMessage?.timestamp}
                </p>
              </div>
              <p className={cn(
                  "text-sm text-muted-foreground truncate",
                  isSelected ? 'text-foreground/80' : ''
                )}
              >
                {lastMessage?.content}
              </p>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
