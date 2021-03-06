import axios from 'axios'
import { DATO_API_TOKEN } from './keys'

const API_URL = `https://graphql.datocms.com/`

const fetchContent = query => {
  const data = JSON.stringify({ query })

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${DATO_API_TOKEN}`
  }

  return axios.post(API_URL, data, { headers })
}

const fields = 'name, content, position, isActive'
const media = 'media { url, title }'
const section = 'section { id, name, slug, order, isGrouped, isActive }'
const subsections = 'subsections { id, name, content, slug, order, isnamevisible, isActive }'
const video = `video { id, ${fields}, ${media} }`
const podcast = `podcast { id, ${fields}, ${media} }`
const activities = `activities { id, slug, ${fields}, ${media} }`
const assignments = `assignments { id, slug, ${fields}, ${media} }`
const events = `events { id, slug, ${fields}, time, location { longitude, latitude } }`
const chapters = `chapters { id, order, slug, ${fields}, ${section}, ${media}, ${video}, ${podcast}, ${activities}, ${assignments}, ${events} }`

export const fetchChapters = () => {
  return fetchContent(`{ allChapters(first:100) { id, order, slug, ${fields}, ${section}, ${subsections}, ${media}, ${video}, ${podcast}, ${activities}, ${assignments}, ${events} } }`)
}
