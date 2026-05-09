// 認証状態をアプリ全体で共有するためのContext
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // 初回ロード時にセッション確認が完了するまでローディング状態を保持する
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 現在のセッションを取得する
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 認証状態の変化を監視する（ログイン・ログアウト・トークン更新）
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password })

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// カスタムフック：コンポーネントから認証情報へ簡単にアクセスする
export function useAuth() {
  return useContext(AuthContext)
}
