import AllPosts from "../../components/post/all-post";
import { getAllPost } from "../../lib/posts-util";


function AllPostPage({posts}) {
  return <AllPosts posts={posts}/>;
}

export  function getServerSideProps(){
  const files = getAllPost();

  return{
    props:{
      posts:files
    }
  }
}

export default AllPostPage;
