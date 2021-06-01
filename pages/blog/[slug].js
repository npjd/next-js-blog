import Head from 'next/head'
import {format,parseISO} from 'date-fns'
import { blogPost } from '../../lib/data';

export default function BlogPost({title,date,content}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="font-bold text-3xl">{title}</h2>
        <h3 className="text-gray-500">{format(parseISO(date),'MMMM do, uuu')}</h3>
        <p className="my-10">{content}</p>
      </main>
    </div>
  )
}

export async function getStaticProps({params}) {
    return {
      props: blogPost.find(blog=>blog.slug===params.slug), // will be passed to the page component as props
    }
  }

export async function getStaticPaths() {
    
    return {
      paths: blogPost.map(item =>({
          params:{
              slug: item.slug
          }
      })),
      fallback: false     
    };
}