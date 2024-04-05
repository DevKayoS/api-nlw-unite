// src/utils/generate-slug.ts
function generateSlug(text) {
  const withoutAccents = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const slug = withoutAccents.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return slug;
}

export {
  generateSlug
};
