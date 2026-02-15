"use client";




import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

// =====================
// Zod Schemas
// =====================
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min length is 6"),
});

const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

const verifyCodeSchema = z.object({
  resetCode: z.string().length(6, "Code must be 6 digits"),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6, "Min length is 6"),
});

// =====================
// Component
// =====================
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"login" | "forgot" | "verify" | "reset">(
    "login"
  );
  const [emailForReset, setEmailForReset] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // -------- Login --------
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl,
      redirect: true,
    });

    setIsLoading(false);
  }

  // -------- Forgot Password --------
  const forgotForm = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onForgot(values: z.infer<typeof forgotSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.statusMsg === "success") {
        setEmailForReset(values.email);
        setStep("verify");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // -------- Verify Code --------
  const verifyForm = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  async function onVerify(values: z.infer<typeof verifyCodeSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ resetCode: values.resetCode }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.statusMsg === "success") {
        setStep("reset");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // -------- Reset Password --------
  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  // Inject email after verify
  useEffect(() => {
    if (step === "reset") {
      resetForm.reset({
        email: emailForReset,
        newPassword: "",
      });
    }
  }, [step, emailForReset, resetForm]);

  async function onReset(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: emailForReset,
            newPassword: values.newPassword,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.token) {
        // auto login after reset
        await signIn("credentials", {
          email: emailForReset,
          password: values.newPassword,
          callbackUrl: "/",
          redirect: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // =====================
  // UI
  // =====================
  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        {step === "login"
          ? "Login Now"
          : step === "forgot"
          ? "Forgot Password"
          : step === "verify"
          ? "Verify Reset Code"
          : "Reset Password"}
      </h1>

      <Card className="p-8 w-full max-w-md shadow-lg rounded-2xl bg-white">
        {/* LOGIN */}
        {step === "login" && (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full bg-emerald-500 hover:bg-emerald-800" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin mr-2 h-4 w-4" />}
                Login
              </Button>

              <div className="flex justify-between text-sm">
                <p onClick={() => setStep("forgot")} className="text-blue-500 cursor-pointer">
                  Forgot Password?
                </p>
                <Link href="/register" className="text-blue-500">
                  Register
                </Link>
              </div>
            </form>
          </Form>
        )}

        {/* FORGOT */}
        {step === "forgot" && (
          <Form {...forgotForm}>
            <form onSubmit={forgotForm.handleSubmit(onForgot)} className="space-y-5">
              <FormField
                control={forgotForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin mr-2 h-4 w-4" />}
                Send Reset Code
              </Button>
            </form>
          </Form>
        )}

        {/* VERIFY */}
        {step === "verify" && (
          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-5">
              <FormField
                control={verifyForm.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin mr-2 h-4 w-4" />}
                Verify Code
              </Button>
            </form>
          </Form>
        )}

        {/* RESET */}
        {step === "reset" && (
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(onReset)} className="space-y-5">
              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin mr-2 h-4 w-4" />}
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}