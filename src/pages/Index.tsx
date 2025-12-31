import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CTASection from "@/components/home/CTASection";
const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <CTASection />
    </Layout>
  );
};

export default Index;
