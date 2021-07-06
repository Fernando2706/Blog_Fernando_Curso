import classes from './featured-post.module.css'
import PostGrid from '../post/posts-grid'
function FeaturedPost(props){

    return <section className={classes.latest}>
        <h2>Featured Posts</h2>
        <PostGrid posts={props.posts}/>
    </section>
}


export  default FeaturedPost