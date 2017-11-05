import forEach from 'lodash/forEach'
import partial from 'lodash/partial'
import http from 'axios'
import urlComposer from 'url-composer'

const config = {
  // @TODO Move to a config file
  host: 'http://localhost:1337',
  // host: 'http://time-tracker.localhost',
  // host: 'https://time-tracker.carlogren.com',
  services: {
    login: {
      path: '/auth/local',
      method: 'post'
    },
    logout: {
      path: '/auth/logout',
      method: 'post'
    },
    register: {
      path: '/api/users',
      method: 'post'
    },
    me: {
      path: '/api/users/me',
      method: 'get'
    },
    entries: {
      path: '/api/entries',
      method: 'get'
    },
    addEntry: {
      path: '/api/entries',
      method: 'post'
    },
    updateEntry: {
      path: '/api/entries/:id',
      method: 'put'
    },
    deleteEntry: {
      path: '/api/entries/:id',
      method: 'del'
    }
  }
}

function request (serviceName, options = {}) {
  const service = config.services[serviceName]
  const { params, query, data } = options

  if (!service) {
    throw new Error(`[api] Inexisting api service '${serviceName}'`)
  }

  const url = urlComposer.build({
    host: config.host,
    path: service.path,
    params,
    query
  })

  return http({
    method: service.method,
    url,
    data,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true
  })
    // .then((response) => {
    //   if (error) return reject(error)
    //   else if (response.statusCode >= 500) return resolve({ error: true, type: 'technical', xhr: response })
    //   else if (response.statusCode >= 400) return resolve({ error: true, type: 'functional', xhr: response })

    //   return response
    // })
}

const api = {
  request
}

forEach(config.services, (service, name) => {
  api[name] = partial(request, name)
})

export default api
