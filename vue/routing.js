import Home from './components/views/Home/Index'
import Post from './components/views/Post/Index'

export default [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/or/rant/or/whatever/im/calling/it/number/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/p/:id',
    name: 'ShortPost',
    component: Post
  }
]
