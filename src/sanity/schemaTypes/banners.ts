export const bannerSchema = {
  name: 'banner',
  title: 'Banners',
  type: 'document',
  actions: ['create', 'update', 'delete', 'publish'],
  fields: [
    { name: 'title', title: 'Main Title', type: 'string' }, // e.g., "Ceremony, Reimagined"
    { name: 'subtitle', title: 'Subtitle', type: 'string' }, // e.g., "Hand-finished silhouettes"
    { name: 'buttonText', title: 'Button Text', type: 'string' }, // e.g., "View Traditional Wear"
    { name: 'image', title: 'Banner Image', type: 'image' },
    { name: 'bgColor', title: 'Background Color', type: 'string' }, // For that beige/blue look
    { name: 'categoryPath', title: 'Link to Category', type: 'string' } // e.g., "/traditional-wear"
  ]
};