
import { useState } from 'react';
import { searchDocuments, generateContextFromResults } from '@/lib/documentProcessor';

export type ChatState = 'idle' | 'loading' | 'streaming' | 'error';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function useRAGChat() {
  const [state, setState] = useState<ChatState>('idle');
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async (query: string, messages: Message[] = []): Promise<string> => {
    setState('loading');
    setError(null);

    try {
      // Simula delay de busca nos documentos
      await new Promise(resolve => setTimeout(resolve, 800));

      // Busca documentos relevantes
      const searchResults = searchDocuments(query, 6, 0.2);
      const context = generateContextFromResults(searchResults);

      setState('streaming');

      // Simula streaming de resposta
      await new Promise(resolve => setTimeout(resolve, 1200));

      let response: string;

      if (searchResults.length === 0) {
        response = `Não encontrei essa informação específica nos documentos disponíveis. 

Posso ajudar com questões sobre:
• React 18 e seus hooks (useState, useEffect, useMemo, etc.)
• Componentes reutilizáveis e boas práticas
• Desenvolvimento frontend com TypeScript

Tente reformular sua pergunta ou pergunte sobre algum tópico relacionado ao React!`;
      } else {
        // Gera resposta baseada no contexto
        response = generateContextualResponse(query, context, searchResults);
      }

      setState('idle');
      return response;

    } catch (err) {
      console.error('Erro ao gerar resposta:', err);
      setState('error');
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  };

  const retryLastRequest = () => {
    setState('idle');
    setError(null);
  };

  return {
    generateResponse,
    state,
    error,
    retryLastRequest
  };
}

function generateContextualResponse(query: string, context: string, searchResults: any[]): string {
  const queryLower = query.toLowerCase();

  // Respostas específicas baseadas na query
  if (queryLower.includes('usememo') || queryLower.includes('memo')) {
    return `# Como usar useMemo no React 18

O **useMemo** é um hook essencial para otimização de performance no React 18:

## Sintaxe Básica
\`\`\`javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

## Quando usar:
✅ **Cálculos custosos** que não precisam ser refeitos a cada render
✅ **Evitar recriação** desnecessária de objetos ou arrays  
✅ **Otimizar componentes filhos** que dependem de props

## Exemplo prático:
\`\`\`javascript
function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]); // Só recalcula se 'items' mudar
  
  return <div>Total: {expensiveValue}</div>;
}
\`\`\`

## ⚠️ Cuidados:
- Use apenas quando realmente necessário
- O array de dependências é crucial para o funcionamento correto
- Não use para valores simples (strings, números básicos)`;
  }

  if (queryLower.includes('button') || queryLower.includes('componente')) {
    return `# Criando um Componente Button Reutilizável

Aqui está um exemplo completo de um componente Button seguindo boas práticas:

## Código do Componente
\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent'
  };
  
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
\`\`\`

## Como usar:
\`\`\`jsx
// Variações do botão
<Button variant="primary" size="large">Salvar</Button>
<Button variant="outline" size="small">Cancelar</Button>
<Button disabled>Carregando...</Button>
\`\`\`

## 🎯 Boas práticas incluídas:
- **TypeScript** para type safety
- **Variantes** flexíveis (primary, secondary, outline)
- **Tamanhos** responsivos
- **Acessibilidade** com focus e disabled
- **Design tokens** do Tailwind/Shadcn`;
  }

  if (queryLower.includes('hook') || queryLower.includes('usestate') || queryLower.includes('useeffect')) {
    return `# Hooks Fundamentais do React

## useState - Gerenciamento de Estado
\`\`\`javascript
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [items, setItems] = useState([]);
\`\`\`

## useEffect - Efeitos Colaterais
\`\`\`javascript
// Executa após cada render
useEffect(() => {
  document.title = \`Count: \${count}\`;
});

// Executa apenas uma vez (componentDidMount)
useEffect(() => {
  fetchData();
}, []);

// Executa quando 'count' muda
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
\`\`\`

## 📋 Regras dos Hooks:
1. **Sempre** chame hooks no nível superior
2. **Não** chame hooks dentro de loops, condições ou funções aninhadas
3. **Use apenas** em componentes React ou hooks customizados

## Exemplo Completo:
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Contador: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
\`\`\``;
  }

  // Resposta genérica baseada no contexto encontrado
  return `Com base nos documentos encontrados, aqui está a informação relevante:

${context}

---

💡 **Dica**: Se precisar de mais detalhes específicos, tente reformular sua pergunta focando em aspectos particulares do tema.`;
}
