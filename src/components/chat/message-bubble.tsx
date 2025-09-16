"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message, currentUser } from '@/lib/dummy-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isCurrentUser = message.user.id === currentUser.id;
  const userAvatar = getPlaceholderImage(message.user.avatarId);

  const bubbleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={cn("flex items-end gap-2", {
        "justify-end": isCurrentUser,
        "justify-start": !isCurrentUser,
      })}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={message.user.name} data-ai-hint={userAvatar.imageHint} />}
          <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2.5",
          {
            "bg-primary text-primary-foreground rounded-br-none": isCurrentUser,
            "bg-accent text-accent-foreground rounded-bl-none": !isCurrentUser,
          }
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
       {isCurrentUser && (
        <Avatar className="h-8 w-8">
          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={message.user.name} data-ai-hint={userAvatar.imageHint} />}
          <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
