import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  BookOpen,
  Handshake,
  UserCheck,
  BadgeCheck,
  ShieldX,
  XCircle,
  Copyright,
  ShieldAlert,
  Newspaper,
  MessageSquareText,
  UserRoundCheck,
  ShieldBan,
  FileCheck2,
  ExternalLink,
  Globe,
  Compass,
  ServerCrash,
  Scale,
  ShieldCheck,
  Shield,
  Ban,
  CalendarDays,
  Bell,
  RefreshCw,
  Clock3,
  MessageCircleMore,
  ArrowRight,
} from "lucide-react";

const Terms = () => {
  return (
    <main className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
      <section className="bg-slate-950 py-28 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
            <FileText size={16} />
            Legal Information
          </div>

          <h1 className="mt-8 text-5xl font-black tracking-tight">
            Terms of Service
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">
            These Terms of Service govern your access to and use of WatchMann
            News. By using our platform, you agree to follow these terms and the
            responsibilities they outline.
          </p>

          <div className="mt-12 inline-flex rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-300">
            Last Updated • July 23, 2026
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
              Agreement
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Agreement to These Terms
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              By accessing or using WatchMann News, you agree to be bound by
              these Terms of Service. If you do not agree with any part of these
              terms, you should discontinue using our website and services.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {/* Card 1 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <CheckCircle2 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Using Our Services
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Accessing our website, reading articles, or using our services
                indicates your acceptance of these Terms of Service.
              </p>
            </div>

            {/* Card 2 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <BookOpen size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Read Before You Continue
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We encourage you to review these terms carefully so you
                understand your rights, responsibilities, and our obligations.
              </p>
            </div>

            {/* Card 3 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Handshake size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Mutual Responsibility
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                These terms are designed to create a fair, safe, and reliable
                experience for both our readers and WatchMann News.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Eligibility
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Who Can Use WatchMann News
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              WatchMann News is available to individuals who can lawfully use
              our services and agree to comply with these Terms of Service. By
              using our platform, you confirm that your use complies with
              applicable laws and regulations.
            </p>
          </div>

          {/* Two Column Layout */}

          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            {/* Left Column */}

            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <UserCheck size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Eligibility Requirements
              </h3>

              <ul className="mt-6 space-y-5 text-slate-600">
                <li>• You are legally permitted to use our services.</li>

                <li>• You agree to comply with these Terms of Service.</li>

                <li>
                  • You will use WatchMann News in accordance with applicable
                  laws.
                </li>

                <li>
                  • Where an account or submission is required, you provide
                  accurate and truthful information.
                </li>
              </ul>
            </div>

            {/* Right Column */}

            <div className="rounded-3xl bg-slate-900 p-10 text-white">
              <h3 className="text-2xl font-bold">
                By Using WatchMann News, You Agree To:
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-emerald-400" size={24} />

                  <p className="text-slate-300">
                    Use the platform responsibly and lawfully.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-emerald-400" size={24} />

                  <p className="text-slate-300">
                    Respect the rights of other users and our editorial team.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-emerald-400" size={24} />

                  <p className="text-slate-300">
                    Respect our intellectual property and published content.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-emerald-400" size={24} />

                  <p className="text-slate-300">
                    Follow these Terms whenever you access or interact with our
                    services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
              Acceptable Use
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Help Keep WatchMann News Safe & Trusted
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We encourage responsible use of WatchMann News. By using our
              platform, you agree to behave respectfully, comply with applicable
              laws, and avoid activities that could harm our services, readers,
              or reputation.
            </p>
          </div>

          {/* Two Columns */}

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {/* Allowed */}

            <div className="rounded-3xl border border-green-200 bg-green-50 p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <BadgeCheck size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-green-900">
                Allowed
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-green-600" />

                  <p className="text-green-900">
                    Read, bookmark, and share our articles responsibly.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-green-600" />

                  <p className="text-green-900">
                    Link to WatchMann News articles using proper attribution.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-green-600" />

                  <p className="text-green-900">
                    Engage respectfully with our platform and community.
                  </p>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 text-green-600" />

                  <p className="text-green-900">
                    Use our services in compliance with applicable laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Not Allowed */}

            <div className="rounded-3xl border border-red-200 bg-red-50 p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <ShieldX size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-red-900">
                Not Allowed
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <XCircle className="mt-1 text-red-600" />

                  <p className="text-red-900">
                    Copying, reproducing, or republishing our content without
                    permission.
                  </p>
                </div>

                <div className="flex gap-4">
                  <XCircle className="mt-1 text-red-600" />

                  <p className="text-red-900">
                    Attempting to disrupt, damage, or interfere with our website
                    or services.
                  </p>
                </div>

                <div className="flex gap-4">
                  <XCircle className="mt-1 text-red-600" />

                  <p className="text-red-900">
                    Uploading malicious code, spam, or harmful content.
                  </p>
                </div>

                <div className="flex gap-4">
                  <XCircle className="mt-1 text-red-600" />

                  <p className="text-red-900">
                    Harassing, abusing, impersonating, or misleading other
                    users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}

          <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              Why These Rules Matter
            </h3>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              These guidelines help us maintain a reliable news platform where
              readers can access quality journalism in a safe, respectful, and
              trustworthy environment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Intellectual Property
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Respect Our Original Journalism
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              The original journalism, photographs, videos, graphics, logos,
              trademarks, and website design published by WatchMann News are
              protected by applicable copyright and intellectual property laws.
            </p>
          </div>

          {/* Featured Panel */}

          <div className="mt-20 rounded-[2rem] bg-slate-900 p-12 text-white">
            <div className="grid gap-10 lg:grid-cols-[120px_1fr]">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-red-500/20 text-red-300">
                <Newspaper size={46} />
              </div>

              <div>
                <h3 className="text-3xl font-bold">Our Content Is Protected</h3>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  Every original article, investigation, opinion piece,
                  photograph, illustration, video, logo, and design element
                  published by WatchMann News represents significant editorial
                  work. These materials remain the property of WatchMann News
                  unless otherwise stated.
                </p>
              </div>
            </div>
          </div>

          {/* Permission Grid */}

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Allowed */}

            <div className="rounded-3xl border border-green-200 bg-white p-10 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <CheckCircle2 size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                You May
              </h3>

              <ul className="mt-8 space-y-5 text-slate-600">
                <li>✓ Read and enjoy our content.</li>

                <li>✓ Share links to our published articles.</li>

                <li>✓ Quote brief excerpts with proper attribution.</li>

                <li>
                  ✓ Reference our reporting while crediting WatchMann News.
                </li>
              </ul>
            </div>

            {/* Not Allowed */}

            <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <ShieldAlert size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Permission Required
              </h3>

              <ul className="mt-8 space-y-5 text-slate-600">
                <li>✕ Copy or republish entire articles.</li>

                <li>✕ Remove copyright or attribution notices.</li>

                <li>✕ Use our logos, trademarks, or branding.</li>

                <li>
                  ✕ Reproduce photographs, graphics, or videos without
                  authorization.
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Notice */}

          <div className="mt-16 rounded-3xl border border-amber-200 bg-amber-50 p-8">
            <div className="flex items-start gap-5">
              <Copyright className="mt-1 text-amber-700" size={34} />

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Copyright Notice
                </h3>

                <p className="mt-4 leading-8 text-slate-700">
                  Unauthorized reproduction, distribution, modification, or
                  commercial use of WatchMann News content may violate copyright
                  and intellectual property laws. If you wish to license or
                  republish our content, please contact us for written
                  permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-700">
              User Content
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Content You Submit
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We welcome community participation where available. If you submit
              comments, articles, media, or other content to WatchMann News, you
              retain ownership of your content while granting us permission to
              display, publish, and moderate it as necessary.
            </p>
          </div>

          {/* Featured Panel */}

          <div className="mt-20 rounded-[2rem] bg-gradient-to-r from-indigo-900 to-slate-900 p-12 text-white">
            <div className="flex items-start gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10">
                <MessageSquareText size={44} />
              </div>

              <div>
                <h3 className="text-3xl font-bold">You Own Your Content</h3>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  Unless otherwise agreed, you retain ownership of any original
                  content you submit. By submitting it to WatchMann News, you
                  grant us a non-exclusive, worldwide, royalty-free license to
                  host, display, publish, reproduce, and distribute that content
                  in connection with operating and promoting our services.
                </p>
              </div>
            </div>
          </div>

          {/* Two Cards */}

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Responsibilities */}

            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <UserRoundCheck size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Your Responsibilities
              </h3>

              <ul className="mt-8 space-y-5 text-slate-600">
                <li>
                  ✓ Submit content that you own or have permission to use.
                </li>

                <li>✓ Respect copyrights, trademarks, and privacy rights.</li>

                <li>✓ Keep submissions accurate, lawful, and respectful.</li>

                <li>
                  ✓ Avoid uploading malicious, offensive, or misleading content.
                </li>
              </ul>
            </div>

            {/* Moderation */}

            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <ShieldBan size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Our Right to Moderate
              </h3>

              <ul className="mt-8 space-y-5 text-slate-600">
                <li>✓ Review submitted content before or after publication.</li>

                <li>
                  ✓ Edit formatting or presentation without changing intended
                  meaning.
                </li>

                <li>
                  ✓ Remove content that violates these Terms or applicable laws.
                </li>

                <li>
                  ✓ Suspend or restrict users who repeatedly violate our
                  policies.
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Notice */}

          <div className="mt-16 rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <div className="flex items-start gap-5">
              <FileCheck2 className="mt-1 text-blue-700" size={34} />

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Community Standards
                </h3>

                <p className="mt-4 leading-8 text-slate-700">
                  Our goal is to foster constructive discussion and responsible
                  participation. We reserve the right to remove content that is
                  unlawful, defamatory, misleading, abusive, infringes
                  intellectual property rights, or otherwise conflicts with
                  these Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
              Third-Party Services
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Third-Party Links & Services
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              To provide additional information and improve your experience,
              WatchMann News may include links to external websites or use
              trusted third-party services. These services operate independently
              and are governed by their own terms and privacy policies.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {/* External Links */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <ExternalLink size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                External Websites
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Our articles may include links to external websites for
                additional information, references, or supporting resources. We
                do not control the content or practices of those websites.
              </p>
            </div>

            {/* Services */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Globe size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Third-Party Services
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We may display embedded content such as videos, maps, social
                media posts, advertisements, or analytics services provided by
                trusted third parties.
              </p>
            </div>

            {/* Your Choice */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Compass size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Your Choice
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                When you follow an external link or interact with a third-party
                service, your use is governed by that provider's own terms,
                privacy policy, and practices.
              </p>
            </div>
          </div>

          {/* Bottom Notice */}

          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              Transparency Matters
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              We carefully choose the external resources and services we
              reference, but WatchMann News is not responsible for the
              availability, accuracy, security, or content of third-party
              websites or services. We encourage you to review their terms and
              privacy policies before interacting with them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
              Legal Disclaimer
            </span>

            <h2 className="mt-6 text-4xl font-black">
              Disclaimers & Limitation of Liability
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              WatchMann News is committed to providing accurate journalism and a
              reliable digital experience. However, no website or news
              organization can guarantee uninterrupted service or that every
              piece of information will always remain complete, current, or free
              from error.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {/* Editorial */}

            <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                <Newspaper size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Editorial Accuracy</h3>

              <p className="mt-4 leading-7 text-slate-300">
                We make every reasonable effort to verify facts before
                publication. News develops quickly, and articles may later be
                updated, corrected, or supplemented as additional information
                becomes available.
              </p>
            </div>

            {/* Website */}

            <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                <ServerCrash size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Service Availability</h3>

              <p className="mt-4 leading-7 text-slate-300">
                Our platform is provided on an "as available" basis and may
                occasionally experience maintenance, technical issues, delays,
                or temporary interruptions.
              </p>
            </div>

            {/* Liability */}

            <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300">
                <Scale size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Limitation of Liability
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                To the fullest extent permitted by applicable law, WatchMann
                News shall not be liable for indirect, incidental,
                consequential, or special damages resulting from the use of our
                services.
              </p>
            </div>
          </div>

          {/* Bottom Statement */}

          <div className="mt-16 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8">
            <div className="flex items-start gap-5">
              <ShieldCheck className="mt-1 text-emerald-300" size={34} />

              <div>
                <h3 className="text-2xl font-bold">Our Commitment</h3>

                <p className="mt-4 leading-8 text-slate-300">
                  While these legal limitations help protect WatchMann News,
                  they do not diminish our commitment to responsible journalism,
                  transparency, editorial integrity, and continuous improvement
                  of our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-700">
              Platform Safety
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Maintaining a Safe Platform
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              To protect our readers, journalists, and services, WatchMann News
              may suspend, restrict, or terminate access to our platform when
              necessary to enforce these Terms of Service or maintain the
              security and integrity of our services.
            </p>
          </div>

          {/* Content */}

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {/* Left */}

            <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <Ban size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                When Access May Be Restricted
              </h3>

              <ul className="mt-8 space-y-5 text-slate-600">
                <li>• Repeated violations of these Terms.</li>

                <li>• Fraudulent, unlawful, or deceptive activity.</li>

                <li>
                  • Attempts to interfere with our website, systems, or
                  security.
                </li>

                <li>• Harassment, abuse, or harmful behavior toward others.</li>

                <li>
                  • Any activity that threatens the integrity or operation of
                  WatchMann News.
                </li>
              </ul>
            </div>

            {/* Right */}

            <div className="rounded-3xl bg-slate-900 p-10 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Scale size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                Our Commitment to Fairness
              </h3>

              <p className="mt-6 leading-8 text-slate-300">
                Where appropriate and reasonably practical, we will review
                reported issues before taking action. We strive to make fair,
                consistent, and proportionate decisions while protecting our
                readers, contributors, and platform.
              </p>

              <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-6">
                <div className="flex gap-4">
                  <Shield className="text-emerald-400" />

                  <div>
                    <h4 className="font-semibold">Our Goal</h4>

                    <p className="mt-2 text-slate-400 leading-7">
                      These measures exist to maintain a safe, respectful,
                      secure, and trustworthy environment for everyone using
                      WatchMann News.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
              Terms Updates
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Changes to These Terms
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              WatchMann News may update these Terms of Service from time to time
              to reflect changes in our services, legal obligations, technology,
              or business practices. Updated versions will always be published
              on this page.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {/* Last Updated */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <CalendarDays size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Last Updated
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                These Terms of Service were last updated on
                <strong> July 23, 2026</strong>.
              </p>
            </div>

            {/* Notification */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Bell size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                How You'll Know
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Significant updates will be reflected by updating the
                <strong> "Last Updated"</strong> date. Where appropriate, we may
                also provide additional notice on the website.
              </p>
            </div>

            {/* Effective Date */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <RefreshCw size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                When Changes Apply
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                By continuing to access or use WatchMann News after revised
                Terms become effective, you agree to be bound by the updated
                Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            {/* Header */}

            <div className="text-center">
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                Legal Support
              </span>

              <h2 className="mt-6 text-4xl font-black text-slate-900">
                Questions About These Terms?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                If you have questions about these Terms of Service, need
                clarification about your rights or responsibilities, or require
                legal-related assistance regarding your use of WatchMann News,
                our team is here to help.
              </p>
            </div>

            {/* Contact Cards */}

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Legal Email */}

              <div className="rounded-3xl bg-slate-50 p-8 text-center">
                <Scale className="mx-auto text-red-600" size={34} />

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Legal Inquiries
                </h3>

                <p className="mt-4 text-slate-600 break-all">
                  legal@watchmannnews.com
                </p>
              </div>

              {/* Response Time */}

              <div className="rounded-3xl bg-slate-50 p-8 text-center">
                <Clock3 className="mx-auto text-indigo-600" size={34} />

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Response Time
                </h3>

                <p className="mt-4 text-slate-600">
                  We aim to respond within 2–3 business days.
                </p>
              </div>

              {/* Support */}

              <div className="rounded-3xl bg-slate-50 p-8 text-center">
                <MessageCircleMore
                  className="mx-auto text-emerald-600"
                  size={34}
                />

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  General Support
                </h3>

                <p className="mt-4 text-slate-600">
                  Visit our Contact page for editorial, technical, or customer
                  support.
                </p>
              </div>
            </div>

            {/* CTA */}

            <div className="mt-14 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;
