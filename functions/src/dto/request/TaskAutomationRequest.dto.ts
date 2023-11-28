import { StatusDto } from './ManualWebhookReqeust.dto'

export interface ClickUpTaskTriggerRequestDto {
  id: string
  date: string
  payload: TaskDto
}

export interface TaskDto {
  id: string
  status: StatusDto
  parent: string
  url: string
  space: {
    id: string
  }
  folder: {
    id: string
    name: string
  }
  list: {
    id: string
    name: string
  }
  creator: UserDto
  assignees: UserDto[]
  watchers: UserDto[]
  dateCreated?: number
  dateUpdated?: number
  dateClosed?: number
  dateDone?: number
  dueDate?: number
  startDate?: number
  timeEstimate?: number
}

export interface UserDto {
  id: string
  username: string
  email: string
}
