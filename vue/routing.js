import Home from './components/views/Home/Index'

export default [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '*',
  name: 'Fallback',
  component: Home
}]
