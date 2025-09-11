import BlogSidebar from "@/components/BlogSidebar";
import PageBanner from "@/components/PageBanner";
import NoxfolioLayout from "@/layout/NoxfolioLayout";
import Link from "next/link";

export const metadata = {
  title: "هوش مصنوعی",
};

// Fetch posts server-side (internal API with ISR)
async function fetchPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/posts`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

const BlogPage = async () => {
  const posts = await fetchPosts();

  return (
    <NoxfolioLayout>
      <PageBanner pageName={"وبلاگ"} />
      <section
        dir="rtl"
        className="blog-standard-area pb-70 rpb-40 pb-130 rpb-100 rel z-1"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-standard-wrap">
                <div className="row">
                  {posts.map((post) => (
                    <div key={post.id} className="col-md-6 item">
                      <div className="blog-item style-two wow fadeInUp delay-0-2s">
                        <div className="image">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="content">
                          <div className="blog-meta mb-20">
                           {/*  {post.tags.map((tag, index) => (
                              <Link
                                key={index}
                                legacyBehavior
                                className="tag"
                                href={`/blog?tag=${tag}`}
                              >
                                {tag}
                              </Link>
                            ))} */}
                          </div>
                          <h5>
                            <Link legacyBehavior href={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </h5>
                          <hr />
                          <div className="blog-meta mb-5">
                            <span className="date">
                              <i className="far fa-calendar-alt" />{" "}
                              {new Date(post.created_at).toLocaleDateString(
                                "fa-IR"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-md-6 item offset-md-6">
                    <div className="news-more-btn text-center mt-35 wow fadeInUp delay-0-2s">
                      <Link legacyBehavior href="/blog">
                        <a className="theme-btn">
                          View More Projects{" "}
                          <i className="far fa-angle-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
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

export default BlogPage;
