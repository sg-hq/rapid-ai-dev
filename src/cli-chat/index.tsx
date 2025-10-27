import { render } from "ink";
import { createRef, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ChatUI, type ChatMessage } from "./chat";

type InputListener = (input: string) => void;

interface ChatControllerHandle {
    onInput: (action: InputListener) => void;
    sendMessage: (message: string) => void;
}

const ChatController = forwardRef<ChatControllerHandle>((_, ref) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState<string>("");
    const listeners = useRef<InputListener[]>([]);

    const handleSubmit = (value: string) => {
        const message = value.trim();
        if (message.length === 0) {
            setInput("");
            return;
        }

        setMessages((prev) => [...prev, { role: "user", content: message }]);
        setInput("");
        listeners.current.forEach((listener) => {
            listener(message);
        });
    };

    const handleInputChange = (value: string) => {
        setInput(value);
    };

    const pushAssistantMessage = (message: string) => {
        const content = message.trim();
        if (content.length === 0) {
            return;
        }
        setMessages((prev) => [...prev, { role: "assistant", content }]);
    };

    useImperativeHandle(ref, () => ({
        onInput(action) {
            listeners.current.push(action);
        },
        sendMessage: pushAssistantMessage,
    }));

    return (
        <ChatUI
            messages={messages}
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
        />
    );
});

export function renderChatUI(): {
    onInput: (action: InputListener) => void;
    sendMessage: (message: string) => void;
} {
    const controllerRef = createRef<ChatControllerHandle>();

    render(<ChatController ref={controllerRef} />);

    return {
        onInput(action) {
            if (!controllerRef.current) {
                throw new Error("Chat UI is not ready to register input handlers.");
            }
            controllerRef.current.onInput(action);
        },
        sendMessage(message) {
            if (!controllerRef.current) {
                throw new Error("Chat UI is not ready to send messages.");
            }
            controllerRef.current.sendMessage(message);
        },
    };
}