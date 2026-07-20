import { Link, useNavigate } from "react-router-dom";
import {
  Newspaper,
  Users,
  Globe2,
  ShieldCheck,
  BadgeCheck,
  Scale,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
} from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();
  const newsroomHeroUrl =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80";
  const communityReportUrl =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80";

  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-indigo-600/10 blur-[120px]" />

          <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-red-600/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                About Our Newsroom
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
                Telling Stories That
                <span className="block bg-gradient-to-r from-red-500 to-indigo-400 bg-clip-text text-transparent">
                  Matter To People
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">
                We are an independent digital newsroom committed to reporting
                accurate, timely, and impactful stories across politics,
                business, technology, sports, entertainment, and community
                affairs.
                <br />
                <br />
                Every article we publish is guided by truth, fairness, and
                accountability because informed communities build stronger
                societies.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/news"
                  className="rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
                >
                  Read Today's News
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-white"
                >
                  Contact Our Newsroom
                </Link>
              </div>

              {/* Stats */}

              <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <h3 className="text-3xl font-black text-white">500+</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Published Stories
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white">20+</h3>

                  <p className="mt-2 text-sm text-slate-400">News Categories</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white">Daily</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Breaking Updates
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white">100%</h3>

                  <p className="mt-2 text-sm text-slate-400">Independent</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div>
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <img
                  src={newsroomHeroUrl}
                  alt="Newsroom"
                  className="h-[600px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Image */}

            <div className="relative">
              <img
                src={communityReportUrl}
                alt="Journalist covering community news"
                className="h-[600px] w-full rounded-3xl object-cover shadow-2xl"
              />

              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                  Our Mission
                </p>

                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  Journalism That Puts Communities First
                </h3>
              </div>
            </div>

            {/* Right Content */}

            <div>
              <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Our Story
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                Every Community Has Stories Worth Telling.
              </h2>

              <p className="mt-8 text-lg leading-9 text-slate-600">
                Great journalism isn't only about reporting national headlines.
                It's about uncovering the stories that shape everyday lives— the
                businesses creating opportunities, the leaders making decisions,
                the innovators solving problems, and the people making a
                difference in their communities.
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-600">
                Our newsroom was founded with a simple belief: everyone deserves
                access to accurate, balanced, and trustworthy information. We
                are committed to reporting with fairness, integrity, and respect
                for the truth, ensuring every story is carefully researched
                before publication.
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-600">
                From breaking news and politics to business, technology, sports,
                entertainment, and human-interest stories, our goal is to
                inform, educate, and inspire readers every day.
              </p>

              {/* Values */}

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Accurate Reporting
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Every article is reviewed and verified before publication.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Independent Journalism
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Our reporting is guided by facts, not influence.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Community Focus
                  </h3>

                  <p className="mt-2 text-slate-500">
                    We highlight stories that matter to local and global
                    audiences.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Trusted Information
                  </h3>

                  <p className="mt-2 text-slate-500">
                    We value transparency, accountability, and responsible
                    reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===========================
      MEET THE FOUNDER
=========================== */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
              Meet The Founder
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl">
              The Journalist Behind The Stories
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-slate-600">
              Every publication has a voice. Behind ours is a commitment to
              factual reporting, responsible journalism, and telling stories
              that inform, educate, and inspire our readers.
            </p>
          </div>

          <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT */}

            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Founder"
                className="h-[650px] w-full rounded-3xl object-cover shadow-2xl"
              />

              <div className="absolute bottom-8 left-8 rounded-3xl bg-white p-6 shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                  Founder & Editor-in-Chief
                </p>

                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  John Ferdinand
                </h3>
              </div>
            </div>

            {/* RIGHT */}

            <div>
              <h3 className="text-3xl font-black text-slate-900">
                John Ferdinand
              </h3>

              <p className="mt-2 text-lg font-medium text-red-600">
                Founder • Journalist • Editor-in-Chief
              </p>

              <p className="mt-8 text-lg leading-9 text-slate-600">
                John Ferdinand founded this newsroom with one mission: to make
                reliable journalism accessible to everyone. He believes every
                community deserves honest reporting, regardless of location or
                influence.
              </p>

              <p className="mt-6 text-lg leading-9 text-slate-600">
                His reporting focuses on politics, business, technology, public
                affairs, and community development. Every published story is
                guided by fairness, accountability, and careful verification.
              </p>

              {/* Quote */}

              <div className="mt-10 rounded-3xl border-l-4 border-red-600 bg-white p-8 shadow-sm">
                <p className="text-2xl italic leading-relaxed text-slate-700">
                  “Journalism is not about being first. It's about getting the
                  facts right and earning the trust of every reader.”
                </p>
              </div>

              {/* Contact */}

              <div className="mt-10 grid gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Email
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    editor@yournews.com
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Phone
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    +234 800 000 0000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===========================
      EDITORIAL PRINCIPLES
=========================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Editorial Standards
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl">
              Journalism Built On Trust
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              Every article published in our newsroom follows strict editorial
              guidelines designed to ensure accuracy, fairness, transparency,
              and accountability.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Card */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                <ShieldCheck size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Accuracy
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Facts are verified through credible sources before publication.
                We prioritize truth over speed.
              </p>
            </div>

            {/* Card */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <Scale size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Fairness
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                We present stories with balance, giving every side an
                opportunity to be heard.
              </p>
            </div>

            {/* Card */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                <BadgeCheck size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Integrity
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Editorial decisions remain independent and are never influenced
                by political or commercial interests.
              </p>
            </div>

            {/* Card */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
                <Globe2 size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Community Impact
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                We report stories that educate, inspire, and create meaningful
                conversations within society.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Why Readers Choose Us
            </span>

            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Trusted Journalism, Every Single Day
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-300">
              Our commitment goes beyond publishing news. We strive to provide
              balanced reporting, verified facts, and meaningful stories that
              keep our readers informed.
            </p>
          </div>

          {/* Statistics */}

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-800/50 p-8 text-center">
              <Newspaper className="mx-auto text-red-500" size={40} />

              <h3 className="mt-6 text-5xl font-black">500+</h3>

              <p className="mt-3 text-slate-400">Published Articles</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-800/50 p-8 text-center">
              <Users className="mx-auto text-indigo-400" size={40} />

              <h3 className="mt-6 text-5xl font-black">50K+</h3>

              <p className="mt-3 text-slate-400">Monthly Readers</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-800/50 p-8 text-center">
              <Globe2 className="mx-auto text-emerald-400" size={40} />

              <h3 className="mt-6 text-5xl font-black">20+</h3>

              <p className="mt-3 text-slate-400">News Categories</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-800/50 p-8 text-center">
              <ShieldCheck className="mx-auto text-amber-400" size={40} />

              <h3 className="mt-6 text-5xl font-black">100%</h3>

              <p className="mt-3 text-slate-400">Independent Reporting</p>
            </div>
          </div>

          {/* Quote */}

          <div className="mt-20 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-800 to-slate-900 p-10 text-center">
            <p className="text-2xl italic leading-relaxed text-slate-200 md:text-3xl">
              “Trust is earned through consistency, transparency, and a
              commitment to publishing facts that matter.”
            </p>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
              Our Editorial Commitment
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
              Contact Our Newsroom
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl">
              Have A Story To Share?
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              Whether you have a news tip, a correction, a business inquiry, or
              simply want to get in touch, we'd love to hear from you.
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            {/* LEFT */}

            <div className="space-y-6">
              {/* Email */}

              <div className="flex items-start gap-5 rounded-3xl border border-slate-200 p-6 transition hover:shadow-lg">
                <div className="rounded-2xl bg-red-100 p-4 text-red-600">
                  <Mail size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">Email</h3>

                  <p className="mt-2 text-slate-600">editor@yournews.com</p>

                  <p className="text-slate-500">
                    For editorial inquiries and news tips.
                  </p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex items-start gap-5 rounded-3xl border border-slate-200 p-6 transition hover:shadow-lg">
                <div className="rounded-2xl bg-indigo-100 p-4 text-indigo-600">
                  <Phone size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">Phone</h3>

                  <p className="mt-2 text-slate-600">+234 800 000 0000</p>

                  <p className="text-slate-500">
                    Available during newsroom hours.
                  </p>
                </div>
              </div>

              {/* Address */}

              <div className="flex items-start gap-5 rounded-3xl border border-slate-200 p-6 transition hover:shadow-lg">
                <div className="rounded-2xl bg-green-100 p-4 text-green-600">
                  <MapPin size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">Office</h3>

                  <p className="mt-2 text-slate-600">
                    Warri, Delta State, Nigeria
                  </p>

                  <p className="text-slate-500">Independent Digital Newsroom</p>
                </div>
              </div>

              {/* Hours */}

              <div className="flex items-start gap-5 rounded-3xl border border-slate-200 p-6 transition hover:shadow-lg">
                <div className="rounded-2xl bg-amber-100 p-4 text-amber-600">
                  <Clock3 size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Newsroom Hours
                  </h3>

                  <p className="mt-2 text-slate-600">Monday – Saturday</p>

                  <p className="text-slate-500">8:00 AM – 6:00 PM (WAT)</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="rounded-[32px] bg-slate-900 p-10 text-white">
              <span className="inline-flex rounded-full bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                News Tips
              </span>

              <h3 className="mt-6 text-3xl font-black">
                Help Us Tell The Stories That Matter
              </h3>

              <p className="mt-6 leading-8 text-slate-300">
                We welcome verified news tips, community updates, corrections,
                and story ideas from our readers. Every submission is reviewed
                by our editorial team.
              </p>

              <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-6">
                <p className="italic text-slate-300">
                  “If you witness an important event, uncover an issue affecting
                  your community, or have information that serves the public
                  interest, we'd like to hear from you.”
                </p>
              </div>

              <button className="mt-10 inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700" onClick={() => navigate("/contact")}>
                <Send size={18} />
                Send Us A Story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
