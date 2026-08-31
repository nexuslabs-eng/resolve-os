import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet /> 
    </div>
  );
}

export default App