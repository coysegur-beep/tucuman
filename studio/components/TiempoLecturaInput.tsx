import { useEffect, useMemo } from "react";
import { set, useFormValue, type NumberInputProps } from "sanity";

interface PortableTextSpan {
  _type?: string;
  text?: string;
}

interface PortableTextBlock {
  _type?: string;
  children?: PortableTextSpan[];
}

function ptToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return (blocks as PortableTextBlock[])
    .filter((b) => b?._type === "block")
    .map((b) =>
      (b.children ?? [])
        .map((c) => c.text ?? "")
        .join(""),
    )
    .join(" ");
}

const WORDS_PER_MINUTE = 200;
const MIN_MINUTES = 2;

function calcMinutes(wordCount: number): number {
  if (wordCount <= 0) return MIN_MINUTES;
  return Math.max(MIN_MINUTES, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/** Input readonly que recalcula `tiempoLectura` mientras el editor escribe el body.
 * Fórmula: max(2, ceil(palabras / 200)). */
export function TiempoLecturaInput(props: NumberInputProps) {
  const { value, onChange } = props;
  const body = useFormValue(["body"]);

  const wordCount = useMemo(() => {
    const text = ptToText(body).trim();
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [body]);

  const expected = useMemo(() => calcMinutes(wordCount), [wordCount]);

  useEffect(() => {
    if (wordCount === 0) return;
    if (value === expected) return;
    onChange(set(expected));
    // onChange estable en form context
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expected, wordCount]);

  return (
    <div>
      <input
        type="number"
        readOnly
        value={value ?? expected}
        style={{
          width: "100%",
          padding: "0.6rem 0.75rem",
          fontSize: 14,
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 4,
          background: "rgba(0,0,0,0.04)",
          color: "inherit",
        }}
      />
      <p
        style={{
          fontSize: 12,
          color: "rgba(0,0,0,0.55)",
          margin: "0.4rem 0 0",
        }}
      >
        Auto: {wordCount} {wordCount === 1 ? "palabra" : "palabras"} →{" "}
        {expected} min ({WORDS_PER_MINUTE} pal/min, mínimo {MIN_MINUTES}).
      </p>
    </div>
  );
}
