const Page = async () => {
  const { default: Post } = await import(`@/content/app.mdx`)
  return <Post />
}

export default Page