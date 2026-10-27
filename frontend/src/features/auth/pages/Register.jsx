import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.hook';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    fullname: '',
    contact: '',
    email: '',
    password: '',
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'contact') {
      // Allow only numbers and max 10 digits
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Full name must be at least 2 characters';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = '10-digit contact number is required';
    } else if (formData.contact.length !== 10) {
      newErrors.contact = 'Enter a valid 10-digit Indian phone number';
    } else if (!/^[6-9]\d{9}$/.test(formData.contact)) {
      newErrors.contact = 'Number should start with 6, 7, 8, or 9';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError('');
    setSuccessMessage('');

    try {
      await handleRegister({
        fullname: formData.fullname.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        contact: `+91${formData.contact.trim()}`,
        isSeller: formData.isSeller,
      });

      setSuccessMessage('Registration successful! Welcome to Fabruna.');
    } catch (err) {
      setServerError(err?.message || 'Something went wrong during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen lg:h-screen w-full bg-[#0a0a0c] text-white font-['Plus_Jakarta_Sans',sans-serif] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden selection:bg-[#facc15] selection:text-black">
      
      {/* ============================================================== */}
      {/* MOBILE ONLY BACKGROUND: Model behind the form with low opacity */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 lg:hidden overflow-hidden pointer-events-none">
        <img
          src="/fabruna_model_left.jpg"
          alt="Fabruna Fashion Background"
          className="w-full h-full object-cover object-top opacity-20 filter brightness-[0.7] contrast-[1.15]"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/85 to-[#0a0a0c]" />
      </div>

      {/* ============================================================== */}
      {/* DESKTOP LEFT SIDE: Male Model Showcase (Hidden on mobile)      */}
      {/* ============================================================== */}
      <section className="hidden lg:flex relative w-[42%] xl:w-[40%] h-full shrink-0 bg-black overflow-hidden flex-col justify-between p-10 lg:p-12 z-10">
        
        {/* Model Background Image on Desktop */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="/fabruna_model_left.jpg"
            alt="Fabruna Men's Fashion Model"
            className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.1] scale-100"
          />
          {/* Subtle dark vignettes for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0c] opacity-70" />
        </div>

        {/* Brand Logo at Top Left */}
        <div className="relative z-20">
          <Link to="/" className="inline-block group">
            <span className="text-2xl font-black tracking-widest text-[#facc15] uppercase font-sans">
              FABRUNA<span className="text-[#facc15]">.</span>
            </span>
          </Link>
        </div>

        {/* Editorial Text at Bottom Left */}
        <div className="relative z-20 max-w-sm">
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.12]">
            Define your <br />
            <span className="text-[#facc15]">aesthetic.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light leading-relaxed">
            Join the exclusive movement of creators and brands redefining the modern fashion landscape.
          </p>
        </div>

      </section>

      {/* ============================================================== */}
      {/* RIGHT SIDE (OR FULL ON MOBILE): Registration Form              */}
      {/* ============================================================== */}
      <section className="w-full lg:w-[58%] xl:w-[60%] flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 py-10 lg:py-4 relative z-10">
        
        <div className="w-full max-w-[420px] mx-auto">
          
          {/* Mobile Brand Logo Header (Visible only on mobile/tablet) */}
          <div className="lg:hidden mb-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black tracking-widest text-[#facc15] uppercase font-sans">
                FABRUNA<span className="text-[#facc15]">.</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-7">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#facc15] uppercase mb-1.5">
              WELCOME TO FABRUNA
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight">
              Elevate Your Style
            </h1>
          </div>

          {/* Feedback Alerts */}
          {serverError && (
            <div className="mb-4 p-2.5 bg-red-950/50 border border-red-800/60 rounded text-red-300 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-2.5 bg-yellow-950/50 border border-[#facc15]/60 rounded text-[#facc15] text-xs flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-[#facc15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full bg-transparent border-b border-zinc-800 pb-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#facc15] focus:outline-none transition-colors"
              />
              {errors.fullname && (
                <p className="mt-1 text-[11px] text-red-400">{errors.fullname}</p>
              )}
            </div>

            {/* 2. Contact Number (+91 Indian 10-digit number) */}
            <div>
              <label
                htmlFor="contact"
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Contact Number
              </label>
              <div className="flex items-center border-b border-zinc-800 focus-within:border-[#facc15] transition-colors pb-2">
                <span className="text-sm font-medium text-zinc-400 mr-2 select-none shrink-0">
                  +91
                </span>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="98765 43210"
                  className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>
              {errors.contact && (
                <p className="mt-1 text-[11px] text-red-400">{errors.contact}</p>
              )}
            </div>

            {/* 3. Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full bg-transparent border-b border-zinc-800 pb-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#facc15] focus:outline-none transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>
              )}
            </div>

            {/* 4. Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-zinc-400 mb-1"
              >
                Password
              </label>
              <div className="relative flex items-center border-b border-zinc-800 focus-within:border-[#facc15] transition-colors pb-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none tracking-wider pr-8"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 text-zinc-500 hover:text-[#facc15] transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-400">{errors.password}</p>
              )}
            </div>

            {/* 5. Checkbox: Register as seller */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  id="isSeller"
                  name="isSeller"
                  type="checkbox"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-sm border-zinc-700 bg-zinc-900 text-[#facc15] accent-[#facc15] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                  Register as seller
                </span>
              </label>
            </div>

            {/* 6. Sign Up Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#facc15] hover:bg-[#eab308] active:scale-[0.99] text-black font-bold py-3.5 px-4 rounded-sm transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>

            {/* 7. Already have an account? signin */}
            <div className="text-center pt-2">
              <p className="text-xs text-zinc-400 font-light">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-white hover:text-[#facc15] font-medium underline underline-offset-4 decoration-zinc-700 hover:decoration-[#facc15] transition-colors ml-0.5"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </form>

        </div>

      </section>

    </div>
  );
};

export default Register;