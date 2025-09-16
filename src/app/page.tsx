import { AuthForm } from '@/components/auth/auth-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.3),rgba(255,255,255,0))]"></div>
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-foreground/80 to-primary">
          ChitChat
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md">
          The futuristic chat app that brings your conversations to life.
        </p>
      </div>
      <AuthForm />
    </main>
  );
}
