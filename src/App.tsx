import { createRoot } from 'react-dom/client'
import './index.css'
import ChatInterface from './components/ChatInterface';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 h-screen">
        <ChatInterface />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
