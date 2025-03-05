import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './features/dashboard/Dashboard';
import CustomerList from './features/customers/CustomerList';
import CustomerDetail from './features/customers/CustomerDetail';
import SalesList from './features/sales/SalesList';
import SalesDetail from './features/sales/SalesDetail';
import TaskList from './features/tasks/TaskList';
import TaskDetail from './features/tasks/TaskDetail';
import LoginPage from './features/auth/LoginPage';
import { KnowledgeBase } from './features/knowledgebase/pages/KnowledgeBase';
import ReportList from './features/reports/ReportList';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import theme from './theme';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <PrivateRoute
                  element={
                    <MainLayout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/customers/:id" element={<CustomerDetail />} />
                        <Route path="/sales" element={<SalesList />} />
                        <Route path="/sales/:id" element={<SalesDetail />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                        <Route path="/knowledgebase" element={<KnowledgeBase />} />
                        <Route path="/reports" element={<ReportList />} />
                      </Routes>
                    </MainLayout>
                  }
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
