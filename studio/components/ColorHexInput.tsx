import { useEffect } from "react";
import { set, unset, useFormValue, type StringInputProps } from "sanity";
import { COLOR_HEX_BY_TOKEN, type ColorToken } from "../schemas/colorMap";

/** Input readonly que espeja `colorToken` → hex.
 * Cuando el editor cambia colorToken arriba, este input rescribe colorHex
 * sin intervención. La fuente de verdad es `colorMap.ts`. */
export function ColorHexInput(props: StringInputProps) {
  const { value, onChange } = props;
  const colorToken = useFormValue(["colorToken"]) as ColorToken | undefined;
  const expected = colorToken ? COLOR_HEX_BY_TOKEN[colorToken] : undefined;

  useEffect(() => {
    if (expected && expected !== value) {
      onChange(set(expected));
    } else if (!expected && value) {
      onChange(unset());
    }
    // onChange es estable en el form context de Sanity v3
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expected]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {value ? (
        <div
          aria-hidden
          style={{
            width: 28,
            height: 28,
            background: value,
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.12)",
            flex: "0 0 auto",
          }}
        />
      ) : null}
      <code
        style={{
          fontSize: 14,
          padding: "0.4rem 0.6rem",
          background: "rgba(0,0,0,0.04)",
          borderRadius: 4,
          flex: "0 0 auto",
        }}
      >
        {value ?? "—"}
      </code>
      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
        Auto desde colorToken
      </span>
    </div>
  );
}
