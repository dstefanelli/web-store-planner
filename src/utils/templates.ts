import { Template } from '@/domain/template';

/**
 * Returns the alignment value associated with a given template ID.
 *
 * This function looks up a template by its `templateId` in the provided list of templates,
 * and returns its alignment (`'left'`, `'center'`, or `'right'`). If the template is not found,
 * it defaults to `'left'`.
 *
 * @param templateId - The ID of the template whose alignment should be retrieved.
 * @param templates - An array of available templates to search through.
 * @returns The alignment string (`'left'`, `'center'`, `'right'`) or `'left'` if not found.
 */
export function getTemplateAlignment(
  templateId: string,
  templates: Template[],
): string {
  const template = templates.find((tmp) => tmp.id === templateId);
  return template?.alignment ?? 'left'; // default: left
}
