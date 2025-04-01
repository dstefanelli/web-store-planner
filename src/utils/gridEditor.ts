import { Template } from '@/domain/template';
import { Row } from '@/domain/grid';

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

/**
 * Creates a new empty row object for the grid layout.
 *
 * This row includes a unique `id`, an empty list of products,
 * and no selected template. It is typically used to allow the user
 * to add more products to the grid dynamically.
 *
 * @returns A new Row object with no products and no selected template.
 */
export function createEmptyRow(): Row {
  return {
    id: `row-${crypto.randomUUID()}`,
    products: [],
    selectedTemplateId: '',
  };
}

/**
 * Generates a random default name for a grid.
 *
 * The name follows the format "Grid XXXXX", where the number is a
 * randomly generated 5-digit integer. Useful for assigning default names
 * when the user does not provide a custom name.
 *
 * @returns A string in the format "Grid-12345".
 */
export function generateGridName(): string {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return `Grid-${randomNumber}`;
}
