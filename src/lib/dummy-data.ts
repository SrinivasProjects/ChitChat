export type User = {
  id: string;
  name: string;
  avatarId: string;
  isOnline: boolean;
};

export type Message = {
  id: string;
  content: string;
  timestamp: string;
  user: User;
  isRead: boolean;
};

export type Chat = {
  id: string;
  users: User[];
  messages: Message[];
};

export const currentUser: User = {
  id: "user-current",
  name: "You",
  avatarId: "user-current",
  isOnline: true,
};

const users: User[] = [
  { id: "user-1", name: "Alice", avatarId: "user-1", isOnline: true },
  { id: "user-2", name: "Bob", avatarId: "user-2", isOnline: false },
  { id: "user-3", name: "Charlie", avatarId: "user-3", isOnline: true },
  { id: "user-4", name: "Diana", avatarId: "user-4", isOnline: false },
  { id: "user-5", name: "Eve", avatarId: "user-5", isOnline: true },
  { id: "user-6", name: "Frank", avatarId: "user-6", isOnline: true },
];

export const dummyData: Chat[] = [
  {
    id: "chat-1",
    users: [currentUser, users[0]],
    messages: [
      { id: "msg-1-1", content: "Hey! How's it going?", timestamp: "10:00 AM", user: users[0], isRead: true },
      { id: "msg-1-2", content: "Pretty good, just working on a new project. You?", timestamp: "10:01 AM", user: currentUser, isRead: true },
      { id: "msg-1-3", content: "Same here. This Next.js app is something else!", timestamp: "10:02 AM", user: users[0], isRead: true },
      { id: "msg-1-4", content: "Tell me about it. The App Router is a game-changer.", timestamp: "10:02 AM", user: currentUser, isRead: true },
    ],
  },
  {
    id: "chat-2",
    users: [currentUser, users[1]],
    messages: [
      { id: "msg-2-1", content: "Did you see the new Framer Motion update?", timestamp: "Yesterday", user: users[1], isRead: true },
      { id: "msg-2-2", content: "Oh yeah, I've been playing with the new layout animations. They're so smooth!", timestamp: "Yesterday", user: currentUser, isRead: true },
    ],
  },
  {
    id: "chat-3",
    users: [currentUser, users[2]],
    messages: [
      { id: "msg-3-1", content: "Lunch today?", timestamp: "9:30 AM", user: users[2], isRead: false },
    ],
  },
  {
    id: "chat-4",
    users: [currentUser, users[3]],
    messages: [
      { id: "msg-4-1", content: "Can you send me the design files?", timestamp: "Yesterday", user: users[3], isRead: true },
      { id: "msg-4-2", content: "Sent! Check your email.", timestamp: "Yesterday", user: currentUser, isRead: true },
      { id: "msg-4-3", content: "Got 'em, thanks!", timestamp: "Yesterday", user: users[3], isRead: true },
    ],
  },
  {
    id: "chat-5",
    users: [currentUser, users[4]],
    messages: [
      { id: "msg-5-1", content: "The AI reply suggestions are surprisingly good.", timestamp: "3 days ago", user: users[4], isRead: true },
    ],
  },
  {
    id: "chat-6",
    users: [currentUser, users[5]],
    messages: [
      { id: "msg-6-1", content: "The glassmorphism design looks so clean.", timestamp: "3 days ago", user: users[5], isRead: true },
      { id: "msg-6-2", content: "I know, right? It feels very futuristic.", timestamp: "3 days ago", user: currentUser, isRead: true },
    ],
  },
];
