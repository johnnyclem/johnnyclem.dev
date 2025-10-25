import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Sparkles, Loader2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { ChatPrompt, ChatConversation, ChatMessage } from "@shared/schema";

export function ChatBot() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    if (!conversationId) {
      // Create conversation first, then send message with the new conversation ID
      const newConversation = await createConversationMutation.mutateAsync();
      // Send message using the newly created conversation ID directly
      const response = await apiRequest(
        "POST",
        `/api/chat/conversations/${newConversation.id}/messages`,
        { content }
      );
      await response.json();
      // Invalidate to refresh messages
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
    <Card className="w-full max-w-2xl mx-auto" data-testid="card-chatbot">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <CardTitle data-testid="text-chatbot-title">Ask Me Anything</CardTitle>
        </div>
        <CardDescription data-testid="text-chatbot-description">
          Chat with an AI assistant trained on Jonathan's resume, patents, and portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.length === 0 && !messagesLoading && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span data-testid="text-suggested-prompts-label">Suggested questions:</span>
            </div>
            <div className="flex flex-col gap-2">
              {prompts?.map((prompt) => (
                <Button
                  key={prompt.id}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4 whitespace-normal"
                  onClick={() => handlePromptClick(prompt.prompt)}
                  disabled={isLoading}
                  data-testid={`button-prompt-${prompt.sortOrder}`}
                >
                  {prompt.prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {(messages.length > 0 || messagesLoading) && (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2" data-testid="container-messages">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${msg.role}-${idx}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start" data-testid="indicator-loading">
                <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
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
            className="resize-none"
            rows={2}
            disabled={isLoading}
            data-testid="input-message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isLoading}
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
