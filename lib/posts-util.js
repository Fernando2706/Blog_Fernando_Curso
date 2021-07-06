import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(),'content','post') 

export function getAllPost(){
    const files = fs.readdirSync(postsDirectory);

    const allPost = files.map(postFile=>{
        return getPostData(postFile)
    })

    const sortedPost=allPost.sort((postA,postB)=>postA>postB ? -1 : 1)
    return sortedPost
}
export function getPostsFiles(){
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier){
    const postSlug = postIdentifier.replace(/\.md$/,'');
    if(!postIdentifier.includes(".md") && !postIdentifier.includes(".png")){
        postIdentifier+= '.md'
    }
    const filePath = path.join(postsDirectory, postIdentifier)
    const fileContent = fs.readFileSync(filePath,'utf-8')
    const { data, content}=matter(fileContent)


    const postData ={
        slug:postSlug,
        ...data,
        content:content
    }

    return postData
}

export function getFeaturedPost(){
    const allPost = getAllPost();
    const featuredPosts = allPost.filter(post => post.isFeatured);
    return featuredPosts
}