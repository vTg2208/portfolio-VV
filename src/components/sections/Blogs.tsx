import React from 'react';
import { ExternalLink, Calendar, Clock, Tag } from 'lucide-react';
import { ThemeStyles } from '../../types';
import { BLOG_INFO } from '../../constants';

interface BlogsProps {
  themeStyles: ThemeStyles;
}

export const Blogs: React.FC<BlogsProps> = ({ themeStyles }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blogs" className={`py-20 ${themeStyles.background} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Blog Articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_INFO.blogs.map((blog, index) => (
            <article 
              key={index}
              className={`
                ${themeStyles.cardBackground} border ${themeStyles.cardBorder}
                rounded-lg p-6 shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-105 group cursor-pointer
              `}
              onClick={() => window.open(blog.url, '_blank')}
            >
              {/* Blog Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <div className={`flex items-center space-x-4 text-sm ${themeStyles.secondaryText} mb-3`}>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Blog Description */}
              <p className={`${themeStyles.secondaryText} mb-4 leading-relaxed line-clamp-3`}>
                {blog.description}
              </p>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`${themeStyles.skillTag.technical} px-2 py-1 rounded-full text-xs flex items-center space-x-1`}
                    >
                      <Tag size={10} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Read More Link */}
              <div className="flex items-center justify-between">
                <span className="text-blue-500 hover:text-blue-400 flex items-center space-x-1 text-sm font-medium">
                  <span>Read on Medium</span>
                  <ExternalLink size={14} />
                </span>
                
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={BLOG_INFO.medium_profile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <span>View All Articles on Medium</span>
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};