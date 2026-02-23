import { getProfile as fetch } from "../repositories/profile.repository";

//service to return profile info
export async function getProfile(username: string) {
  const profile = await fetch(username);
  let result, userId;
  profile ? ({ userId, ...result } = profile) : (result = null);
  return result;
}
