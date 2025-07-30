import React, { useState } from "react";

export interface FormData {
  username: string;
  email: string;
  password: string;
};

export interface CreateAccountFormProps {
  form: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};