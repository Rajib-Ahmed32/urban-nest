import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Globe, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ImageUploader from "./ImageUploader";
import { registerUser, loginWithGoogle } from "../../../services/auth";
import { saveUserToDB, getUserFromDB } from "../../../services/userAPI";

const RegisterForm = () => {
  const [uploadedImage, setUploadedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

    setLoading(true);

    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        photoURL: uploadedImage,
      });

      await saveUserToDB({
        name: data.name,
        email: data.email,
        photoURL: uploadedImage,
        role: "user",
      });

      toast({
        title: "Registration successful",
        description: `Welcome, ${user.displayName}!`,
      });

      reset();
      setUploadedImage("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();

      await saveUserToDB({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      });

      const dbUser = await getUserFromDB(user.email);
      login(dbUser);

      toast({
        title: "Registered with Google",
        description: `Welcome, ${dbUser.name || dbUser.email}!`,
      });

      navigate(`/dashboard/${dbUser.role}`);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Google registration failed",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            className="bg-[#e8f0fe]"
            {...register("name", { required: "Name is required" })}
            disabled={loading}
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
            disabled={loading}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="upload">Upload Photo</Label>
          <ImageUploader onImageUpload={setUploadedImage} disabled={loading} />
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
            disabled={loading}
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
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
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
        disabled={loading}
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
