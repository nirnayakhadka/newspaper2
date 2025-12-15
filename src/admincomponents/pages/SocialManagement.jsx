import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, ImagePlus, Users } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/social'; // Adjust to your backend URL

export default function SocialManagement() {
  const [socialList, setSocialList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  const [formData, setFormData] = useState({
    badge_en: '',
    badge_np: '',
    title_en: '',
    title_np: '',
    subtitle_en: '',
    subtitle_np: '',
    description_en: '',
    description_np: '',
    category_en: '',
    category_np: '',
    tag_en: '',
    tag_np: '',
    publishedAt: new Date().toISOString().split('T')[0],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setSocialList(data);
    } catch (err) {
      setError('Failed to fetch social posts: ' + err.message);
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
    setEditingSocial(null);
    setFormData({
      badge_en: '',
      badge_np: '',
      title_en: '',
      title_np: '',
      subtitle_en: '',
      subtitle_np: '',
      description_en: '',
      description_np: '',
      category_en: '',
      category_np: '',
      tag_en: '',
      tag_np: '',
      publishedAt: new Date().toISOString().split('T')[0],
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
    setError('');
  };

  const openEditModal = (social) => {
    setEditingSocial(social);
    setFormData({
      badge_en: social.badge_en || '',
      badge_np: social.badge_np || '',
      title_en: social.title_en || '',
      title_np: social.title_np || '',
      subtitle_en: social.subtitle_en || '',
      subtitle_np: social.subtitle_np || '',
      description_en: social.description_en || '',
      description_np: social.description_np || '',
      category_en: social.category_en || '',
      category_np: social.category_np || '',
      tag_en: social.tag_en || '',
      tag_np: social.tag_np || '',
      publishedAt: social.publishedAt ? social.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setImageFile(null);
    setImagePreview(social.image ? `http://localhost:5000${social.image}` : null);
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.title_en || !formData.title_np || !formData.description_en || !formData.description_np) {
      setError('Please fill in all required fields (titles and descriptions)');
      return;
    }

    if (!editingSocial && !imageFile) {
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
      } else if (editingSocial && !imageFile) {
        formDataToSend.append('image', editingSocial.image);
      }

      const url = editingSocial ? `${API_BASE_URL}/${editingSocial.id}` : API_BASE_URL;
      const method = editingSocial ? 'PUT' : 'POST';

      const response = await fetch(url, { method, body: formDataToSend });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save social post');
      }

      await fetchSocial();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this social post?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete social post');
      await fetchSocial();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Social Media Management</h1>
            <p className="text-gray-600 mt-1">Manage trending posts, viral content & community stories</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            <Plus size={20} />
            Add Social Post
          </button>
        </div>

        {error && !showModal && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading social posts...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (EN)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {socialList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No social posts found. Click "Add Social Post" to create one.
                    </td>
                  </tr>
                ) : (
                  socialList.map((social) => (
                    <tr key={social.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={`http://localhost:5000${social.image}`}
                          alt={social.title_en}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <Users size={16} className="text-pink-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 max-w-md">
                              {social.title_en}
                            </div>
                            {social.subtitle_en && (
                              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{social.subtitle_en}</div>
                            )}
                          </div>
                        </div>
                        {social.badge_en && (
                          <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded mt-2">
                            {social.badge_en}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{social.category_en || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(social.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(social)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(social.id)}
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
                  {editingSocial ? 'Edit Social Post' : 'Add New Social Post'}
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
                    Post Image *
                  </label>
                  <div className="flex items-start gap-4">
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm" 
                      />
                    )}
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-pink-500 transition">
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
                      Badge (English)
                    </label>
                    <input
                      type="text" name="badge_en" value={formData.badge_en}
                      onChange={handleInputChange}
                      placeholder="e.g., Trending, Viral, Community"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Badge (Nepali)
                    </label>
                    <input
                      type="text" name="badge_np" value={formData.badge_np}
                      onChange={handleInputChange}
                      placeholder="चर्चित, भाइरल, समुदाय"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
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
                      placeholder="Enter title in English"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title (Nepali) *
                    </label>
                    <input
                      type="text" name="title_np" value={formData.title_np}
                      onChange={handleInputChange}
                      placeholder="नेपालीमा शीर्षक"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (English) *
                    </label>
                    <textarea
                      name="description_en" value={formData.description_en}
                      onChange={handleInputChange}
                      rows="6"
                      placeholder="Full post content in English..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Nepali) *
                    </label>
                    <textarea
                      name="description_np" value={formData.description_np}
                      onChange={handleInputChange}
                      rows="6"
                      placeholder="नेपालीमा पूर्ण पोस्ट सामग्री..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category (English)
                    </label>
                    <input
                      type="text" name="category_en" value={formData.category_en}
                      onChange={handleInputChange}
                      placeholder="e.g., Social Issues, Community"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category (Nepali)
                    </label>
                    <input
                      type="text" name="category_np" value={formData.category_np}
                      onChange={handleInputChange}
                      placeholder="सामाजिक मुद्दा, समुदाय"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag (English)
                    </label>
                    <input
                      type="text" name="tag_en" value={formData.tag_en}
                      onChange={handleInputChange}
                      placeholder="Main tag"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag (Nepali)
                    </label>
                    <input
                      type="text" name="tag_np" value={formData.tag_np}
                      onChange={handleInputChange}
                      placeholder="मुख्य ट्याग"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Date *
                  </label>
                  <input
                    type="date" name="publishedAt" value={formData.publishedAt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
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
                    className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:bg-pink-300"
                  >
                    {submitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingSocial ? 'Update Post' : 'Create Post'}
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