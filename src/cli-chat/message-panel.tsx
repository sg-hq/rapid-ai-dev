import { Box, Text } from "ink";
import type { ChatMessage } from "./chat";

interface MessagePanelProps {
    messages: ChatMessage[];
}

export const MessagePanel: React.FC<MessagePanelProps> = ({ messages }) => (
    <Box flexDirection="column" flexGrow={1} borderStyle="single" paddingX={1}>
        {messages.map((message, index) => {
            const isUser = message.role === "user";
            const label = isUser ? "User" : "AI";
            const color = isUser ? "blue" : "#FFA500";

            return (
                <Text key={index}>
                    <Text color={color}>{label}:</Text> {message.content}
                </Text>
            );
        })}
    </Box>
);
