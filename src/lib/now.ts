/**
 * "Today" anchor for the sample-data phase.
 *
 * The sample articles are timestamped around 2026-05-05; relative-time labels
 * ("hace 2 h", "ayer") and the daily edition number need a matching reference
 * point or the demo looks broken whenever the real wall clock drifts past the
 * dataset's day. In Phase 5 (Sanity), drop this and pass `new Date()` instead.
 */
export const SAMPLE_TODAY = new Date("2026-05-05T13:30:00-03:00");
