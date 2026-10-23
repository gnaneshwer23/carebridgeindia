import { COST_CATEGORY_LABELS } from "@/lib/comparison";
import {
  TIMING_NOTE,
  evaluateProposal,
  type DemoProposal,
} from "@/lib/demo/fixtures";
import { formatIsoDate, formatMinor } from "@/lib/format";

const presentationLabel = {
  quoted: "Quoted",
  included: "Included",
  estimated: "Estimated",
  unknown: "Unknown",
  not_applicable: "Not applicable",
} as const;

export function ProposalPanel({ proposal }: { proposal: DemoProposal }) {
  const { result, timing } = evaluateProposal(proposal);
  const difference = result.savings?.differenceGbpMinor;

  return (
    <article className="rounded-[16px] border border-[#D7E3E8] bg-white p-5">
      <p className="text-sm font-semibold text-[#0B6B70]">
        Demonstration proposal · Version {proposal.version}
      </p>
      <h3 className="mt-1 font-serif text-2xl text-[#12333D]">Fictional journey cost</h3>
      <p className="mt-2 text-base leading-relaxed">Provider: not named. This is not a partner hospital.</p>
      <p className="mt-2 text-base leading-relaxed">{proposal.changeNote}</p>
      <p className="mt-3 text-base leading-relaxed">{proposal.ukLabel}</p>

      <table className="mt-4 w-full text-left text-base">
        <caption className="sr-only">Itemised demonstration costs and how certain each line is</caption>
        <thead>
          <tr className="border-b border-[#D7E3E8] text-sm text-[#3a5560]">
            <th scope="col" className="py-2 font-medium">Item</th>
            <th scope="col" className="py-2 font-medium">Status</th>
            <th scope="col" className="py-2 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {proposal.lines.map((item) => (
            <tr key={item.category} className="border-b border-[#D7E3E8] last:border-0">
              <th scope="row" className="py-2 pr-3 font-medium">
                {COST_CATEGORY_LABELS[item.category]}
              </th>
              <td className="py-2 pr-3">{presentationLabel[item.presentation]}</td>
              <td className="py-2 text-right">
                {item.presentation === "unknown" || item.amountMinor === null
                  ? "Not supplied"
                  : formatMinor(item.amountMinor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-base leading-relaxed">
        {result.complete && result.expectedGbpMinor !== null
          ? `Expected total ${formatMinor(result.expectedGbpMinor)}. Estimates inside the total are labelled.`
          : "Expected total withheld. Unknown amounts are not treated as zero."}
      </p>
      {result.blockedReason ? (
        <p className="mt-2 text-base font-medium leading-relaxed">{result.blockedReason}</p>
      ) : null}
      {difference !== undefined && difference !== null ? (
        <p className="mt-2 text-base leading-relaxed">
          {difference < 0
            ? `The India total is higher by ${formatMinor(Math.abs(difference))}. A higher total is allowed. This is not a saving.`
            : difference > 0
              ? `Estimated difference ${formatMinor(difference)}. This is not a guaranteed saving and not a percentage.`
              : "The totals match in this demonstration. This is not a guarantee."}
        </p>
      ) : null}

      <p className="mt-4 text-base leading-relaxed">
        Exchange rate: {proposal.exchangeSource} Timestamp:{" "}
        {proposal.exchangeTimestamp ?? "Not supplied"}. A proposal in another currency withholds a savings figure until a rate, its source and a timestamp are recorded.
      </p>
      <p className="mt-2 text-base leading-relaxed">
        Confirmation conditions: {proposal.conditions} Expires {formatIsoDate(proposal.expiresOn)}.
      </p>

      <div className="mt-4 grid gap-3">
        <p className="text-base leading-relaxed">{TIMING_NOTE}</p>
        {timing.reason ? <p className="text-base leading-relaxed">{timing.reason}</p> : null}
        {timing.ukLabel ? (
          <p className="text-base leading-relaxed">
            {timing.ukLabel}: {timing.ukDetail}
          </p>
        ) : null}
        {timing.treatmentWindows.map((item) => (
          <p key={`${item.kind}-${item.confirmedOn}`} className="rounded-[12px] bg-[#EEF8FC] px-4 py-3 text-base leading-relaxed">
            Treatment window {formatIsoDate(item.windowStart)} to {formatIsoDate(item.windowEnd)}. Confirmed {formatIsoDate(item.confirmedOn)}. {item.conditions} Source: {item.source}.
          </p>
        ))}
        {timing.consultations.map((item) => (
          <p key={`${item.kind}-${item.confirmedOn}`} className="rounded-[12px] bg-[#EEF8FC] px-4 py-3 text-base leading-relaxed">
            Consultation {formatIsoDate(item.windowStart)}. Confirmed {formatIsoDate(item.confirmedOn)}. {item.conditions}
          </p>
        ))}
      </div>
    </article>
  );
}
