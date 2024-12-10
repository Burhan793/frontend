"use client";

const { Button } = require("../../components/ui/button");
const { Card, CardContent, CardDescription, CardHeader, CardTitle } = require("../../components/ui/card");
const { useAuth } = require("../../contexts/AuthContext");

function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to E-Library</CardTitle>
          <CardDescription>Sign in to access the library management system</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={signInWithGoogle} className="w-full">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

module.exports = Login;
