// 未ログインユーザーをログイン画面へリダイレクトする保護ルート
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  // セッション確認中はブランク表示（チラつき防止）
  if (loading) return null

  return user ? children : <Navigate to="/login" replace />
}
