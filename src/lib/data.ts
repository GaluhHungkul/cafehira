export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  // { label: "Gallery", href: "#gallery" },
  // { label: "Reviews", href: "#reviews" },
  { label: "Reserve", href: "/reserve" },
] as const;

export const menuItems = [
  {
    id: "signature-latte",
    name: "Hira Signature Latte",
    category: "Signature",
    description:
      "Silky oat milk, house espresso, and a touch of golden honey.",
    price: "$6.50",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  },
  {
    id: "pour-over",
    name: "Single Origin Pour Over",
    category: "Coffee",
    description:
      "Ethiopian beans with bright citrus notes and a clean finish.",
    price: "$5.75",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  },
  {
    id: "cold-brew",
    name: "Kyoto Cold Brew",
    category: "Coffee",
    description:
      "Slow-dripped for 18 hours. Smooth, bold, and refreshingly crisp.",
    price: "$5.25",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80",
  },
  {
    id: "matcha",
    name: "Ceremonial Matcha",
    category: "Signature",
    description:
      "Stone-ground Uji matcha whisked to a velvety, umami-rich froth.",
    price: "$6.00",
    image:
      "https://images.unsplash.com/photo-1695191499096-8a7ffe8d5b8e?w=600&q=80",
  },
  {
    id: "tiramisu",
    name: "Espresso Tiramisu",
    category: "Dessert",
    description:
      "Layers of mascarpone cream infused with our house espresso.",
    price: "$8.50",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "Dessert",
    description:
      "Flaky, golden layers baked fresh every morning until 11 AM.",
    price: "$4.25",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  },
  {
    id: "iced-americano",
    name: "Iced Americano",
    category: "Coffee",
    description: "Bold espresso over ice with filtered water. Refreshing and intense.",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1581996323441-538096e854b9?w=600&q=80",
  },
  {
    id: "cappuccino",
    name: "Classic Cappuccino",
    category: "Coffee",
    description: "Equal parts espresso, steamed milk, and a thick layer of micro-foam.",
    price: "$5.50",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80",
  },
  {
    id: "earl-grey",
    name: "London Fog (Earl Grey)",
    category: "Signature",
    description: "Premium Earl Grey tea steamed with oat milk and a hint of vanilla.",
    price: "$5.00",
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&q=80",
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Crumble Muffin",
    category: "Dessert",
    description: "Soft, fluffy muffin packed with wild blueberries and a toasted crumb topping.",
    price: "$3.75",
    image: "https://images.unsplash.com/photo-1619679407781-5a567c172c0b?w=600&q=80",
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    category: "Coffee",
    description: "Vanilla syrup, steamed milk, rich espresso, and a buttery caramel drizzle.",
    price: "$6.25",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&q=80",
  },
  {
    id: "avocado-toast",
    name: "Hira Avocado Toast",
    category: "Signature",
    description: "Smashed avocado on artisan sourdough with cherry tomatoes and microgreens.",
    price: "$9.50",
    image: "https://images.unsplash.com/photo-1779456954908-6e818a0ab3e0?w=600&q=80",
  },
] as const;

export const galleryImages = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    alt: "Cafe interior with warm lighting",
    span: "col-span-2 row-span-2",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
    alt: "Latte art close-up",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    alt: "Coffee beans and brewing equipment",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1744444203753-f556c1e6eb8d?w=600&q=80",
    alt: "Pastries on display",
    span: "col-span-1 row-span-2",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1513663580958-665b7ef55d1b?w=600&q=80",
    alt: "Barista crafting a drink",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1642647916129-3909c75c0267?w=800&q=80",
    alt: "Cozy seating area",
    span: "col-span-2 row-span-1",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1666632814910-daebf04b69b8?w=800&q=80",
    alt: "Cozy seating area",
    span: "col-span-1 row-span-1",
  },
] as const;

export const testimonials = [
  {
    id: "t1",
    name: "Sofia Nakamura",
    role: "Regular Guest",
    quote:
      "CafeHira feels like stepping into a quiet moment in Tokyo. The matcha is unmatched, and the atmosphere is pure calm.",
    avatar: "SN",
    rating: 5,
  },
  {
    id: "t2",
    name: "James Chen",
    role: "Coffee Enthusiast",
    quote:
      "Their pour-over program is serious without being pretentious. Every cup tells a story — you can taste the care.",
    avatar: "JC",
    rating: 5,
  },
  {
    id: "t3",
    name: "Elena Rodriguez",
    role: "Food Blogger",
    quote:
      "The tiramisu alone is worth the visit. Paired with the signature latte, it's the perfect afternoon ritual.",
    avatar: "ER",
    rating: 5,
  },
] as const;

export const footerLinks = {
  explore: [
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reservations", href: "#reserve" },
  ],
  info: [
    { label: "Private Events", href: "#" },
    { label: "Gift Cards", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
} as const;

export const cafeInfo = {
  address: "42 Serenity Lane, Willow District",
  hours: "Mon–Fri 7AM–9PM · Sat–Sun 8AM–10PM",
  phone: "+1 (555) 234-5678",
  email: "hello@cafehira.com",
} as const;
