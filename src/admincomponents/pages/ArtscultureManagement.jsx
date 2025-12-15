import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, ImagePlus } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/artsandculture'; // Adjust to your backend URL

export default function ArtsCultureManagement() {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tag_en: '',
    tag_np: '',
    title_en: '',
    title_np: '',
    subtitle_en: '',
    subtitle_np: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setItemsList(data);
    } catch (err) {
      setError('Failed to fetch arts & culture items: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      tag_en: '',
      tag_np: '',
      title_en: '',
      title_np: '',
      subtitle_en: '',
      subtitle_np: '',
      date: new Date().toISOString().split('T')[0],
    });
    setPhotoFile(null);
    setPhotoPreview(null);
    setShowModal(true);
    setError('');
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      tag_en: item.tag_en || '',
      tag_np: item.tag_np || '',
      title_en: item.title_en || '',
      title_np: item.title_np || '',
      subtitle_en: item.subtitle_en || '',
      subtitle_np: item.subtitle_np || '',
      date: item.date || new Date().toISOString().split('T')[0],
    });
    setPhotoFile(null);
    setPhotoPreview(item.photo ? `http://localhost:5000/${item.photo}` : null);
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.title_en || !formData.title_np) {
      setError('Please fill in both titles (English and Nepali)');
      return;
    }

    if (!editingItem && !photoFile) {
      setError('Please select a photo');
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

      if (photoFile) {
        formDataToSend.append('photo', photoFile);
      } else if (editingItem && !photoFile) {
        formDataToSend.append('photo', editingItem.photo);
      }

      const url = editingItem ? `${API_BASE_URL}/${editingItem.id}` : API_BASE_URL;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, { method, body: formDataToSend });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save item');
      }

      await fetchItems();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this arts & culture item?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete item');
      await fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Arts & Culture Management</h1>
            <p className="text-gray-600 mt-1">Manage cultural events, festivals, and heritage items</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>

        {error && !showModal && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading items...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (EN)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {itemsList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No arts & culture items found. Click "Add Item" to create one.
                    </td>
                  </tr>
                ) : (
                  itemsList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={`http://localhost:5000/${item.photo}`}
                          alt={item.title_en}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-md">{item.title_en}</div>
                        {item.subtitle_en && (
                          <div className="text-xs text-gray-500 mt-1">{item.subtitle_en}</div>
                        )}
                        {item.tag_en && (
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2">
                            {item.tag_en}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.tag_en || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'Edit Arts & Culture Item' : 'Add New Item'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
                  <div className="flex items-start gap-4">
                    {photoPreview && (
                      <img src={photoPreview} alt="Preview" className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm" />
                    )}
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-purple-500 transition min-h-[160px]">
                      <ImagePlus size={48} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">
                        {photoFile ? photoFile.name : 'Click to upload photo'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        JPG, PNG, GIF, WEBP (max 10MB)
                      </span>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
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
                      placeholder="Enter title in English"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title (Nepali) *
                    </label>
                    <input
                      type="text" name="title_np" value={formData.title_np}
                      onChange={handleInputChange}
                      placeholder="नेपालीमा शीर्षक प्रविष्ट गर्नुहोस्"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      placeholder="Optional subtitle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle (Nepali)
                    </label>
                    <input
                      type="text" name="subtitle_np" value={formData.subtitle_np}
                      onChange={handleInputChange}
                      placeholder="वैकल्पिक उपशीर्षक"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      placeholder="e.g., Festival, Heritage, Music"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag (Nepali)
                    </label>
                    <input
                      type="text" name="tag_np" value={formData.tag_np}
                      onChange={handleInputChange}
                      placeholder="जस्तै: पर्व, सम्पदा, संगीत"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event/Published Date *
                  </label>
                  <input
                    type="date" name="date" value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300"
                  >
                    {submitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingItem ? 'Update Item' : 'Create Item'}
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