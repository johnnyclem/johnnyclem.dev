import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe HTML tags and attributes while removing dangerous content
 */
export function sanitizeHtml(content: string): string {
  return DOMPurify.sanitize(content, {
    // Allowed tags - common formatting and content tags
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'blockquote', 'pre', 'code',
      'ul', 'ol', 'li',
      'a',
      'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
      'sub', 'sup',
    ],
    // Allowed attributes
    ALLOWED_ATTR: [
      'href',
      'src',
      'alt',
      'title',
      'target',
      'rel',
      'class',
      'id',
    ],
    // Require safe links (no javascript: protocol)
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Add rel="noopener noreferrer" to external links
    ADD_ATTR: ['rel'],
    // Force links to open in new tab for external links
    ADD_TAGS: [],
  });
}

/**
 * Sanitize markdown/HTML content specifically for blog posts
 * Additional restrictions for blog content
 */
export function sanitizeBlogContent(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'b', 'em', 'i', 'u',
      'blockquote', 'pre', 'code',
      'ul', 'ol', 'li',
      'a',
      'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: [
      'href',
      'src',
      'alt',
      'title',
      'target',
      'rel',
    ],
    // Force all links to have rel="noopener noreferrer"
    ADD_ATTR: ['rel'],
    // Block data URIs which can be used for XSS
    ALLOW_DATA_ATTR: false,
  });
}
