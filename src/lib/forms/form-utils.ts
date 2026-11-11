import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
} from "react-hook-form";
import type { z } from "zod";

/**
 * Shared React Hook Form + Zod setup for client-side feature forms.
 * Pass a Zod schema and defaults; schema validation is applied before submit.
 * The resolver cast bridges the Zod 4 / React Hook Form generic type boundary.
 */
export function useZodForm<TValues extends FieldValues>(
  schema: z.ZodType<TValues, TValues>,
  defaultValues: DefaultValues<TValues>,
  options: Omit<UseFormProps<TValues>, "resolver" | "defaultValues"> = {},
) {
  return useForm<TValues>({
    ...options,
    defaultValues,
    resolver: zodResolver(schema) as Resolver<TValues>,
  });
}
