import { t } from "@/lib/i18n";
import { z } from "zod";
import { Field } from "@/types/field";
import { EditComponent } from "./edit-component";

const schema = (field: Field, configObject?: Record<string, any>) => {
  let zodSchema = z.coerce.number();

  if (field.options?.min !== undefined) zodSchema = zodSchema.min(field.options.min as number, { message: t("Minimum value is {value}", { value: field.options.min as number }) });
  if (field.options?.max !== undefined) zodSchema = zodSchema.max(field.options.max as number, { message: t("Maximum value is {value}", { value: field.options.max as number }) });

  return z.literal("").refine(() => !field.required, { message: t("This field is required") }).or(zodSchema);
};

const label = "Number";

export { label, schema, EditComponent };