import BlogSidebar from "@/components/BlogSidebar";
import NoxfolioLayout from "@/layout/NoxfolioLayout";
import Link from "next/link";

export const metadata = {
  title: "Blog Details",
};

const BlogDetails = () => {
  return (
    <NoxfolioLayout>
      <section className="page-banner-area pt-200 rpt-140 pb-100 rpb-60 rel z-1 text-center">
        <div className="container">
          <div className="banner-inner text-white">
            <h3 className="page-title wow fadeInUp delay-0-2s">
              {" "}
              Tips For Conducting to Usability Studies With Participants
            </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <Link legacyBehavior href="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  {" "}
                  Tips For Conducting to Usability Studies With Participants
                </li>
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
      {/* Page Banner End */}
      {/* Blog Details Area start */}
      <section className="blog-details-area pb-70 rpb-40 pb-130 rpb-100 rel z-1">
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
                    <div className="author">
                      <img src="assets/images/blog/author.jpg" alt="Author" />
                    </div>
                    <div className="text">
                      <span>Post By</span>
                      <h5>Martin D. Rubio</h5>
                    </div>
                    <div className="text">
                      <span>Published</span>
                      <h5>September 25, 2023</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="far fa-share-alt" />
                    </a>
                  </div>
                </div>
                <div className="image mb-35 wow fadeInUp delay-0-5s">
                  <img
                    src="assets/images/blog/blog-details.jpg"
                    alt="Blog Details"
                  />
                </div>
                <div className="content wow fadeInUp delay-0-2s">
                  <p className="big-letter">
                    sSed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium totam rem
                    aperiam eaque ipsa quae abillo inventore veritatis
                  </p>
                  <p>
                    beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                    sed quia consequuntur magni dolores eos qui ratione
                    voluptatem sequi nesciunt. Neque porro quisquam est, qui
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequature
                  </p>
                  <blockquote>
                    Handling Mounting And Unmounting Of Given Navigation Routes
                    In React Native
                    <span className="blockquote-footer">Johnny M. Martin</span>
                  </blockquote>
                </div>
                <div className="row gap-20">
                  <div className="col-md-6">
                    <div className="image mb-20 wow fadeInUp delay-0-2s">
                      <img
                        src="assets/images/blog/blog-middle1.jpg"
                        alt="Blog Middle"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="image mb-20 wow fadeInUp delay-0-4s">
                      <img
                        src="assets/images/blog/blog-middle2.jpg"
                        alt="Blog Middle"
                      />
                    </div>
                  </div>
                </div>
                <div className="content mt-30 wow fadeInUp delay-0-2s">
                  <h4>Get Your Service to Improve Business</h4>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora incidunt ut labore et dolore magnam aliquam
                    quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam
                  </p>
                  <div className="tag-share mt-45 py-30 wow fadeInUp delay-0-2s">
                    <div className="item">
                      <b>Tags</b>
                      <div className="tag-coulds">
                        <Link legacyBehavior href="blog">
                          Design
                        </Link>
                        <Link legacyBehavior href="blog">
                          Figma
                        </Link>
                        <Link legacyBehavior href="blog">
                          Apps
                        </Link>
                      </div>
                    </div>
                    <div className="item">
                      <b>Share</b>
                      <div className="social-style-one">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fab fa-linkedin-in" />
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="admin-comment mt-50 wow fadeInUp delay-0-2s">
                  <div className="comment-body">
                    <div className="author-thumb">
                      <img
                        src="assets/images/blog/admin-author.jpg"
                        alt="Author"
                      />
                    </div>
                    <div className="content">
                      <h5>Richard M. Fudge</h5>
                      <p>
                        We denounce with righteous indignation and dislike men
                        beguiled and demoralized by the charms of pleasure of
                        the moment
                      </p>
                      <div className="social-style-two mt-5">
                        <Link legacyBehavior href="/contact">
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link legacyBehavior href="/contact">
                          <i className="fab fa-twitter" />
                        </Link>
                        <Link legacyBehavior href="/contact">
                          <i className="fab fa-linkedin-in" />
                        </Link>
                        <Link legacyBehavior href="/contact">
                          <i className="fab fa-instagram" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <div className="next-prev-post pt-50 pb-20 wow fadeInUp delay-0-2s">
                    <div className="post-item">
                      <div className="image">
                        <img
                          src="assets/images/blog/post-prev.jpg"
                          alt="Post"
                        />
                      </div>
                      <div className="post-content">
                        <span className="date">
                          <i className="far fa-calendar-alt" />
                          <a href="#">Sep 25, 2023</a>
                        </span>
                        <h6>
                          <Link legacyBehavior href="blog-details">
                            Tips For Conducting Studie
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="post-item">
                      <div className="image">
                        <img
                          src="assets/images/blog/post-next.jpg"
                          alt="Post"
                        />
                      </div>
                      <div className="post-content">
                        <span className="date">
                          <i className="far fa-calendar-alt" />
                          <a href="#">Sep 25, 2023</a>
                        </span>
                        <h6>
                          <Link legacyBehavior href="blog-details">
                            Usability With Participants
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content mt-65">
                  <h3 className="comment-title">Comments</h3>
                  <div className="comment-body wow fadeInUp delay-0-2s">
                    <div className="author-thumb">
                      <img
                        src="assets/images/blog/comment-author1.jpg"
                        alt="Author"
                      />
                    </div>
                    <div className="content">
                      <ul className="blog-meta">
                        <li>
                          <h6>William L. Jackson</h6>
                        </li>
                        <li>
                          <a href="#">May 25, 2023</a>
                        </li>
                      </ul>
                      <p>
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse molestiae consequatur qui dolorem
                        eum fugiat voluptas
                      </p>
                      <a className="read-more" href="#">
                        Reply <i className="far fa-angle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="comment-body comment-child wow fadeInUp delay-0-2s">
                    <div className="author-thumb">
                      <img
                        src="assets/images/blog/comment-author2.jpg"
                        alt="Author"
                      />
                    </div>
                    <div className="content">
                      <ul className="blog-meta">
                        <li>
                          <h6>James M. Stovall</h6>
                        </li>
                        <li>
                          <a href="#">May 25, 2023</a>
                        </li>
                      </ul>
                      <p>
                        At vero eoset accusamus dignissimos ducimus blanditiis
                        sapiente praesentium voluptatum deleniti atque
                      </p>
                      <a className="read-more" href="#">
                        Reply <i className="far fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <form
                    id="comment-form"
                    className="comment-form form-style-one pt-65 pb-55 mt-55 wow fadeInUp delay-0-2s"
                    name="comment-form"
                    action="#"
                    method="post"
                  >
                    <h5>Leave a Reply</h5>
                    <div className="row mt-30">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="full-name"
                            name="full-name"
                            className="form-control"
                            defaultValue=""
                            placeholder="Full Name"
                            required=""
                          />
                          <label htmlFor="full-name" className="for-icon">
                            <i className="far fa-user" />
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            id="email-address"
                            name="email-address"
                            className="form-control"
                            defaultValue=""
                            placeholder="Email Address"
                            required=""
                          />
                          <label htmlFor="email-address" className="for-icon">
                            <i className="far fa-envelope" />
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            rows={4}
                            placeholder="write message"
                            required=""
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-0">
                          <button type="submit" className="theme-btn">
                            Leave A Reply <i className="far fa-angle-right" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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
