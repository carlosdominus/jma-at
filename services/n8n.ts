/**
 * Utility functions for mapping n8n and spreadsheet (NocoDB) purchases to application products.
 */

/**
 * Extracts product IDs from the response data of our n8n webhook.
 * Maps spreadsheet product names/titles (under the 'compras' column) to internal, normalized product IDs.
 * 
 * Example: "nossa senhora - proteção de saúde" -> "nossa-senhora-saude"
 */
export const extractProductsFromResponse = (data: any): string[] => {
  const rawList: any[] = [];
  if (!data) return [];

  const addFromComprasField = (comprasVal: any) => {
    if (typeof comprasVal === 'string') {
      // Split by comma, semicolon, or newline
      const split = comprasVal.split(/[,\n;]/).map(s => s.trim()).filter(Boolean);
      rawList.push(...split);
    } else if (Array.isArray(comprasVal)) {
      rawList.push(...comprasVal);
    }
  };

  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item && item.compras) {
        addFromComprasField(item.compras);
      } else if (typeof item === 'string') {
        rawList.push(item);
      }
    });
  } else if (typeof data === 'object') {
    if (data.compras) {
      addFromComprasField(data.compras);
    }
    
    if (Array.isArray(data.unlocked_products)) {
      rawList.push(...data.unlocked_products);
    }
    if (Array.isArray(data.approved_products)) {
      rawList.push(...data.approved_products);
    }
    if (data.unlocked === true && data.product_id) {
      rawList.push(data.product_id);
    }

    // Checking nested data, rows or list which spreadsheets/databases might return
    const nestedRows = data.rows || data.data || data.list || data.records;
    if (Array.isArray(nestedRows)) {
      nestedRows.forEach((row: any) => {
        if (row && row.compras) {
          addFromComprasField(row.compras);
        }
      });
    }
  }

  const mappedIds = new Set<string>();

  rawList.forEach(item => {
    if (!item || typeof item !== 'string') return;
    const itemLower = item.trim().toLowerCase();

    // Mapping configurations supporting flexible user inputs in the spreadsheet:
    if (itemLower.includes('cura-divina') || itemLower.includes('cura divina') || itemLower.includes('rafael')) {
      mappedIds.add('cura-divina');
    }
    if (itemLower.includes('amor-verdadeiro') || itemLower.includes('amor verdadeiro')) {
      mappedIds.add('amor-verdadeiro');
    }
    if (itemLower.includes('financeiro-biblico') || itemLower.includes('financeiro biblico') || itemLower.includes('financeiro bíblico')) {
      mappedIds.add('financeiro-biblico');
    }
    if (itemLower.includes('sao-francisco') || itemLower.includes('são francisco') || itemLower.includes('sao francisco') || itemLower.includes('assis')) {
      mappedIds.add('sao-francisco');
    }
    if (itemLower.includes('reconciliacao') || itemLower.includes('reconciliação')) {
      mappedIds.add('reconciliacao');
    }
    if (itemLower.includes('nossa senhora') || itemLower.includes('nossa-senhora') || itemLower.includes('saude') || itemLower.includes('saúde') || itemLower.includes('proteção de saúde')) {
      mappedIds.add('nossa-senhora-saude');
    }
    if (itemLower.includes('santa rita') || itemLower.includes('santa-rita')) {
      mappedIds.add('santa-rita');
    }
    if (itemLower.includes('santo expedito') || itemLower.includes('santo-expedito')) {
      mappedIds.add('santo-expedito');
    }
    if (itemLower.includes('sao jorge') || itemLower.includes('são jorge') || itemLower.includes('sao-jorge') || itemLower.includes('guerreiro')) {
      mappedIds.add('sao-jorge');
    }
    if (itemLower.includes('silvio') || itemLower.includes('silvio-santos') || itemLower.includes('silvio santos')) {
      mappedIds.add('silvio-santos');
    }
    if (itemLower.includes('filhos') || itemLower.includes('proteção dos filhos') || itemLower.includes('protecao-filhos')) {
      mappedIds.add('protecao-filhos');
    }

    // Direct match fallback
    const directSlugs = [
      'cura-divina', 'amor-verdadeiro', 'financeiro-biblico', 'sao-francisco', 
      'reconciliacao', 'nossa-senhora-saude', 'santa-rita', 'santo-expedito', 
      'sao-jorge', 'silvio-santos', 'protecao-filhos'
    ];
    if (directSlugs.includes(itemLower)) {
      mappedIds.add(itemLower);
    }
  });

  return Array.from(mappedIds);
};
