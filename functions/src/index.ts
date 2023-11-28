import * as functions from 'firebase-functions'
import {
  ClickUpTaskTriggerRequestDto,
  TaskDto,
} from './dto/request/TaskAutomationRequest.dto'
import { toCamelCase, validateWebhookRequest } from './utils'
import { getTask, setTagToTask } from './endpoint'
import {
  HitoryStatusItemDto,
  ManualWebhookRequestDto,
} from './dto/request/ManualWebhookReqeust.dto'
import { TAG_NAME } from './constants'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const ClickUpTaskAutomationWebhook = functions.https.onRequest(
  async (request, response) => {
    const body: ClickUpTaskTriggerRequestDto = toCamelCase(request.body)
    const isOnTime: boolean = body.payload.dueDate
      ? Date.now() <= body.payload.dueDate
      : true
    const tagName = isOnTime ? TAG_NAME.AHEAD_OF_SCHEDULE: TAG_NAME.BEHIND_SCHEDULE
    await setTagToTask(body.payload.id, tagName)
    response.send('Automation webhook')
  }
)

export const ClickUpTaskManualWebhook = functions.https.onRequest(
  async (request, response): Promise<any> => {
    const isValidRequest = validateWebhookRequest(
      request.body,
      request.headers['x-signature']
    )
    if (!isValidRequest) {
      return response.status(401).send('Unauthorized')
    }
    const body: ManualWebhookRequestDto = toCamelCase(request.body)
    const hitoryStatusItem: HitoryStatusItemDto = body.historyItems.find(
      (value) => value.field === 'status'
    )
    if (!hitoryStatusItem || hitoryStatusItem.after.type !== 'done')
      return response.send('No status change')
    const taskDetail: TaskDto = await getTask(body.taskId)
    const isOnTime: boolean = taskDetail.dueDate
      ? Date.now() <= taskDetail.dueDate
      : true
    const tagName = isOnTime ? TAG_NAME.AHEAD_OF_SCHEDULE: TAG_NAME.BEHIND_SCHEDULE
    functions.logger.info(taskDetail.id)
    await setTagToTask(taskDetail.id, tagName)
    response.send('Manual webhook')
  }
)
