import axios from 'axios';

const url = 'http://localhost:9999';

export function addlist(params) {
  return axios.post(url + '/list/add', params);
}

export function getlistitem(){
  return axios.get(url + '/list')
}

export function finishedlist(params) {
  return axios.post(url + '/list/finished', params)
}

export function removelist(params){
  return axios.post(url + '/list/remove', params)
}

export function edittitle(params){
  return axios.post(url + '/list/edit', params)
}

export function modifylist(params){
  return axios.post(url + '/list/edit', params)
}

export function clearlist(params){
  return axios.post(url + '/list/clear')
}