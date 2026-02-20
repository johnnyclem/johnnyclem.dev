import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Sparkles, Loader2, Volume2, VolumeX } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { ChatPrompt, ChatConversation, ChatMessage } from "@shared/schema";
import ReactMarkdown from "react-markdown";

export function ChatBot() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [loadingVoice, setLoadingVoice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastProcessedMessageRef = useRef<string | null>(null);

  const { data: prompts } = useQuery<ChatPrompt[]>({
    queryKey: ["/api/chat/prompts"],
  });

  const { data: conversation } = useQuery<ChatConversation>({
    queryKey: ["/api/chat/conversations", conversationId],
    enabled: !!conversationId,
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/conversations", conversationId, "messages"],
    enabled: !!conversationId,
  });

  const createConversationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/chat/conversations");
      return await response.json();
    },
    onSuccess: (data: ChatConversation) => {
      setConversationId(data.id);
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!conversationId) throw new Error("No conversation");
      const response = await apiRequest(
        "POST",
        `/api/chat/conversations/${conversationId}/messages`,
        { content }
      );
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/chat/conversations", conversationId, "messages"]
      });
      setMessage("");
    },
  });

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      });
    });
  };

  const playVoice = async (messageId: string, text: string) => {
    try {
      setLoadingVoice(messageId);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const response = await apiRequest("POST", "/api/chat/text-to-speech", { text });
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setPlayingMessageId(messageId);
        setLoadingVoice(null);
      };

      audio.onended = () => {
        setPlayingMessageId(null);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setPlayingMessageId(null);
        setLoadingVoice(null);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      await audio.play();
    } catch (error) {
      console.error("Voice playback error:", error);
      setLoadingVoice(null);
      setPlayingMessageId(null);
    }
  };

  const stopVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingMessageId(null);
    }
  };

  const toggleVoice = (messageId: string, text: string) => {
    if (playingMessageId === messageId) {
      stopVoice();
    } else {
      playVoice(messageId, text);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, messages]);

  useEffect(() => {
    const isPending = sendMessageMutation.isPending || createConversationMutation.isPending;
    if (!voiceEnabled || messages.length === 0 || isPending) return;

    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage.role === "assistant" &&
      lastMessage.id !== lastProcessedMessageRef.current
    ) {
      lastProcessedMessageRef.current = lastMessage.id;
      playVoice(lastMessage.id, lastMessage.content);
    }
  }, [messages, voiceEnabled, sendMessageMutation.isPending, createConversationMutation.isPending]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    if (!conversationId) {
      const newConversation = await createConversationMutation.mutateAsync();
      const response = await apiRequest(
        "POST",
        `/api/chat/conversations/${newConversation.id}/messages`,
        { content }
      );
      await response.json();
      queryClient.invalidateQueries({
        queryKey: ["/api/chat/conversations", newConversation.id, "messages"]
      });
      setMessage("");
    } else {
      sendMessageMutation.mutate(content);
    }
  };

  const handlePromptClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(message);
  };

  const isLoading = sendMessageMutation.isPending || createConversationMutation.isPending;

  return (
    <Card
      className="w-full max-w-2xl mx-auto bg-[#0a0b0d] border-[#1f2330]"
      data-testid="card-chatbot"
    >
      <CardHeader className="border-b border-[#1f2330]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#f59e0b]/10">
              <MessageCircle className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <CardTitle
              className="text-white"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              data-testid="text-chatbot-title"
            >
              AI Assistant
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="text-[#6b7280] hover:text-[#f59e0b]"
            data-testid="button-toggle-voice"
            title={voiceEnabled ? "Disable voice" : "Enable voice"}
          >
            {voiceEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
        </div>
        <CardDescription
          className="text-[#6b7280]"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          data-testid="text-chatbot-description"
        >
          Chat with an AI assistant trained on Jonathan's resume, patents, and portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {messages.length === 0 && !messagesLoading && (
          <div className="space-y-3">
            <div
              className="flex items-center gap-2 text-xs text-[#6b7280]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Sparkles className="w-3 h-3 text-[#f59e0b]" />
              <span className="tracking-wider uppercase" data-testid="text-suggested-prompts-label">Suggested questions</span>
            </div>
            <div className="flex flex-col gap-2">
              {prompts?.map((prompt) => (
                <Button
                  key={prompt.id}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4 whitespace-normal border-[#1f2330] text-[#9ca3af] hover:text-[#f59e0b] hover:border-[#f59e0b]/30 bg-transparent"
                  onClick={() => handlePromptClick(prompt.prompt)}
                  disabled={isLoading}
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  data-testid={`button-prompt-${prompt.sortOrder}`}
                >
                  {prompt.prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {(messages.length > 0 || messagesLoading) && (
          <div
            ref={messagesContainerRef}
            className="space-y-4 max-h-96 overflow-y-auto pr-2"
            data-testid="container-messages"
          >
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${msg.role}-${idx}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[#f59e0b] text-[#0a0b0d]"
                      : "bg-[#111318] border border-[#1f2330] text-[#c4c8d4]"
                  }`}
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {msg.role === "assistant" ? (
                    <div className="space-y-2">
                      <div className="text-sm prose prose-sm max-w-none prose-p:text-[#c4c8d4] prose-a:text-[#f59e0b]">
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                className="text-[#f59e0b] underline hover:text-[#f59e0b]/80"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0 text-[#c4c8d4]" />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-[#6b7280] hover:text-[#f59e0b]"
                          onClick={() => toggleVoice(msg.id, msg.content)}
                          disabled={loadingVoice === msg.id}
                          data-testid={`button-voice-${idx}`}
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {loadingVoice === msg.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : playingMessageId === msg.id ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                          <span className="ml-1.5 text-[10px] tracking-wider uppercase">
                            {playingMessageId === msg.id ? "Stop" : "Play"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start" data-testid="indicator-loading">
                <div className="bg-[#111318] border border-[#1f2330] px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#f59e0b]" />
                  <span
                    className="text-sm text-[#6b7280]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="resize-none bg-[#111318] border-[#1f2330] text-[#e2e4e9] placeholder:text-[#4b5163] focus:border-[#f59e0b]/50"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            rows={2}
            disabled={isLoading}
            data-testid="input-message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isLoading}
            className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0b0d] shrink-0"
            data-testid="button-send"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}