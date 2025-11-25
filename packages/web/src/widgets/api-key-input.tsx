"use client";

import { ArrowRight, Key, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Github } from "../components/icons/Github";

type ApiKeyInputProps = {
  onComplete: (key: string) => void;
};

export function ApiKeyInput({ onComplete }: ApiKeyInputProps) {
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(key);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] w-full max-w-lg items-center justify-center p-6">
      <div className="w-full space-y-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Key className="h-8 w-8 text-primary" />
          </div>
          <h2 className="bg-linear-to-r from-white to-white/60 bg-clip-text font-bold text-3xl text-transparent">
            Enter OpenAI API Key
          </h2>
          <p className="text-muted-foreground">
            To use the AI features, please provide your OpenAI API key.
          </p>
          <p className="text-muted-foreground">
            Support for other models will be available in the future as well as
            a paid option with direct access without a key.
          </p>
        </div>

        <form
          className="space-y-6 rounded-xl border border-white/10 bg-card/50 p-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              className="font-mono"
              id="apiKey"
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-..."
              type="password"
              value={key}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-blue-200 text-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-400" />

              <div className="space-y-2">
                <p>
                  Your key is stored locally in your browser and is never sent
                  to our servers.
                </p>

                <Button className="w-full" variant="outline">
                  <a
                    href="https://github.com/johnvictorfs/resume-mind"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Github className="inline h-4 w-4" /> Check our source-code
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-2">
              <Button className="w-full" disabled={!key.trim()} type="submit">
                Save & Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Link href="/editor">
            <p className="text-muted-foreground text-sm underline hover:text-primary">
              Skip for now. I will start without AI features.
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
