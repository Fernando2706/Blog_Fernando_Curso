import classes from "./all-post.module.css";
import PostGrid from "./posts-grid";
function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={props.posts}></PostGrid>
    </section>
  );
}

export default AllPosts;
