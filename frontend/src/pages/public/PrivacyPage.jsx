import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  BarChart3,
  Cookie,
  Newspaper,
  Settings,
  ShieldCheck,
  MessageCircleMore,
  SlidersHorizontal,
  Settings2,
  Handshake,
  Scale,
  Building2,
  ShieldOff,
  FolderOpen,
  PencilLine,
  Trash2,
  MailCheck,
  CircleHelp,
  LockKeyhole,
  TriangleAlert,
  CalendarDays,
  Bell,
  FileText,
  Mail,
  Clock3,
  MessageSquareMore,
  ArrowRight,
} from "lucide-react";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
      <section className="bg-slate-950 py-28 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex rounded-full bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
            Legal Information
          </span>

          <h1 className="mt-6 text-5xl font-black">Privacy Policy</h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            At WatchMann News, we value your privacy. This policy explains what
            information we collect, why we collect it, and how we keep it
            secure.
          </p>

          <div className="mt-10 text-sm text-slate-400">
            Last Updated: July 23, 2026
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
              Our Commitment
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Your Privacy Comes First
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              At WatchMann News, we believe privacy is a fundamental part of
              building trust. We are committed to being transparent about the
              information we collect, how it is used, and the steps we take to
              keep it secure.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {/* Card 1 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                🛡️
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Privacy First
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We only collect information that helps us provide and improve
                our services while respecting your privacy.
              </p>
            </div>

            {/* Card 2 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                🔒
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Secure by Design
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We use reasonable security measures to protect your information
                against unauthorized access, alteration, or disclosure.
              </p>
            </div>

            {/* Card 3 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                👁️
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Transparency
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We explain our privacy practices in clear language so you can
                understand what information is collected and why.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Information We Collect
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              What Information We Collect
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We collect only the information necessary to operate WatchMann
              News, provide our services, improve your experience, and
              communicate with you when appropriate.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {/* Personal Information */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <User size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Personal Information
              </h3>

              <p className="mt-4 text-slate-600">
                Information you voluntarily provide.
              </p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>• Name</li>

                <li>• Email address</li>

                <li>• Contact form submissions</li>

                <li>• Newsletter subscription details</li>
              </ul>
            </div>

            {/* Usage Information */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <BarChart3 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Usage Information
              </h3>

              <p className="mt-4 text-slate-600">
                Information collected automatically when you browse.
              </p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>• Browser type</li>

                <li>• Device information</li>

                <li>• Pages visited</li>

                <li>• Time spent on pages</li>

                <li>• Referral sources</li>
              </ul>
            </div>

            {/* Cookies */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Cookie size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Cookies & Preferences
              </h3>

              <p className="mt-4 text-slate-600">
                Small files that help improve your browsing experience.
              </p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>• Remember preferences</li>

                <li>• Improve website performance</li>

                <li>• Measure website traffic</li>

                <li>• Enhance user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
              Responsible Data Use
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              How We Use Your Information
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We use the information we collect responsibly to operate WatchMann
              News, provide our services, improve your experience, and
              communicate with you when necessary.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {/* Card 1 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Newspaper size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Deliver News & Updates
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We use your email address to send newsletters, breaking news
                alerts, editorial updates, and other information you've chosen
                to receive.
              </p>
            </div>

            {/* Card 2 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Settings size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Improve Our Website
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Anonymous usage information helps us understand which stories
                people read, identify performance issues, and improve the
                overall experience.
              </p>
            </div>

            {/* Card 3 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <ShieldCheck size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Protect Our Platform
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We monitor for spam, malicious activity, unauthorized access,
                and other security threats to help keep WatchMann News safe.
              </p>
            </div>

            {/* Card 4 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <MessageCircleMore size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Respond to Your Requests
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                If you contact us, submit a news tip, or request support, we'll
                use your information to respond and provide the assistance you
                requested.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Cookies & Tracking
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              How We Use Cookies
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Cookies are small text files stored on your device. They help us
              provide a smoother browsing experience, remember your preferences,
              and understand how visitors use WatchMann News.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {/* Essential */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Cookie size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Essential Cookies
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                These cookies are necessary for core website functions such as
                security, navigation, and maintaining your browsing session.
              </p>
            </div>

            {/* Analytics */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <BarChart3 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Analytics Cookies
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                These help us understand which articles are popular, identify
                performance issues, and improve the overall reader experience.
                Analytics data is generally collected in aggregate rather than
                to identify individual readers.
              </p>
            </div>

            {/* Preferences */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <SlidersHorizontal size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Preference Cookies
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                These cookies remember your preferences, such as language or
                display settings, to provide a more personalized experience.
              </p>
            </div>

            {/* Manage */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Settings2 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Managing Cookies
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Most web browsers allow you to manage or disable cookies through
                their settings. Please note that disabling certain cookies may
                affect the functionality and performance of the website.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
              Information Sharing
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              When We Share Information
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Your trust is important to us. We do not sell your personal
              information. We only share information when it is necessary to
              operate WatchMann News, provide requested services, or comply with
              legal obligations.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {/* Trusted Providers */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Handshake size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Trusted Service Providers
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We may share limited information with trusted providers that
                help us deliver services such as website hosting, email
                newsletters, analytics, and security.
              </p>
            </div>

            {/* Legal */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Scale size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Legal Requirements
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We may disclose information when required by applicable laws,
                court orders, or lawful requests from government authorities.
              </p>
            </div>

            {/* Business Changes */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Building2 size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Business Changes
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                If WatchMann News is involved in a merger, acquisition, or
                transfer of assets, your information may be transferred as part
                of that transaction, subject to applicable privacy laws.
              </p>
            </div>

            {/* Never Sell */}

            <div className="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <ShieldOff size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-green-900">
                What We Don't Do
              </h3>

              <p className="mt-4 leading-7 text-green-800">
                We do <strong>not</strong> sell your personal information to
                advertisers, marketers, or data brokers. Your privacy is not a
                product.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-700">
              Your Rights
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              You Are In Control
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We respect your privacy and believe you should have control over
              the personal information you share with WatchMann News. Depending
              on applicable laws, you may have the following rights.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Access */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <FolderOpen className="text-indigo-600" size={34} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Access Your Information
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                You may request details about the personal information we hold
                about you.
              </p>
            </div>

            {/* Correct */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <PencilLine className="text-green-600" size={34} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Correct Information
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                If your information is inaccurate or incomplete, you can ask us
                to correct or update it.
              </p>
            </div>

            {/* Delete */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <Trash2 className="text-red-600" size={34} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Request Deletion
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Where permitted by law, you may request that we delete your
                personal information.
              </p>
            </div>

            {/* Email */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <MailCheck className="text-amber-600" size={34} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Manage Communications
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                You can unsubscribe from newsletters or other email
                communications at any time using the unsubscribe link.
              </p>
            </div>

            {/* Contact */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:col-span-2 lg:col-span-2">
              <CircleHelp className="text-sky-600" size={34} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Questions or Concerns?
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                If you have questions about this Privacy Policy or how your
                information is handled, we're happy to help. Please contact our
                privacy team using the details provided below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Security
            </span>

            <h2 className="mt-6 text-4xl font-black">
              Keeping Your Information Secure
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Protecting your information is important to us. We use reasonable
              technical, administrative, and organizational measures designed to
              safeguard the information we collect.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {/* Card 1 */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                <LockKeyhole size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Secure Data Handling</h3>

              <p className="mt-4 leading-7 text-slate-400">
                We use appropriate safeguards to help protect personal
                information from unauthorized access, disclosure, alteration, or
                destruction.
              </p>
            </div>

            {/* Card 2 */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                <ShieldCheck size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Continuous Monitoring</h3>

              <p className="mt-4 leading-7 text-slate-400">
                We regularly review our security practices and update our
                systems to reduce potential security risks.
              </p>
            </div>

            {/* Card 3 */}

            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300">
                <TriangleAlert size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Important Reminder
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                Although we take reasonable steps to protect your information,
                no website, server, or method of electronic transmission is
                completely secure. We encourage users to also take appropriate
                precautions when using the internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
              Policy Updates
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
              Changes to This Privacy Policy
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              As WatchMann News evolves, we may update this Privacy Policy to
              reflect changes in our services, legal obligations, or privacy
              practices. Any updates will be published on this page.
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
                This Privacy Policy was last updated on
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
                Significant updates will be reflected by changing the "Last
                Updated" date at the top of this page.
              </p>
            </div>

            {/* Review */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <FileText size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Stay Informed
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We encourage you to review this Privacy Policy periodically so
                you remain informed about how we protect your information.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Card */}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            {/* Header */}

            <div className="text-center">
              <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-700">
                Contact
              </span>

              <h2 className="mt-6 text-4xl font-black text-slate-900">
                Contact Our Privacy Team
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                If you have questions about this Privacy Policy, wish to
                exercise your privacy rights, or need help regarding your
                personal information, we're here to assist you.
              </p>
            </div>

            {/* Cards */}

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Email */}

              <div className="rounded-3xl bg-slate-50 p-8 text-center">
                <Mail className="mx-auto text-red-600" size={34} />

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Email Us
                </h3>

                <p className="mt-4 text-slate-600">privacy@watchmannnews.com</p>
              </div>

              {/* Time */}

              <div className="rounded-3xl bg-slate-50 p-8 text-center">
                <Clock3 className="mx-auto text-indigo-600" size={34} />

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Response Time
                </h3>

                <p className="mt-4 text-slate-600">
                  We aim to respond within 2–3 business days.
                </p>
              </div>

              {/* Contact */}

              <div className="rounded-3xl bg-slate-50 p-8 text-center">
                <MessageSquareMore
                  className="mx-auto text-emerald-600"
                  size={34}
                />

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  More Ways to Reach Us
                </h3>

                <p className="mt-4 text-slate-600">
                  Visit our Contact page for additional support options.
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

export default PrivacyPage;
