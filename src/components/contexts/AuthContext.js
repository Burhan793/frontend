import React, { createContext, useContext, useState, useEffect } from "react"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../config/firebase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      // Send user data to your backend
      await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          uid: result.user.uid,
        }),
      })
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

