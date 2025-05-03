import { CtaSection } from '@/components/home/cta-section';
import { EducationSection } from '@/components/home/education-section';
import { HeroSection } from '@/components/home/hero-section';
import MarketHighlights from '@/components/home/market-highlights';
import { NewsSection } from '@/components/home/news-section';
import { StockTable } from '@/components/home/stock-table';

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <MarketHighlights />
      <NewsSection />
      <StockTable />
      <EducationSection />
      <CtaSection />
    </div>
  );
}
