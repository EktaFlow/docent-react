import axios from 'axios';
import {apiUrl} from './constants.js';

export async function grabAssessments() {
  const result = await axios.get(
    `${apiUrl}/assessments`
  ).then(res => res.data)
}

export async function createAssessment(data){
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/assessments`,
    data: data
  })
  return result.data
}
