import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import type { PageContent } from "../app/siteData";
import Card from "./Card";
import SectionDivider from "./SectionDivider";

type TraditionPageProps = {
  content: PageContent;
  patternClassName: string;
};

export default function TraditionPage({ content, patternClassName }: TraditionPageProps) {
  const location = useLocation();
  const isPrayersPage = location.pathname.includes("/prayers");
  const isCatechismPage = location.pathname.includes("/catechism") && !location.pathname.includes("/fathers") && !location.pathname.includes("/councils") && !location.pathname.includes("/mysteries");
  const tradition = location.pathname.includes("/orthodox") ? "orthodox" : "catholic";

  return (
    <main className={`min-h-screen px-4 py-8 md:px-8 ${patternClassName}`}>
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="font-heading text-3xl leading-tight text-[var(--text-secondary)] md:text-5xl">{content.title}</h1>
        <p className="mt-3 max-w-3xl text-lg text-[var(--text-primary)]/90">{content.subtitle}</p>
      </motion.section>

      <SectionDivider label="Kyrie Eleison" />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="drop-cap text-lg leading-relaxed text-[var(--text-primary)]/88">
              {paragraph}
            </p>
          ))}
        </div>
        {content.quote && (
          <blockquote className="h-fit rounded-xl border-l-4 border-[var(--accent)] bg-[var(--card)]/90 p-5 italic text-[var(--text-primary)]">
            <p>{content.quote}</p>
            {content.quoteSource && <footer className="mt-3 text-sm text-[var(--text-secondary)]">{content.quoteSource}</footer>}
          </blockquote>
        )}
      </section>

      <SectionDivider label={isPrayersPage ? "Prayer Library" : "Sacred Library"} />

      <section className={isPrayersPage ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"}>
        {content.items.map((item) => {
          if (isPrayersPage) {
            if (item.title.startsWith("Prayers by Jurisdiction")) {
              const jurisdictions = ["Greek", "Slavonic", "Serbian", "Armenian", "Antiochian"];
              return (
                <Card key={item.title} className="flex flex-col">
                  <h3 className="mb-3 font-heading text-lg text-[var(--text-secondary)]">Jurisdictional Prayers</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {jurisdictions.map((j) => (
                      <Link
                        key={j}
                        to={`/${tradition}/prayers?jurisdiction=${j.toLowerCase()}`}
                        className="rounded-lg border border-[var(--border)]/40 bg-[var(--bg-secondary)] px-3 py-2 text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--accent)]/10"
                      >
                        {j}
                      </Link>
                    ))}
                  </div>
                </Card>
              );
            }

            const slug = item.title.toLowerCase().replace(/\s+/g, "-");
            let target = `/${tradition}/prayers/${slug}`;
            
            if (item.title === "Prayer Rope Guide") {
              target = "/orthodox/prayers/prayer-rope/interactive";
            } else if (item.title === "The Holy Rosary") {
              target = "/catholic/prayers/rosary/interactive";
            }

            return (
              <Link key={item.title} to={target} className="group">
                <Card className="h-full transition-colors group-hover:border-[var(--accent)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg text-[var(--text-secondary)]">{item.title}</h3>
                    <div className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--accent)]">Open</div>
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)]">{item.description}</p>
                </Card>
              </Link>
            );
          }

          if (isCatechismPage && tradition === "orthodox") {
            const slugMap: Record<string, string> = {
              "What is Orthodoxy?": "what-is-orthodoxy",
              "Seven Ecumenical Councils": "councils",
              "Church Fathers Library": "fathers",
              "Philokalia Excerpts": "philokalia",
              "Holy Mysteries (Sacraments)": "mysteries",
              "Jurisdictional Differences": "jurisdictions",
              "Convert's Guide": "convert-guide",
            };

            const slug = slugMap[item.title];
            if (slug) {
              const target = `/${tradition}/catechism/${slug}`;
              return (
                <Link key={item.title} to={target} className="group">
                  <Card className="h-full transition-colors group-hover:border-[var(--accent)]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg text-[var(--text-secondary)]">{item.title}</h3>
                      <div className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--accent)]">Open</div>
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)]">{item.description}</p>
                  </Card>
                </Link>
              );
            }
          }

          return (
            <Card key={item.title}>
              <h3 className="font-heading text-lg text-[var(--text-secondary)]">{item.title}</h3>
              <p className="mt-2 text-[var(--text-primary)]/85">{item.description}</p>
            </Card>
          );
        })}
      </section>
    </main>
  );
}