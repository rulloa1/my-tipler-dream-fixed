import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Privacy = () => {
    return (
        <Layout>
            <div className="pt-32 pb-24 bg-cream min-h-screen">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-serif text-charcoal mb-12">Privacy Policy</h1>

                        <div className="space-y-12 text-muted-foreground leading-relaxed font-light">
                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">Introduction</h2>
                                <p>
                                    At Michael Chandler Design, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">Information We Collect</h2>
                                <p>
                                    We collect several types of information from and about users of our website, including information by which you may be personally identified, such as name, postal address, e-mail address, and telephone number ("personal information").
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">How We Use Your Information</h2>
                                <p>
                                    We use information that we collect about you or that you provide to us, including any personal information:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li>To present our website and its contents to you.</li>
                                    <li>To provide you with information or services that you request from us.</li>
                                    <li>To fulfill any other purpose for which you provide it.</li>
                                    <li>To notify you about changes to our website or any products or services we offer or provide though it.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-charcoal mb-4">Contact Information</h2>
                                <p>
                                    To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                                    <br /><br />
                                    8215 Winding Hill Ln<br />
                                    Spring, TX 77379<br />
                                    Mike.rcccon@yahoo.com
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default Privacy;
