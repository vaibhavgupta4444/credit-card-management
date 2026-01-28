import { Link } from "react-router";
import { useContext, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import type { ISignup } from "../types/ISignup";
import { CommonContext } from "../contexts/commonContext";
import { Eye, EyeClosedIcon } from "lucide-react";
import { useNavigate } from "react-router";

const Signup: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISignup>();
    const ctx = useContext(CommonContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data: ISignup) => {
        localStorage.setItem("access_token", "dummy_token");
        console.log("Sign up data:", data);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-glass rounded-2xl shadow-xl p-8 border border-blue-100 backdrop-blur">
                <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-2 tracking-tight">Create Account</h1>
                <p className="text-gray-500 text-center mb-6">Join us and manage your cards smarter</p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}

                    <select
                        {...register("gender", { required: "Gender is required" })}
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none transition"
                        defaultValue=""
                    >
                        <option value="" disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter a valid 10-digit phone number",
                            },
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

                    <input
                        type="date"
                        placeholder="Date of Birth"
                        {...register("dateOfBirth", { required: "Date of birth is required" })}
                        className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}

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
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: ctx?.passwordPattern || /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
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
                            {showPassword ? <EyeClosedIcon /> : <Eye />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow transition">
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-700 font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Signup;