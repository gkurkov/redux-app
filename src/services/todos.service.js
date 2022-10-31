import httpService from './http.service'

const todosEndpoint = 'todos/'

const todoService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    })
    return data
  },
}

export default todoService
