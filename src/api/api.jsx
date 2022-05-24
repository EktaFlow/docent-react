import axios from 'axios';
import { apiUrl } from './constants.js';

export async function grabAssessments() {
  const result = await axios.get(
    `${apiUrl}/assessments`
  )
  return result.data
}

export async function grabSingleAssessment(assessment_id) {
  const result = await axios.get(
    `${apiUrl}/get_assessment?id=${assessment_id}`
  )
  return result.data
}

export async function grabTeamMembers() {
  const result = await axios.get(
    `${apiUrl}/team_members`
  )
  return result.data
}

export async function grabNextQuestion(assessment_id) {
  const result = await axios.get(
    `${apiUrl}/next_question?assessment_id=${assessment_id}`
  )
  return result.data
}

export async function grabNextQuestionAction(assessment_id, action, q_id) {
  const result = await axios.get(
    `${apiUrl}/next_action?assessment_id=${assessment_id}&movement=${action}&question_id=${q_id}`
  )
  return result.data
}

export async function grabAnswers() {
  const result = await axios.get(
    `${apiUrl}/answers`
  )
  return result.data
}

export async function grabQuestions() {
  const result = await axios.get(
    `${apiUrl}/questions`
  )
  return result.data
}

export async function grabThreads() {
  const response = await axios.get(`${apiUrl}/mr_threads`);
  return response.data;
}

export async function grabSubthreads() {
  const result = await axios.get(
    `${apiUrl}/subthreads`
  )
  return result.data
}

export async function grabFiles(assessment_id) {
  const result = await axios.get(
    `${apiUrl}/get_files?id=${assessment_id}`
  )
  return result.data
}

export async function createAssessment(data) {
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/assessments`,
    data: data
  })
  return result.data
}

export async function createAnswers(data) {
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/answers`,
    data: data
  })
  return result.data
}

export async function createTeamMember(data) {
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/team_members`,
    data: data
  })
  return result.data
}

export async function addFileToAssessment(data) {
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/file_attachments`,
    data: data
  })
  return result.data
}

export async function addFileToQuestion(data) {
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/add_to_question`,
    data: data
  })
  return result.data
}

export async function deleteAssessment(id) {
  const result = await axios({
    method: 'delete',
    url: `${apiUrl}/assessments/${id}`,
  })
  return result.data
}

export async function nextQuestion(questionId, assessmentId){
  const result = await axios.get(`${apiUrl}/questions/next?question_id=${questionId}&assessment_id=${assessmentId}`);
  return result.data
}

export async function prevQuestion(questionId, assessmentId){
  const result = await axios.get(`${apiUrl}/questions/prev?question_id=${questionId}&assessment_id=${assessmentId}`);
  return result.data
}
