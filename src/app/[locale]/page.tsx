import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/why-us";
import { ContactCta } from "@/components/sections/contact-cta";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} dict={dict} />
      <TrustBar dict={dict} />
      <WhoWeAre dict={dict} />
      <Services locale={l} dict={dict} />
      <Stats dict={dict} />
      <WhyUs dict={dict} />
      <ContactCta locale={l} dict={dict} />
    </>
  );
}
