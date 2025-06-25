import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { feedbackService, authService } from '../services/api';
import { Feedback } from '../types';
import { MessageSquare, Calendar, CheckCircle, Clock, Edit } from 'lucide-react';
import { toast } from 'react-toastify';

const FeedbackList: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await feedbackService.getFeedback();
        setFeedback(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      } catch (error) {
        toast.error('Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleAcknowledge = async (feedbackId: number) => {
    try {
      await feedbackService.acknowledgeFeedback(feedbackId);
      setFeedback(prev => 
        prev.map(f => f.id === feedbackId ? { ...f, acknowledged: true, acknowledged_at: new Date().toISOString() } : f)
      );
      toast.success('Feedback acknowledged successfully');
    } catch (error) {
      toast.error('Failed to acknowledge feedback');
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentUser?.role === 'manager' ? 'Feedback Given' : 'My Feedback'}
          </h1>
          <p className="mt-2 text-gray-600">
            {currentUser?.role === 'manager' 
              ? 'Feedback you have provided to your team members'
              : 'Feedback you have received from your manager'
            }
          </p>
        </div>
        {currentUser?.role === 'manager' && (
          <Link
            to="/feedback/new"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Give Feedback</span>
          </Link>
        )}
      </div>

      {feedback.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            {currentUser?.role === 'manager' 
              ? 'Start by giving feedback to your team members.'
              : 'You haven\'t received any feedback yet.'
            }
          </p>
          {currentUser?.role === 'manager' && (
            <div className="mt-6">
              <Link
                to="/feedback/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Give First Feedback
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {feedback.map((item) => (
            <div key={item.id} className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {currentUser?.role === 'manager' 
                          ? `Feedback for ${item.employee.name}`
                          : `Feedback from ${item.manager.name}`
                        }
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Given on {formatDate(item.created_at)}
                        </span>
                        {item.updated_at !== item.created_at && (
                          <span className="text-sm text-gray-500">
                            (Updated on {formatDate(item.updated_at)})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentColor(item.sentiment)}`}>
                      {item.sentiment}
                    </span>
                    {currentUser?.role === 'manager' && (
                      <Link
                        to={`/feedback/edit/${item.id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    )}
                    {item.acknowledged ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm">Acknowledged</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-orange-600">
                        <Clock className="h-5 w-5 mr-1" />
                        <span className="text-sm">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                    <p className="text-gray-700 bg-green-50 p-3 rounded-md">{item.strengths}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Areas to Improve</h4>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-md">{item.areas_to_improve}</p>
                  </div>
                </div>
                
                {currentUser?.role === 'employee' && !item.acknowledged && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleAcknowledge(item.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Acknowledge Feedback</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
