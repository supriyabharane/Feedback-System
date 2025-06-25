import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { feedbackService, userService } from '../services/api';
import { User } from '../types';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'react-toastify';

interface FeedbackFormData {
  employee_id: number;
  strengths: string;
  areas_to_improve: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

const GiveFeedback: React.FC = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTeam, setFetchingTeam] = useState(true);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FeedbackFormData>();

  const selectedEmployeeId = watch('employee_id');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const team = await userService.getMyTeam();
        setTeamMembers(team);
      } catch (error) {
        toast.error('Failed to fetch team members');
      } finally {
        setFetchingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const onSubmit = async (data: FeedbackFormData) => {
    setLoading(true);
    try {
      await feedbackService.createFeedback({
        employee_id: Number(data.employee_id),
        strengths: data.strengths,
        areas_to_improve: data.areas_to_improve,
        sentiment: data.sentiment
      });
      toast.success('Feedback submitted successfully!');
      navigate('/feedback');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentDescription = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'Overall positive performance and attitude';
      case 'neutral':
        return 'Balanced performance with room for growth';
      case 'negative':
        return 'Areas needing immediate attention and improvement';
      default:
        return '';
    }
  };

  if (fetchingTeam) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Give Feedback</h1>
        <p className="mt-2 text-gray-600">
          Provide structured feedback to help your team members grow and improve
        </p>
      </div>

      {teamMembers.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No team members found</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have any team members assigned to you yet.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Employee Selection */}
            <div>
              <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-2">
                Select Team Member
              </label>
              <select
                {...register('employee_id', { required: 'Please select a team member' })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Choose a team member...</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
              {errors.employee_id && (
                <p className="mt-1 text-sm text-red-600">{errors.employee_id.message}</p>
              )}
            </div>

            {/* Strengths */}
            <div>
              <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-2">
                Strengths
                <span className="text-gray-500 font-normal ml-1">
                  (What are they doing well?)
                </span>
              </label>
              <textarea
                {...register('strengths', { 
                  required: 'Please provide strengths feedback',
                  minLength: { value: 10, message: 'Please provide more detailed feedback (at least 10 characters)' }
                })}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe their key strengths, accomplishments, and positive behaviors..."
              />
              {errors.strengths && (
                <p className="mt-1 text-sm text-red-600">{errors.strengths.message}</p>
              )}
            </div>

            {/* Areas to Improve */}
            <div>
              <label htmlFor="areas_to_improve" className="block text-sm font-medium text-gray-700 mb-2">
                Areas to Improve
                <span className="text-gray-500 font-normal ml-1">
                  (What could they work on?)
                </span>
              </label>
              <textarea
                {...register('areas_to_improve', { 
                  required: 'Please provide improvement areas',
                  minLength: { value: 10, message: 'Please provide more detailed feedback (at least 10 characters)' }
                })}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Suggest specific areas for growth and development opportunities..."
              />
              {errors.areas_to_improve && (
                <p className="mt-1 text-sm text-red-600">{errors.areas_to_improve.message}</p>
              )}
            </div>

            {/* Sentiment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall Sentiment
              </label>
              <div className="space-y-3">
                {[
                  { value: 'positive', label: 'Positive', color: 'text-green-600', bgColor: 'bg-green-50 border-green-200' },
                  { value: 'neutral', label: 'Neutral', color: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-200' },
                  { value: 'negative', label: 'Needs Attention', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      watch('sentiment') === option.value ? option.bgColor : 'bg-white border-gray-200'
                    }`}
                  >
                    <input
                      {...register('sentiment', { required: 'Please select an overall sentiment' })}
                      type="radio"
                      value={option.value}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className={`font-medium ${option.color}`}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {getSentimentDescription(option.value)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.sentiment && (
                <p className="mt-1 text-sm text-red-600">{errors.sentiment.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/feedback')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GiveFeedback;
