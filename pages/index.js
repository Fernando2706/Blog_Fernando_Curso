import { Fragment } from "react";

import Hero from "../components/home-page/hero";
import FeaturedPost from "../components/home-page/featured-post";
import { getFeaturedPost } from "../lib/posts-util";



function HomePage(props) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPost posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPost();

  return {
    props: {
      posts: featuredPosts
    }
  }
}

export default HomePage;
