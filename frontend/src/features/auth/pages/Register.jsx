import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.hook';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    contact: '',
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
      // Allow only numbers and max 10 digits for Indian phone number
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
      newErrors.fullname = 'Please enter your full name';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Please create a password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Please enter your 10-digit mobile number';
    } else if (formData.contact.length !== 10) {
      newErrors.contact = 'Enter a valid 10-digit Indian phone number';
    } else if (!/^[6-9]\d{9}$/.test(formData.contact)) {
      newErrors.contact = 'Indian numbers should begin with 6, 7, 8, or 9';
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
      setServerError(err?.message || 'Something went wrong during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate password strength indicator
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/\d/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const passwordScore = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen w-full bg-[#0b0b0d] text-[#e5e2e3] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between overflow-x-hidden selection:bg-[#d4af37] selection:text-[#0b0b0d]">
      {/* Split Layout Container */}
      <div className="w-full flex-grow flex flex-col lg:flex-row min-h-screen">
        
        {/* ============================================================== */}
        {/* LEFT SECTION: Registration Form                              */}
        {/* ============================================================== */}
        <section className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-8 lg:py-12 bg-[#0d0d10] border-r border-[#222126] z-10 relative">
          
          {/* Subtle gold ambient glow in background */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top Bar: Brand Crest & Private Gate status */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1c1c22]">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-[#d4af37] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                <span className="text-[11px] font-medium tracking-[0.25em] text-[#d4af37] uppercase">
                  Private Access
                </span>
              </div>
            </div>

            {/* Brand Header */}
            <div className="mt-8 mb-6">
              <div className="inline-block">
                <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#f5d77f] via-[#d4af37] to-[#b8860b] uppercase font-normal">
                  FABRUNA
                </h1>
                <p className="text-[10px] sm:text-[11px] tracking-[0.35em] text-zinc-400 uppercase font-medium mt-1">
                  Haute Couture • Luxury Apparel
                </p>
              </div>

              <div className="mt-6">
                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-[28px] text-[#f4f4f5] font-normal tracking-tight">
                  Create Your Account
                </h2>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed font-light max-w-md">
                  Join the Fabruna circle for bespoke craftsmanship, private runway edits, and personalized styling privileges.
                </p>
              </div>
            </div>

            {/* Server Feedback Messages */}
            {serverError && (
              <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/60 rounded text-red-300 text-xs flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-3.5 bg-amber-950/40 border border-[#d4af37]/60 rounded text-[#f5d77f] text-xs flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              
              {/* 1. Full Legal Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-[11px] font-medium tracking-[0.15em] text-zinc-300 uppercase mb-1.5"
                >
                  Full Name <span className="text-[#d4af37]">*</span>
                </label>
                <div className="relative flex items-center bg-[#131316] border border-[#27272b] focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]/40 transition-all duration-200">
                  <span className="pl-3.5 pr-1 text-zinc-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent px-3 py-3 text-sm text-[#f4f4f5] placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>
                {errors.fullname && (
                  <p className="mt-1 text-xs text-amber-400/90 font-light flex items-center gap-1">
                    <span>•</span> {errors.fullname}
                  </p>
                )}
              </div>

              {/* 2. Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-medium tracking-[0.15em] text-zinc-300 uppercase mb-1.5"
                >
                  Email Address <span className="text-[#d4af37]">*</span>
                </label>
                <div className="relative flex items-center bg-[#131316] border border-[#27272b] focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]/40 transition-all duration-200">
                  <span className="pl-3.5 pr-1 text-zinc-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-transparent px-3 py-3 text-sm text-[#f4f4f5] placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-amber-400/90 font-light flex items-center gap-1">
                    <span>•</span> {errors.email}
                  </p>
                )}
              </div>

              {/* 3. Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-medium tracking-[0.15em] text-zinc-300 uppercase"
                  >
                    Password <span className="text-[#d4af37]">*</span>
                  </label>
                  {formData.password && (
                    <span className="text-[10px] tracking-wider uppercase text-zinc-400">
                      {passwordScore <= 1 && <span className="text-amber-500">Fair</span>}
                      {passwordScore === 2 && <span className="text-yellow-400">Good</span>}
                      {passwordScore >= 3 && <span className="text-emerald-400">Strong</span>}
                    </span>
                  )}
                </div>

                <div className="relative flex items-center bg-[#131316] border border-[#27272b] focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]/40 transition-all duration-200">
                  <span className="pl-3.5 pr-1 text-zinc-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full bg-transparent px-3 py-3 text-sm text-[#f4f4f5] placeholder:text-zinc-600 focus:outline-none tracking-wide"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="pr-3.5 pl-2 text-zinc-400 hover:text-[#d4af37] transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      // Eye Off Icon
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      // Eye Icon
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password strength mini bar */}
                {formData.password && (
                  <div className="flex gap-1.5 mt-2">
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordScore >= 1 ? 'bg-[#d4af37]' : 'bg-zinc-800'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordScore >= 2 ? 'bg-[#d4af37]' : 'bg-zinc-800'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordScore >= 3 ? 'bg-[#e5c158]' : 'bg-zinc-800'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordScore >= 4 ? 'bg-emerald-400' : 'bg-zinc-800'}`} />
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1 text-xs text-amber-400/90 font-light flex items-center gap-1">
                    <span>•</span> {errors.password}
                  </p>
                )}
              </div>

              {/* 4. Contact Number (+91 Indian 10-digit number) */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-[11px] font-medium tracking-[0.15em] text-zinc-300 uppercase mb-1.5"
                >
                  Contact Number <span className="text-[#d4af37]">*</span>
                </label>
                <div className="relative flex items-center bg-[#131316] border border-[#27272b] focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]/40 transition-all duration-200">
                  {/* Indian Country Code Prefix */}
                  <div className="flex items-center gap-1.5 pl-3.5 pr-3 py-3 border-r border-[#27272b] select-none shrink-0 bg-[#16161a]">
                    <span className="text-sm" role="img" aria-label="India flag">🇮🇳</span>
                    <span className="text-xs font-semibold text-[#f4f4f5] tracking-wider">+91</span>
                  </div>

                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    className="w-full bg-transparent px-3 py-3 text-sm text-[#f4f4f5] placeholder:text-zinc-600 focus:outline-none tracking-widest"
                  />

                  <span className="pr-3.5 text-zinc-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                </div>
                {errors.contact && (
                  <p className="mt-1 text-xs text-amber-400/90 font-light flex items-center gap-1">
                    <span>•</span> {errors.contact}
                  </p>
                )}
              </div>

              {/* 5. Checkbox: Register as seller */}
              <div className="pt-2 pb-1">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      id="isSeller"
                      name="isSeller"
                      type="checkbox"
                      checked={formData.isSeller}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded-sm border border-zinc-600 bg-[#16161a] peer-checked:bg-[#d4af37] peer-checked:border-[#d4af37] peer-focus:ring-2 peer-focus:ring-[#d4af37]/30 transition-all flex items-center justify-center">
                      <svg
                        className={`w-3 h-3 text-black stroke-[3] transition-transform duration-200 ${
                          formData.isSeller ? 'scale-100' : 'scale-0'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-[#f5d77f] transition-colors">
                      Register as seller
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-0.5 font-light leading-snug">
                      List your apparel collections and reach fashion buyers through Fabruna Marketplace.
                    </span>
                  </div>
                </label>
              </div>

              {/* 6. Sign Up CTA Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-gradient-btn w-full py-3.5 px-6 rounded-sm text-xs sm:text-sm uppercase tracking-[0.2em] text-[#0b0b0d] font-bold cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
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

              {/* 7. Bottom Text: Already have an account? signin */}
              <div className="text-center pt-2">
                <p className="text-xs text-zinc-400 font-light">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#d4af37] hover:text-[#f5d77f] font-medium tracking-wide underline underline-offset-4 decoration-[#d4af37]/40 hover:decoration-[#d4af37] transition-colors ml-0.5"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

            </form>
          </div>

          {/* Couture Security & Assurance Footer */}
          <div className="mt-8 pt-6 border-t border-[#1c1c22] flex flex-wrap items-center justify-between gap-3 text-zinc-500 text-[11px]">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Authentic Designer Garments</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Encrypted Data Privacy</span>
            </div>
          </div>

        </section>

        {/* ============================================================== */}
        {/* RIGHT SECTION: Editorial Showcase with Stylish Male Model      */}
        {/* ============================================================== */}
        <section className="w-full lg:w-[50%] xl:w-[52%] relative min-h-[500px] lg:min-h-screen bg-[#070709] flex items-end overflow-hidden">
          
          {/* Editorial Model Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/fabruna_model.jpg"
              alt="Fabruna Menswear Couture Model in Obsidian & Gold Tailoring"
              className="w-full h-full object-cover object-top filter brightness-[0.96] contrast-[1.04] scale-100 lg:scale-[1.02] transition-transform duration-1000 ease-out hover:scale-[1.04]"
              loading="eager"
            />

            {/* Seamless obsidian & gold atmospheric vignettes */}
            {/* Left fade towards form */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d10] via-transparent to-transparent lg:block hidden w-44" />
            {/* Bottom fade for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />
            {/* Top vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/60 via-transparent to-transparent h-48" />
          </div>

          {/* Top-Right Seasonal Lookbook Badge */}
          <div className="absolute top-8 right-8 z-20 hidden sm:flex flex-col items-end">
            <div className="px-3.5 py-1.5 border border-[#d4af37]/40 bg-[#0b0b0d]/75 backdrop-blur-md rounded-sm shadow-xl">
              <span className="text-[10px] tracking-[0.25em] text-[#f5d77f] uppercase font-semibold">
                Haute Pret Edition • 2025/26
              </span>
            </div>
            <span className="text-[9px] tracking-[0.3em] text-zinc-400 mt-1.5 uppercase font-medium">
              Bespoke Atelier Series
            </span>
          </div>

          {/* Editorial Monograph Plaque & Quote at the Bottom */}
          <div className="relative z-20 w-full p-8 sm:p-12 lg:p-14 flex flex-col justify-end">
            <div className="max-w-xl">
              {/* Season Tag */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1px] bg-[#d4af37]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                  The Obsidian &amp; Gold Collection
                </span>
              </div>

              {/* Couture Statement Quote */}
              <blockquote className="font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-[34px] leading-tight text-[#f4f4f5] italic font-normal tracking-tight mb-5">
                “Crafted for those who command distinction.”
              </blockquote>

              {/* Atelier Details Grid */}
              <div className="flex items-center gap-6 pt-4 border-t border-zinc-800/80">
                <div>
                  <p className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase">Silhouette</p>
                  <p className="text-xs sm:text-sm text-zinc-200 font-medium mt-0.5">Bespoke Gold Jacquard Suit</p>
                </div>
                <div className="w-[1px] h-7 bg-zinc-800" />
                <div>
                  <p className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase">Provenance</p>
                  <p className="text-xs sm:text-sm text-zinc-200 font-medium mt-0.5">Fabruna Design Studio</p>
                </div>
                <div className="w-[1px] h-7 bg-zinc-800 hidden sm:block" />
                <div className="hidden sm:block">
                  <p className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase">Edition</p>
                  <p className="text-xs sm:text-sm text-[#d4af37] font-medium mt-0.5">Limited Runway Piece</p>
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

export default Register;