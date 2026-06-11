import type { AiTool } from "@/types/ai-tool"

const PH_GRAPHQL_URL = "https://api.producthunt.com/v2/api/graphql"

const AI_TOPIC_SLUGS = new Set([
  "artificial-intelligence",
  "ai",
  "machine-learning",
  "generative-ai",
  "chatgpt",
  "llm",
])

interface PhTopicNode {
  name: string
}

interface PhPostNode {
  id: string
  name: string
  tagline: string
  description: string | null
  url: string
  votesCount: number
  website: string | null
  topics: { edges: Array<{ node: PhTopicNode }> }
}

interface PhPostsResponse {
  data?: {
    posts: { edges: Array<{ node: PhPostNode }> }
  }
  errors?: Array<{ message: string }>
}

const GET_POSTS_QUERY = `
  query GetPosts($first: Int!) {
    posts(first: $first, order: VOTES) {
      edges {
        node {
          id
          name
          tagline
          description
          url
          votesCount
          website
          topics {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`

const isAiRelatedPost = (post: PhPostNode): boolean => {
  const topicNames = post.topics.edges.map((edge) => edge.node.name.toLowerCase())
  if (topicNames.some((topic) => AI_TOPIC_SLUGS.has(topic) || topic.includes("ai"))) {
    return true
  }

  const searchable = [post.name, post.tagline, post.description ?? ""].join(" ").toLowerCase()
  return searchable.includes(" ai") || searchable.includes("artificial intelligence")
}

const mapPostToAiTool = (post: PhPostNode): AiTool => ({
  id: `ph-${post.id}`,
  name: post.name,
  description: post.tagline || post.description || "AI product on Product Hunt",
  url: post.website || post.url,
  source: "product-hunt",
  category: "library",
  tags: post.topics.edges.map((edge) => edge.node.name).slice(0, 4),
  likes: post.votesCount,
  pricing: "freemium",
})

export const fetchProductHuntAiProducts = async (limit = 20): Promise<AiTool[]> => {
  const token = process.env.PRODUCTHUNT_TOKEN

  if (!token) return []

  const response = await fetch(PH_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: GET_POSTS_QUERY,
      variables: { first: Math.min(limit * 3, 50) },
    }),
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Product Hunt API failed: ${response.status}`)
  }

  const payload = (await response.json()) as PhPostsResponse

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message ?? "Product Hunt GraphQL error")
  }

  const posts = payload.data?.posts.edges.map((edge) => edge.node) ?? []

  return posts
    .filter(isAiRelatedPost)
    .slice(0, limit)
    .map(mapPostToAiTool)
}
