const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return favorite
}


module.exports = {
  totalLikes, favoriteBlog
}
