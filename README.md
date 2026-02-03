# @rainersoft/utils

> Biblioteca universal de utilitários para formatação, conversão e manipulação de dados.

[![npm version](https://badge.fury.io/js/@rainersoft%2Futils.svg)](https://www.npmjs.com/package/@rainersoft/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Características

- ✅ **Universal**: Funciona em Web, Desktop e Mobile
- ✅ **TypeScript**: Totalmente tipado
- ✅ **Tree-shakeable**: Importações otimizadas
- ✅ **Zero dependências**: Leve e rápido
- ✅ **Multi-idioma**: Suporte para pt-BR, en-US, es-ES
- ✅ **Helpers pt-BR**: Funções pré-configuradas para português
- ✅ **Modular**: Importe apenas o que precisa

## 📦 Instalação

```bash
npm install @rainersoft/utils
# ou
pnpm add @rainersoft/utils
# ou
yarn add @rainersoft/utils
```

## 🚀 Uso

### String Utilities

```typescript
import { textToSlug, capitalize, truncate, getInitials } from '@rainersoft/utils/string';

textToSlug('Meu Post Incrível!'); // 'meu-post-incrivel'
capitalize('rainer teixeira'); // 'Rainer Teixeira'
truncate('Texto muito longo', 10); // 'Texto muit...'
getInitials('Rainer Teixeira'); // 'RT'
```

### Date Utilities

```typescript
import { formatDate, formatDateTime, formatRelativeDate } from '@rainersoft/utils/date';

formatDate('2025-11-26'); // '26 de novembro de 2025'
formatDate('2025-11-26', 'short'); // '26/11/2025'
formatDateTime('2025-11-26T14:30:00'); // '26 de novembro de 2025 às 14:30'
formatRelativeDate(yesterday); // 'há 1 dia'
```

### Number Utilities

```typescript
import { formatCurrency, formatPercent, formatNumber, formatCompact } from '@rainersoft/utils/number';

formatCurrency(1234.56); // 'R$ 1.234,56'
formatPercent(0.1234, 2); // '12,34%'
formatNumber(1234567); // '1.234.567'
formatCompact(1234567); // '1,2 mi'
```

### Status Utilities

```typescript
import { translateStatus, getStatusColor, getStatusVariant } from '@rainersoft/utils/status';

translateStatus('DRAFT'); // 'Rascunho'
translateStatus('PUBLISHED'); // 'Publicado'
getStatusColor('PUBLISHED'); // 'text-green-600'
getStatusVariant('DRAFT'); // 'secondary'
```

### Import Tudo

```typescript
import {
  textToSlug,
  formatDate,
  formatCurrency,
  translateStatus
} from '@rainersoft/utils';
```

### Helpers pt-BR (Recomendado para Português)

```typescript
// Importação simplificada - já vem em pt-BR
import { ptBR } from '@rainersoft/utils';

ptBR.formatDate('2025-11-26'); // '26 de novembro de 2025'
ptBR.formatCurrency(1234.56); // 'R$ 1.234,56'
ptBR.translateStatus('DRAFT'); // 'Rascunho'

// Ou importe funções individuais
import { formatDate, formatCurrency } from '@rainersoft/utils/pt-br';
```

### Suporte Multi-idioma

```typescript
import { formatDate, formatCurrency, translateStatus } from '@rainersoft/utils';

// Português (padrão)
formatDate('2025-11-26'); // '26 de novembro de 2025'
formatCurrency(1234.56); // 'R$ 1.234,56'

// Inglês
formatDate('2025-11-26', 'long', 'en-US'); // 'November 26, 2025'
formatCurrency(1234.56, 'en-US'); // '$1,234.56'

// Espanhol
formatDate('2025-11-26', 'long', 'es-ES'); // '26 de noviembre de 2025'
formatCurrency(1234.56, 'es-ES'); // '1.234,56 €'
```

## 📚 Módulos

### String (`@rainersoft/utils/string`)
- `textToSlug()` - Converte texto para slug
- `capitalize()` - Capitaliza palavras
- `truncate()` - Trunca texto
- `removeAccents()` - Remove acentos
- `getInitials()` - Extrai iniciais
- `isEmpty()` - Valida string vazia
- `wordCount()` - Conta palavras

### Date (`@rainersoft/utils/date`)
- `formatDate()` - Formata data (pt-BR)
- `formatDateTime()` - Formata data e hora
- `formatRelativeDate()` - Data relativa (há X dias)
- `toISOString()` - Converte para ISO
- `isValidDate()` - Valida data

### Number (`@rainersoft/utils/number`)
- `formatCurrency()` - Formata moeda (BRL)
- `formatPercent()` - Formata percentual
- `formatNumber()` - Formata número
- `formatCompact()` - Formato compacto (1K, 1M)
- `parseCurrency()` - Parse de moeda
- `round()` - Arredondamento
- `clamp()` - Limita valor

### Status (`@rainersoft/utils/status`)
- `translateStatus()` - Traduz status
- `getStatusColor()` - Cor do status
- `getStatusVariant()` - Variant do badge

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Desenvolvimento com watch
pnpm dev

# Build
pnpm build

# Testes
pnpm test

# Lint
pnpm lint
```

## 📄 Licença

MIT © Rainer Teixeira

## 🔗 Ecossistema Rainersoft

- [@rainersoft/design-tokens](https://www.npmjs.com/package/@rainersoft/design-tokens) - Sistema de design tokens
- [@rainersoft/ui](https://www.npmjs.com/package/@rainersoft/ui) - Componentes UI
- [@rainersoft/utils](https://www.npmjs.com/package/@rainersoft/utils) - Utilitários universais
