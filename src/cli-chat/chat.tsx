import { Box } from "ink";
import type React from "react";
import { InputBar } from "./input-bar";
import { MessagePanel } from "./message-panel";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface ChatUIProps {
    messages: ChatMessage[];
    input: string;
    onInputChange: (value: string) => void;
    onSubmit: (value: string) => void;
}

export const ChatUI: React.FC<ChatUIProps> = ({ messages, input, onInputChange, onSubmit }) => (
    <Box flexDirection="column" height="100%">
        <MessagePanel messages={messages} />
        <InputBar value={input} onChange={onInputChange} onSubmit={onSubmit} />
    </Box>
);
