import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { registerUser, loginWithGoogle } from "../../../services/auth";

const RegisterForm = () => {
  const [uploadedImage, setUploadedImage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const validatePassword = (value) => {
    if (!passwordRegex.test(value)) {
      return "Password must have uppercase, lowercase letters and at least 6 characters";
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (!uploadedImage) {
      toast({
        variant: "destructive",
        title: "Upload required",
        description: "Please upload an image.",
      });
      return;
    }

    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        photoURL: uploadedImage,
      });

      toast({
        title: "Registration successful",
        description: `Welcome, ${user.displayName}!`,
      });
      navigate("/");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err.message,
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const user = await loginWithGoogle();
      toast({
        title: "Registered with Google",
        description: `Welcome, ${user.displayName}! Your account has been created.`,
      });
      navigate("/");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Google registration failed",
        description: err.message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            className="bg-[#e8f0fe]"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email address"
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
          <Label htmlFor="upload">Upload Photo</Label>
          <ImageUploader onImageUpload={setUploadedImage} />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-[#e8f0fe]"
            {...register("password", {
              required: "Password is required",
              validate: validatePassword,
            })}
          />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="my-4 flex items-center justify-center gap-2 text-muted-foreground">
        <div className="h-px bg-border w-full" />
        <span className="text-xs">OR</span>
        <div className="h-px bg-border w-full" />
      </div>

      <Button
        type="button"
        onClick={handleGoogleRegister}
        className="w-[220px] mx-auto text-xs flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <Globe className="h-4 w-4 text-red-600" />
        <span className="font-semibold text-sm">Continue with Google</span>
      </Button>

      <p className="text-sm text-center mt-4 text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary hover:underline underline-offset-4"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
