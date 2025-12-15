import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_np: '',
    subtitle_en: '',
    subtitle_np: '',
    tag_en: '',
    tag_np: '',
    description_en: '',
    description_np: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
  });

  const API_URL = 'http://localhost:5000/api/home'; // Adjust port as needed

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_np: '',
      subtitle_en: '',
      subtitle_np: '',
      tag_en: '',
      tag_np: '',
      description_en: '',
      description_np: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        await axios.put(`${API_URL}/${editingItem.id}`, formData);
        alert('Item updated successfully');
      } else {
        await axios.post(API_URL, formData);
        alert('Item created successfully');
      }
      fetchItems();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title_en: item.title_en,
      title_np: item.title_np,
      subtitle_en: item.subtitle_en || '',
      subtitle_np: item.subtitle_np || '',
      tag_en: item.tag_en || '',
      tag_np: item.tag_np || '',
      description_en: item.description_en,
      description_np: item.description_np,
      date: item.date,
      image: item.image || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Item deleted successfully');
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Home Content Management</h1>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
            >
              + Add New Item
            </button>
          </div>
        </div>

        {loading && !showModal && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        <div className="grid gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {item.tag_en && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {item.tag_en}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">{item.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title_en}</h2>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">{item.title_np}</h3>
                  
                  {item.subtitle_en && (
                    <p className="text-gray-600 mb-1">{item.subtitle_en}</p>
                  )}
                  {item.subtitle_np && (
                    <p className="text-gray-600 mb-3">{item.subtitle_np}</p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">English Description:</p>
                      <p className="text-gray-600 text-sm line-clamp-3">{item.description_en}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Nepali Description:</p>
                      <p className="text-gray-600 text-sm line-clamp-3">{item.description_np}</p>
                    </div>
                  </div>
                  
                  {item.image && (
                    <div className="mt-3">
                      <img src={item.image} alt={item.title_en} className="h-32 w-auto rounded border" />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No items found. Create your first home item!</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'Edit Home Item' : 'Create New Home Item'}
                </h2>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    शीर्षक (नेपाली) *
                  </label>
                  <input
                    type="text"
                    name="title_np"
                    value={formData.title_np}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle (English)
                  </label>
                  <input
                    type="text"
                    name="subtitle_en"
                    value={formData.subtitle_en}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    उपशीर्षक (नेपाली)
                  </label>
                  <input
                    type="text"
                    name="subtitle_np"
                    value={formData.subtitle_np}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tag (English)
                  </label>
                  <input
                    type="text"
                    name="tag_en"
                    value={formData.tag_en}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ट्याग (नेपाली)
                  </label>
                  <input
                    type="text"
                    name="tag_np"
                    value={formData.tag_np}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/uploads/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (English) *
                  </label>
                  <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    विवरण (नेपाली) *
                  </label>
                  <textarea
                    name="description_np"
                    value={formData.description_np}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManagement;