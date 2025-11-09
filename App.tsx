import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    );
};

export default App;