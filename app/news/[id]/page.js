import connectDB from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import DeleteBtn from "@/app/components/deleteBtn";
import { cookies } from "next/headers";
import Header from "@/app/components/header";
import Back from "@/app/components/icons/back";
import styles from "./detail.module.css";
import TopBtn from "@/app/components/icons/topBtn";
import HorizontalScroll from "@/app/components/horizontalScroll";

export default async function NewsDetail({ params }) {

  const { id } = await params;

  const client = (await connectDB).db("news");
  const newsData = await client.collection("post").find().toArray();

  const post = await client
    .collection("post")
    .findOne({ _id: new ObjectId(id) });

  const serializedPost = {
    ...post,
    _id: post._id.toString(),
  };

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  const currentIndex = newsData.findIndex(
    (item) => item._id.toString() === id
  );
  const prevPost = newsData[currentIndex + 1] || null;
  const nextPost = newsData[currentIndex - 1] || null;

  if (!post) {
    return <div>게시글을 찾을 수 없음</div>;
  }

  return (
    <div>
      <Header/>

      <div className={styles.detail_container}>

        <Link href="/#NEWS"><Back/></Link>
        

        {
          post.source == "dclabs" && token ? 
          <div className={styles.edit_delete_container}>
            <Link href={`/news/edit/${serializedPost._id}`} className={styles.edit_btn}>수정하기</Link>
            <DeleteBtn id={post._id.toString()} url={"/api/admin"}/>
          </div> : null
        }


        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.enTitle}>{post.enTitle}</div>
            <div className={styles.date_container}>
              <div>{post.uploadDate}</div>
              <div>|</div>
              <div>{post.uploader}</div>
            </div>
            
            <HorizontalScroll className={styles.mobile_img_container}>
              {post.images && post.images.length == 1 ? (
                post.images.map((imgUrl, idx) => (
                  <div key={idx} className={styles.mobile_img_single}>
                    <img draggable={false} src={imgUrl}/>
                  </div>
                ))
              ) : (
                post.images && post.images.length > 0 && (
                  post.images.map((imgUrl, idx) => (
                    <div key={idx} className={styles.mobile_img_multi}>
                      <img draggable={false} src={imgUrl}/>
                    </div>
                  ))
                )
              )}
            </HorizontalScroll>
            
            <div className={styles.content}>{post.contents}</div>
          </div>

          <div className={styles.img_container_view}>
            {post.images && post.images.length > 0 && (
              post.images.map((imgUrl, idx) => (
                <img key={idx} src={imgUrl}/>
              ))
            )}
          </div>
        </div>
        
        <TopBtn/>

        <div className={styles.nav_container}>
          {nextPost ? (
            <div className={styles.nav_item} style={!prevPost ? {borderBottom:'1px solid #888'} : null}>
              <Link href={`/news/${nextPost._id.toString()}`} className={styles.nav_link}>
                <div className={styles.nav_text}>다음글</div>
                <div className={styles.nav_title}>{nextPost.title}</div>
              </Link>
            </div>
          ) : null
          }
          {prevPost ? (
            <div className={styles.nav_item} style={{borderBottom:'1px solid #888'}}>
              <Link href={`/news/${prevPost._id.toString()}`} className={styles.nav_link}>
                <div className={styles.nav_text}>이전글</div>
                <div className={styles.nav_title}>{prevPost.title}</div>
              </Link>
            </div>
          ) : null
          }
        </div>
      </div>

    </div>
  );
}