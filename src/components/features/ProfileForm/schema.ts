import { z } from "zod";

const emails = ["test1@example.com", "test2@example.com", "test3@example.com"];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const cache = new Map<string, boolean>();

export const isUniqueEmail = async (email: string) => {
  if (!email) return true;

  if (cache.has(email)) {
    return cache.get(email);
  }

  await delay(1000);
  const isUnique = !emails.includes(email);
  cache.set(email, isUnique);
  return isUnique;
};

export const UserSchema = z
  .object({
    name: z.string(),
    // coerce()で任意のプリミティブ型に変換させる
    age: z.coerce.number().positive().int(),
    email: z.string().email().refine(isUniqueEmail, {
      message: "Email is already taken",
    }),
    password: z.string().min(8),
    passwordConfirmation: z.string(),
    // terms: z.literal(true, {
    // errorMapでメッセージのカスタマイズ
    //   errorMap: () => {
    //     return { message: "Please check the terms of service" };
    //   },
    // }),
  })
  // z.object()に対してrefine()を使うことで他のフィールドを参照できる
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Confirmation password does not match.",
      path: ["passwordConfirmation"],
    }
  );

export type UserSchemaType = z.infer<typeof UserSchema>;
