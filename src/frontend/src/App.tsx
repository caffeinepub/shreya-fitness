import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Bike,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Facebook,
  Flame,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Music,
  Phone,
  Star,
  Target,
  Trophy,
  Twitter,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useSignupNewsletter,
  useSubmitContact,
  useSubmitFreeTrial,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

// ——————————————————————————————————————————
// DATA
// ——————————————————————————————————————————
const CLASSES = [
  {
    icon: Dumbbell,
    name: "Strength Training",
    desc: "Build lean muscle and increase your overall strength with expert-guided weight sessions.",
    duration: "60 min",
    difficulty: "All Levels",
    img: "/assets/generated/class-strength.dim_600x400.jpg",
  },
  {
    icon: Flame,
    name: "HIIT Cardio",
    desc: "Torch calories and boost your metabolism with high-intensity interval training circuits.",
    duration: "45 min",
    difficulty: "Intermediate",
    img: "/assets/generated/class-hiit.dim_600x400.jpg",
  },
  {
    icon: Heart,
    name: "Yoga & Flexibility",
    desc: "Improve mobility, reduce stress, and achieve inner balance with our yoga sessions.",
    duration: "60 min",
    difficulty: "Beginner",
    img: "/assets/generated/class-yoga.dim_600x400.jpg",
  },
  {
    icon: Bike,
    name: "Spin Cycling",
    desc: "High-energy indoor cycling sessions set to pumping music for maximum cardio burn.",
    duration: "45 min",
    difficulty: "Intermediate",
    img: "/assets/generated/class-hiit.dim_600x400.jpg",
  },
  {
    icon: Target,
    name: "Boxing",
    desc: "Learn real boxing techniques, build coordination and explosive power in our boxing classes.",
    duration: "60 min",
    difficulty: "Advanced",
    img: "/assets/generated/class-strength.dim_600x400.jpg",
  },
  {
    icon: Music,
    name: "Zumba Dance",
    desc: "Dance your way to fitness with fun Latin-inspired routines that feel like a party.",
    duration: "50 min",
    difficulty: "Beginner",
    img: "/assets/generated/class-yoga.dim_600x400.jpg",
  },
];

const SCHEDULE_TIMES = [
  "6:00 AM",
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "5:00 PM",
  "7:00 PM",
];
const SCHEDULE_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const SCHEDULE_DATA: Record<string, Record<string, string>> = {
  "6:00 AM": {
    MON: "Strength",
    TUE: "HIIT",
    WED: "Yoga",
    THU: "Strength",
    FRI: "HIIT",
    SAT: "Spin",
    SUN: "Yoga",
  },
  "8:00 AM": {
    MON: "Spin",
    TUE: "Yoga",
    WED: "Boxing",
    THU: "Zumba",
    FRI: "Spin",
    SAT: "Strength",
    SUN: "Zumba",
  },
  "10:00 AM": {
    MON: "Zumba",
    TUE: "Strength",
    WED: "HIIT",
    THU: "Yoga",
    FRI: "Boxing",
    SAT: "HIIT",
    SUN: "Strength",
  },
  "12:00 PM": {
    MON: "Boxing",
    TUE: "Spin",
    WED: "Strength",
    THU: "HIIT",
    FRI: "Yoga",
    SAT: "Boxing",
    SUN: "HIIT",
  },
  "5:00 PM": {
    MON: "HIIT",
    TUE: "Boxing",
    WED: "Zumba",
    THU: "Spin",
    FRI: "Strength",
    SAT: "Yoga",
    SUN: "Spin",
  },
  "7:00 PM": {
    MON: "Yoga",
    TUE: "Zumba",
    WED: "Spin",
    THU: "Boxing",
    FRI: "Zumba",
    SAT: "Zumba",
    SUN: "Boxing",
  },
};
const POPULAR_SLOTS = new Set(["HIIT", "Strength", "Spin"]);

const PRICING = [
  {
    name: "Basic",
    price: "₹999",
    popular: false,
    features: [
      "3 classes per week",
      "Locker access",
      "Basic equipment use",
      "Fitness assessment",
      "Group classes",
    ],
  },
  {
    name: "Premium",
    price: "₹1,999",
    popular: true,
    features: [
      "Unlimited classes",
      "Personal trainer 2x/month",
      "Nutrition guide",
      "Locker & towel service",
      "Priority booking",
      "All group classes",
    ],
  },
  {
    name: "Elite",
    price: "₹3,499",
    popular: false,
    features: [
      "All Premium features",
      "Daily personal trainer",
      "Custom meal planning",
      "Priority class booking",
      "VIP locker room",
      "Spa & recovery access",
      "24/7 gym access",
    ],
  },
];

const TRAINERS = [
  {
    name: "Priya Sharma",
    specialty: "Strength & Conditioning",
    bio: "10+ years helping clients build functional strength. Certified NSCA trainer with a passion for empowering women in fitness.",
    img: "/assets/generated/trainer-priya.dim_400x400.jpg",
  },
  {
    name: "Rahul Mehra",
    specialty: "HIIT & Cardio",
    bio: "Former national athlete turned fitness coach. Specializes in high-performance training and body transformation programs.",
    img: "/assets/generated/trainer-rahul.dim_400x400.jpg",
  },
  {
    name: "Anita Singh",
    specialty: "Yoga & Wellness",
    bio: "Certified yoga instructor with expertise in therapeutic yoga. Helps clients achieve balance between mind, body and spirit.",
    img: "/assets/generated/trainer-anita.dim_400x400.jpg",
  },
  {
    name: "Vikram Patel",
    specialty: "Boxing & MMA",
    bio: "Ex-professional boxer with 8 years of coaching experience. Teaches discipline, technique, and mental toughness.",
    img: "/assets/generated/trainer-vikram.dim_400x400.jpg",
  },
];

const TESTIMONIALS = [
  {
    name: "Meera Krishnan",
    rating: 5,
    text: "Shreya Fitness completely transformed my life. The trainers are incredibly supportive and the community is amazing. I feel stronger and more confident than ever!",
    achievement: "Lost 15kg in 3 months",
  },
  {
    name: "Arjun Kapoor",
    rating: 5,
    text: "The HIIT classes here are next level. Rahul's training pushed me beyond limits I thought were impossible. Best gym in the city, no doubt!",
    achievement: "Gained 8kg muscle in 4 months",
  },
  {
    name: "Sunita Reddy",
    rating: 5,
    text: "Anita's yoga sessions have been life-changing for my mental health. The Premium plan is absolutely worth every rupee. Highly recommended!",
    achievement: "Improved flexibility by 60%",
  },
  {
    name: "Karthik Nair",
    rating: 5,
    text: "The Elite membership gave me everything I needed — meal plans, daily training, and VIP access. Vikram's boxing classes are incredibly fun!",
    achievement: "Completed first marathon",
  },
];

const GALLERY_IMGS = [
  "/assets/generated/gym-hero.dim_1920x1080.jpg",
  "/assets/generated/class-strength.dim_600x400.jpg",
  "/assets/generated/class-hiit.dim_600x400.jpg",
  "/assets/generated/class-yoga.dim_600x400.jpg",
  "/assets/generated/trainer-priya.dim_400x400.jpg",
  "/assets/generated/trainer-vikram.dim_400x400.jpg",
];

const BLOG_POSTS = [
  {
    title: "5 Essential Exercises for Beginners",
    excerpt:
      "Starting your fitness journey can feel overwhelming. These 5 foundational exercises will build the base you need to level up fast.",
    date: "March 10, 2026",
    img: "/assets/generated/blog-1.dim_600x400.jpg",
  },
  {
    title: "Nutrition Tips for Maximum Muscle Gain",
    excerpt:
      "Unlock your body's full potential with these science-backed nutrition strategies that fuel muscle growth and accelerate recovery.",
    date: "March 5, 2026",
    img: "/assets/generated/blog-2.dim_600x400.jpg",
  },
  {
    title: "How HIIT Can Transform Your Body",
    excerpt:
      "Discover why high-intensity interval training is the most efficient way to burn fat, build endurance, and reshape your physique.",
    date: "February 28, 2026",
    img: "/assets/generated/blog-3.dim_600x400.jpg",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you offer a free trial?",
    a: "Yes! We offer a completely free first class for all new members. No commitment required — just show up and experience Shreya Fitness firsthand.",
  },
  {
    q: "Can I cancel my membership anytime?",
    a: "Absolutely. We offer a no-questions-asked cancellation policy. You can cancel anytime with 7 days notice, with no hidden fees.",
  },
  {
    q: "What are your operating hours?",
    a: "We're open Monday–Friday 5:30 AM to 10:00 PM, Saturday 6:00 AM to 8:00 PM, and Sunday 8:00 AM to 6:00 PM. Elite members enjoy 24/7 access.",
  },
  {
    q: "Are the trainers certified?",
    a: "All our trainers hold nationally recognized certifications (NSCA, ACE, or equivalent) and undergo continuous education to stay current with fitness science.",
  },
  {
    q: "What should I bring to my first class?",
    a: "Just bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We provide all the equipment you need.",
  },
  {
    q: "Do you offer nutrition coaching?",
    a: "Yes! Premium and Elite members get access to our certified nutritionist for personalized meal plans. Elite members receive weekly check-ins and custom diet programs.",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Expert Trainers",
    desc: "Our certified trainers bring years of professional experience to craft personalized programs that deliver real, measurable results.",
  },
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    desc: "State-of-the-art machines and free weights, regularly maintained and updated, to give you every tool you need to succeed.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    desc: "With extended operating hours and 24/7 access for Elite members, you can work out whenever it fits your busy schedule.",
  },
  {
    icon: Zap,
    title: "30+ Class Types",
    desc: "From high-intensity cardio to mindful yoga, our diverse class lineup ensures you never get bored and always keep progressing.",
  },
];

const COUNTERS = [
  { value: 2500, label: "Members", suffix: "+" },
  { value: 50, label: "Expert Trainers", suffix: "+" },
  { value: 30, label: "Classes", suffix: "+" },
  { value: 10, label: "Years of Excellence", suffix: "+" },
];

// ——————————————————————————————————————————
// HOOKS
// ——————————————————————————————————————————
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ——————————————————————————————————————————
// COMPONENTS
// ——————————————————————————————————————————
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    "Home",
    "Classes",
    "Schedule",
    "Pricing",
    "Trainers",
    "Contact",
  ];

  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-gym border-b border-gym-border"
          : "bg-transparent"
      }`}
      style={{
        borderBottomColor: scrolled
          ? "oklch(var(--gym-border))"
          : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
            onClick={() => scrollTo("home")}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--gym-orange))" }}
            >
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="gym-heading text-xl text-white">
              Shreya{" "}
              <span style={{ color: "oklch(var(--gym-orange))" }}>Fitness</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => scrollTo(link)}
                data-ocid={`nav.${link.toLowerCase()}.link`}
                className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                style={
                  {
                    "--tw-after-bg": "oklch(var(--gym-orange))",
                  } as React.CSSProperties
                }
              >
                {link}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              type="button"
              data-ocid="nav.join_now.button"
              onClick={() => scrollTo("freetrial")}
              className="btn-orange px-5 py-2.5 rounded-full text-sm"
            >
              Join Now
            </button>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            data-ocid="nav.mobile_menu.button"
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gym-panel border-b border-gym"
          >
            <nav className="px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left py-2 text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white"
                >
                  {link}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("freetrial")}
                className="btn-orange px-5 py-2.5 rounded-full text-sm mt-2"
              >
                Join Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/gym-hero.dim_1920x1080.jpg"
          alt="Gym interior"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.6)" }}
        />
      </div>

      {/* Free trial badge */}
      <div className="absolute top-28 right-6 md:right-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ delay: 1 }}
          className="rounded-full w-24 h-24 flex flex-col items-center justify-center text-center shadow-gym"
          style={{
            backgroundColor: "oklch(var(--gym-orange))",
            boxShadow: "0 0 30px oklch(0.65 0.2 36 / 0.5)",
          }}
        >
          <span className="text-white font-bold text-xs uppercase leading-tight">
            First Class
          </span>
          <span className="text-white font-black text-sm uppercase">FREE!</span>
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-label mb-4"
        >
          Welcome to Shreya Fitness
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="gym-heading text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
        >
          <span style={{ color: "oklch(var(--gym-orange))" }}>Unleash</span>
          <br />
          <span className="text-white">Your Potential</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gym-muted max-w-2xl mx-auto mb-10"
        >
          State-of-the-art equipment, expert trainers, and a supportive
          community — everything you need to transform your body and transform
          your life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            type="button"
            data-ocid="hero.view_classes.button"
            onClick={() =>
              document
                .getElementById("classes")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-orange px-8 py-4 rounded-full text-base"
          >
            View Classes
          </button>
          <button
            type="button"
            data-ocid="hero.get_started.button"
            onClick={() =>
              document
                .getElementById("freetrial")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-full text-base font-bold uppercase tracking-wider text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all"
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
}

function CounterItem({
  value,
  label,
  suffix,
  start,
}: { value: number; label: string; suffix: string; start: boolean }) {
  const count = useCountUp(value, 2000, start);
  return (
    <div className="text-center">
      <div
        className="gym-heading text-5xl md:text-6xl"
        style={{ color: "oklch(var(--gym-orange))" }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gym-muted mt-2 uppercase tracking-widest text-sm font-semibold">
        {label}
      </div>
    </div>
  );
}

function CountersSection() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className="py-16"
      style={{ backgroundColor: "oklch(var(--gym-orange))" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COUNTERS.map((c) => (
            <CounterItem
              key={c.label}
              value={c.value}
              label={c.label}
              suffix={c.suffix}
              start={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Why Choose Us</p>
          <h2 className="section-title text-4xl md:text-5xl">
            The Shreya Difference
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gym-panel rounded-2xl p-8 border border-gym-border card-hover text-center"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "oklch(var(--gym-orange) / 0.15)" }}
              >
                <feat.icon
                  className="w-7 h-7"
                  style={{ color: "oklch(var(--gym-orange))" }}
                />
              </div>
              <h3 className="section-title text-lg mb-3">{feat.title}</h3>
              <p className="text-gym-muted text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassesSection() {
  return (
    <section id="classes" className="py-24 px-4 bg-gym-panel">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">What We Offer</p>
          <h2 className="section-title text-4xl md:text-5xl">
            Explore Our Classes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLASSES.map((cls, i) => (
            <motion.div
              key={cls.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden border border-gym-border bg-gym-card card-hover group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cls.img}
                  alt={cls.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  }}
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: "oklch(var(--gym-orange))",
                      color: "white",
                    }}
                  >
                    {cls.duration}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-white/40 text-white"
                  >
                    {cls.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "oklch(var(--gym-orange) / 0.15)" }}
                >
                  <cls.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--gym-orange))" }}
                  />
                </div>
                <h3 className="section-title text-lg mb-2">{cls.name}</h3>
                <p className="text-gym-muted text-sm mb-4 leading-relaxed">
                  {cls.desc}
                </p>
                <button
                  type="button"
                  data-ocid="classes.learn_more.button"
                  className="text-sm font-bold uppercase tracking-wider transition-colors"
                  style={{ color: "oklch(var(--gym-orange))" }}
                  onClick={() =>
                    document
                      .getElementById("schedule")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const [bookModal, setBookModal] = useState<{
    className: string;
    time: string;
    day: string;
  } | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");

  const handleBook = useCallback(() => {
    if (!bookName || !bookEmail || !bookModal) return;
    toast.success(
      `Booked ${bookModal.className} on ${bookModal.day} at ${bookModal.time}!`,
    );
    setBookModal(null);
    setBookName("");
    setBookEmail("");
  }, [bookName, bookEmail, bookModal]);

  return (
    <section id="schedule" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Weekly Timetable</p>
          <h2 className="section-title text-4xl md:text-5xl">Class Schedule</h2>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gym-border shadow-gym">
          <div className="overflow-x-auto">
            <table className="w-full" data-ocid="schedule.table">
              <thead>
                <tr style={{ backgroundColor: "oklch(var(--gym-panel))" }}>
                  <th className="py-4 px-4 text-left text-gym-muted text-xs font-bold uppercase tracking-widest w-24">
                    TIME
                  </th>
                  {SCHEDULE_DAYS.map((day) => (
                    <th key={day} className="py-4 px-3 text-center">
                      <span
                        className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: "oklch(var(--gym-border))",
                          color: "white",
                        }}
                      >
                        {day}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE_TIMES.map((time, ti) => (
                  <tr
                    key={time}
                    className="border-t border-gym-border"
                    style={{
                      backgroundColor:
                        ti % 2 === 0
                          ? "oklch(var(--gym-panel) / 0.5)"
                          : "transparent",
                    }}
                  >
                    <td className="py-4 px-4">
                      <span className="text-xs font-bold text-gym-muted uppercase tracking-wider">
                        {time}
                      </span>
                    </td>
                    {SCHEDULE_DAYS.map((day) => {
                      const cls = SCHEDULE_DATA[time]?.[day] ?? "";
                      const isPopular = POPULAR_SLOTS.has(cls);
                      return (
                        <td key={day} className="py-3 px-2 text-center">
                          {cls && (
                            <button
                              type="button"
                              data-ocid="schedule.book.button"
                              onClick={() =>
                                setBookModal({ className: cls, time, day })
                              }
                              className={`w-full py-2 px-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 ${
                                isPopular
                                  ? "text-white"
                                  : "bg-gym-card text-white/80 hover:text-white border border-gym-border"
                              }`}
                              style={
                                isPopular
                                  ? {
                                      backgroundColor:
                                        "oklch(var(--gym-orange))",
                                      color: "white",
                                    }
                                  : {}
                              }
                            >
                              {cls}
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-gym-muted text-sm mt-4">
          Click any class to book your spot •{" "}
          <span style={{ color: "oklch(var(--gym-orange))" }}>
            Orange = Popular
          </span>
        </p>
      </div>

      {/* Book modal */}
      <AnimatePresence>
        {bookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            onClick={() => setBookModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              data-ocid="schedule.booking.modal"
              className="rounded-2xl p-8 w-full max-w-md border border-gym-border"
              style={{ backgroundColor: "oklch(var(--gym-panel))" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="section-title text-2xl mb-1">Book Class</h3>
              <p className="text-gym-muted mb-6">
                {bookModal.className} — {bookModal.day} at {bookModal.time}
              </p>
              <div className="space-y-4">
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">
                    Your Name
                  </Label>
                  <Input
                    data-ocid="schedule.book_name.input"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-gym-card border-gym-border text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    data-ocid="schedule.book_email.input"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-gym-card border-gym-border text-white"
                    type="email"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    data-ocid="schedule.book_confirm.button"
                    onClick={handleBook}
                    className="btn-orange flex-1 py-3 rounded-xl text-sm"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    data-ocid="schedule.book_cancel.button"
                    onClick={() => setBookModal(null)}
                    className="flex-1 py-3 rounded-xl text-sm font-bold uppercase text-white/70 border border-gym-border hover:border-white/40 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gym-panel">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Membership Plans</p>
          <h2 className="section-title text-4xl md:text-5xl">
            Choose Your Plan
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 border relative card-hover flex flex-col ${
                plan.popular
                  ? "border-gym-orange shadow-gym-orange"
                  : "border-gym-border bg-gym-card"
              }`}
              style={
                plan.popular
                  ? {
                      borderColor: "oklch(var(--gym-orange))",
                      backgroundColor: "oklch(var(--gym-card))",
                    }
                  : {}
              }
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "oklch(var(--gym-orange))" }}
                >
                  Most Popular
                </div>
              )}
              <h3 className="section-title text-2xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="gym-heading text-5xl text-white">
                  {plan.price}
                </span>
                <span className="text-gym-muted">/mo</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 text-sm text-gym-muted"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "oklch(var(--gym-orange) / 0.2)",
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "oklch(var(--gym-orange))" }}
                      />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-ocid={`pricing.${plan.name.toLowerCase()}.button`}
                onClick={() =>
                  document
                    .getElementById("freetrial")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                  plan.popular
                    ? "btn-orange"
                    : "border-2 border-gym-border text-white hover:border-gym-orange hover:text-gym-orange"
                }`}
                style={
                  !plan.popular
                    ? {
                        borderColor: "oklch(var(--gym-border))",
                        color: "white",
                      }
                    : {}
                }
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainersSection() {
  return (
    <section id="trainers" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">The Team</p>
          <h2 className="section-title text-4xl md:text-5xl">
            Meet Our Trainers
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-gym-border bg-gym-panel card-hover"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="section-title text-lg mb-1">{trainer.name}</h3>
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: "oklch(var(--gym-orange))" }}
                >
                  {trainer.specialty}
                </p>
                <p className="text-gym-muted text-sm leading-relaxed mb-4">
                  {trainer.bio}
                </p>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, name: "instagram" },
                    { Icon: Facebook, name: "facebook" },
                    { Icon: Twitter, name: "twitter" },
                  ].map(({ Icon, name }) => (
                    <button
                      type="button"
                      key={name}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gym-border text-white/50 hover:text-white hover:border-white/40 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = useCallback(
    () =>
      setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    [],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % TESTIMONIALS.length),
    [],
  );

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-24 px-4 bg-gym-panel">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">What Members Say</p>
          <h2 className="section-title text-4xl md:text-5xl">
            Success Stories
          </h2>
        </div>
        <div className="rounded-2xl border border-gym-border bg-gym-card p-8 md:p-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }, (_, j) => j + 1).map(
                  (star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-current text-gym-gold"
                      style={{ color: "oklch(var(--gym-gold))" }}
                    />
                  ),
                )}
              </div>
              <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-white text-lg">{t.name}</div>
                  {t.achievement && (
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "oklch(var(--gym-orange))" }}
                    >
                      🏆 {t.achievement}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              data-ocid="testimonials.prev.button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gym-border flex items-center justify-center text-white hover:border-gym-orange transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, j) => (
                <button
                  type="button"
                  key={t.name}
                  onClick={() => setCurrent(j)}
                  className="rounded-full transition-all"
                  style={{
                    width: j === current ? "24px" : "8px",
                    height: "8px",
                    backgroundColor:
                      j === current
                        ? "oklch(var(--gym-orange))"
                        : "oklch(var(--gym-border))",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              data-ocid="testimonials.next.button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-gym-border flex items-center justify-center text-white hover:border-gym-orange transition-all"
              style={
                {
                  "--hover-border": "oklch(var(--gym-orange))",
                } as React.CSSProperties
              }
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Gallery</p>
          <h2 className="section-title text-4xl md:text-5xl">Our Gym Life</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMGS.map((src) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: GALLERY_IMGS.indexOf(src) * 0.05 }}
              className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square"
            >
              <img
                src={src}
                alt="Gym training"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "oklch(var(--gym-orange) / 0.6)" }}
              >
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="py-24 px-4 bg-gym-panel">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Latest Articles</p>
          <h2 className="section-title text-4xl md:text-5xl">Fitness Blog</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-gym-border bg-gym-card card-hover"
              data-ocid={`blog.item.${i + 1}`}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--gym-orange))" }}
                  />
                  <span className="text-gym-muted text-xs">{post.date}</span>
                </div>
                <h3 className="section-title text-lg mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-gym-muted text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <button
                  type="button"
                  data-ocid="blog.read_more.button"
                  className="text-sm font-bold uppercase tracking-wider transition-colors"
                  style={{ color: "oklch(var(--gym-orange))" }}
                >
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const h = Number.parseFloat(height) / 100;
    const w = Number.parseFloat(weight);
    if (h > 0 && w > 0) {
      setBmi(Math.round((w / (h * h)) * 10) / 10);
    }
  };

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "oklch(0.7 0.12 220)" };
    if (b < 25) return { label: "Normal Weight", color: "oklch(0.7 0.15 140)" };
    if (b < 30) return { label: "Overweight", color: "oklch(var(--gym-gold))" };
    return { label: "Obese", color: "oklch(var(--destructive))" };
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Health Tools</p>
          <h2 className="section-title text-4xl md:text-5xl">BMI Calculator</h2>
        </div>
        <div className="rounded-2xl border border-gym-border bg-gym-panel p-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">
                Height (cm)
              </Label>
              <Input
                data-ocid="bmi.height.input"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 170"
                className="bg-gym-card border-gym-border text-white"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">
                Weight (kg)
              </Label>
              <Input
                data-ocid="bmi.weight.input"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                className="bg-gym-card border-gym-border text-white"
              />
            </div>
          </div>
          <button
            type="button"
            data-ocid="bmi.calculate.button"
            onClick={calculate}
            className="btn-orange w-full py-4 rounded-xl text-base mb-6"
          >
            Calculate BMI
          </button>
          {bmi !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 text-center border"
              style={{
                backgroundColor: "oklch(var(--gym-card))",
                borderColor: "oklch(var(--gym-border))",
              }}
              data-ocid="bmi.result.success_state"
            >
              <div className="text-gym-muted text-sm mb-2">Your BMI</div>
              <div className="gym-heading text-5xl text-white mb-2">{bmi}</div>
              <div
                className="font-bold text-lg"
                style={{ color: getCategory(bmi).color }}
              >
                {getCategory(bmi).label}
              </div>
              <p className="text-gym-muted text-xs mt-3">
                BMI below 18.5 = Underweight · 18.5–24.9 = Normal · 25–29.9 =
                Overweight · 30+ = Obese
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 bg-gym-panel">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Got Questions?</p>
          <h2 className="section-title text-4xl md:text-5xl">FAQ</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="faq.panel"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="rounded-xl border border-gym-border px-6 overflow-hidden"
              style={{ backgroundColor: "oklch(var(--gym-card))" }}
            >
              <AccordionTrigger
                className="text-white font-semibold text-left py-5 hover:no-underline"
                data-ocid={`faq.item.${i + 1}`}
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gym-muted pb-5 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FreeTrialSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const { mutate, isPending, isSuccess } = useSubmitFreeTrial();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !goal) {
      toast.error("Please fill in all fields");
      return;
    }
    mutate(
      { name, email, phone, goal },
      {
        onSuccess: () => {
          toast.success(
            "Welcome to Shreya Fitness! Your free trial is confirmed.",
          );
          setName("");
          setEmail("");
          setPhone("");
          setGoal("");
        },
        onError: () => toast.error("Something went wrong. Please try again."),
      },
    );
  };

  return (
    <section
      id="freetrial"
      className="py-24 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(var(--background)) 0%, oklch(0.11 0.005 240) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Start Today</p>
          <h2 className="section-title text-4xl md:text-5xl">
            Claim Your Free Trial
          </h2>
          <p className="text-gym-muted mt-4">
            Your first class is completely free. No credit card required.
          </p>
        </div>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-12 text-center border"
            style={{
              backgroundColor: "oklch(var(--gym-panel))",
              borderColor: "oklch(var(--gym-orange))",
            }}
            data-ocid="freetrial.success_state"
          >
            <Trophy
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "oklch(var(--gym-orange))" }}
            />
            <h3 className="section-title text-3xl mb-3">You're In!</h3>
            <p className="text-gym-muted">
              We'll contact you shortly to schedule your free trial class.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gym-border bg-gym-panel p-8 space-y-5"
            data-ocid="freetrial.form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">
                  Full Name *
                </Label>
                <Input
                  data-ocid="freetrial.name.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="bg-gym-card border-gym-border text-white"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">
                  Email Address *
                </Label>
                <Input
                  data-ocid="freetrial.email.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-gym-card border-gym-border text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">
                  Phone Number *
                </Label>
                <Input
                  data-ocid="freetrial.phone.input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="bg-gym-card border-gym-border text-white"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">
                  Fitness Goal *
                </Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger
                    data-ocid="freetrial.goal.select"
                    className="bg-gym-card border-gym-border text-white"
                  >
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-gym-panel border-gym-border">
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="endurance">Build Endurance</SelectItem>
                    <SelectItem value="flexibility">
                      Improve Flexibility
                    </SelectItem>
                    <SelectItem value="general">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              data-ocid="freetrial.submit.button"
              disabled={isPending}
              className="btn-orange w-full py-6 text-base rounded-xl"
              style={{
                backgroundColor: isPending
                  ? "oklch(var(--gym-orange) / 0.6)"
                  : undefined,
              }}
            >
              {isPending ? "Submitting..." : "Claim My Free Trial"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in required fields");
      return;
    }
    mutate(
      { name, email, phone, message },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll get back to you within 24 hours.");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        },
        onError: () => toast.error("Failed to send message. Please try again."),
      },
    );
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gym-panel">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Get In Touch</p>
          <h2 className="section-title text-4xl md:text-5xl">Contact Us</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: MapPin,
                label: "Address",
                value:
                  "42 Fitness Street, Koramangala, Bengaluru, Karnataka 560034",
              },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@shreyafitness.com" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "oklch(var(--gym-orange) / 0.15)" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--gym-orange))" }}
                  />
                </div>
                <div>
                  <div className="text-gym-muted text-xs uppercase tracking-wider font-semibold mb-0.5">
                    {label}
                  </div>
                  <div className="text-white text-sm">{value}</div>
                </div>
              </div>
            ))}
            <div className="rounded-xl p-5 border border-gym-border bg-gym-card">
              <h4 className="section-title text-base mb-3">Operating Hours</h4>
              {[
                ["Mon – Fri", "5:30 AM – 10:00 PM"],
                ["Saturday", "6:00 AM – 8:00 PM"],
                ["Sunday", "8:00 AM – 6:00 PM"],
              ].map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between py-1.5 border-b border-gym-border last:border-0"
                >
                  <span className="text-gym-muted text-sm">{day}</span>
                  <span className="text-white text-sm font-semibold">
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
            data-ocid="contact.form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">
                  Full Name *
                </Label>
                <Input
                  data-ocid="contact.name.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-gym-card border-gym-border text-white"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">
                  Email *
                </Label>
                <Input
                  data-ocid="contact.email.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-gym-card border-gym-border text-white"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">
                Phone
              </Label>
              <Input
                data-ocid="contact.phone.input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="bg-gym-card border-gym-border text-white"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">
                Message *
              </Label>
              <Textarea
                data-ocid="contact.message.textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={5}
                className="bg-gym-card border-gym-border text-white resize-none"
              />
            </div>
            <Button
              type="submit"
              data-ocid="contact.submit.button"
              disabled={isPending}
              className="btn-orange w-full py-6 text-base rounded-xl"
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSignupNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutate(email, {
      onSuccess: () => {
        toast.success("Subscribed! Welcome to the Shreya Fitness community.");
        setEmail("");
      },
      onError: () => toast.error("Subscription failed. Please try again."),
    });
  };

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: "oklch(var(--gym-orange))" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="gym-heading text-3xl md:text-4xl text-white mb-3">
          Stay In The Loop
        </h2>
        <p className="text-white/80 mb-8">
          Get fitness tips, class updates, and exclusive member offers delivered
          to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 max-w-md mx-auto"
          data-ocid="newsletter.form"
        >
          <Input
            data-ocid="newsletter.email.input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25"
          />
          <Button
            type="submit"
            data-ocid="newsletter.subscribe.button"
            disabled={isPending}
            className="bg-white text-black font-bold hover:bg-white/90 px-6"
          >
            {isPending ? "..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="py-16 px-4 border-t border-gym-border"
      style={{ backgroundColor: "oklch(0.08 0.003 240)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & desc */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "oklch(var(--gym-orange))" }}
              >
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="gym-heading text-xl text-white">
                Shreya{" "}
                <span style={{ color: "oklch(var(--gym-orange))" }}>
                  Fitness
                </span>
              </span>
            </div>
            <p className="text-gym-muted text-sm leading-relaxed">
              Transforming lives through fitness since 2016. State-of-the-art
              facility with expert trainers and a supportive community.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Instagram, name: "instagram" },
                { Icon: Facebook, name: "facebook" },
                { Icon: Youtube, name: "youtube" },
                { Icon: Twitter, name: "twitter" },
              ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-gym-border text-white/50 hover:text-white hover:border-white/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="section-title text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "About",
                "Classes",
                "Schedule",
                "Pricing",
                "Blog",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(link.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-gym-muted text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-title text-sm mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(var(--gym-orange))" }}
                />
                <span className="text-gym-muted text-sm">
                  42 Fitness Street, Koramangala, Bengaluru 560034
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(var(--gym-orange))" }}
                />
                <span className="text-gym-muted text-sm">+91 98765 43210</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(var(--gym-orange))" }}
                />
                <span className="text-gym-muted text-sm">
                  hello@shreyafitness.com
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="section-title text-sm mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              {[
                ["Mon – Fri", "5:30 AM – 10:00 PM"],
                ["Saturday", "6:00 AM – 8:00 PM"],
                ["Sunday", "8:00 AM – 6:00 PM"],
                ["Elite Members", "24/7 Access"],
              ].map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="text-gym-muted text-sm">{day}</span>
                  <span className="text-white text-sm font-semibold">
                    {hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gym-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gym-muted text-sm">
            © {year} Shreya Fitness. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(var(--gym-orange))" }}
              className="hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              style={{ color: "oklch(var(--gym-orange))" }}
              className="text-sm hover:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              style={{ color: "oklch(var(--gym-orange))" }}
              className="text-sm hover:underline"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ——————————————————————————————————————————
// ROOT APP
// ——————————————————————————————————————————
function GymApp() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CountersSection />
        <FeaturesSection />
        <ClassesSection />
        <ScheduleSection />
        <PricingSection />
        <TrainersSection />
        <TestimonialsSection />
        <GallerySection />
        <BlogSection />
        <BMICalculator />
        <FAQSection />
        <FreeTrialSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GymApp />
    </QueryClientProvider>
  );
}
