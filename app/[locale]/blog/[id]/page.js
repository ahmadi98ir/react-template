import BlogSidebar from "@/components/BlogSidebar";
import NoxfolioLayout from "@/layout/NoxfolioLayout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id, locale } = params;
  try {
    const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    if (!post) return {};
    const title = post.title?.[locale] ?? post.title?.en ?? "";
    const desc = (post.excerpt?.[locale] ?? post.excerpt?.en ?? "").substring(0, 155);
    return { title, description: desc };
  } catch {
    return {};
  }
}

const BlogDetails = async ({ params }) => {
  const { id, locale } = params;

  let post;
  try {
    const [found] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    post = found;
  } catch {
    notFound();
  }

  if (!post || !post.published) notFound();

  const title   = post.title?.[locale]   ?? post.title?.en   ?? "";
  const content = post.content?.[locale] ?? post.content?.en ?? "";

  return (
    <NoxfolioLayout>
      <section className="page-banner-area pt-200 rpt-140 pb-100 rpb-60 rel z-1 text-center">
        <div className="container">
          <div className="banner-inner text-white">
            <h3 className="page-title wow fadeInUp delay-0-2s">{title}</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <Link href={`/${locale}`}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={`/${locale}/blog`}>Blog</Link>
                </li>
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="bg-lines">
          <span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span />
        </div>
      </section>

      <section className="blog-details-area pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-wrap">
                <div className="content mt-35">
                  <div className="author-date-share mb-40 wow fadeInUp delay-0-4s">
                    <div className="image author bg-white rounded-circle">
                      <img
                        style={{ objectFit: "contain" }}
                        height={50}
                        width={50}
                        src="/assets/images/hero/me.png"
                        alt="Mahdi Ahmadi"
                      />
                    </div>
                    <div className="text">
                      <span>Post By</span>
                      <h5>Mahdi Ahmadi</h5>
                    </div>
                    <div className="text">
                      <span>Published</span>
                      <h5>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(
                              locale === "fa" ? "fa-IR" : locale
                            )
                          : ""}
                      </h5>
                    </div>
                  </div>
                </div>
                {post.coverImageUrl && (
                  <div className="image mb-35 wow fadeInUp delay-0-5s">
                    <img src={post.coverImageUrl} alt={title} />
                  </div>
                )}
                <div className="content wow fadeInUp delay-0-2s">
                  <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
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

export default BlogDetails;
