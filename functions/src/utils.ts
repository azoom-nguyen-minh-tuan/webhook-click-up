import * as _ from 'lodash'
import * as crypto from 'crypto'

export function toCamelCase(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }

  const newObj: any = {};
  for (const key in obj) {
    const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    newObj[camelCaseKey] = toCamelCase(obj[key]);
  }
  return newObj;
}

export function validateWebhookRequest(body: any, sign: any): boolean {
  const hash = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(JSON.stringify(body))
    .digest('hex')
  return hash === sign
}
