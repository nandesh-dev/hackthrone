import { delay } from "@/lib/utils";

export async function getCollaborationRecommendation() {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(2000);

    return [
      {
        profile_photo: "https://loremfaces.net/256/id/1.jpg",
        name: "Dalton Hutchence",
        email: "dhutchence0@webs.com",
        keywords: [
          "soil science",
          "crop genetics",
          "PhD",
          "sustainable farming",
          "agroecology",
        ],
        bio: "Hi, I'm Dalton — a soil biologist fascinated by how microbial life supports plant growth. I love merging data and dirt to make farming more sustainable.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/2.jpg",
        name: "Shaylyn Strewther",
        email: "sstrewther1@addtoany.com",
        keywords: [
          "plant breeding",
          "biotechnology",
          "MSc",
          "seed technology",
          "crop yield improvement",
        ],
        bio: "I'm Shaylyn, a plant scientist with a focus on genetic improvement of crops for better yield and resilience.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/3.jpg",
        name: "Andree Silkston",
        email: "asilkston2@dmoz.org",
        keywords: [
          "agronomy",
          "pest management",
          "BSc",
          "organic farming",
          "climate adaptation",
        ],
        bio: "Hello! I'm Andree, passionate about developing pest management strategies that protect both crops and ecosystems.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/4.jpg",
        name: "Baillie Peaden",
        email: "bpeaden3@hubpages.com",
        keywords: [
          "animal nutrition",
          "livestock biology",
          "PhD",
          "feed optimization",
          "veterinary science",
        ],
        bio: "I'm Baillie — I research livestock nutrition and enjoy helping farmers optimize feeding systems for healthy herds.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/5.jpg",
        name: "Katha Nairn",
        email: "knairn4@walmart.com",
        keywords: [
          "horticulture",
          "soil fertility",
          "MSc",
          "greenhouse management",
          "crop rotation",
        ],
        bio: "Hey, I'm Katha! My work focuses on improving soil fertility and greenhouse crop productivity.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/6.jpg",
        name: "Barbara Kempston",
        email: "bkempston5@angelfire.com",
        keywords: [
          "microbiology",
          "biochemistry",
          "PhD",
          "biofertilizers",
          "microbial ecology",
        ],
        bio: "Hi there, I'm Barbara, a microbiologist researching soil microbes and their role in plant nutrient cycling.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/7.jpg",
        name: "De Wille",
        email: "dwille6@google.pl",
        keywords: [
          "plant physiology",
          "crop management",
          "MSc",
          "hydroponics",
          "nutrient uptake",
        ],
        bio: "I'm De — a plant physiologist who loves working with hydroponic systems and optimizing nutrient delivery.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/8.jpg",
        name: "Arline Condell",
        email: "acondell7@hhs.gov",
        keywords: [
          "genetic engineering",
          "biotechnology",
          "PhD",
          "gene editing",
          "CRISPR crops",
        ],
        bio: "Hi, I'm Arline, passionate about plant genetic engineering and ethical applications of CRISPR in agriculture.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/9.jpg",
        name: "Bink Comazzo",
        email: "bcomazzo8@elegantthemes.com",
        keywords: [
          "entomology",
          "pest biology",
          "BSc",
          "crop protection",
          "field research",
        ],
        bio: "I'm Bink, an entomologist dedicated to understanding crop pests and developing eco-friendly control methods.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/10.jpg",
        name: "Isaiah Peggrem",
        email: "ipeggrem9@sfgate.com",
        keywords: [
          "climate-smart agriculture",
          "sustainability",
          "MSc",
          "data analysis",
          "remote sensing",
        ],
        bio: "Hi, I'm Isaiah — I work with satellite data to develop climate-smart farming solutions and promote sustainability.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/11.jpg",
        name: "Falito Kissick",
        email: "fkissicka@printfriendly.com",
        keywords: [
          "irrigation systems",
          "water management",
          "BEng",
          "precision agriculture",
          "smart sensors",
        ],
        bio: "I'm Falito, an agricultural engineer designing efficient irrigation systems using sensor-driven automation.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/12.jpg",
        name: "Lon Kinchley",
        email: "lkinchleyb@slideshare.net",
        keywords: [
          "aquaculture",
          "marine biology",
          "MSc",
          "fish nutrition",
          "sustainable systems",
        ],
        bio: "Hello! I'm Lon — I study sustainable aquaculture systems and the biology behind fish nutrition.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/13.jpg",
        name: "Ki McGraith",
        email: "kmcgraithc@newsvine.com",
        keywords: [
          "genomics",
          "bioinformatics",
          "PhD",
          "molecular biology",
          "data-driven research",
        ],
        bio: "I'm Ki, a computational biologist using genomics and AI tools to improve agricultural breeding programs.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/14.jpg",
        name: "Ethan Trematick",
        email: "etrematickd@nps.gov",
        keywords: [
          "agricultural policy",
          "economics",
          "MBA",
          "sustainability",
          "resource management",
        ],
        bio: "Ethan here! I bridge agricultural science with policy to promote economically viable and sustainable farming.",
      },
      {
        profile_photo: "https://loremfaces.net/256/id/15.jpg",
        name: "Munmro Sarle",
        email: "msarlee@icq.com",
        keywords: [
          "ecology",
          "biodiversity",
          "MSc",
          "ecosystem services",
          "field ecology",
        ],
        bio: "Hi, I'm Munmro — an ecologist who studies biodiversity within agroecosystems to enhance ecosystem resilience.",
      },
    ];
  }

  return [];
}
