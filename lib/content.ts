/**
 * Be Home – Site Content
 *
 * This file contains all editable website copy.
 * To update any text on the site, find the relevant section below and change the value.
 * The site will reflect changes automatically on next page load (or hot reload in dev).
 *
 * Sections:
 *   homepage       → / (root page)
 *   about          → /about
 *   studio         → /studio
 *   treatmentRoom  → /treatment-room
 *   catering       → /catering
 *   classes        → /classes
 *   events         → /events
 *   treatments     → /treatments
 *   practitioners  → /practitioners
 *   contact        → /contact
 */

export const content = {

  // ─────────────────────────────────────────────
  // HOMEPAGE  /
  // ─────────────────────────────────────────────
  homepage: {
    hero: {
      tagline: "Community · Wellness · Cascais",
      headlineLine1: "A place to",
      headlineLine2: "feel at home",
      subheadline:
        "Be Home is a community wellness space in Cascais — a warm, welcoming environment for practitioners to flourish and people to find their balance.",
      ctaPrimary: "Hire a Space",
      ctaSecondary: "View Events",
    },
    spaces: {
      sectionTagline: "Our Spaces",
      sectionHeadline: "Built for your practice",
      cards: [
        {
          icon: "◎",
          title: "The Studio",
          description:
            "A spacious, beautifully lit and designed studio perfect for yoga, movement, workshops, and group sessions. Available to hire for 90 minutes, half day or full day.",
          href: "/studio",
          cta: "Explore the Studio",
        },
        {
          icon: "◇",
          title: "Treatment Room",
          description:
            "A private, serene room designed for one-to-one treatments, massage, coaching, and wellness consultations. Thoughtfully equipped for your practice.",
          href: "/treatment-room",
          cta: "Explore the Room",
        },
        {
          icon: "◈",
          title: "Catering & Drinks",
          description:
            "From organic teas and juices to full catering packages. Elevate your workshop or retreat with nourishing food and drinks.",
          href: "/catering",
          cta: "View Packages",
        },
        {
          icon: "◻",
          title: "The Workshop",
          description:
            "A large crafting table, making and meeting space with comfortable sofas and a fireplace. Perfect for creative workshops, team meetings, and intimate gatherings.",
          href: "/workshop",
          cta: "Explore the Workshop",
        },
      ],
    },
    schedule: {
      sectionTagline: "This Week",
      sectionHeadline: "Upcoming events",
      fullScheduleLabel: "Full schedule →",
    },
    philosophy: {
      sectionTagline: "Our Philosophy",
      quote:
        '"We believe wellness is not a destination — it\'s the feeling of being exactly where you\'re meant to be."',
      ctaLabel: "Our story",
    },
    practitionerStrip: {
      headline: "Are you a practitioner?",
      body:
        "Hire our beautiful studio or treatment room. Bring your clients, run your classes, and make Be Home your home base in Cascais.",
      ctaPrimary: "Hire the Studio",
      ctaSecondary: "Meet Our Practitioners",
    },
  },

  // ─────────────────────────────────────────────
  // ABOUT  /about
  // ─────────────────────────────────────────────
  about: {
    hero: {
      tagline: "Our Story",
      headline: "About Be Home",
      subheadline:
        "A place where practitioners can build their practice, and where the people of Cascais can find the classes, treatments, and community they need to feel good.",
    },
    story: {
      headline: "Built on the idea of belonging",
      body1:
        "Be Home was created for one simple reason: to give Cascais a wellness space that genuinely feels like a community. Not a sterile studio. A warm, thoughtfully designed place where people can come as they are.",
      body2:
        "The name reflects our philosophy: your body is your home, and we're here to support you in nurturing and nourishing it. We want you to feel at home in our home.",
      body3:
        "We work with independent practitioners who share our values — offering their expertise in an environment designed to support their practice and their clients.",
    },
    values: [
      {
        title: "Community first",
        body: "We believe wellness is better together. Everything we do is in service of bringing people closer — to themselves and to each other.",
      },
      {
        title: "Quality & warmth",
        body: "Our spaces are carefully curated. Every detail — from the materials to the light — is chosen to create a feeling of ease and quality.",
      },
      {
        title: "Practitioner-led",
        body: "We trust our practitioners. They bring their expertise, their voice, and their community. We simply give them the best possible home.",
      },
    ],
    cta: {
      headline: "Come and see for yourself",
      body: "Whether you're a practitioner looking for a beautiful space, or someone seeking a class or treatment — we'd love to meet you.",
      ctaPrimary: "Get in touch",
      ctaSecondary: "Browse classes",
    },
  },

  // ─────────────────────────────────────────────
  // STUDIO  /studio
  // ─────────────────────────────────────────────
  studio: {
    hero: {
      tagline: "Hire a Space",
      headline: "The Studio",
      body:
        "A beautifully designed space with considered lighting, created for movement, community, and connection. Perfect for yoga, pilates, dance, workshops, and group sessions.",
      ctaLabel: "Request a Booking",
    },
    amenities: [
      "Beautiful lighting",
      "Natural light",
      "Sound system",
      "Yoga mats & blocks",
      "Changing area",
      "Waiting area for clients",
      "Air circulation and filtration",
    ],
    rates: [
      { label: "90 Minutes", price: "€50", note: "" },
      { label: "Half Day", price: "€150", note: "8:00–14:00 or 14:00–20:00" },
      { label: "Full Day", price: "€300", note: "8:00–20:00" },
    ],
    ratesNote: "Rates exclude IVA. Extended hours up to 22:00 available on request.",
    cateringNote:
      "Food and drink packages available on request — organic teas, juices, snack platters and more.",
    cta: {
      headline: "Ready to book the Studio?",
    },
  },

  // ─────────────────────────────────────────────
  // TREATMENT ROOM  /treatment-room
  // ─────────────────────────────────────────────
  treatmentRoom: {
    hero: {
      tagline: "Hire a Space",
      headline: "Treatment Room",
      body:
        "A serene, private space for one-to-one treatments, coaching, bodywork, and wellness consultations. Thoughtfully designed for deep work.",
      ctaLabel: "Request a Booking",
    },
    amenities: [
      "Professional treatment table",
      "Dimmable warm lighting",
      "Sound system for ambient music",
    ],
    suitableFor:
      "Massage therapy · Osteopathy · Physiotherapy · Acupuncture · Reiki · Sound healing · Life coaching · Nutritional therapy · Psychotherapy",
    rates: [
      { label: "Half Day", price: "€80", note: "8:00–14:00 or 14:00–20:00" },
      { label: "Full Day", price: "€150", note: "8:00–20:00 · €12.50/hr" },
    ],
    ratesNote: "Optional towel service available as an add-on: €10 per session.",
    cta: {
      headline: "Ready to book the Treatment Room?",
    },
  },

  // ─────────────────────────────────────────────
  // CATERING  /catering
  // ─────────────────────────────────────────────
  catering: {
    hero: {
      tagline: "Nourishment",
      headline: "Catering & Drinks",
      body:
        "Elevate your workshop, retreat, or event with our organic catering packages. All food and drinks can be added to any studio or treatment room booking.",
    },
    packages: [
      {
        id: "1",
        name: "Tea & Coffee Station",
        type: "DRINKS",
        description:
          "A self-serve station with organic herbal teas, coffee, and filtered water. Perfect for morning workshops and all-day retreats.",
        pricePerHead: 5,
        minimumPeople: 4,
        includes: [
          "Selection of herbal teas",
          "Coffee",
          "Variety of milks",
          "Filtered still and sparkling water",
          "Cups, napkins, all equipment",
        ],
      },
      {
        id: "2",
        name: "Wellness Drinks Package",
        type: "DRINKS",
        description:
          "Juices, kombucha, and coconut water. A nourishing alternative to hot drinks — ideal for movement-based sessions.",
        pricePerHead: 8,
        minimumPeople: 4,
        includes: [
          "3 juice varieties",
          "Kombucha selection",
          "Coconut water",
          "Still & sparkling water",
          "Glassware included",
        ],
      },
      {
        id: "3",
        name: "Light Bites Platter",
        type: "FOOD",
        description:
          "A seasonal selection of wholesome snacks. Beautifully presented and designed to energise without weighing down.",
        pricePerHead: 12,
        minimumPeople: 6,
        includes: [
          "Seasonal fruit platter",
          "Mixed nuts & seeds",
          "Homemade energy balls",
          "Seasonal dips with bread and crackers",
          "Can cater for dietary requirements",
        ],
      },
      {
        id: "4",
        name: "Full Wellness Package",
        type: "FULL_PACKAGE",
        description:
          "Our most popular option for full-day workshops and retreats. Hot drinks, juices, and a substantial mid-day lunch — locally sourced where possible.",
        pricePerHead: 35,
        minimumPeople: 8,
        includes: [
          "Full tea & coffee station",
          "Morning welcome juice",
          "Mid-session light bites",
          "Lunch (seasonal menu)",
          "Afternoon tea break",
          "All glassware, crockery & staff",
        ],
      },
    ],
    bespoke: {
      headline: "Need something bespoke?",
      body: "We can create a custom menu for your event. Get in touch and we'll put together something perfect for your group and dietary needs.",
      ctaLabel: "Enquire about catering",
    },
    footer:
      "To add catering to your space rental, mention it when you get in touch. All packages are confirmed 48 hours before your booking.",
  },

  // ─────────────────────────────────────────────
  // CLASSES  /classes
  // ─────────────────────────────────────────────
  classes: {
    hero: {
      tagline: "Weekly Schedule",
      headline: "Classes & Schedule",
      body: "Browse our weekly schedule. Booking links go directly to each practitioner.",
    },
    schedule: [] as {
      id: string;
      day: string;
      time: string;
      title: string;
      practitioner: string;
      type: string;
      duration: string;
      price: string;
      spots: number;
      bookingUrl: string;
    }[],
    footer:
      "Are you a practitioner wanting to run classes here?",
    footerCta: "Get in touch →",
  },

  // ─────────────────────────────────────────────
  // EVENTS  /events
  // ─────────────────────────────────────────────
  events: {
    hero: {
      tagline: "Classes, Workshops & Retreats",
      headline: "Events",
      body: "Upcoming practitioner sessions and special events at Be Home. Browse, find your spot, and book directly via WhatsApp.",
    },
    list: [
      {
        id: "2",
        date: "Saturday, 25 April 2026",
        isoDate: "2026-04-25",
        time: "10:00",
        title: "Rhythm and Rest",
        description:
          "This class is about balance. Energy and ease. Movement and stillness. Rhythm and Rest starts with a silent disco, an invitation to reconnect with your body through music and free movement. From there, we transition into restorative yoga, giving the body time to slow down, release, and fully rest. 80 Minutes of Bliss. It's simple, intentional, and deeply nourishing.",
        practitioner: "Jane & Eliza",
        price: "€25",
        type: "Workshop",
        spots: 0,
        whatsappUrl:
          "https://wa.me/351915555249?text=I+would+like+to+book+a+spot+at+Rhythm+and+Rest+on+Saturday+25+April+at+10am",
      },
      {
        id: "3",
        date: "Monday, 27 April 2026",
        isoDate: "2026-04-27",
        time: "12:30",
        title: "Lunchtime Sound Bath",
        description:
          "A one-hour sound bath in the middle of your day — an invitation to pause, breathe, and reset. Justyna guides you through an immersive experience using a range of instruments and her own voice, creating space for deep rest and renewal. No experience needed. Just come as you are, lie down, and let the sound do the rest. The perfect way to reclaim your afternoon.",
        practitioner: "Justyna",
        price: "€20",
        type: "Sound Bath",
        spots: 15,
        whatsappUrl:
          "https://wa.me/351960057880?text=I+would+like+to+book+a+spot+at+the+Lunchtime+Sound+Bath+on+Monday+27+April+at+12%3A30pm",
      },
      {
        id: "4",
        date: "Friday, 8 May 2026",
        isoDate: "2026-05-08",
        time: "19:00",
        title: "Evening Sound Bath",
        description:
          "Close out your week with an hour of deep, immersive sound. Justyna uses a range of instruments and her own voice to guide you into a state of stillness — helping the nervous system unwind, the mind quieten, and the body fully let go. Whether it's been a long week or a good one, a Friday evening sound bath is one of the kindest things you can do for yourself. Come as you are.",
        practitioner: "Justyna",
        price: "€20",
        type: "Sound Bath",
        spots: 15,
        whatsappUrl:
          "https://wa.me/351960057880?text=I+would+like+to+book+a+spot+at+the+Evening+Sound+Bath+on+Friday+8+May+at+7pm",
      },
    ],
    hostCta: {
      headline: "Want to run an event at Be Home?",
      body: "Our studio is available for workshops, retreats, and special events. Get in touch to discuss.",
      ctaLabel: "Enquire about hosting an event",
    },
  },

  // ─────────────────────────────────────────────
  // TREATMENTS  /treatments
  // ─────────────────────────────────────────────
  treatments: {
    hero: {
      tagline: "One-to-One",
      headline: "Treatments",
      body: "Private, one-to-one treatments with our practitioners in the Be Home treatment room. Book directly with each practitioner.",
    },
    list: [
      {
        practitioner: "Lúcia Ferreira",
        slug: "lucia-ferreira",
        specialty: "Massage Therapy",
        bio: "Lúcia has been practising massage therapy for 8 years, with additional training in myofascial release and sports recovery.",
        treatments: [
          { name: "Swedish Relaxation Massage", duration: "60 min", price: "€70" },
          { name: "Deep Tissue Massage", duration: "60 min", price: "€80" },
          { name: "Sports Massage", duration: "45 min", price: "€65" },
        ],
      },
      {
        practitioner: "James Carroll",
        slug: "james-carroll",
        specialty: "Breathwork & Sound Healing",
        bio: "James offers deeply personal one-to-one sessions in breathwork, sound, and meditation for stress, anxiety, and personal growth.",
        treatments: [
          { name: "1:1 Breathwork Session", duration: "90 min", price: "€90" },
          { name: "Sound Healing Treatment", duration: "60 min", price: "€75" },
          { name: "Meditation Coaching", duration: "60 min", price: "€65" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PRACTITIONERS  /practitioners
  // ─────────────────────────────────────────────
  practitioners: {
    hero: {
      tagline: "Our Community",
      headline: "Practitioners",
      body: "Meet the talented practitioners who call Be Home their base. Each brings their own unique skills and approach to wellness.",
    },
    directory: [
      {
        slug: "jane",
        name: "Jane",
        specialty: "Yoga",
        bio: "I'm a dedicated yoga teacher whose classes blend movement, breath and stillness. I bring warmth and care to everyone I work with.",
        tags: ["Reiki", "Yoga", "Silent Disco"],
        image: "/practitioners/jane.jpg",
        imageProfile: "",
        whatsappUrl: "", // add WhatsApp link e.g. "https://wa.me/351..."
      },
      {
        slug: "lianne",
        name: "Lianne",
        specialty: "Creativity & Crafting",
        bio: "I'm Lianne, founder of The Creative Break. I run crafting sessions and creative workshops that give you permission to slow down, make something with your hands, and remember what it feels like to create without pressure. Keep an eye out for special collaborations with other Be Home practitioners, some of my favorite workshops happen when we bring different creative worlds together.",
        tags: ["Creativity", "Crafting", "Workshops"],
        image: "/practitioners/lianne.jpg",
        imageProfile: "",
        whatsappUrl: "", // add WhatsApp link e.g. "https://wa.me/351..."
      },
      {
        slug: "justyna",
        name: "Justyna",
        specialty: "Sound Baths",
        bio: "I guide immersive sound bath experiences using a range of instruments and my own voice. I hold sessions for all ages, creating space for deep rest and renewal.",
        image: "/practitioners/justyna.jpg",
        imageProfile: "",
        tags: ["Sound Bath", "Singing", "All Ages"],
        whatsappUrl: "", // add WhatsApp link e.g. "https://wa.me/351..."
      },
      {
        slug: "eliza",
        name: "Eliza Roza Ché",
        specialty: "Restorative Yoga",
        bio: "My name is Eliza Roza Ché. I have been teaching yoga since 2015, with a practice rooted in the integration of movement, breath, and nervous system psychology. I hold 300 hours of Hot 26+ (Bikram) training, 200 hours of Vinyasa training, and a 50-hour mentorship under the late Melanie Castleman, alongside a BA in Applied Psychology from the University of South Africa.\n\nRestorative Yoga is at the heart of what I do. A chronically activated nervous system affects everything: how we feel, how we function, and how we sleep, and somatic approaches to down-regulation are among the most powerful tools we have for restoring that balance. My classes are deep, dynamic, and intentional, with language drawn from both yoga tradition and somatic psychology.\n\nPortuguese by descent, raised in South Africa, and based in Cascais since 2021, I spent over two decades working as a professional television director and producer across Africa, a background that shaped how I communicate: clearly, without fuss, with a strong sense of structure and pacing. My Restorative classes welcome complete beginners and experienced practitioners equally. What brings people back is not the difficulty of the practice. It is the quality of the stillness.",
        image: "/practitioners/eliza.jpg",
        imageProfile: "/practitioners/eliza-profile.jpg",
        imageObjectPosition: "center 40%",
        tags: ["Restorative Yoga", "Rest", "Recovery"],
        whatsappUrl: "",
      },
      {
        slug: "ramen",
        name: "Ramen",
        specialty: "Vinyasa Yoga & Active Breathwork",
        bio: "I'm Ramen, and I specialise in vinyasa yoga and active breathwork because these practices are game changers.\n\nVinyasa is all about finding your flow, linking breath to movement, building strength and flexibility, and learning to ride life's transitions with grace instead of resistance.\n\nActive breathwork can calm the nervous system, release what we've been holding onto, and bring a sense of clarity and lightness that stays with you long after the class ends.\n\nI fell in love with these practices because of the way they made me feel — they don't just make you feel good for an hour, they rewire how you handle stress, process emotions, and show up in the world.\n\nI'm here to share that with you, and trust me, once you tap into the power of intentional movement and breath, there's no going back.",
        image: "/practitioners/ramen.jpg",
        imageProfile: "/practitioners/ramen.jpg",
        tags: ["Vinyasa Yoga", "Breathwork", "Movement"],
        whatsappUrl: "",
      },
    ],
    joinCta: {
      headline: "Want to join our practitioner community?",
      body: "We welcome applications from experienced practitioners. Get in touch to discuss hiring a space.",
      ctaLabel: "Apply to join",
    },
  },

  // ─────────────────────────────────────────────
  // CONTACT  /contact
  // ─────────────────────────────────────────────
  contact: {
    hero: {
      tagline: "Say Hello",
      headline: "Get in touch",
      body: "Whether you'd like to hire a space, join our practitioner community, or just have a question — we'd love to hear from you.",
    },
    email: "hello@behomecascais.com",
    location: "Cascais, Portugal",
    instagram: "@behome.cascais",
    instagramUrl: "https://www.instagram.com/behome.cascais",
    whatsappUrl: "https://wa.me/447736709009",
    subjects: [
      "Studio Booking",
      "Treatment Room Booking",
      "Catering Enquiry",
      "Practitioner Application",
      "Event Enquiry",
      "General Question",
    ],
  },
  // ─────────────────────────────────────────────
  // BESPOKE  /bespoke
  // ─────────────────────────────────────────────
  bespoke: {
    hero: {
      tagline: "Curated Experiences",
      headline: "Be Home Bespoke",
      body: "A fully curated wellness day, designed around you. We bring together our practitioners to create a bespoke experience for you and your friends — combining movement, healing, creativity, and nourishment into one unforgettable day.",
    },
    intro: {
      headline: "Your perfect day, designed by us",
      body: "Tell us what you're looking for — a morning of yoga and sound, an afternoon of treatments and crafting, or a full-day retreat — and we'll curate it. Every Bespoke experience is unique, and every detail is taken care of.",
    },
    experiences: [
      {
        icon: "◎",
        title: "Movement & Breath",
        description: "Yoga, pilates, breathwork, or dance — we'll match you with the perfect practitioner for your group.",
      },
      {
        icon: "◇",
        title: "Healing & Treatments",
        description: "Sound baths, massage, reiki, and more. Space and time to truly unwind.",
      },
      {
        icon: "◈",
        title: "Creativity & Craft",
        description: "Offline creative sessions to slow down, make something beautiful, and reconnect with your imagination.",
      },
      {
        icon: "✦",
        title: "Nourishment",
        description: "Organic teas, juices, and catering packages to keep your group energised throughout the day.",
      },
    ],
    tailored: {
      headline: "Tailored for everyone",
      adult: {
        label: "For you & your friends",
        body: "A curated wellness day, a birthday celebration, a hen party with heart — or simply a day to gather and feel good together. We'll create something that reflects exactly what your group needs.",
      },
      kids: {
        label: "For kids & teens",
        body: "From creative craft sessions to movement and mindfulness, we offer bespoke experiences for younger groups too — fun, grounding, and genuinely nourishing.",
      },
    },
    howItWorks: [
      { step: "1", label: "Tell us your vision", body: "Get in touch and share what you have in mind — dates, group size, and any must-haves." },
      { step: "2", label: "We curate your day", body: "We match you with the right practitioners, put together a schedule, and handle every detail." },
      { step: "3", label: "You arrive and enjoy", body: "All you need to do is show up. We take care of everything else." },
    ],
    cta: {
      headline: "Ready to plan your Bespoke day?",
      body: "Get in touch and tell us what you have in mind. We'll take it from there.",
      ctaLabel: "Enquire about Bespoke",
    },
  },

  // ─────────────────────────────────────────────
  // WORKSHOP  /workshop
  // ─────────────────────────────────────────────
  workshop: {
    hero: {
      tagline: "Hire a Space",
      headline: "The Workshop",
      body: "A warm, creative space with a large crafting table, comfortable sofas, and an open fireplace. Ideal for workshops, making sessions, team meetings, and intimate gatherings.",
      ctaLabel: "Request a Booking",
      ctaHref: "/contact?subject=Workshop+Hire",
    },
    amenities: [
      "Large crafting and making table",
      "Comfortable sofas and lounge seating",
      "Open fireplace",
      "Natural light",
      "Kitchenette access",
      "Whiteboard and display wall",
      "Wi-Fi included",
    ],
    rates: [
      { label: "90 Minutes", price: "€50", note: "" },
      { label: "Half Day",   price: "€150", note: "8:00–14:00 or 14:00–20:00" },
      { label: "Full Day",   price: "€300", note: "8:00–20:00" },
    ],
    ratesNote: "Rates exclude IVA. Extended hours up to 22:00 available on request.",
    cateringNote:
      "Food and drink packages available on request — organic teas, juices, snack platters and more.",
    cta: {
      headline: "Ready to book the Workshop?",
    },
  },

} as const;

// Type exports for convenience
export type ContentHomepage = typeof content.homepage;
export type ContentAbout = typeof content.about;
export type ContentStudio = typeof content.studio;
export type ContentCatering = typeof content.catering;
export type CateringPackage = typeof content.catering.packages[number];
export type ClassEntry = typeof content.classes.schedule[number];
export type EventEntry = typeof content.events.list[number];
export type PractitionerEntry = typeof content.practitioners.directory[number];
export type ContentBespoke = typeof content.bespoke;
