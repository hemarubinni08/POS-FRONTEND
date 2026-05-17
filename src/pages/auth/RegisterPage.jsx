import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout";
import { registerUser } from "../../services/registerService";
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validatePasswordStrength,
  formatPhoneNumber,
} from "../../utils/helpers";
import { Button, Input } from "../../components/ui";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "phoneNo") {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    if (name === "password" && value) {
      setPasswordStrength(validatePasswordStrength(value));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setServerError("");
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Email is required";
    } else if (!validateEmail(formData.username)) {
      newErrors.username = "Invalid email format";
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (!validatePhone(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      const response = await registerUser({
        name: formData.name,
        username: formData.username,
        phoneNo: formData.phoneNo.replace(/\\D/g, ""),
        password: formData.password,
      });

      if (!response.data.success) {
        setServerError(
          response.data.message || "Registration failed. Please try again."
        );
        return;
      }

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setServerError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (!passwordStrength) return "bg-slate-200";
    const { score } = passwordStrength;
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (!passwordStrength) return "";
    const { score } = passwordStrength;
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    return "Strong";
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Create Account
          </h1>
          <p className="text-slate-500 text-lg">
            Set up your POS account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            containerClassName="w-full"
          />

          <Input
            label="Email"
            type="email"
            name="username"
            placeholder="your@email.com"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
            containerClassName="w-full"
            autoComplete="email"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phoneNo"
            placeholder="(123) 456-7890"
            value={formData.phoneNo}
            onChange={handleChange}
            error={errors.phoneNo}
            required
            containerClassName="w-full"
            autoComplete="tel"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              {passwordStrength && (
                <span
                  className={`text-xs font-semibold ${
                    passwordStrength.score <= 2
                      ? "text-red-600"
                      : passwordStrength.score <= 3
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {getPasswordStrengthText()}
                </span>
              )}
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className={`w-full h-[48px] rounded-2xl border-2 px-4 transition-all outline-none
                ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                }`}
            />
            {passwordStrength && formData.password && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                    style={{
                      width: `${(passwordStrength.score / 5) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {passwordStrength.strength.hasUpperCase &&
                    passwordStrength.strength.hasLowerCase &&
                    passwordStrength.strength.hasNumbers &&
                    passwordStrength.strength.hasSpecialChar &&
                    passwordStrength.strength.isLongEnough
                    ? "Great password strength!"
                    : "Mix uppercase, lowercase, numbers, and special characters"}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className={`w-full h-[48px] rounded-2xl border-2 px-4 transition-all outline-none
                ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {serverError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm"
            >
              {serverError}
            </motion.div>
          )}

          <Button
            type="submit"
            fullWidth
            loading={loading}
            className="h-12 mt-6"
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

export default RegisterPage;