import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [configCheck, setConfigCheck] = useState<{ status: 'ok' | 'error' | 'checking'; message?: string }>({ status: 'checking' });

    useEffect(() => {
        // Diagnostic check
        const checkConfig = async () => {
            try {
                // Check if keys are present (basic check)
                const url = import.meta.env.VITE_SUPABASE_URL;
                const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

                if (!url || !key) {
                    setConfigCheck({ status: 'error', message: 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY variables.' });
                    return;
                }

                // Simple ping to check connection (optional, just checking auth endpoint availability)
                const { error } = await supabase.auth.getSession();
                if (error) throw error;

                setConfigCheck({ status: 'ok' });
            } catch (err) {
                console.error("Config check failed:", err);
                setConfigCheck({ status: 'error', message: `Supabase connection failed: ${err.message}` });
            }
        };
        checkConfig();
    }, []);

    useEffect(() => {
        if (location.state?.message) {
            setErrorMessage(location.state.message);
        }
    }, [location.state]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Account created! Please check your email for verification.");
                setIsSignUp(false); // Switch back to login
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                toast.success("Logged in successfully");
                navigate("/admin/gallery");
            }
        } catch (error) {
            console.error("Auth error:", error);
            const msg = error.message || "Authentication failed";
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-charcoal relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px] animate-pulse animation-delay-400" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md z-10 p-6"
            >
                <div className="bg-charcoal-light/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden relative">
                    {/* Decorative gold shimmer line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-serif text-cream mb-2 luxury-heading">
                                {isSignUp ? "Join the Studio" : "Welcome Back"}
                            </h2>
                            <p className="text-cream/40 text-sm tracking-wide uppercase">
                                {isSignUp ? "Create your admin credentials" : "Access your creative dashboard"}
                            </p>
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        {configCheck.status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6"
                            >
                                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Configuration Error</AlertTitle>
                                    <AlertDescription>{configCheck.message}</AlertDescription>
                                </Alert>
                            </motion.div>
                        )}

                        {errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6"
                            >
                                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Notice</AlertTitle>
                                    <AlertDescription>{errorMessage}</AlertDescription>
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-cream/30 ml-1">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@studio.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-black/20 border-white/5 text-cream placeholder:text-white/20 focus:border-gold/50 focus:ring-gold/20 h-12 transition-all duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-cream/30 ml-1">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-black/20 border-white/5 text-cream placeholder:text-white/20 focus:border-gold/50 focus:ring-gold/20 h-12 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold-light text-charcoal font-medium h-12 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6 group"
                            disabled={loading || configCheck.status === 'error'}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {isSignUp ? "Creating Account..." : "Authenticating..."}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isSignUp ? "Create Account" : "Enter Dashboard"}
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/5" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-2 text-cream/20 tracking-widest">or</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                className="text-gold hover:text-gold-light text-sm transition-colors cursor-pointer hover:underline underline-offset-4"
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setErrorMessage("");
                                }}
                            >
                                {isSignUp ? "Already have an account? Sign In" : "Need an account? Request Access"}
                            </button>
                        </div>
                    </form>

                    {/* Status Indicator */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${configCheck.status === 'ok' ? 'bg-green-500' : configCheck.status === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`} />
                        <span className="text-[10px] text-white/10 uppercase tracking-widest">System {configCheck.status}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
