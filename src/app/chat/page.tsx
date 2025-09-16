"use client";

import React, { useState, useMemo } from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChatList } from '@/components/chat/chat-list';
import { ChatView } from '@/components/chat/chat-view';
import { dummyData, currentUser, Chat } from '@/lib/dummy-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(dummyData);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chats[0]?.id || null);

  const selectedChat = useMemo(() => {
    return chats.find(chat => chat.id === selectedChatId);
  }, [chats, selectedChatId]);

  const handleSendMessage = (messageContent: string) => {
    if (!selectedChat) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: currentUser,
      isRead: true,
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
        };
      }
      return chat;
    });
    setChats(updatedChats);
  };
  
  const currentUserAvatar = getPlaceholderImage(currentUser.avatarId);

  return (
    <SidebarProvider>
      <div className="h-screen w-full flex">
        <Sidebar
          variant="inset"
          className="bg-background/80 backdrop-blur-lg"
        >
          <SidebarHeader className="border-b border-border/30">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-primary">ChitChat</h1>
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <ChatList 
              chats={chats}
              selectedChatId={selectedChatId}
              onChatSelect={setSelectedChatId}
            />
          </SidebarContent>
          <SidebarFooter className="border-t border-border/30 p-2">
             <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} alt={currentUser.name} data-ai-hint={currentUserAvatar.imageHint} />}
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
              <Link href="/" passHref>
                <Button variant="ghost" size="icon" aria-label="Logout">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="bg-background/80 backdrop-blur-lg">
          <div className="flex flex-col h-full">
            <header className="flex h-16 items-center justify-between border-b border-border/30 px-4 md:px-6">
              <div className="flex items-center gap-2">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                 {selectedChat && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={getPlaceholderImage(selectedChat.users.find(u => u.id !== currentUser.id)!.avatarId)?.imageUrl} />
                      <AvatarFallback>{selectedChat.users.find(u => u.id !== currentUser.id)?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedChat.users.find(u => u.id !== currentUser.id)?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.users.find(u => u.id !== currentUser.id)?.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                 )}
              </div>
              <ThemeToggle />
            </header>
            
            {selectedChat ? (
              <ChatView 
                chat={selectedChat}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium">Welcome to ChitChat</p>
                  <p className="text-muted-foreground">Select a conversation to start chatting.</p>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
