import { constantRoutes } from '@/router'

export const routesMaps = {
  'admin-token': [
    {
      path: '/',
      children: [
        {
          path: 'dashboard'
        },
        {
          path: 'detail'
        }
      ]
    },
    {
      path: '/manger',
      children: [
        {
          path: 'manger'
        },
      ]
    },
    {
      path:'/example',
      children:[
        {
          path:'table'
        },
        {
          path:'from'
        }
      ]
    }
  ],
  'user-token': [
    {
      path: '/',
      children: [
        {
          path: 'dashboard'
        },
        {
          path: 'detail'
        }
      ]
    },
    {
      path: '/manger',
      children: [
        {
          path: 'manger'
        },
      ]
    },
  ]
}

// 自定义多维数组包特定对象转一维数组过滤children，后端若返回一维数组则直接交由filterAsyncRoutes处理
function MultidimensionalToOnedimensional(routesMap) {
  const filterRoutesMap = []
  !function fn(routesMap) {
    routesMap.forEach(route => {
      const tmp = {}
      for (const key in route) {
        if (Object.hasOwnProperty.call(route, key)) {
          if (key !== 'children') {
            tmp[key] = route[key]
          } else if (key === 'children') {
            fn(route[key])
          }
        }
      }
      filterRoutesMap.push(tmp)
    })
  }(routesMap)
  return filterRoutesMap
}

// 路由索引匹配
export function filterAsyncRoutes(routes, filterRoutesMap) {
  const accessedRoutes = [];
  routes.forEach(route => {
    const tmp = {};
    if (filterRoutesMap.some(a => a.path == route.path)) {
      for (const key in route) {
        if (Object.hasOwnProperty.call(route, key)) {
          if (key !== 'children') {
            tmp[key] = route[key];
          } else if (key === 'children') {
            const tmpC = filterAsyncRoutes(route[key], filterRoutesMap);
            (tmpC.length > 0) && (tmp.children = tmpC);
          }
        }
      }
    }
    tmp.path && accessedRoutes.push(tmp)
  });

  return accessedRoutes
}

const getDefaultState = () => {
  return {
    routes: [],
    addRoutes: []
  }
}
const state = getDefaultState;

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = [
      ...constantRoutes,
      ...routes,
    ]
  },
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  generateRoutes({ commit }, { asyncRoutes, routesMap }) {
    return new Promise(resolve => {
      const filterRoutesMap = MultidimensionalToOnedimensional(routesMap)
      let accessedRoutes = filterAsyncRoutes(asyncRoutes,filterRoutesMap)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  resetState({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE');
      resolve();
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
