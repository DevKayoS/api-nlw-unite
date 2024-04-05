export function generateSlug(text: string): string {
  // Remove acentos
  const withoutAccents = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Substitui espaços por hífens e remove caracteres especiais
  const slug = withoutAccents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  return slug;
}