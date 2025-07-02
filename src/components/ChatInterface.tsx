
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { useRAGChat, type Message, type ChatState } from '@/hooks/useRAGChat';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorBanner from '@/components/ui/ErrorBanner';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { generateResponse, state, error, retryLastRequest } = useRAGChat();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus no input quando não está carregando
    if (state === 'idle' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || state === 'loading' || state === 'streaming') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateResponse(input.trim(), messages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      // Error is handled by the hook
    }
  };

  const handleRetry = () => {
    retryLastRequest();
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  const getStateIndicator = (currentState: ChatState) => {
    switch (currentState) {
      case 'loading':
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoadingSpinner size="small" />
            Buscando documentos...
          </div>
        );
      case 'streaming':
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoadingSpinner size="small" />
            Gerando resposta...
          </div>
        );
      case 'error':
        return (
          <ErrorBanner 
            message={error || 'Erro desconhecido'} 
            onRetry={handleRetry}
            className="mb-4"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <Card className="flex-1 flex flex-col p-4 mb-4">
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">Converse com seus Documentos</h1>
              <p className="text-sm text-muted-foreground">
                Sistema RAG para consulta de documentação React
              </p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              disabled={state === 'loading' || state === 'streaming'}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpar Chat
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">

            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('pt-BR')}
                  </p>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4">
          {getStateIndicator(state)}
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta sobre React..."
          disabled={state === 'loading' || state === 'streaming'}
          className="flex-1"
          aria-label="Campo de mensagem"
        />
        <Button 
          type="submit" 
          disabled={state === 'loading' || state === 'streaming' || !input.trim()}
          aria-label="Enviar mensagem"
        >
          {state === 'loading' || state === 'streaming' ? (
            <LoadingSpinner size="small" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
