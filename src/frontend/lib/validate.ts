const EMAIL_VALIDATION_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmailId(email:string):boolean{
  return EMAIL_VALIDATION_REGEX.test(email)
}
