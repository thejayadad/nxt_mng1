import clientPromise from "../lib/mongodb";

export default function Posts({ posts }) {
    return (
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
    );
}

export async function getServerSideProps() {
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
}