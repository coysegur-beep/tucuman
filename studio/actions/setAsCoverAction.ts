import { useState } from "react";
import { useToast } from "@sanity/ui";
import { StarIcon } from "@sanity/icons";
import {
  useClient,
  type DocumentActionComponent,
  type DocumentActionDescription,
  type DocumentActionProps,
} from "sanity";

/** Document action: marca esta nota como cover del día y flipea atómicamente
 * el cover anterior (si existe) a `false`. Setea también `esDestacada=true`
 * — un cover siempre es destacada. */
export const setAsCoverAction: DocumentActionComponent = (
  props: DocumentActionProps,
): DocumentActionDescription | null => {
  const client = useClient({ apiVersion: "2024-03-15" });
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  if (props.type !== "article") return null;

  const publishedId = props.id.replace(/^drafts\./, "");
  const published = props.published as
    | { esCoverDelDia?: boolean }
    | undefined;
  const draft = props.draft as { esCoverDelDia?: boolean } | undefined;
  const alreadyCover =
    Boolean(published?.esCoverDelDia) || Boolean(draft?.esCoverDelDia);

  return {
    label: alreadyCover
      ? "Ya es Cover del día"
      : "Marcar como Cover del día",
    icon: StarIcon,
    disabled: isPending || alreadyCover,
    onHandle: async () => {
      setIsPending(true);
      try {
        // 1) Buscar otros docs (publicados y drafts) con cover=true.
        const otherIds = await client.fetch<string[]>(
          `*[_type=="article" && esCoverDelDia==true && !(_id in [$id, "drafts." + $id])]._id`,
          { id: publishedId },
        );

        // 2) Transacción atómica: flip los demás, set este.
        const tx = client.transaction();
        for (const otherId of otherIds) {
          tx.patch(otherId, { set: { esCoverDelDia: false } });
        }
        tx.patch(publishedId, {
          set: { esCoverDelDia: true, esDestacada: true },
        });
        // También parchear el draft si existe, para que la UI se refresque sin
        // requerir publish manual del cambio.
        tx.patch(`drafts.${publishedId}`, {
          set: { esCoverDelDia: true, esDestacada: true },
        });
        await tx.commit({ visibility: "async" });

        toast.push({
          status: "success",
          title: "Cover del día actualizado",
          description:
            otherIds.length > 0
              ? `Se desactivó ${otherIds.length} cover anterior.`
              : "Sin cover previo. Publicá la nota para que aparezca en el home.",
        });
        props.onComplete();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast.push({
          status: "error",
          title: "No se pudo marcar como Cover del día",
          description: message,
        });
      } finally {
        setIsPending(false);
      }
    },
  };
};
