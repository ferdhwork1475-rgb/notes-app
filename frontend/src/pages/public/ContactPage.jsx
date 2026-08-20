import { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  User,
  MapPin,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { sendContactMsg } from "../../services/authService";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General-Inquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.warning("Please fill in all inputs.");
      return;
    }

    try {
      setIsLoading(true);
      await sendContactMsg(name, email, subject, message);
      setSubmitted(true);

      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setSubject("General-Inquiry");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Check internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <section className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white pt-24 pb-20 px-4 md:px-8">
      <section className="text-center py-10">
        <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
          Contact Our Newsroom
        </span>

        <h1 className="mt-6 text-4xl font-black text-white md:text-5xl">
          We'd Love To Hear From You
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
          Whether you have a news tip, want to report an error, make a business
          inquiry, or simply have a question, our editorial team is here to
          help.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-black text-white">24/7</h3>
            <p className="mt-2 text-sm text-slate-500">News Monitoring</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-black text-white">100%</h3>
            <p className="mt-2 text-sm text-slate-500">Independent Reporting</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-black text-white">Fast</h3>
            <p className="mt-2 text-sm text-slate-500">Response to Inquiries</p>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-[#0b1120] p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <CheckCircle size={34} />
                </div>

                <h2 className="mt-6 text-2xl font-black text-white">
                  Message Sent Successfully
                </h2>

                <p className="mt-4 leading-8 text-slate-400">
                  Thank you for contacting our newsroom. A member of our
                  editorial team will respond as soon as possible.
                </p>

                <button
                  onClick={handleReset}
                  className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    {" "}
                    Full Name{" "}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Subject
                  </label>

                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  >
                    <option value="General-Inquiry">General Inquiry</option>
                    <option value="News-Tip">News Tip</option>
                    <option value="Correction-Request">
                      Correction Request
                    </option>
                    <option value="Business-Advertising">
                      Business & Advertising
                    </option>
                    <option value="Interview-Request">Interview Request</option>
                    <option value="Technical-Support">Technical Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    {" "}
                    Message{" "}
                  </label>

                  <textarea
                    rows={7}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    disabled={isLoading}
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white transition 
                    ${
                      isLoading
                        ? "cursor-not-allowed bg-red-400"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {" "}
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}{" "}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-3xl bg-white p-10">
            <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              {" "}
              Contact Information{" "}
            </span>
            <h2 className="mt-6 text-3xl font-black text-slate-900">
              {" "}
              Reach Our Editorial Team{" "}
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              {" "}
              For news tips, corrections, partnerships, interviews, or general
              inquiries, you can contact us directly using the information
              below.
            </p>
            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-5">
                <div className="rounded-2xl bg-red-100 p-4 text-red-600">
                  {" "}
                  <User />{" "}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {" "}
                    Editor-in-Chief{" "}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    {" "}
                    WatchMann{" "}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-2xl bg-indigo-100 p-4 text-indigo-600">
                  {" "}
                  <Mail />{" "}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {" "}
                    Email{" "}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {" "}
                    editor@yournews.com{" "}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-2xl bg-green-100 p-4 text-green-600">
                  {" "}
                  <Phone />{" "}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {" "}
                    Phone{" "}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {" "}
                    +234 800 000 0000{" "}
                  </h3>
                </div>
              </div>

              {/* <div className="flex items-start gap-5">
                <div className="rounded-2xl bg-amber-100 p-4 text-amber-600">
                  {" "}
                  <MapPin />{" "}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {" "}
                    Office{" "}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {" "}
                    Warri, Delta State, Nigeria{" "}
                  </h3>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 overflow-hidden rounded-[32px] bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="px-8 py-16 text-center md:px-16">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white">
            {" "}
            Community Journalism{" "}
          </span>
          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            {" "}
            Have A Story That Matters?{" "}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-red-100">
            {" "}
            If you've witnessed an important event, have verified information,
            noticed an error in one of our reports, or have a story that
            deserves public attention, we'd like to hear from you.{" "}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-red-700 transition hover:bg-slate-100"
            >
              {" "}
              Submit a News Time{" "}
            </button>
            <a
              href="mailto:editor@yournews.com"
              className="rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-red-700"
            >
              {" "}
              Email the Editor{" "}
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactPage;
