import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="workflow-app">
      <header className="workflow-header">
        <PipelineToolbar />
      </header>
      <main className="workflow-canvas">
        <PipelineUI />
      </main>
      <footer className="workflow-footer">
        <SubmitButton />
      </footer>
    </div>
  );
}

export default App;
