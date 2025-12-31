import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Terms = () => {
    return (
        <Layout>
            <div className="pt-32 pb-24 bg-cream min-h-screen">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-serif text-charcoal mb-12">Terms of Service</h1>

                        <div className="space-y-12 text-muted-foreground leading-relaxed font-light">
                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">1. Terms</h2>
                                <p>
                                    By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">2. Use License</h2>
                                <p>
                                    Permission is granted to temporarily download one copy of the materials (information or software) on Michael Chandler Design's website for personal, non-commercial transitory viewing only.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">3. Disclaimer</h2>
                                <p>
                                    The materials on Michael Chandler Design's website are provided "as is". Michael Chandler Design makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">4. Limitations</h2>
                                <p>
                                    In no event shall Michael Chandler Design or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on Michael Chandler Design's website.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default Terms;
