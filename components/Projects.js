import React, { useState } from 'react';
import Link from 'next/link';

const projects = [
  {
    category: 'Web Design',
    title: 'Creative Portfolio Design',
    image: '/assets/images/projects/project1.jpg',
    link: '/project-details'
  },
  {
    category: 'Development',
    title: 'E-commerce Platform',
    image: '/assets/images/projects/project2.jpg',
    link: '/project-details'
  },
  {
    category: 'Mobile App',
    title: 'Fitness Tracking App',
    image: '/assets/images/projects/project3.jpg',
    link: '/project-details'
  },
  {
    category: 'UI/UX Design',
    title: 'Dashboard Interface',
    image: '/assets/images/projects/project4.jpg',
    link: '/project-details'
  }
];

export const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === filter);

  return (
    <section id="projects" className="projects-area-two pt-130 rpt-100 pb-100 rpb-70 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">Latest Projects</span>
              <h2>My Recent Works</h2>
            </div>
          </div>
        </div>
        <div className="project-filter mb-45">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={filter === 'web design' ? 'active' : ''} 
            onClick={() => setFilter('web design')}
          >
            Web Design
          </button>
          <button 
            className={filter === 'development' ? 'active' : ''} 
            onClick={() => setFilter('development')}
          >
            Development
          </button>
          <button 
            className={filter === 'mobile app' ? 'active' : ''} 
            onClick={() => setFilter('mobile app')}
          >
            Mobile App
          </button>
        </div>
        <div className="row">
          {filteredProjects.map((project, index) => (
            <div key={index} className="col-lg-3 col-sm-6">
              <div className="project-item style-two wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src={project.image} alt={project.title} />
                  <Link href={project.link} className="project-btn">
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                <div className="content">
                  <span className="category">{project.category}</span>
                  <h4>
                    <Link href={project.link}>{project.title}</Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;