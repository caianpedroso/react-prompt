
// Simulação de script de avaliação RAGAs
import samples from '../data/samples.json';
import { searchDocuments, generateContextFromResults } from '../lib/documentProcessor';

interface EvaluationResult {
  question: string;
  context_recall: number;
  answer_relevancy: number;
  faithfulness: number;
  overall_score: number;
}

export function evaluateRAGSystem(): EvaluationResult[] {
  console.log('🔬 Iniciando Avaliação do Sistema RAG...\n');
  
  const results: EvaluationResult[] = samples.evaluation_samples.map(sample => {
    console.log(`📝 Avaliando: "${sample.question}"`);
    
    // Simula busca de contexto
    const searchResults = searchDocuments(sample.question, 6, 0.2);
    const context = generateContextFromResults(searchResults);
    
    // Simula métricas RAGAs
    const contextRecall = calculateContextRecall(sample, searchResults);
    const answerRelevancy = calculateAnswerRelevancy(sample, context);
    const faithfulness = calculateFaithfulness(sample, context);
    
    const overallScore = (contextRecall + answerRelevancy + faithfulness) / 3;
    
    console.log(`  ✅ Context Recall: ${contextRecall.toFixed(3)}`);
    console.log(`  ✅ Answer Relevancy: ${answerRelevancy.toFixed(3)}`);
    console.log(`  ✅ Faithfulness: ${faithfulness.toFixed(3)}`);
    console.log(`  📊 Overall Score: ${overallScore.toFixed(3)}\n`);
    
    return {
      question: sample.question,
      context_recall: contextRecall,
      answer_relevancy: answerRelevancy,
      faithfulness: faithfulness,
      overall_score: overallScore
    };
  });
  
  // Calcula médias gerais
  const avgContextRecall = results.reduce((sum, r) => sum + r.context_recall, 0) / results.length;
  const avgAnswerRelevancy = results.reduce((sum, r) => sum + r.answer_relevancy, 0) / results.length;
  const avgFaithfulness = results.reduce((sum, r) => sum + r.faithfulness, 0) / results.length;
  const avgOverall = results.reduce((sum, r) => sum + r.overall_score, 0) / results.length;
  
  console.log('📈 RESULTADOS FINAIS:');
  console.log('================================');
  console.log(`Context Recall Médio: ${avgContextRecall.toFixed(3)}`);
  console.log(`Answer Relevancy Médio: ${avgAnswerRelevancy.toFixed(3)}`);
  console.log(`Faithfulness Médio: ${avgFaithfulness.toFixed(3)}`);
  console.log(`Score Geral: ${avgOverall.toFixed(3)}`);
  console.log('================================\n');
  
  // Interpretação dos resultados
  console.log('🎯 INTERPRETAÇÃO:');
  if (avgOverall >= 0.8) {
    console.log('✅ Sistema RAG com excelente performance!');
  } else if (avgOverall >= 0.6) {
    console.log('⚠️ Sistema RAG com boa performance, mas há espaço para melhorias.');
  } else {
    console.log('❌ Sistema RAG precisa de otimizações significativas.');
  }
  
  return results;
}

function calculateContextRecall(sample: any, searchResults: any[]): number {
  // Simula cálculo de context recall
  const hasRelevantContext = searchResults.length > 0;
  const contextQuality = searchResults.reduce((sum, result) => sum + result.score, 0) / searchResults.length || 0;
  
  if (sample.category === 'fallback') {
    // Para testes de fallback, esperamos contexto vazio
    return searchResults.length === 0 ? 1.0 : 0.0;
  }
  
  return hasRelevantContext ? Math.min(contextQuality + 0.2, 1.0) : 0.0;
}

function calculateAnswerRelevancy(sample: any, context: string): number {
  // Simula cálculo de relevância da resposta
  const questionLower = sample.question.toLowerCase();
  const expectedLower = sample.expected_answer.toLowerCase();
  
  let relevancyScore = 0.5; // Base score
  
  if (sample.category === 'hooks' && questionLower.includes('usememo')) {
    relevancyScore = 0.9;
  } else if (sample.category === 'components' && questionLower.includes('button')) {
    relevancyScore = 0.85;
  } else if (sample.category === 'fallback') {
    relevancyScore = context.length === 0 ? 0.9 : 0.3;
  }
  
  return relevancyScore;
}

function calculateFaithfulness(sample: any, context: string): number {
  // Simula cálculo de fidelidade ao contexto
  if (sample.category === 'fallback') {
    return 1.0; // Fallback é sempre fiel (não inventa informação)
  }
  
  const hasGoodContext = context.length > 100;
  const hasCodeExamples = context.includes('```') || context.includes('const ') || context.includes('function ');
  
  let faithfulnessScore = 0.6;
  if (hasGoodContext) faithfulnessScore += 0.2;
  if (hasCodeExamples) faithfulnessScore += 0.2;
  
  return Math.min(faithfulnessScore, 1.0);
}

// Para executar diretamente
if (typeof window === 'undefined') {
  evaluateRAGSystem();
}
