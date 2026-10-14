export const site = {
  name: "Le Signature Hub",
  url: "https://lesignaturehub.com.br",
  title: "Le Signature Hub | Consultórios por hora em Águas Claras",
  description:
    "Consultórios prontos para profissionais da saúde em Águas Claras. Locação por hora, pacotes e planos fixos mensais no Le Quartier, em frente ao metrô.",
  shareDescription:
    "Consultório de estética com maca e consultório multidisciplinar. Hora avulsa, pacotes e planos fixos mensais.",
  whatsapp: {
    number: "5561992135322",
    display: "(61) 99213-5322",
  },
  instagram: {
    handle: "@lesignaturehub",
    url: "https://www.instagram.com/lesignaturehub/",
  },
  address: {
    building: "Edifício Le Quartier",
    street: "Av. Pau Brasil, Lote 10",
    neighborhood: "Águas Claras",
    city: "Brasília",
    region: "DF",
    postalCode: "71926-000",
    reference: "Em frente à estação de metrô Águas Claras.",
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.neighborhood}, ${site.address.city} - ${site.address.region}, ${site.address.postalCode}`;

const mapsQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.neighborhood}, ${site.address.city} - ${site.address.region}`,
);

export const mapEmbed = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed&hl=pt-BR`;

function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const links = {
  reserve: whatsappLink("Olá! Vim pelo site e gostaria de reservar um consultório no Le Signature Hub."),
  availability: whatsappLink("Olá! Vim pelo site e gostaria de saber a disponibilidade dos consultórios."),
  estetica: whatsappLink("Olá! Vim pelo site e tenho interesse no consultório de estética."),
  multidisciplinar: whatsappLink("Olá! Vim pelo site e tenho interesse no consultório multidisciplinar."),
  maps: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
};

export type Plan = { name: string; hourly: string; monthly: string; weekly: string };

export const estetica = {
  description: "Equipado com maca, pia e mesa de apoio clínico. Ideal para procedimentos e atendimentos estéticos.",
  hourly: { price: "R$ 80", note: "Uso imediato" },
  packagesNote: "4 horas consecutivas no mesmo dia · 8 horas flexíveis em 30 dias",
  packages: [
    { label: "Pacote 4 horas · R$ 75/h", price: "R$ 300", highlight: false },
    { label: "Pacote 8 horas · R$ 70/h", price: "R$ 560", highlight: true },
  ],
  plansNote: "Reserva de um horário fixo por semana, com disponibilidade de segunda a sexta-feira.",
  plans: [
    { name: "Plano 4h", hourly: "R$ 60/hora", monthly: "R$ 960/mês", weekly: "R$ 240 por semana" },
    { name: "Plano 8h", hourly: "R$ 55/hora", monthly: "R$ 1.760/mês", weekly: "R$ 440 por semana" },
    { name: "Plano 10h", hourly: "R$ 48/hora", monthly: "R$ 1.920/mês", weekly: "R$ 480 por semana" },
  ] satisfies Plan[],
  plansFootnote:
    "Planos renovados mensalmente. O horário escolhido fica reservado semanalmente durante a vigência do plano, conforme disponibilidade.",
};

export const multidisciplinar = {
  description:
    "Ambiente confortável e funcional para nutricionistas, psicólogos, fonoaudiólogos e outros profissionais da saúde que precisam de uma estrutura mais compacta.",
  hourly: { price: "R$ 50", note: "Flexibilidade total" },
  packages: [
    { name: "Pacote 4h", price: "R$ 180", detail: "R$ 45/h · mesmo dia" },
    { name: "Pacote 8h", price: "R$ 360", detail: "R$ 45/h · 30 dias" },
  ],
  plansNote: "Horário reservado semanalmente, com disponibilidade de segunda a sexta-feira.",
  plans: [
    { name: "Plano 4h", hourly: "R$ 40/hora", monthly: "R$ 640/mês", weekly: "R$ 160 por semana" },
    { name: "Plano 8h", hourly: "R$ 35/hora", monthly: "R$ 1.120/mês", weekly: "R$ 280 por semana" },
    { name: "Plano 10h", hourly: "R$ 30/hora", monthly: "R$ 1.200/mês", weekly: "R$ 300 por semana" },
  ] satisfies Plan[],
  plansFootnote:
    "Os planos fixos são renovados mensalmente e garantem a reserva do horário escolhido durante toda a vigência do plano.",
};
