'use client';

import PageBanner from './PageBanner';
import BlogSidebar from './BlogSidebar';

export default function BlogDetails() {
  return (
    <>
      <PageBanner title="Blog Details" />
      <section className="blog-details-area py-130 rpy-100">
        <div className="container">
          <div className="row gap-60">
            <div className="col-lg-8">
              <div className="blog-details-wrap">
                <div className="image mb-45 wow fadeInUp delay-0-2s">
                  <img src="/assets/images/blog/blog-details.jpg" alt="Blog Details" />
                </div>
                <div className="blog-meta-two mb-20 wow fadeInUp delay-0-2s">
                  <a className="tag" href="#">Design</a>
                  <a href="#"><i className="far fa-calendar-alt"></i> 25 March 2023</a>
                  <a href="#"><i className="far fa-comments"></i> Comments (05)</a>
                </div>
                <h3 className="title mb-20 wow fadeInUp delay-0-2s">
                  How To Create JavaScript Vanilla Gantt Chart: Adding Task
                </h3>
                <p className="wow fadeInUp delay-0-2s">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                {/* Add more content as needed */}
              </div>
            </div>
            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}