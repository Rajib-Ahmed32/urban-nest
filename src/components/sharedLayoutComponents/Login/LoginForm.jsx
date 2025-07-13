import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Globe, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { loginUser, loginWithGoogle } from "../../../services/auth";
import { getUserFromDB } from "../../../services/userAPI";

// Import your auth context hook
import { useAuth } from "../../../context/AuthContext";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Destructure login from your AuthContext
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Step 1: Authenticate user with backend/auth service
      const user = await loginUser({
        email: data.email,
        password: data.password,
      });

      // Step 2: Fetch full user data (including role) from your DB
      const dbUser = await getUserFromDB(user.email);

      // Step 3: Update AuthContext state
      login(dbUser);

      toast({
        title: "Login successful",
        description: `Welcome back, ${dbUser?.name || dbUser?.email}!`,
      });

      reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();

      const dbUser = await getUserFromDB(user.email);

      // Update AuthContext state here as well
      login(dbUser);

      toast({
        title: "Logged in with Google",
        description: `Welcome, ${dbUser?.name || dbUser?.email}!`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loader2 className="animate-spin w-12 h-12 text-white" />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="bg-[#e8f0fe]"
            {...register("email", { required: "Email is required" })}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="bg-[#e8f0fe]"
            {...register("password", { required: "Password is required" })}
            disabled={loading}
          />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="text-right mt-1">
            <Link className="text-xs text-primary hover:underline underline-offset-2">
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="my-4 flex items-center justify-center gap-2 text-muted-foreground">
        <div className="h-px bg-border w-full" />
        <span className="text-xs">OR</span>
        <div className="h-px bg-border w-full" />
      </div>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="w-[220px] mx-auto text-xs flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        disabled={loading}
      >
        <Globe className="h-4 w-4 text-red-600" />
        <span className="font-semibold text-sm">Continue with Google</span>
      </Button>

      <p className="text-sm text-center mt-4 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-primary hover:underline underline-offset-4"
        >
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
