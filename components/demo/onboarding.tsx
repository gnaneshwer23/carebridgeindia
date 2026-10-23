"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DemoBanner, primaryBtn, secondaryBtn } from "@/components/demo/ui";
import { useDemo } from "@/components/demo/provider";
import type { CaseId, DemoProfile } from "@/lib/demo/fixtures";

const steps = [
  "Account",
  "Profile",
  "Concern",
  "Procedure",
  "Contact",
  "Review",
];

const control =
  "h-12 w-full rounded-[16px] border border-[#D7E3E8] bg-white px-3 text-base text-[#12333D]";

export function PatientOnboarding() {
  const router = useRouter();
  const { update } = useDemo();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nation, setNation] = useState("England");
  const [location, setLocation] = useState("");
  const [concern, setConcern] = useState<"" | DemoProfile["concern"]>("");
  const [procedure, setProcedure] = useState<"" | DemoProfile["procedure"]>("");
  const [preference, setPreference] = useState<DemoProfile["preference"]>("email");
  const [language, setLanguage] = useState("English");

  function fail(message: string) {
    setError(message);
  }

  function next() {
    if (step === 0) {
      if (name.trim().length < 2) return fail("Enter a demonstration name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Enter an email shape such as patient@example.com. It is not checked.");
    }
    if (step === 1 && location.trim().length < 2) return fail("Enter a city or county.");
    if (step === 2 && !concern) return fail("Choose time, cost, or both.");
    if (step === 3 && !procedure) return fail("Choose a procedure, or Not sure.");
    setError("");
    setStep(step + 1);
  }

  function continueDemo() {
    if (!concern || !procedure) return;
    const activeCase: CaseId = concern === "cost" ? "B" : "A";
    update({
      profile: {
        name: name.trim(),
        email: email.trim(),
        nation,
        location: location.trim(),
        concern,
        procedure,
        preference,
        language,
      },
      activeCase,
      screen: "ready",
    });
    router.push("/demo/patient");
  }

  return (
    <div className="grid gap-6">
      <DemoBanner>
        This account sequence is fictional. Nothing is sent to the server and no verified account is created.
      </DemoBanner>
      <ol className="grid grid-cols-3 gap-2 md:grid-cols-6" aria-label="Progress">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={index === step ? "step" : undefined}
            className={`rounded-[16px] border px-2 py-2 text-center text-sm ${
              index === step
                ? "border-[#0B6B70] bg-white font-semibold text-[#0B6B70]"
                : "border-[#D7E3E8] bg-white/70 text-[#3a5560]"
            }`}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>
      <div className="rounded-[16px] border border-[#D7E3E8] bg-white p-5 md:p-8">
        <h2 className="font-serif text-3xl">{steps[step]}</h2>
        {error ? (
          <p role="alert" className="mt-4 rounded-[16px] border border-[#8d2f2f] px-4 py-3 text-base">
            {error}
          </p>
        ) : null}

        {step === 0 ? (
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-base" htmlFor="demo-name">
              Name
              <input id="demo-name" className={control} value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" />
            </label>
            <label className="grid gap-2 text-base" htmlFor="demo-email">
              Email
              <input id="demo-email" className={control} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="off" />
              <span className="text-sm text-[#3a5560]">Use a sample address. It is not verified.</span>
            </label>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-base" htmlFor="demo-nation">
              UK nation
              <select id="demo-nation" className={control} value={nation} onChange={(event) => setNation(event.target.value)}>
                <option>England</option>
                <option>Scotland</option>
                <option>Wales</option>
                <option>Northern Ireland</option>
              </select>
            </label>
            <label className="grid gap-2 text-base" htmlFor="demo-location">
              City or county
              <input id="demo-location" className={control} value={location} onChange={(event) => setLocation(event.target.value)} autoComplete="off" />
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <fieldset className="mt-6 grid gap-3">
            <legend className="text-base">What brings you to the demonstration?</legend>
            {(
              [
                ["time", "My wait is too long"],
                ["cost", "My private quote is too expensive"],
                ["both", "Both the wait and the cost"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className={`flex min-h-12 items-center gap-3 rounded-[16px] border px-4 text-base ${concern === value ? "border-[#0B6B70] bg-[#E7F6F4]" : "border-[#D7E3E8]"}`}>
                <input type="radio" name="concern" value={value} checked={concern === value} onChange={() => setConcern(value)} />
                {label}
              </label>
            ))}
          </fieldset>
        ) : null}

        {step === 3 ? (
          <label className="mt-6 grid gap-2 text-base" htmlFor="demo-procedure">
            Procedure being considered
            <select
              id="demo-procedure"
              className={control}
              value={procedure}
              onChange={(event) => setProcedure(event.target.value as DemoProfile["procedure"] | "")}
            >
              <option value="">Select a procedure</option>
              <option value="hip">Hip replacement</option>
              <option value="knee">Knee replacement</option>
              <option value="not_sure">Not sure</option>
            </select>
          </label>
        ) : null}

        {step === 4 ? (
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-base" htmlFor="demo-language">
              Preferred language
              <input id="demo-language" className={control} value={language} onChange={(event) => setLanguage(event.target.value)} />
            </label>
            <label className="grid gap-2 text-base" htmlFor="demo-preference">
              How should a real service contact you?
              <select id="demo-preference" className={control} value={preference} onChange={(event) => setPreference(event.target.value as DemoProfile["preference"])}>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </label>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="mt-6 grid gap-2 text-base leading-relaxed">
            <p>{name} · {email}</p>
            <p>{nation} · {location}</p>
            <p>Concern: {concern === "time" ? "Wait" : concern === "cost" ? "Cost" : "Both"}</p>
            <p>Procedure: {procedure === "not_sure" ? "Not sure" : procedure === "hip" ? "Hip replacement" : "Knee replacement"}</p>
            <p>Contact: {preference} · {language}</p>
            <p>Continuing opens a demonstration dashboard. It does not create a clinical record and it does not reserve treatment.</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 ? (
            <button type="button" className={secondaryBtn} onClick={() => { setError(""); setStep(step - 1); }}>
              Back
            </button>
          ) : null}
          {step < 5 ? (
            <button type="button" className={primaryBtn} onClick={next}>
              Continue
            </button>
          ) : (
            <button type="button" className={primaryBtn} onClick={continueDemo}>
              Continue to the dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
