import clientPromise from '../lib/mongodb'

export async function getServerSideProps() {
  try {
    try {
      const client = await clientPromise;
      const db = client.db("posts");

      const posts = await db
          .collection("post")
          .find({})
          .toArray();

      return {
          props: { posts: JSON.parse(JSON.stringify(posts)) },
      };
  } catch (e) {
      console.error(e);
  }

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({posts}) {
  return (
    <div className="container">

      <section>
      <div>
            <h1>List of All Post</h1>
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>
                        <h2>{post.title}</h2>
                        <h3>{post.content}</h3>
                    </li>
                ))}
            </ul>
        </div>
      </section>

    </div>
  )
}
