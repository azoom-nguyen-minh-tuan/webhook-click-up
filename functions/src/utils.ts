import * as _ from 'lodash'
import * as crypto from 'crypto'

export function toCamelCase(obj: any): any {
  if (typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  }

  return _.mapKeys(obj, (value: any, key: any) => _.camelCase(key))
}

export function validateWebhookRequest(body: any, sign: any): boolean {
  const hash = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(JSON.stringify(body))
    .digest('hex')
  return hash === sign
}
