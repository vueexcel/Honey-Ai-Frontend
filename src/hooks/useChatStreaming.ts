import { useState, useEffect, useCallback } from "react";
import { initSocket } from "@/lib/socket";
import { startChatStreaming } from "@/utils/api";
import { getCredits } from "@/utils/api";

export default function useChatStreaming() {
    const [messages, setMessages] = useState<string[]>([]);
    const [balance, setBalance] = useState<number | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getCredits();
                setBalance(data.balance);
            } catch (err) {
                console.error("Failed to fetch credits:", err);
                setError("Unable to fetch credits.");
            }
        })();

        const socket = initSocket();


        socket.on("token", (token: string) => {
            setMessages((prev) => [...prev, token]);
        });

        socket.on("balance", (newBalance: number) => {
            console.log(newBalance, 'balance')
            setBalance(newBalance);
        });

        socket.on("done", () => {
            setIsStreaming(false);
        });

        socket.on("error", (msg: string) => {
            setError(msg);
            setIsStreaming(false);
        });

        return () => {
            socket.off("token");
            socket.off("balance");
            socket.off("done");
            socket.off("error");
        };
    }, []);

    const sendMessage = useCallback(async (prompt: string) => {
        setMessages([]);
        setError(null);
        setIsStreaming(true);
        await startChatStreaming(prompt);
    }, []);

    return {
        messages,
        balance,
        isStreaming,
        error,
        sendMessage,
    };
}
