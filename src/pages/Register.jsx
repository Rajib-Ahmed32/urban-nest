import RegisterForm from "../components/sharedLayoutComponents/register/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 bg-[hsl(var(--muted))] dark:bg-[hsl(var(--muted)/0.4)] transition-colors">
      <div className="w-full max-w-md p-6 rounded-xl border border-border shadow-xl bg-card text-card-foreground">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Register
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
