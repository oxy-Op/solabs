"use client";

import { CardWrapper } from "./card-wrapper";

export const RegisterForm = () => {
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={true}
    ></CardWrapper>
  );
};
