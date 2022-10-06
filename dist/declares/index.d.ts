import {RestifiedError} from 'common-utils'

export interface ISendEmailParams {
  from: string
  to: string | string[]
  subject: string
  text?: string
  html?: string
  replyTo?: string
  bcc?: string | string[]
}

export interface ISendErrorParams {
  service?: string
  to?: string | string[]
  subject: string
  error?: Error
  payload?: string
}

export interface ISendServiceMessageParams {
  service?: string
  to?: string | string[]
  subject: string
  message?: string
  payload?: string
}

export interface IValidateAddressParams {
  email: string
}

export declare class Mailer {
  constructor (url: string)
  send(params: ISendEmailParams): Promise<{error?: RestifiedError}>
  sendError(params: ISendErrorParams): Promise<{error?: RestifiedError}>
  sendServiceMessage(params: ISendServiceMessageParams): Promise<{error?: RestifiedError}>
  validateAddress(params: IValidateAddressParams): Promise<{error?: RestifiedError}>
  getDeniedDomains(): Promise<{result: string[]} | {error: RestifiedError}>
}
