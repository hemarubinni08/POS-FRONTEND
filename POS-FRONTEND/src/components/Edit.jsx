import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../utils/apiFetch';
import { API_BASE_URL } from '../config/api.config';
import Layout from './Layout';

function Edit({ title, apiPath, extraFields = [], extraData: externalExtraData = {}, onLoad }) {
    const navigate = useNavigate();
    const { identifier } = useParams();
    const [formData, setFormData] = useState({});
    const [identifier_, setIdentifier] = useState('');
    const [description, setDescription] = useState('');
    const [extraData, setExtraData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchItem(); }, []);

    const fetchItem = async () => {
        try {
            const response = await apiFetch(`${API_BASE_URL}/api/${apiPath}/get?identifier=${identifier}`, { method: 'GET' });
            if (!response) return;
            const data = await response.json();
            setIdentifier(data.identifier || '');
            setDescription(data.description || '');
            setFormData(data);
            const extra = {};
            extraFields.forEach(field => {
                if (field.key && data[field.key] !== undefined) extra[field.key] = data[field.key];
            });
            setExtraData(extra);
            if (onLoad) onLoad(data);
        } catch (err) {
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleExtraChange = (key, value) => {
        setExtraData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);
        try {
            const response = await apiFetch(`${API_BASE_URL}/api/${apiPath}/update`, {
                method: 'POST',
                body: JSON.stringify({ ...formData, identifier: identifier_, description, ...extraData, ...externalExtraData })
            });
            if (!response) return;
            const data = await response.json();
            if (data.success) {
                setSuccess(`${title} updated successfully`);
                setTimeout(() => navigate(-1), 1500);
            } else {
                setError(data.message || 'Failed to update');
            }
        } catch (err) {
            setError('Unable to connect to server.');
        } finally {
            setSaving(false);
        }
    };

    const inputClass = 'border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition w-full';
    const labelClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block';

    if (loading) return (
        <Layout>
            <div className='flex justify-center items-center h-64'>
                <p className='text-gray-400 text-sm'>Loading {title}...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className='p-6'>
                <div className='mb-6'>
                    <h1 className='text-xl font-bold text-gray-800'>Edit {title}</h1>
                    <p className='text-sm text-gray-500 mt-0.5'>Update the details below</p>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg p-6 max-w-lg'>
                    {error && <div className='bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4 border border-red-200'>{error}</div>}
                    {success && <div className='bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-4 border border-green-200'>{success}</div>}

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div>
                            <label className={labelClass}>Identifier</label>
                            <input type='text' value={identifier_} readOnly className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`} />
                        </div>
                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${inputClass} resize-none`} />
                        </div>

                        {extraFields.map((field) => (
                            <div key={field.key}>
                                {field.type !== 'custom' && <label className={labelClass}>{field.label}</label>}
                                {field.type === 'custom' ? field.component
                                    : field.type === 'select' ? (
                                        <select value={extraData[field.key] || ''} onChange={(e) => handleExtraChange(field.key, e.target.value)} required={field.required || false} className={inputClass}>
                                            <option value=''>Select {field.label}</option>
                                            {field.options?.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    ) : field.type === 'multiselect' ? (
                                        <>
                                            <select multiple value={extraData[field.key] || []} onChange={(e) => { const s = Array.from(e.target.selectedOptions, o => o.value); handleExtraChange(field.key, s); }} className={inputClass}>
                                                {field.options?.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </select>
                                            <p className='text-xs text-gray-400 mt-1'>Hold Ctrl to select multiple</p>
                                        </>
                                    ) : (
                                        <input type={field.type || 'text'} value={extraData[field.key] || ''} placeholder={`Enter ${field.label}`} onChange={(e) => handleExtraChange(field.key, e.target.value)} required={field.required || false} className={inputClass} />
                                    )}
                            </div>
                        ))}

                        <div className='flex gap-3 pt-2'>
                            <button type='button' onClick={() => navigate(-1)} className='flex-1 bg-gray-100 text-gray-700 rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-200 transition'>
                                Cancel
                            </button>
                            <button type='submit' disabled={saving} className='flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50'>
                                {saving ? 'Saving...' : `Update ${title}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Edit;