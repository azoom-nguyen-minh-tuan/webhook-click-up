import fetch from 'node-fetch'
import { TaskDto } from './dto/request/TaskAutomationRequest.dto'
import { toCamelCase } from './utils'
const _endPointClickUp = 'https://api.clickup.com/api/v2'
const _defautHeader = {
  Authorization: process.env.AUTH_TOKEN!,
  'Content-Type': 'application/json',
}

export function setTagToTask(taskId: string, tagName: string) {
  const url = `${_endPointClickUp}/task/${taskId}/tag/${tagName}`
  return fetch(url, {
    method: 'POST',
    headers: _defautHeader,
  })
}

export async function getTask(taskId: string): Promise<TaskDto> {
  const url = `${_endPointClickUp}/task/${taskId}`
  const res = await fetch(url, {
    method: 'GET',
    headers: _defautHeader,
  })
  const bodyResponse = await res.json()
  return toCamelCase(bodyResponse)
}
