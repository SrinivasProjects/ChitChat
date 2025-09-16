"use client";

import { cn } from "@/lib/utils";
import { Chat, currentUser } from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

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
        const unreadCount = chat.messages.filter(
          (msg) => !msg.isRead && msg.user.id !== currentUser.id
        ).length;
        const userAvatar = getPlaceholderImage(otherUser.avatarId);
        const isSelected = selectedChatId === chat.id;

        return (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-sidebar-accent",
              isSelected ? "bg-primary/20 text-primary-foreground" : "text-sidebar-foreground"
            )}
          >
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary/50 transition-colors">
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
                    "text-xs",
                    isSelected ? 'text-foreground/70' : 'text-muted-foreground'
                  )}
                >
                  {lastMessage?.timestamp}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className={cn(
                    "text-sm truncate",
                     isSelected ? 'text-foreground/80' : 'text-muted-foreground',
                     unreadCount > 0 && !isSelected && "font-bold text-foreground"
                  )}
                >
                  {lastMessage?.content}
                </p>
                {unreadCount > 0 && (
                  <Badge className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full p-0",
                    isSelected ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
                  )}>
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
