export const e2eConstants = {
  app: {
    baseUrl: 'http://localhost:3333',
    port: 3333
  },
  user: {
    default: {
      email: 'detault.e2e.user@nest.io',
      password: '123123',
    }
  }, 
  routes: {
    user: {
      me: '/user/me'
    }, 
    auth: {
      signIn: '/auth/signin',
      signUp: '/auth/signup'
    }
  }
} 