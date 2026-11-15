import { t } from "@/lib/i18n";
import { Field } from "@/types/field";
import { EditComponent } from "./edit-component";
import { ViewComponent } from "./view-component";
import { z } from "zod";

const schema = (field: Field, configObject?: Record<string, any>) => {
  let zodSchema = z.string();
  
  if (field.required) zodSchema = zodSchema.min(1, t("This field is required"));
  if (field.pattern) {
    if (typeof field.pattern === "string") {
      zodSchema = zodSchema.regex(new RegExp(field.pattern), t("Invalid format"));
    } else {
      zodSchema = zodSchema.regex(new RegExp(field.pattern.regex), field.pattern.message || t("Invalid format"));
    }
  }
  if (field.options?.minlength) zodSchema = zodSchema.min(field.options.minlength as number, t("Minimum length is {count} characters", { count: field.options.minlength as number }));
  if (field.options?.maxlength) zodSchema = zodSchema.max(field.options.maxlength as number, t("Maximum length is {count} characters", { count: field.options.maxlength as number }));
  
  return zodSchema;
};

const label = "Rich Text";

export { label, schema, EditComponent, ViewComponent };
