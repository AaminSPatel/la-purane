'use client';
import { Layout } from '../../components/layout/Layout';
import { Hero } from '../../components/home/Hero';
import { Marquee } from '../../components/ui/Marquee';
import { FeaturedCollections } from '../../components/home/FeaturedCollections';
import { EditorialSection } from '../../components/home/EditorialSection';
import { NewArrivals } from '../../components/home/NewArrivals';
import { BrandValues } from '../../components/home/BrandValues';
import { Testimonials } from '../../components/home/Testimonials';
import { InstagramGallery } from '../../components/home/InstagramGallery';
import { Newsletter } from '../../components/home/Newsletter';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <FeaturedCollections />
      <EditorialSection />
      <NewArrivals />
      <BrandValues />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </Layout>
  );
}

