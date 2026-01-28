import { Link } from "react-router";
import { useContext, useState, type FC } from "react"
import { useForm } from "react-hook-form";
import type { BaseUser } from "../types/BaseUser";
import { CommonContext } from "../contexts/commonContext";
import { Eye, EyeClosedIcon } from "lucide-react";
import { useNavigate } from "react-router";

const Signin: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<BaseUser>()
    const ctx = useContext(CommonContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data: BaseUser) => {
        localStorage.setItem("access_token", "dummy_token");
        console.log("Sign in data:", data); 
        navigate("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-glass rounded-2xl shadow-xl p-8 border border-blue-100 backdrop-blur">
                <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-2 tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 text-center mb-6">Sign in to continue</p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: ctx?.emailPattern || /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", 
                                { required: "Password is required",
                                    pattern: {
                                    value: ctx?.passwordPattern || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: "Enter a valid password",
                                },
                                 })}
                            className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none transition pr-12"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium focus:outline-none"
                            onClick={() => setShowPassword((v) => !v)}
                        >
                            {!showPassword ? <Eye/> : <EyeClosedIcon/>}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow transition">
                        Sign In
                    </button>
                </form>

                <div className="flex justify-between text-sm text-gray-500 mt-4">
                    <span className="cursor-pointer hover:underline">Forgot password?</span>
                    <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Signin;