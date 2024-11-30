// app/blog/[id]/page.js

import BlogSidebar from "@/components/BlogSidebar";
import NoxfolioLayout from "@/layout/NoxfolioLayout";
import Link from "next/link";
import parse from "html-react-parser";

export async function generateMetadata({ params }) {
  // Fetch the blog data for meta title, description, etc.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.id}`);
  const post = await res.json();

  return {
    title: post.title,
    description: post.content.substring(0, 150), // Example meta description
  };
}

const BlogDetails = async ({ params }) => {
  const { id } = params; // Get the post ID from URL parameters
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`);
  const post = await res.json();
console.log(1)
  return (
    <NoxfolioLayout>
      <section dir="rtl" className="page-banner-area pt-200 rpt-140 pb-100 rpb-60 rel z-1 text-center">
        <div className="container">
          <div className="banner-inner text-white">
            <h3 className="page-title wow fadeInUp delay-0-2s">
              {post.title}
            </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <Link legacyBehavior href="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">{post.title}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="bg-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section dir="rtl" className="blog-details-area pb-70 rpb-40 pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-wrap">
                <div className="content mt-35">
                  <div className="blog-meta mb-30 wow fadeInUp delay-0-2s">
                    <Link legacyBehavior className="tag" href="/blog">
                      Design
                    </Link>
                    <Link legacyBehavior className="tag" href="/blog">
                      Figma
                    </Link>
                  </div>
                  <div className="author-date-share mb-40 wow fadeInUp delay-0-4s">
                    <div className="image author bg-white  rounded-circle">
                      <img style={{objectFit:'contain'}} height={50} width={50} src='https://ahmadi98.ir/assets/images/hero/me.png' alt="Author" />
                    </div>
                    <div className="text">
                      <span>Post By</span>
                      <h5>Mahdi Ahmadi</h5>
                    </div>
                    <div className="text">
                      <span>Published</span>
                      <h5>{new Date(post.created_at).toLocaleDateString()}</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="far fa-share-alt" />
                    </a>
                  </div>
                </div>
                <div className="image mb-35 wow fadeInUp delay-0-5s">
                  <img
                    src={post.image}
                    alt="Blog Details"
                  />
                </div>
                <div className="content wow fadeInUp delay-0-2s">
                  <p className="">
                    {parse(post.content)}
                  </p>
                </div>
               
              </div>
            </div>
            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
        <div className="bg-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </NoxfolioLayout>
  );
};

export default BlogDetails;
