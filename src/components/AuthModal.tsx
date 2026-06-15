import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Phone, User, LogIn, Sparkles, Check } from 'lucide-react';
import { isFirebaseConfigured, syncDatabase, auth } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'login' | 'signup' | 'phone-required';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login'
}) => {
  const { loginWithGoogle, loginMock, signup, updatePhone, userData } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'phone-required'>(initialMode);
  
  // Registration state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Dynamic error context
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto detect if phone is required for active google SSO session
  React.useEffect(() => {
    if (userData && !userData.phone && isOpen) {
      setMode('phone-required');
    } else if (isOpen) {
      setMode(initialMode);
    }
  }, [userData, isOpen, initialMode]);

  if (!isOpen) return null;

  // Handle manual signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please complete all information fields.");
      return;
    }
    
    // Check Indian Phone Numbers / Simple Validation
    if (phone.trim().length < 10) {
      setError("Please enter a valid WhatsApp phone number (minimum 10 digits).");
      return;
    }

    try {
      setIsSubmitting(true);
      await signup(name, email, phone);
      setIsSubmitting(false);

      // Trigger automatic WhatsApp redirect with registration details to owner at 9676939529
      const textMessage = `Hello Sree Hanuman Travels Kadapa!\n\nI have just registered a new member account on your portal:\n\n👤 Name: ${name}\n📧 Email: ${email}\n📱 WhatsApp Contact: ${phone}\n\nPlease verify my profile and activate premium booking capabilities. Thanks!`;
      const encodedMessage = encodeURIComponent(textMessage);
      const ownerWhatsAppNumber = "919676939529";
      const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during registration.");
      setIsSubmitting(false);
    }
  };

  // Handle manual Mock Login
  const handleMockLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please input your email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await loginMock(email);
      setIsSubmitting(false);
      if (success) {
        // Fetch registered profile details and notify owner via WhatsApp at 9676939529
        const users = syncDatabase.getLocalUsers();
        const foundUser = Object.values(users).find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
          const textMessage = `Hello Sree Hanuman Travels Kadapa!\n\nI have just logged in to my member account on your portal:\n\n👤 Name: ${foundUser.fullName}\n📧 Email: ${foundUser.email}\n📱 WhatsApp Contact: ${foundUser.phone}\n\nPlease sync my rental records. Thanks!`;
          const encodedMessage = encodeURIComponent(textMessage);
          const ownerWhatsAppNumber = "919676939529";
          const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank');
        }

        onSuccess?.();
        onClose();
      } else {
        setError("Account not found. Please sign up instead to create a profile!");
      }
    } catch (err: any) {
      setError(err?.message || "Error logging in.");
      setIsSubmitting(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setIsSubmitting(true);
      await loginWithGoogle();
      setIsSubmitting(false);

      // Check if user already exists and has a phone number
      if (isFirebaseConfigured && auth && auth.currentUser) {
        const profile = await syncDatabase.getUser(auth.currentUser.uid);
        if (profile && profile.phone) {
          const textMessage = `Hello Sree Hanuman Travels Kadapa!\n\nI have just logged in via Google on your portal:\n\n👤 Name: ${profile.fullName}\n📧 Email: ${profile.email}\n📱 WhatsApp Contact: ${profile.phone}\n\nPlease sync my rental records. Thanks!`;
          const encodedMessage = encodeURIComponent(textMessage);
          const ownerWhatsAppNumber = "919676939529";
          const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank');
          
          onSuccess?.();
          onClose();
        }
      }
    } catch (err: any) {
      setError(err?.message || "Google Authentication was cancelled or failed.");
      setIsSubmitting(false);
    }
  };

  // Handle finishing phone configuration
  const handleCompletePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phone.trim() || phone.trim().length < 10) {
      setError("Please input a valid WhatsApp number.");
      return;
    }

    try {
      setIsSubmitting(true);
      await updatePhone(phone);
      setIsSubmitting(false);

      // Trigger automatic WhatsApp redirect with complete profile to owner at 9676939529
      const textMessage = `Hello Sree Hanuman Travels Kadapa!\n\nI have completed my profile configuration via Google SSO:\n\n👤 Name: ${userData?.fullName || 'Customer'}\n📧 Email: ${userData?.email || ''}\n📱 WhatsApp Contact: ${phone}\n\nPlease verify my profile. Thanks!`;
      const encodedMessage = encodeURIComponent(textMessage);
      const ownerWhatsAppNumber = "919676939529";
      const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update phone details.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in" id="auth-modal-backdrop">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl transition-all" id="auth-modal-card">
        {/* Decorative Top header */}
        <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
            <h2 className="font-black text-white text-base uppercase tracking-wider">Hanuman Membership</h2>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            id="auth-modal-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form area */}
        <div className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-400 font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Subtext info depending on current state */}
          {!isFirebaseConfigured && mode !== 'phone-required' && (
            <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3.5 text-[11px] text-white/80 leading-relaxed font-bold uppercase tracking-wider">
              ℹ️ Sandbox Access Layer: Registered profiles and inquiries are saved locally in your browser!
            </div>
          )}

          {mode === 'login' && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Welcome Back</h3>
                <p className="text-xs text-white/55 mt-1 font-semibold">Access your Sree Hanuman real-time bookings</p>
              </div>

              <form onSubmit={handleMockLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/45">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. customer@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer transition-all font-bold"
                  id="btn-submit-login"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{isSubmitting ? "Processing Log In..." : "Log In"}</span>
                </button>
              </form>

              {/* SSO Option */}
              {isFirebaseConfigured && (
                <div className="space-y-3 pt-2">
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-3 text-[9px] text-white/30 uppercase font-black tracking-widest">or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <button 
                    onClick={handleGoogleLogin}
                    disabled={isSubmitting}
                    type="button"
                    className="w-full flex items-center justify-center space-x-3 rounded-full border border-white/10 hover:bg-white/5 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white cursor-pointer transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span>Google Authorization</span>
                  </button>
                </div>
              )}

              {/* Switch to Signup */}
              <div className="pt-4 border-t border-white/5 text-center">
                <p className="text-xs text-white/50 font-semibold">
                  Don't have an account yet?{' '}
                  <button 
                    onClick={() => setMode('signup')}
                    type="button"
                    className="font-black text-amber-500 hover:text-amber-400 hover:underline cursor-pointer uppercase tracking-wider text-[11px]"
                  >
                    Register Profile
                  </button>
                </p>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-4">
              <div className="text-center pb-1">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Become a Member</h3>
                <p className="text-xs text-white/55 mt-1 font-semibold">Unlock convenient bookings and dynamic owner messaging</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full name input */}
                <div>
                  <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/45">
                      <User className="h-4 w-4" />
                    </span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Kotte Saisree Lasya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/45">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input 
                      type="email" 
                      required
                      placeholder="username@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp number */}
                <div>
                  <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                    <span>WhatsApp / Mobile Number</span>
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Urgent Contact</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/45">
                      <Phone className="h-4 w-4" />
                    </span>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 9676939529 (no spaces)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 mt-1.5 line-clamp-1">Shared to pre-fill inquiry messages to Sree Hanuman Travels owner.</p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full inline-flex items-center justify-center space-x-2 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer transition-all font-bold"
                  id="btn-submit-signup"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{isSubmitting ? "Registering profile..." : "Create Account & Send"}</span>
                </button>
              </form>

              {/* Switch to Login */}
              <div className="pt-4 border-t border-white/5 text-center">
                <p className="text-xs text-white/50 font-semibold">
                  Already registered?{' '}
                  <button 
                    onClick={() => setMode('login')}
                    type="button"
                    className="font-black text-amber-500 hover:text-amber-400 hover:underline cursor-pointer uppercase tracking-wider text-[11px]"
                  >
                    Access Profile
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Prompt 3: Phone number required */}
          {mode === 'phone-required' && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Complete Profile</h3>
                <p className="text-xs text-white/55 mt-1 font-semibold">WhatsApp number is required to align instant rental bookings</p>
              </div>

              <form onSubmit={handleCompletePhone} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                    <span>WhatsApp Contact Number</span>
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Required</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/45">
                      <Phone className="h-4 w-4" />
                    </span>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 9676939529"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 mt-1.5 leading-relaxed">This is shared directly with Sree Hanuman Travels desk at Sattar Colony, Kadapa.</p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer transition-all font-bold"
                  id="btn-complete-phone"
                >
                  <Check className="h-4 w-4" />
                  <span>{isSubmitting ? "Completing..." : "Complete & Activate Profile"}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
