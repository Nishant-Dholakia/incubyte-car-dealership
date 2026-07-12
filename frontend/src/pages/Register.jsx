import { useState } from "react";
import { Link, useInRouterContext, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { register } from "@/services/authService";
import { toast } from "@/lib/toast";

export function validateForm(form) {
    const errors = {};

    if (!form.email || !form.email.trim()) {
        errors.email = "Email is required";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            errors.email = "Invalid email";
        }
    }

    if (!form.password) {
        errors.password = "Password is required";
    }

    return errors;
}

export default function Register({ onSubmit }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const inRouter = useInRouterContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors before validating
        setErrors({});
        setApiError("");

        const newErrors = validateForm(form);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit?.({
                email: form.email,
                password: form.password,
            });

            setIsLoading(true);
            try {
                await register({
                    email: form.email,
                    password: form.password,
                });
                toast.success("Registration successful");
                navigate("/login");
            } catch (err) {
                const message = err.response?.data?.message || err.message || "Something went wrong";
                setApiError(message);
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[#F8F5F0] px-4 py-12 font-sans">
            <Card className="w-full max-w-[450px] bg-white border border-[#E9E4DA] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 flex flex-col gap-6">
                <CardHeader className="p-0 flex flex-col gap-1.5 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-[#285943]">
                        Create Account
                    </h1>
                    <CardDescription className="text-sm text-[#5B6A60]">
                        Enter your credentials to create an account
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="p-0">
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        {apiError && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium text-center">
                                {apiError}
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                value={form.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20 placeholder:text-[#5B6A60]/50"
                            />
                            {errors.email && (
                                <p className="text-xs font-medium text-red-500 mt-0.5">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20 placeholder:text-[#5B6A60]/50"
                            />
                            {errors.password && (
                                <p className="text-xs font-medium text-red-500 mt-0.5">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-11 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold rounded-xl tracking-wide transition-all duration-200 shadow-md shadow-[#285943]/10 mt-2 disabled:opacity-50"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="p-0 flex justify-center text-sm mt-2">
                    <p className="text-[#5B6A60]">
                        Already have an account?{" "}
                        {inRouter ? (
                            <Link to="/login" className="text-[#C89B3C] hover:text-[#C89B3C]/80 font-semibold underline-offset-4 hover:underline transition-all">
                                Login
                            </Link>
                        ) : (
                            <a href="/login" className="text-[#C89B3C] hover:text-[#C89B3C]/80 font-semibold underline-offset-4 hover:underline transition-all">
                                Login
                            </a>
                        )}
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
