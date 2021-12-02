const devBaseURL = '/api'
const proBaseURL = 'http://www.zyfullstack.top:3000/'
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 5000
