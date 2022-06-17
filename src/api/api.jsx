import axios from 'axios';
import { apiUrl } from './constants.js';

export async function grabAssessments() {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/assessments`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabSingleAssessment(assessment_id) {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/get_assessment?id=${assessment_id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabCritiera(assessment_id) {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/grab_criteria?id=${assessment_id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabTeamMembers() {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/team_members`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabNextQuestion(assessment_id) {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/next_question?assessment_id=${assessment_id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabNextQuestionAction(assessment_id, action, q_id) {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/next_action?assessment_id=${assessment_id}&movement=${action}&question_id=${q_id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabAnswers() {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/answers`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabQuestions() {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/questions`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabThreads() {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}/mr_threads`, {headers: {Authorization: `Bearer ${token}`}});
  return response.data;
}

export async function grabSubthreads() {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/subthreads`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function grabFiles(assessment_id) {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${apiUrl}/get_files?id=${assessment_id}`,
    {headers: {Authorization: `Bearer ${token}`}}
  )
  return result.data
}

export async function createAssessment(data) {
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/assessments`,
    data: data,
    headers: {Authorization: `Bearer ${token}`}
  })
  return result.data
}

export async function createAnswers(data) {
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/answers`,
    data: data,
    headers: {Authorization: `Bearer ${token}`}
  })
  return result.data
}

export async function createTeamMember(data) {
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/team_members`,
    data: {user: data},
    headers: {Authorization: `Bearer ${token}`}
  })
  return result.data
}

export async function addFileToAssessment(data) {
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/file_attachments`,
    data: data,
    headers: {Authorization: `Bearer ${token}`}
  })
  return result.data
}

export async function addFileToQuestion(data) {
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/add_to_question`,
    data: data,
    headers: {Authorization: `Bearer ${token}`}
  })
  return result.data
}

export async function deleteAssessment(id) {
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'delete',
    url: `${apiUrl}/assessments/${id}`,
    headers: {Authorization: `Bearer ${token}`}
  })
  return result.data
}

export async function nextQuestion(questionId, assessmentId){
  const token = localStorage.getItem("token");
  const result = await axios.get(`${apiUrl}/questions/next?question_id=${questionId}&assessment_id=${assessmentId}`, {headers: {Authorization: `Bearer ${token}`}});
  return result.data
}

export async function prevQuestion(questionId, assessmentId){
  const token = localStorage.getItem("token");
  const result = await axios.get(`${apiUrl}/questions/prev?question_id=${questionId}&assessment_id=${assessmentId}`, {headers: {Authorization: `Bearer ${token}`}});
  return result.data
}

export async function loginUser(user) {
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/users/sign_in`,
    data: {"user": user},
  })
  return result.data
}


export async function registerUser(user) {
  const result = await axios.post(`${apiUrl}/users`, {
    "user": user
  })
  return result.data
}

export async function logoutUser(user){
  const token = localStorage.getItem("token");
  const result = await axios({
    method: 'delete',
    url: `${apiUrl}/users/sign_out`,
    headers: {Authorization: `Bearer ${token}`}
  })
  return result
}
