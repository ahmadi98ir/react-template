"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LOCALES = [
  { code: "fa", label: "فا", flag: "🇮🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ar", label: "عر", flag: "🇸🇦" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languages");
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale) => {
    if (newLocale === locale) return;
    const segments = pathname.split("/");
    const localeList = ["fa", "en", "fr", "ar"];
    if (localeList.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  };

  return (
    <div className="language-switcher d-flex align-items-center gap-1">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleLocaleChange(code)}
          title={t(code)}
          className={`lang-btn btn btn-sm px-2 py-1 ${
            locale === code ? "lang-btn-active" : ""
          }`}
          style={{
            fontSize: "11px",
            fontWeight: locale === code ? "700" : "400",
            opacity: locale === code ? 1 : 0.6,
            border: locale === code ? "1px solid currentColor" : "1px solid transparent",
            borderRadius: "4px",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: "32px",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
