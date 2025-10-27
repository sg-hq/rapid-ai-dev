import { Box } from "ink";
import TextInput from "ink-text-input";
import type React from "react";

interface InputBarProps {
    value: string;
    onChange: (input: string) => void;
    onSubmit: (input: string) => void;
}

export const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSubmit }) => (
    <Box height={3} borderStyle="single" paddingX={1}>
        <TextInput value={value} onChange={onChange} onSubmit={onSubmit} />
    </Box>
);
