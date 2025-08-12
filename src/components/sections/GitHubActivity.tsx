import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Clock, ExternalLink } from 'lucide-react';
import { ThemeStyles } from '../../types';

interface GitHubActivityProps {
  themeStyles: ThemeStyles;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: any;
}

export const GitHubActivity: React.FC<GitHubActivityProps> = ({ themeStyles }) => {
  const [activities, setActivities] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch('https://api.github.com/users/vTg2208/events/public');
        const data = await response.json();
        setActivities(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        // Fallback to mock data if API fails
        setActivities([
          {
            id: '1',
            type: 'PushEvent',
            repo: { name: 'vTg2208/portfolio-VV', url: 'https://github.com/vTg2208/portfolio-VV' },
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            payload: { commits: [{ message: 'Update portfolio design' }] }
          },
          {
            id: '2',
            type: 'CreateEvent',
            repo: { name: 'vTg2208/AmritaAttend', url: 'https://github.com/vTg2208/AmritaAttend' },
            created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            payload: { ref_type: 'repository' }
          },
          {
            id: '3',
            type: 'WatchEvent',
            repo: { name: 'facebook/react', url: 'https://github.com/facebook/react' },
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            payload: { action: 'started' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent': return <Github size={16} className="text-green-500" />;
      case 'CreateEvent': return <Star size={16} className="text-yellow-500" />;
      case 'WatchEvent': return <Star size={16} className="text-blue-500" />;
      case 'ForkEvent': return <GitFork size={16} className="text-purple-500" />;
      default: return <Github size={16} className="text-gray-500" />;
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload?.commits?.length || 1;
        return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to`;
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type || 'repository'}`;
      case 'WatchEvent':
        return 'Starred repository';
      case 'ForkEvent':
        return 'Forked repository';
      default:
        return 'Activity on';
    }
  };

  if (loading) {
    return (
      <section className={`py-20 ${themeStyles.sectionBackground} pt-40 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Recent GitHub Activity</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`${themeStyles.cardBackground} p-4 rounded-lg animate-pulse`}>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${themeStyles.sectionBackground} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center">
          <Github className="mr-3" size={32} />
          Recent GitHub Activity
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`
                ${themeStyles.cardBackground} p-4 rounded-lg border ${themeStyles.cardBorder}
                hover:shadow-lg transition-all duration-300 group cursor-pointer
              `}
              onClick={() => window.open(activity.repo.url, '_blank')}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getEventIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className={themeStyles.secondaryText}>
                      {getEventDescription(activity)}
                    </span>
                    <span className="font-medium text-blue-500 group-hover:text-blue-400 transition-colors">
                      {activity.repo.name.split('/')[1]}
                    </span>
                  </p>
                  
                  {activity.type === 'PushEvent' && activity.payload?.commits?.[0] && (
                    <p className={`text-xs ${themeStyles.secondaryText} mt-1 truncate`}>
                      "{activity.payload.commits[0].message}"
                    </p>
                  )}
                  
                  <div className="flex items-center mt-2 space-x-4">
                    <div className={`flex items-center space-x-1 text-xs ${themeStyles.secondaryText}`}>
                      <Clock size={12} />
                      <span>{formatTime(activity.created_at)}</span>
                    </div>
                    
                    <ExternalLink 
                      size={12} 
                      className={`${themeStyles.secondaryText} group-hover:text-blue-500 transition-colors`} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://github.com/vTg2208"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Github size={20} />
            <span>View Full GitHub Profile</span>
          </a>
        </div>
      </div>
    </section>
  );
};