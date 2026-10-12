"use client";

import { useMemo, useState } from "react";

const TOKEN_RE = /\w+|[^\w\s]/g;

export default function TokenizerPlayground() {
  const [text, setText] = useState("Hello, world! Tokenizers split text into pieces.");
  const tokens = useMemo(() => text.match(TOKEN_RE) ?? [], [text]);

  return (
    <div className="space-y-4">
      <label htmlFor="tokenizer-input" className="text-sm font-medium">
        Input text
      </label>
      <textarea
        id="tokenizer-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded-lg border bg-background/60 p-3 font-mono text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{tokens.length} tokens</span>
        <span>{text.length} characters</span>
      </div>
      <div className="flex flex-wrap gap-1.5" aria-live="polite">
        {tokens.map((token, i) => (
          <span
            key={i}
            className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-sm"
            style={{ filter: `hue-rotate(${(i * 37) % 120}deg)` }}
          >
            {token}
          </span>
        ))}
      </div>
    </div>
  );
}
