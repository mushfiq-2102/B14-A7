const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// 1850 -> "১,৮৫০"
export const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => banglaDigits[Number(d)]);

export const formatPrice = (price: number) =>
  toBn(price.toLocaleString("en-US"));

// 63.5 -> "৬৩.৫০", 62 -> "৬২"
export const formatAvgPrice = (price: number) =>
  toBn(
    price.toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
      maximumFractionDigits: 2,
    }),
  );

// "kg" -> "কেজি"
export const getUnit = (unit: string) => units[unit] ?? unit;

export const getBanglaDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

// ▲ green, ▼ red, — gray
export const getChange = (change: { dir: string; pct: number }) => {
  const pct = toBn(Math.abs(change.pct).toFixed(1));

  if (change.dir === "up") {
    return { symbol: "▲", pct, color: "text-success" };
  }

  if (change.dir === "down") {
    return { symbol: "▼", pct, color: "text-error" };
  }

  return { symbol: "—", pct, color: "text-base-content/60" };
};
