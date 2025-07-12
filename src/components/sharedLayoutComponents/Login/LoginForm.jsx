import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    reset();
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="bg-[#e8f0fe]"
            {...register("email", { required: "Email is required" })}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
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
