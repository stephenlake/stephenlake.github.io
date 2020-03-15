import Home from './components/views/Home/Index'
import Post from './components/views/Post/Index'

export default [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/or/rant/or/whatever/im/calling/it/number/:number',
    name: 'Post',
    component: Post
  }
]
