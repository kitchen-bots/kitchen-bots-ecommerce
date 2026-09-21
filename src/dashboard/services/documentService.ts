import { mockDocuments } from '../data/mockData';
import type { DocType, Document } from '../data/mockData';

let documents = [...mockDocuments];

export const documentService = {
  getAll: () => [...documents],

  getByType: (type: DocType) => documents.filter(d => d.type === type),

  getByOrder: (orderId: string) => documents.filter(d => d.orderId === orderId),

  upload: (data: Omit<Document, 'id' | 'uploadedAt'>): Document => {
    const newDoc: Document = {
      ...data,
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    documents.push(newDoc);
    return newDoc;
  },

  delete: (id: string): boolean => {
    const prev = documents.length;
    documents = documents.filter(d => d.id !== id);
    return documents.length < prev;
  },

  getTypes: (): DocType[] => [
    'Invoice', 'Warranty', 'Quotation', 'AMC', 'Installation'
  ],
};
