
// Simulação de processamento de documentos e embeddings
export interface Document {
  id: string;
  title: string;
  content: string;
  metadata: {
    source: string;
    type: 'pdf' | 'txt' | 'md';
    created: Date;
  };
}

export interface SearchResult {
  document: Document;
  score: number;
  relevantChunk: string;
}

// Base de conhecimento simulada sobre React e desenvolvimento
const REACT_KNOWLEDGE_BASE: Document[] = [
  {
    id: '1',
    title: 'React 18 - useMemo Hook',
    content: `
    O useMemo é um hook do React que memoriza o resultado de uma computação cara.
    
    Sintaxe: const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    
    Use useMemo quando:
    - Você tem cálculos custosos que não precisam ser refeitos a cada render
    - Você quer evitar recriação desnecessária de objetos ou arrays
    - Você quer otimizar componentes filhos que dependem de props
    
    Exemplo:
    function ExpensiveComponent({ items }) {
      const expensiveValue = useMemo(() => {
        return items.reduce((sum, item) => sum + item.value, 0);
      }, [items]);
      
      return <div>{expensiveValue}</div>;
    }
    `,
    metadata: {
      source: 'react-docs',
      type: 'md',
      created: new Date('2024-01-01')
    }
  },
  {
    id: '2',
    title: 'Componente Button - Boas Práticas',
    content: `
    Exemplo de um componente Button reutilizável:
    
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
    `,
    metadata: {
      source: 'components-guide',
      type: 'md',
      created: new Date('2024-01-02')
    }
  },
  {
    id: '3',
    title: 'React Hooks - useState e useEffect',
    content: `
    useState e useEffect são os hooks fundamentais do React.
    
    useState para gerenciar estado:
    const [count, setCount] = useState(0);
    
    useEffect para efeitos colaterais:
    useEffect(() => {
      document.title = \`Count: \${count}\`;
    }, [count]);
    
    Regras dos Hooks:
    1. Sempre chame hooks no nível superior
    2. Não chame hooks dentro de loops, condições ou funções aninhadas
    3. Use apenas em componentes React ou hooks customizados
    `,
    metadata: {
      source: 'react-fundamentals',
      type: 'md',
      created: new Date('2024-01-03')
    }
  }
];

export function searchDocuments(query: string, k: number = 6, scoreThreshold: number = 0.2): SearchResult[] {
  const normalizedQuery = query.toLowerCase();
  
  const results: SearchResult[] = REACT_KNOWLEDGE_BASE
    .map(doc => {
      const contentLower = doc.content.toLowerCase();
      const titleLower = doc.title.toLowerCase();
      
      // Simula cálculo de similaridade
      let score = 0;
      
      // Pontuação por palavras-chave no título
      if (titleLower.includes(normalizedQuery)) score += 0.8;
      if (titleLower.includes('react')) score += 0.3;
      if (titleLower.includes('component')) score += 0.3;
      
      // Pontuação por palavras-chave no conteúdo
      if (contentLower.includes(normalizedQuery)) score += 0.6;
      if (contentLower.includes('usememo') && normalizedQuery.includes('memo')) score += 0.7;
      if (contentLower.includes('button') && normalizedQuery.includes('button')) score += 0.7;
      if (contentLower.includes('hook') && normalizedQuery.includes('hook')) score += 0.5;
      
      // Encontra chunk relevante
      const sentences = doc.content.split('\n').filter(s => s.trim());
      const relevantChunk = sentences.find(s => 
        s.toLowerCase().includes(normalizedQuery)
      ) || sentences[0] || doc.content.substring(0, 200);
      
      return {
        document: doc,
        score,
        relevantChunk: relevantChunk.trim()
      };
    })
    .filter(result => result.score >= scoreThreshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  
  return results;
}

export function generateContextFromResults(results: SearchResult[]): string {
  if (results.length === 0) return '';
  
  return results
    .map((result, index) => 
      `[Documento ${index + 1}]: ${result.document.title}\n${result.relevantChunk}`
    )
    .join('\n\n');
}
