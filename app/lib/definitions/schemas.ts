import { z } from "zod";

const FirstName = z.string();
const LastName = z.string();
const Birth = z.iso.datetime();
const Email = z.email();
const Username = z.string();
const Password = z.string();

export const SchemaUserCreate = z.object({
  firstName: FirstName,
  lastName: LastName,
  birth: Birth,
  email: Email,
  username: Username,
  password: Password,
});

export const SchemaLogin = z.object({
  email: Email,
  password: Password,
});
