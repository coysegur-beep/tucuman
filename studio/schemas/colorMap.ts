/** Mapa colorToken → colorHex. Mantener sincronizado con
 * `src/lib/categories.ts` del frontend. Cualquier cambio acá debe
 * replicarse allá (y viceversa). */
export const COLOR_HEX_BY_TOKEN = {
  politica: "#A32D2D",
  economia: "#185FA5",
  sociedad: "#3B6D11",
  cultura: "#3C3489",
  deportes: "#0F6E56",
  agro: "#854F0B",
  espectaculos: "#993556",
  mundo: "#444441",
} as const;

export type ColorToken = keyof typeof COLOR_HEX_BY_TOKEN;

export const COLOR_TOKEN_OPTIONS: { title: string; value: ColorToken }[] = [
  { title: "Política", value: "politica" },
  { title: "Economía", value: "economia" },
  { title: "Sociedad", value: "sociedad" },
  { title: "Cultura", value: "cultura" },
  { title: "Deportes", value: "deportes" },
  { title: "Agro", value: "agro" },
  { title: "Espectáculos", value: "espectaculos" },
  { title: "Mundo", value: "mundo" },
];
