import React from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    image: '/assets/images/blog/blog1.jpg',
    category: 'Development',
    date: 'March 15, 2024',
    title: 'The Future of Web Development',
    excerpt: 'Exploring upcoming trends and technologies in web development.'
  },
  {
    image: '/assets/images/blog/blog2.jpg',
    category: 'Design',
    date: 'March 12, 2024',
    title: 'UI/UX Best Practices',
    excerpt: 'Essential design principles for better user experience.'
  },
  {
    image: '/assets/images/blog/blog3.jpg',
    category: 'Technology',
    date: 'March 10, 2024',
    title: 'Mobile App Development Trends',
    excerpt: 'Latest trends in mobile application development.'
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="blog-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">Latest News & Blog</span>
              <h2>Latest Insights & Articles</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {blogPosts.map((post, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="blog-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="content">
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-folder-open"></i>
                      <Link href="/blog">{post.category}</Link>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <Link href="/blog">{post.date}</Link>
                    </li>
                  </ul>
                  <h4>
                    <Link href="/blog-details">{post.title}</Link>
                  </h4>
                  <p>{post.excerpt}</p>
                  <Link href="/blog-details" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;