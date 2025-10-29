import { delay } from "@/lib/utils";

export async function getProjects() {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(100);

    return [
      {
        title: "Sustainable Soil Regeneration Initiative",
        description:
          "The Sustainable Soil Regeneration Initiative focuses on restoring soil health and enhancing carbon sequestration through the integration of microbial ecology, crop genetics, and regenerative farming practices. This project investigates how soil microorganisms and organic amendments can work together to improve nutrient cycling and long-term fertility. By combining field trials and lab-based microbial analyses, the team aims to develop scalable solutions that help farmers transition toward sustainable, low-input agriculture. The initiative also explores ways to monitor soil carbon levels, optimize crop rotations, and encourage biodiversity below ground. With expertise spanning soil science, biochemistry, and horticulture, the team’s goal is to create resilient agroecosystems capable of sustaining productivity while mitigating climate change impacts.",
        collaborators: [
          {
            profile_photo: "https://loremfaces.net/48/id/1.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/5.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/6.jpg",
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
        ],
        credits: 145,
        keywords: [
          "soil health",
          "carbon sequestration",
          "sustainable agriculture",
          "microbial communities",
          "regenerative farming",
        ],
      },
      {
        title: "Precision Irrigation and Water Efficiency System",
        description:
          "The Precision Irrigation and Water Efficiency System project develops intelligent water management solutions using smart sensors and data-driven control systems. It combines precision agriculture techniques, remote sensing, and automation to deliver the right amount of water to crops at the right time, improving both yield and sustainability. The project team is working to optimize irrigation scheduling and minimize water waste by integrating real-time soil moisture data and weather forecasts. This technology helps farmers adapt to water scarcity and changing climate conditions while maintaining high productivity. With expertise in engineering, data analysis, and climate-smart farming, the project seeks to make agriculture more resource-efficient and environmentally resilient.",
        collaborators: [
          {
            profile_photo: "https://loremfaces.net/48/id/11.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/10.jpg",
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
        ],
        credits: 92,
        keywords: [
          "water efficiency",
          "precision irrigation",
          "sensor technology",
          "climate-smart farming",
          "resource optimization",
        ],
      },
      {
        title: "CRISPR Crop Improvement Program",
        description:
          "The CRISPR Crop Improvement Program pioneers the use of advanced gene-editing technologies to enhance crop resilience, yield, and nutritional quality. Through CRISPR and related genetic engineering tools, researchers are identifying key genes that influence drought tolerance, pest resistance, and growth efficiency. The program balances scientific innovation with ethical considerations, ensuring responsible applications of biotechnology in agriculture. Combining expertise from molecular biology, genomics, and plant breeding, the team integrates data-driven approaches to design next-generation crops capable of thriving under climate stress. This program aims to accelerate agricultural innovation, reduce chemical dependency, and improve food security through precision genetics.",
        collaborators: [
          {
            profile_photo: "https://loremfaces.net/48/id/8.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/2.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/13.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/4.jpg",
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
        ],
        credits: 178,
        keywords: [
          "CRISPR",
          "genetic engineering",
          "crop resilience",
          "gene editing",
          "biotechnology",
        ],
      },
      {
        title: "Biodiversity and Ecosystem Resilience in Agroforestry",
        description:
          "The Biodiversity and Ecosystem Resilience in Agroforestry project investigates how diverse agroforestry systems can enhance ecological stability and productivity. By studying interactions between plants, insects, and soil organisms, the team seeks to identify management practices that promote biodiversity and strengthen ecosystem services such as pest control, pollination, and nutrient cycling. The project emphasizes climate adaptation through diversified cropping systems that mimic natural ecosystems. Drawing on expertise in ecology, entomology, and agronomy, the researchers aim to develop sustainable farming models that balance productivity with conservation. Their findings contribute to designing agroforestry landscapes that are both economically viable and ecologically resilient.",
        collaborators: [
          {
            profile_photo: "https://loremfaces.net/48/id/15.jpg",
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
          {
            profile_photo: "https://loremfaces.net/48/id/3.jpg",
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
            profile_photo: "https://loremfaces.net/48/id/9.jpg",
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
        ],
        credits: 126,
        keywords: [
          "biodiversity",
          "agroforestry",
          "ecosystem resilience",
          "climate adaptation",
          "sustainability",
        ],
      },
    ];
  }

  return [];
}

export async function createProject() {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(500);
    return;
  }
}

export async function getProject() {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(100);

    return {
      title: "Sustainable Soil Regeneration Initiative",
      description:
        "The Sustainable Soil Regeneration Initiative focuses on restoring soil health and enhancing carbon sequestration through the integration of microbial ecology, crop genetics, and regenerative farming practices. This project investigates how soil microorganisms and organic amendments can work together to improve nutrient cycling and long-term fertility. By combining field trials and lab-based microbial analyses, the team aims to develop scalable solutions that help farmers transition toward sustainable, low-input agriculture. The initiative also explores ways to monitor soil carbon levels, optimize crop rotations, and encourage biodiversity below ground. With expertise spanning soil science, biochemistry, and horticulture, the team’s goal is to create resilient agroecosystems capable of sustaining productivity while mitigating climate change impacts.",
      collaborators: [
        {
          profile_photo: "https://loremfaces.net/48/id/1.jpg",
          name: "Dalton Hutchence",
          email: "dhutchence0@webs.com",
          keywords: [
            "soil science",
            "crop genetics",
            "PhD",
            "sustainable farming",
            "agroecology",
          ],
        },
        {
          profile_photo: "https://loremfaces.net/48/id/5.jpg",
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
          profile_photo: "https://loremfaces.net/48/id/6.jpg",
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
      ],
      credits: 145,
      keywords: [
        "soil health",
        "carbon sequestration",
        "sustainable agriculture",
        "microbial communities",
        "regenerative farming",
      ],
      versions: [
        {
          wordCount: 100,
          credits: 12,
        },
        {
          wordCount: 100,
          credits: 4,
        },
        {
          wordCount: 100,
          credits: 20,
        },
        {
          wordCount: 100,
          credits: 2,
        },
        {
          wordCount: 100,
          credits: 8,
        },
        {
          wordCount: 100,
          credits: 16,
        },
      ],
    };
  }
}
