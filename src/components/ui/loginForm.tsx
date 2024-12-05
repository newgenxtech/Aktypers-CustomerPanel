"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import login from "@/assets/img/login.jpg";
import login from "@/assets/img/realistic_image_the_ideas_is_about_tyres.jpeg";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "antd";

export default function LoginForm({ onLogin, loading, setLoading }: { onLogin: (data: { username: string; password: string }) => void, loading: boolean, setLoading: (loading: boolean) => void }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
    setLoading(true);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen
     fade-in-15">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your username below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="name"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full py-2"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input.Password
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full py-2"
              />
            </div>
            <Button type="submit" className="w-full"
              disabled={loading}
            >
              {
                loading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </span>
                ) :
                  "Login"
              }
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <div className="
        hidden
        lg:block
      ">
        <img
          src={login}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div >
  );
}