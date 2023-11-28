import { UserDto } from './TaskAutomationRequest.dto'

export interface ManualWebhookRequestDto {
  event: string
  historyItems: [HitoryStatusItemDto | any]
  taskId: string
  webhookId: string
}

export interface HistoryItemDto {
  id: string
  type: number
  field: string
}

export interface HitoryStatusItemDto extends HistoryItemDto {
  user: UserDto
  before: StatusDto
  after: StatusDto
  field: 'status'
}

export interface StatusDto {
  status: string
  color: string
  orderindex: number
  type: string
}
