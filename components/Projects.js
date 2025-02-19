"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title">
          <h2>My Projects</h2>
        </div>
        <div className="projects-filter">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>
        <div className="projects-grid">
          {/* Project items */}
        </div>
      </div>
    </section>
  );
};

export default Projects;