// src/admincomponents/pages/MainManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Calendar, Tag } from 'lucide-react';

// Backend base URLs
const API_BASE = 'http://localhost:5000/api/main';
const BACKEND_URL = 'http://localhost:5000/main';  // For serving static files like images

export default function MainManagement() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title_en: '', title_np: '', subtitle_en: '', subtitle_np: '',
    tag_en: '', tag_np: '', description_en: '', description_np: '',
    date: new Date().toISOString().split('T')[0],
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get(API_BASE);
      let data = res.data;

      if (!Array.isArray(data)) {
        console.warn('API did not return an array, received:', data);
        data = [];
      }
      setArticles(data);
    } catch (err) {
      setMessage('Failed to load articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      title_en: '', title_np: '', subtitle_en: '', subtitle_np: '',
      tag_en: '', tag_np: '', description_en: '', description_np: '',
      date: new Date().toISOString().split('T')[0],
      image: null,
    });
    setImagePreview(null);
    setSelectedArticle(null);
    setFormMode('create');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title_en || !formData.title_np || !formData.description_en || !formData.description_np) {
      setMessage('English & Nepali title and description are required');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    });

    try {
      if (formMode === 'create') {
        await axios.post(`${API_BASE}/main/insertall`, data);
        setMessage('Article created successfully!');
      } else {
        await axios.put(`${API_BASE}/${selectedArticle.id}`, data);
        setMessage('Article updated successfully!');
      }
      fetchArticles();
      setShowForm(false);
      resetForm();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title_en: article.title_en || '',
      title_np: article.title_np || '',
      subtitle_en: article.subtitle_en || '',
      subtitle_np: article.subtitle_np || '',
      tag_en: article.tag_en || '',
      tag_np: article.tag_np || '',
      description_en: article.description_en || '',
      description_np: article.description_np || '',
      date: article.date ? article.date.split('T')[0] : '',
      image: null,
    });
    // Fixed: Use full backend URL for existing image preview
    setImagePreview(article.image ? `${BACKEND_URL}${article.image}` : null);
    setFormMode('edit');
    setShowForm(true);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setMessage('Article deleted successfully');
      fetchArticles();
    } catch (err) {
      setMessage('Failed to delete article');
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
            message.includes('success') || message.includes('created') || message.includes('updated') || message.includes('deleted')
              ? 'bg-green-900 text-green-300 border border-green-700'
              : 'bg-red-900 text-red-300 border border-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Main Articles Management</h1>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
          >
            <Plus className="w-5 h-5" /> Add New Article
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full p-8 my-8">
              <h2 className="text-3xl font-bold mb-6">{formMode === 'create' ? 'Create New' : 'Edit'} Article</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">English</h3>
                    <input type="text" placeholder="Title (English)" required value={formData.title_en} onChange={(e) => setFormData({...formData, title_en: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
                    <input type="text" placeholder="Subtitle (English)" value={formData.subtitle_en} onChange={(e) => setFormData({...formData, subtitle_en: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
                    <input type="text" placeholder="Tag (English)" value={formData.tag_en} onChange={(e) => setFormData({...formData, tag_en: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
                    <textarea placeholder="Description (English)" required rows="6" value={formData.description_en} onChange={(e) => setFormData({...formData, description_en: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-400">Nepali (नेपाली)</h3>
                    <input type="text" placeholder="शीर्षक (Nepali)" required value={formData.title_np} onChange={(e) => setFormData({...formData, title_np: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3" />
                    <input type="text" placeholder="उपशीर्षक (Nepali)" value={formData.subtitle_np} onChange={(e) => setFormData({...formData, subtitle_np: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3" />
                    <input type="text" placeholder="ट्याग (Nepali)" value={formData.tag_np} onChange={(e) => setFormData({...formData, tag_np: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3" />
                    <textarea placeholder="विवरण (Nepali)" required rows="6" value={formData.description_np} onChange={(e) => setFormData({...formData, description_np: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image / Video</label>
                    <input type="file" accept="image/*,video/*" onChange={handleImageChange} className="w-full px-4 py-3 bg-gray-800 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white" />
                  </div>
                </div>

                {/* Image Preview in Form */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                    <img 
                      src={imagePreview.startsWith('blob:') || imagePreview.startsWith('http') ? imagePreview : `${BACKEND_URL}${imagePreview}`} 
                      alt="Preview" 
                      className="max-h-64 rounded-lg object-cover border border-gray-700" 
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-6">
                  <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                    {formMode === 'create' ? 'Create' : 'Update'} Article
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-2xl">No articles found</p>
            <p>Create your first main article!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                {article.image && (
                  <div className="h-48 bg-gray-700 overflow-hidden">
                    <img 
                      src={`${BACKEND_URL}${article.image}`} 
                      alt={article.title_en || 'Article'} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.error('Failed to load image:', `${BACKEND_URL}${article.image}`);
                      }} 
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title_en || 'No Title'}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.title_np || 'को शीर्षक छैन'}</p>
                  {article.tag_en && (
                    <div className="flex items-center gap-2 text-xs text-blue-400 mb-3">
                      <Tag className="w-4 h-4" /> {article.tag_en}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date ? new Date(article.date).toLocaleDateString() : 'No Date'}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(article)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}