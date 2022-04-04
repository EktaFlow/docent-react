import axios from 'axios';
import { apiUrl } from './constants.js';

export async function grabAssessments() {
  const result = await axios.get(
    `${apiUrl}/assessments`
  ).then(res => res.data)
}

export async function grabTeamMembers() {
  const result = await axios.get(
    `${apiUrl}/team_members`
  ).then(res => res.data)
}

export async function grabAnswers() {
  const result = await axios.get(
    `${apiUrl}/answers`
  ).then(res => res.data)
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

// export async function createTeamMember(data) {
//   const result = await axios({
//     method: 'post',
//     url: `${apiUrl}/team_members`,
//     data: data
//   })
//   return result.data
// }
