import BlogSidebar from "@/components/BlogSidebar";
import PageBanner from "@/components/PageBanner";
import NoxfolioLayout from "@/layout/NoxfolioLayout";
import Link from "next/link";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
};

const BlogPage = async ({ params }) => {
  const { locale } = params;

  let allPosts = [];
  try {
    allPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.publishedAt))
      .limit(20);
  } catch {
    // DB not yet connected — render empty state gracefully
  }

  return (
    <NoxfolioLayout>
      <PageBanner pageName={locale === "fa" ? "وبلاگ" : "Blog"} />
      <section className="blog-standard-area pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-standard-wrap">
                <div className="row">
                  {allPosts.length > 0 ? (
                    allPosts.map((post) => (
                      <div key={post.id} className="col-md-6 item">
                        <div className="blog-item style-two wow fadeInUp delay-0-2s">
                          <div className="image">
                            {post.coverImageUrl && (
                              <img src={post.coverImageUrl} alt={post.title?.[locale] ?? ""} />
                            )}
                          </div>
                          <div className="content">
                            <h5>
                              <Link href={`/${locale}/blog/${post.id}`}>
                                {post.title?.[locale] ?? post.title?.en ?? post.title?.fa ?? ""}
                              </Link>
                            </h5>
                            <hr />
                            <div className="blog-meta mb-5">
                              <span className="date">
                                <i className="far fa-calendar-alt" />{" "}
                                {post.publishedAt
                                  ? new Date(post.publishedAt).toLocaleDateString(
                                      locale === "fa" ? "fa-IR" : locale
                                    )
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-60">
                      <p className="text-muted">
                        {locale === "fa" ? "مقاله‌ای یافت نشد." : "No posts found yet."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
        <div className="bg-lines">
          <span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span />
        </div>
      </section>
    </NoxfolioLayout>
  );
};

export default BlogPage;
