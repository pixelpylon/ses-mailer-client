import { RestifiedError } from "@exp1/common-utils";

export type SendEmailParams = {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  bcc?: string | string[];
};

export type SendErrorParams = {
  service?: string;
  to?: string | string[];
  subject: string;
  error?: Error | string;
  payload?: string | object;
};

export type SendServiceMessageParams = {
  service?: string;
  to?: string | string[];
  subject: string;
  message?: string;
  payload?: string | object;
};

export type ValidateAddressParams = {
  email: string;
};

export declare class Mailer {
  constructor(url: string);
  send(params: SendEmailParams): Promise<{ error?: RestifiedError }>;
  sendError(params: SendErrorParams): Promise<{ error?: RestifiedError }>;
  sendServiceMessage(
    params: SendServiceMessageParams,
  ): Promise<{ error?: RestifiedError }>;
  validateAddress(
    params: ValidateAddressParams,
  ): Promise<{ error?: RestifiedError }>;
  getDeniedDomains(): Promise<{ result: string[] } | { error: RestifiedError }>;
}
