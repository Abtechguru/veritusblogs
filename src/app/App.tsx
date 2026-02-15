import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background animated-bg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">VERITUS INTERNATIONAL</h2>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GamificationProvider>
          <AppContent />
        </GamificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}