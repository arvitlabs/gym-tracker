export type SignupDraft = { name: string; phone: string; password: string };
export let draft: SignupDraft | null = null;
export function setDraft(value: SignupDraft | null) {
  draft = value;
}
