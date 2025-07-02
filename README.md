
# Converse com seus Documentos 📚

Sistema RAG (Retrieval-Augmented Generation) para consulta inteligente de documentação React, construído com Vite + React 18 + TypeScript.

## 🚀 Funcionalidades

- **Chat Inteligente**: Interface de conversação com estados bem definidos (idle/loading/streaming/error)
- **RAG System**: Busca contextual em documentos com score threshold
- **Estados Visuais**: LoadingSpinner e ErrorBanner usando Shadcn/UI tokens
- **Acessibilidade**: Foco automático, ARIA labels e navegação por teclado
- **Streaming**: Simulação de streaming de tokens para melhor UX
- **Fallback**: Respostas inteligentes quando não há contexto suficiente

## 🛠️ Stack Tecnológica

- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS
- **UI**: Shadcn/UI Design System
- **Processamento**: Simulação de LangChain + ChromaDB
- **Estado**: Hooks customizados com TypeScript

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm/yarn/pnpm

### Instalação
\`\`\`bash
# Clone o projeto
git clone <repository-url>
cd converse-docs

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
\`\`\`

### Estrutura do Projeto
\`\`\`
src/
├── components/
│   ├── ui/
│   │   ├── LoadingSpinner.tsx    # Componente de loading
│   │   ├── ErrorBanner.tsx       # Banner de erro
│   │   └── ...                   # Outros componentes Shadcn
│   └── ChatInterface.tsx         # Interface principal do chat
├── hooks/
│   └── useRAGChat.ts            # Hook principal do sistema RAG
├── lib/
│   ├── documentProcessor.ts     # Processamento de documentos
│   └── utils.ts                 # Utilitários
└── data/
    └── samples.json             # Amostras para avaliação
\`\`\`

## 🧪 Testes Rápidos

Execute estes testes para validar o sistema:

1. **"Como uso useMemo no React 18?"**
   - ✅ Deve retornar explicação detalhada com exemplos de código
   - ✅ Deve incluir quando usar e boas práticas

2. **"Quero um componente de Button"**
   - ✅ Deve retornar código TypeScript completo
   - ✅ Deve incluir variants, sizes e props

3. **"Qual a capital do Brasil?"**
   - ✅ Deve retornar fallback: "Não encontrei essa informação..."
   - ✅ Deve sugerir tópicos alternativos

## Sistema de Avaliação

### Métricas Implementadas

1. **Context Recall**: Capacidade de recuperar informações relevantes
2. **Answer Relevancy**: Relevância da resposta para a pergunta
3. **Faithfulness**: Fidelidade ao contexto dos documentos

### Como Avaliar

\`\`\`bash
# Execute os testes de avaliação
npm run eval

# Visualize métricas no console
# Scores variam de 0.0 a 1.0 (maior = melhor)
\`\`\`

### Interpretação das Métricas

- **Context Recall > 0.8**: Excelente recuperação de contexto
- **Answer Relevancy > 0.7**: Respostas bem alinhadas
- **Faithfulness > 0.8**: Alta fidelidade aos documentos

## Avaliação de Usabilidade

### System Usability Scale (SUS)

Execute o questionário SUS com usuários reais:

1. **Frequência de Uso**: "Eu usaria este sistema frequentemente"
2. **Complexidade**: "Achei o sistema desnecessariamente complexo"
3. **Facilidade**: "Achei o sistema fácil de usar"
4. **Suporte**: "Eu precisaria de ajuda para usar este sistema"
5. **Integração**: "As funções estão bem integradas"

**Escala**: 1 (Discordo totalmente) a 5 (Concordo totalmente)

**Interpretação**:
- SUS > 80: Excelente usabilidade
- SUS 60-80: Boa usabilidade  
- SUS < 60: Precisa melhorias

### Time on Task

Meça o tempo para completar tarefas típicas:

1. **Busca Básica**: "Encontre informações sobre useMemo" (< 30s)
2. **Busca Específica**: "Como criar um componente Button?" (< 45s)
3. **Exploração**: "Navegue pelos tópicos disponíveis" (< 60s)

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Crie um arquivo \`.env.local\`:

\`\`\`env
# OpenAI (para produção)
OPENAI_API_KEY=sua_chave_aqui

# ChromaDB (para produção)
CHROMA_URL=http://localhost:8000

# Analytics (opcional)
VERCEL_ANALYTICS_TOKEN=seu_token_aqui
\`\`\`

### Scripts Disponíveis

\`\`\`bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build para produção
npm run preview   # Preview do build
npm run eval      # Executar avaliações
npm run lint      # Linting do código
\`\`\`

## Deploy em Produção

### Vercel (Recomendado)

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente no dashboard
\`\`\`

### Netlify

\`\`\`bash
# Build
npm run build

# Deploy manual ou conectar repositório
\`\`\`

**Desenvolvido com ❤️ usando React 18 + TypeScript + Tailwind CSS**
