import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, ImagePlus, MessageSquare } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/interviews'; // Adjust to your backend URL

export default function InterviewManagement() {
  const [interviewsList, setInterviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [formData, setFormData] = useState({
    tag_en: '',
    tag_np: '',
    title_en: '',
    title_np: '',
    subtitle_en: '',
    subtitle_np: '',
    description_en: '',
    description_np: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setInterviewsList(data);
    } catch (err) {
      setError('Failed to fetch interviews: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setEditingInterview(null);
    setFormData({
      tag_en: '',
      tag_np: '',
      title_en: '',
      title_np: '',
      subtitle_en: '',
      subtitle_np: '',
      description_en: '',
      description_np: '',
      date: new Date().toISOString().split('T')[0],
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
    setError('');
  };

  const openEditModal = (interview) => {
    setEditingInterview(interview);
    setFormData({
      tag_en: interview.tag_en || '',
      tag_np: interview.tag_np || '',
      title_en: interview.title_en || '',
      title_np: interview.title_np || '',
      subtitle_en: interview.subtitle_en || '',
      subtitle_np: interview.subtitle_np || '',
      description_en: interview.description_en || '',
      description_np: interview.description_np || '',
      date: interview.date || new Date().toISOString().split('T')[0],
    });
    setImageFile(null);
    setImagePreview(interview.image ? `http://localhost:5000/${interview.image}` : null);
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.title_en || !formData.title_np || !formData.description_en || !formData.description_np) {
      setError('Please fill in all required fields (titles and descriptions)');
      return;
    }

    if (!editingInterview && !imageFile) {
      setError('Please select an image');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (editingInterview && !imageFile) {
        formDataToSend.append('image', editingInterview.image);
      }

      const url = editingInterview ? `${API_BASE_URL}/${editingInterview.id}` : API_BASE_URL;
      const method = editingInterview ? 'PUT' : 'POST';

      const response = await fetch(url, { method, body: formDataToSend });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save interview');
      }

      await fetchInterviews();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this interview?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete interview');
      await fetchInterviews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Interview Management</h1>
            <p className="text-gray-600 mt-1">Manage interviews with public figures and experts</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={20} />
            Add Interview
          </button>
        </div>

        {error && !showModal && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading interviews...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (EN)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviewsList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No interviews found. Click "Add Interview" to create one.
                    </td>
                  </tr>
                ) : (
                  interviewsList.map((interview) => (
                    <tr key={interview.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={`http://localhost:5000/${interview.image}`}
                          alt={interview.title_en}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/64'}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <MessageSquare size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 max-w-md">
                              {interview.title_en}
                            </div>
                            {interview.subtitle_en && (
                              <div className="text-xs text-gray-500 mt-1">{interview.subtitle_en}</div>
                            )}
                          </div>
                        </div>
                        {interview.tag_en && (
                          <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded mt-2">
                            {interview.tag_en}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{interview.tag_en || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(interview.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(interview)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(interview.id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingInterview ? 'Edit Interview' : 'Add New Interview'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Image *
                  </label>
                  <div className="flex items-start gap-4">
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm" 
                      />
                    )}
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-teal-500 transition">
                      <ImagePlus size={40} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">
                        {imageFile ? imageFile.name : 'Click to upload image'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        JPG, PNG, GIF, WEBP (max 10MB)
                      </span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title (English) *
                    </label>
                    <input
                      type="text" name="title_en" value={formData.title_en}
                      onChange={handleInputChange}
                      placeholder="Interview with..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title (Nepali) *
                    </label>
                    <input
                      type="text" name="title_np" value={formData.title_np}
                      onChange={handleInputChange}
                      placeholder="अन्तर्वार्ता..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle (English)
                    </label>
                    <input
                      type="text" name="subtitle_en" value={formData.subtitle_en}
                      onChange={handleInputChange}
                      placeholder="Brief description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle (Nepali)
                    </label>
                    <input
                      type="text" name="subtitle_np" value={formData.subtitle_np}
                      onChange={handleInputChange}
                      placeholder="संक्षिप्त विवरण"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag (English)
                    </label>
                    <input
                      type="text" name="tag_en" value={formData.tag_en}
                      onChange={handleInputChange}
                      placeholder="Politics, Entertainment, Sports..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag (Nepali)
                    </label>
                    <input
                      type="text" name="tag_np" value={formData.tag_np}
                      onChange={handleInputChange}
                      placeholder="राजनीति, मनोरञ्जन, खेलकुद..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Date *
                  </label>
                  <input
                    type="date" name="date" value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Content (English) *
                    </label>
                    <textarea
                      name="description_en" value={formData.description_en}
                      onChange={handleInputChange}
                      rows="8"
                      placeholder="Full interview content in English..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Content (Nepali) *
                    </label>
                    <textarea
                      name="description_np" value={formData.description_np}
                      onChange={handleInputChange}
                      rows="8"
                      placeholder="नेपालीमा पूर्ण अन्तर्वार्ता सामग्री..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:bg-teal-300"
                  >
                    {submitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingInterview ? 'Update Interview' : 'Create Interview'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}