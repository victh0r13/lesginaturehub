import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ArrowIcon, InstagramIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";
import { RevealObserver } from "@/components/RevealObserver";
import { estetica, fullAddress, links, mapEmbed, multidisciplinar, type Plan, site } from "@/lib/site";
import consultorio from "../../public/images/consultorio.jpg";
import estetica1 from "../../public/images/estetica-1.jpg";
import estetica2 from "../../public/images/estetica-2.jpg";
import estetica3 from "../../public/images/estetica-3.jpg";
import multidisciplinar1 from "../../public/images/multidisciplinar-1.jpg";
import multidisciplinar2 from "../../public/images/multidisciplinar-2.jpg";

const FULL_WIDTH = "(min-width: 1152px) 504px, (min-width: 1024px) 43vw, (min-width: 640px) 528px, calc(100vw - 48px)";
const HALF_WIDTH = "(min-width: 1152px) 246px, (min-width: 1024px) 21vw, (min-width: 640px) 258px, calc(50vw - 30px)";

const navItems = [
  { href: "#estetica", label: "Estética" },
  { href: "#multidisciplinar", label: "Multidisciplinar" },
  { href: "#contato", label: "Contato" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <RevealObserver />
      <main>
        <Hero />
        <Flow />
        <Estetica />
        <Multidisciplinar />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" className="font-display text-xl font-semibold italic tracking-tight">
          {site.name}
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={links.reserve}
            target="_blank"
            rel="noopener"
            className="rounded-sm bg-primary px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-primary-foreground transition-colors hover:bg-accent"
          >
            Reservar
          </a>
        </div>
        <span aria-hidden className="size-2 rounded-full bg-accent lg:hidden" />
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="mx-auto max-w-xl px-6 pt-12 pb-16 lg:grid lg:max-w-6xl lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:px-10 lg:py-20"
    >
      <div className="animate-fade-up">
        <h1 className="mb-6 font-display text-5xl font-medium leading-[1.1] text-balance lg:text-[min(4rem,5vw)]">
          Seu consultório pronto, <br />
          <span className="font-semibold italic text-accent">com a sua essência.</span>
        </h1>
        <p className="mb-8 max-w-[32ch] text-lg leading-relaxed text-muted-foreground lg:mb-10">
          Espaços estruturados para profissionais da saúde no Le Quartier, em frente à estação de metrô Águas Claras.
        </p>
        <a
          href={links.reserve}
          target="_blank"
          rel="noopener"
          className="inline-flex w-full items-center justify-center rounded-sm bg-primary py-4 text-xs font-medium uppercase tracking-wide text-primary-foreground transition-colors hover:bg-accent lg:w-auto lg:px-14"
        >
          Reservar agora
        </a>
      </div>
      <div className="relative hidden aspect-[4/5] animate-fade-up overflow-hidden rounded-sm bg-muted [animation-delay:150ms] lg:block">
        <Image
          src={consultorio}
          alt="Consultório multidisciplinar com mesa de atendimento, cadeiras e TV"
          fill
          sizes="(min-width: 1152px) 404px, 36vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section className="border-y border-border bg-muted/50">
      <div data-reveal className="mx-auto max-w-xl px-6 py-12 lg:max-w-6xl lg:px-10 lg:py-20">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent lg:text-[11px]">01 / Fluxo</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="mb-4 font-display text-3xl font-medium lg:mb-0 lg:text-5xl">Praticidade absoluta</h2>
          <p className="text-pretty text-muted-foreground lg:text-lg lg:leading-relaxed">
            A locação funciona por hora ou por pacotes, permitindo que cada profissional escolha a opção que melhor se
            adapta à sua rotina. Quanto maior o pacote, mais vantajoso fica o valor por hora. Chegue, atenda e foque no
            que importa: seu paciente.
          </p>
        </div>
      </div>
    </section>
  );
}

function Estetica() {
  return (
    <section
      id="estetica"
      aria-labelledby="estetica-titulo"
      className="mx-auto max-w-xl px-6 py-16 lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-10 lg:py-24"
    >
      <div data-reveal>
        <Photo
          src={estetica1}
          alt="Consultório de estética com maca, mesa de apoio e vista para a cidade"
          sizes={FULL_WIDTH}
          className="mb-3 aspect-[4/5]"
        />
        <div className="mb-8 grid grid-cols-2 gap-3 lg:mb-0">
          <Photo
            src={estetica2}
            alt="Maca do consultório de estética com bancada e pia"
            sizes={HALF_WIDTH}
            className="aspect-square"
          />
          <Photo
            src={estetica3}
            alt="Vista ampla do consultório de estética iluminado"
            sizes={HALF_WIDTH}
            className="aspect-square"
          />
        </div>
      </div>

      <div>
        <RoomTitle id="estetica-titulo" title="01. Estética" description={estetica.description} />
        <div data-reveal className="space-y-4 [--reveal-delay:120ms]">
          <HourlyCard price={estetica.hourly.price} note={estetica.hourly.note} />
          <div className="border border-border bg-card p-4">
            <Label>Pacotes</Label>
            <p className="mb-4 text-sm italic text-muted-foreground">{estetica.packagesNote}</p>
            <div className="space-y-3 border-t border-border/50 pt-3">
              {estetica.packages.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <span className="text-sm">{item.label}</span>
                  <span className={`font-medium ${item.highlight ? "text-accent" : ""}`}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <PlansCard tone="dark" note={estetica.plansNote} plans={estetica.plans} footnote={estetica.plansFootnote} />
          <RoomLink href={links.estetica}>Reservar consultório de estética</RoomLink>
        </div>
      </div>
    </section>
  );
}

function Multidisciplinar() {
  return (
    <section id="multidisciplinar" aria-labelledby="multidisciplinar-titulo" className="bg-muted">
      <div className="mx-auto max-w-xl px-6 py-16 lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-10 lg:py-24">
        <div data-reveal className="lg:order-2">
          <Photo
            src={multidisciplinar1}
            alt="Consultório multidisciplinar com mesa, cadeiras e bancada espelhada"
            sizes={FULL_WIDTH}
            className="mb-3 aspect-[4/5]"
          />
          <Photo
            src={multidisciplinar2}
            alt="Mesa de atendimento do consultório multidisciplinar"
            sizes={FULL_WIDTH}
            className="mb-8 aspect-video lg:mb-0"
          />
        </div>

        <div className="lg:order-1">
          <RoomTitle
            id="multidisciplinar-titulo"
            title="02. Multidisciplinar"
            description={multidisciplinar.description}
          />
          <div data-reveal className="space-y-4 [--reveal-delay:120ms]">
            <HourlyCard price={multidisciplinar.hourly.price} note={multidisciplinar.hourly.note} />
            <div className="grid grid-cols-2 gap-3">
              {multidisciplinar.packages.map((item) => (
                <div key={item.name} className="border border-border bg-card p-4">
                  <Label className="mb-2">{item.name}</Label>
                  <p className="font-display text-xl font-medium">{item.price}</p>
                  <p className="text-[10px] text-muted-foreground lg:text-[11px]">{item.detail}</p>
                </div>
              ))}
            </div>
            <PlansCard
              tone="light"
              note={multidisciplinar.plansNote}
              plans={multidisciplinar.plans}
              footnote={multidisciplinar.plansFootnote}
            />
            <RoomLink href={links.multidisciplinar}>Reservar consultório multidisciplinar</RoomLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [address, postalCode] = fullAddress.split(/, (?=\d{5}-\d{3})/);

  return (
    <footer id="contato" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-xl px-6 py-16 lg:max-w-6xl lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
          <div data-reveal className="lg:col-start-1 lg:row-start-1">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] opacity-50">Onde estamos</p>
            <h2 className="mb-2 font-display text-2xl font-medium lg:text-4xl">{site.address.building}</h2>
            <p className="text-sm leading-relaxed opacity-70">
              {address}, <span className="whitespace-nowrap">{postalCode}</span>. {site.address.reference}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <ContactItem href={links.maps} icon={<MapPinIcon className="h-4 w-4" />}>
                Ver no mapa
              </ContactItem>
              <ContactItem href={links.availability} icon={<WhatsAppIcon className="h-4 w-4" />}>
                {site.whatsapp.display}
              </ContactItem>
              <ContactItem href={site.instagram.url} icon={<InstagramIcon className="h-4 w-4" />}>
                {site.instagram.handle}
              </ContactItem>
            </ul>
          </div>

          <div
            data-reveal
            className="relative aspect-[4/3] overflow-hidden rounded-sm border border-primary-foreground/10 bg-muted [--reveal-delay:120ms] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-96"
          >
            <iframe
              src={mapEmbed}
              title="Mapa com a localização do Edifício Le Quartier, em Águas Claras"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_sepia(0.28)_contrast(0.92)_brightness(1.03)]"
            />
          </div>

          <div data-reveal className="text-center lg:col-start-1 lg:row-start-2 lg:self-end lg:text-left">
            <p className="mb-6 font-display text-sm font-semibold italic opacity-60 lg:text-base">
              Le Signature Hub: chegue e atenda, com conforto e praticidade.
            </p>
            <a
              href={links.availability}
              target="_blank"
              rel="noopener"
              className="block w-full border border-primary-foreground/20 py-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Solicitar disponibilidade
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-primary-foreground/10 pt-8 text-center text-[9px] uppercase tracking-widest opacity-30 lg:mt-16">
          © 2026 Le Signature Hub
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={links.availability}
      target="_blank"
      rel="noopener"
      aria-label="Falar com o Le Signature Hub pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-colors duration-300 hover:bg-accent md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-5 w-5" />
    </a>
  );
}

function Photo({ src, alt, sizes, className = "" }: { src: StaticImageData; alt: string; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-muted ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
    </div>
  );
}

function RoomTitle({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div data-reveal className="mb-8">
      <h2 id={id} className="mb-2 font-display text-3xl font-semibold italic lg:mb-4 lg:text-5xl">
        {title}
      </h2>
      <p className="text-pretty text-sm text-muted-foreground lg:text-base lg:leading-relaxed">{description}</p>
    </div>
  );
}

function Label({ children, className = "mb-1" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[10px] uppercase tracking-widest lg:text-[11px] ${className}`}>{children}</p>;
}

function HourlyCard({ price, note }: { price: string; note: string }) {
  return (
    <div className="flex items-end justify-between border border-border bg-card p-4">
      <div>
        <Label>Hora avulsa</Label>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
      <p className="font-display text-2xl font-medium">
        {price}
        <span className="text-xs text-muted-foreground">/h</span>
      </p>
    </div>
  );
}

function PlansCard({
  tone,
  note,
  plans,
  footnote,
}: {
  tone: "dark" | "light";
  note: string;
  plans: Plan[];
  footnote: string;
}) {
  const dark = tone === "dark";
  const soft = dark ? "opacity-70" : "text-muted-foreground";

  return (
    <div className={`rounded-sm p-5 ${dark ? "bg-primary text-primary-foreground" : "border border-accent/30 bg-card"}`}>
      <p
        className={`mb-1 text-[10px] uppercase tracking-widest lg:text-[11px] ${
          dark ? "opacity-60" : "font-semibold text-accent"
        }`}
      >
        Planos fixos mensais
      </p>
      <p className={`mb-5 text-[11px] leading-relaxed lg:text-xs ${soft}`}>{note}</p>
      <div className="space-y-6">
        {plans.map((plan) => (
          <div key={plan.name} className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="font-display text-xl font-medium">{plan.name}</p>
              <p className={`text-[10px] lg:text-[11px] ${soft}`}>{plan.hourly}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{plan.monthly}</p>
              <p className={`text-[10px] italic lg:text-[11px] ${soft}`}>{plan.weekly}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        className={`mt-6 border-t pt-4 text-[10px] italic lg:text-[11px] ${
          dark ? "border-primary-foreground/10 opacity-60" : "border-border text-muted-foreground"
        }`}
      >
        {footnote}
      </p>
    </div>
  );
}

function RoomLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex w-full items-center justify-center gap-2 rounded-sm border border-foreground/20 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {children}
      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

function ContactItem({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100"
      >
        <span className="text-accent">{icon}</span>
        {children}
      </a>
    </li>
  );
}
