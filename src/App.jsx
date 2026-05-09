// アプリのルーティング設定
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PropertiesPage from './pages/PropertiesPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ルートへのアクセスはログイン画面へリダイレクト */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 物件一覧はログイン必須 */}
          <Route
            path="/properties"
            element={
              <PrivateRoute>
                <PropertiesPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
