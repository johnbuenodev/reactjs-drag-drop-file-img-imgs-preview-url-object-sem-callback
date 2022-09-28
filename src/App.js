import { useState } from 'react';
import './App.css';
import DragDropFileImage from './components/DragDropFileImage';

function App() {

  return (
    <div className="container">
      <DragDropFileImage fileAction={true} />
    </div>
  );
}

export default App;
