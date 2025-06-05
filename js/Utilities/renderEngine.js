class RenderEngine {
  render(template, data){
    if (!data || typeof data !== 'object') {
      return template;
    }

    const placeholderRegex = /{{([\w.]+)}}/g;

    let result = template.replace(placeholderRegex, (match, key) => {
      const keys = key.split('.');
      let value = data;
      for (const k of keys) {
        value = value && typeof value === 'object' ? value[k] : undefined;
        if (value === undefined) return `{{${k}}}`;
      }
      return value !== null && value !== undefined ? value : `{{${k}}}`;
    });
// Handle basic array iteration with {{#each reviews}}...{{/each}}
    const eachRegex = /{{#each\s+([\w]+)}}\s*([\s\S]*?)\s*{{\/each}}/g;
    result = result.replace(eachRegex, (match, arrayKey, innerTemplate) => {
      const items = Array.isArray(data[arrayKey]) ? data[arrayKey] : [];
      return items.map(item => this.render(innerTemplate, item)).join('');
    });

    return result;
  }
}
export const renderEngine = new RenderEngine();
