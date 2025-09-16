"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type FormState = "login" | "signup";

export function AuthForm() {
  const [formState, setFormState] = useState<FormState>("login");
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission, validation, and API calls here.
    // For this UI demo, we'll just show a toast and navigate.
    toast({
      title: `Successfully ${formState === "login" ? "logged in" : "signed up"}!`,
      description: "Redirecting to the chat...",
    });

    setTimeout(() => {
      router.push("/chat");
    }, 1000);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={cardVariants} initial="initial" animate="animate">
      <Card className="w-[380px] bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {formState === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {formState === "login"
              ? "Enter your credentials to access your account."
              : "Let's get you started with a new account."}
          </p>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.form
              key={formState}
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleAuthAction}
              className="space-y-4"
            >
              {formState === "signup" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" type="text" placeholder="Username" required className="pl-9"/>
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Email" required className="pl-9"/>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Password" required className="pl-9" />
              </div>

              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                {formState === "login" ? "Login" : "Sign Up"}
              </Button>
            </motion.form>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {formState === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Button
              variant="link"
              className="pl-2"
              onClick={() =>
                setFormState(formState === "login" ? "signup" : "login")
              }
            >
              {formState === "login" ? "Sign up" : "Login"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
