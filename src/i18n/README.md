# Sistema de Internacionalização (i18n)

Sistema centralizado para gerenciar múltiplos idiomas e locales na biblioteca `@rainersoft/utils`.

## Idiomas Suportados

- 🇧🇷 **pt-BR** - Português (Brasil)
- 🇺🇸 **en-US** - Inglês (Estados Unidos)
- 🇪🇸 **es-ES** - Espanhol (Espanha)

## Uso Básico

### 1. Configurar Locale Global

```typescript
import { setLocale, getLocale } from '@rainersoft/utils';

// Define o idioma da aplicação
setLocale('pt-BR');

// Obtém o idioma atual
const currentLocale = getLocale(); // 'pt-BR'
```

### 2. Detectar Idioma do Navegador

```typescript
import { detectBrowserLocale, setLocale } from '@rainersoft/utils';

// Detecta automaticamente o idioma do navegador
const browserLocale = detectBrowserLocale();
setLocale(browserLocale);
```

### 3. Usar Formatações com Locale

```typescript
import { formatCurrency, formatDate, setLocale } from '@rainersoft/utils';

// Configurar para português
setLocale('pt-BR');
formatCurrency(1234.56); // 'R$ 1.234,56'
formatDate(new Date()); // '24/01/2026'

// Configurar para inglês
setLocale('en-US');
formatCurrency(1234.56); // '$1,234.56'
formatDate(new Date()); // '1/24/2026'

// Configurar para espanhol
setLocale('es-ES');
formatCurrency(1234.56); // '1.234,56 €'
formatDate(new Date()); // '24/01/2026'
```

### 4. Obter Configurações do Locale

```typescript
import { getLocaleConfig } from '@rainersoft/utils';

const config = getLocaleConfig('pt-BR');
console.log(config);
// {
//   locale: 'pt-BR',
//   currency: 'BRL',
//   dateFormat: 'DD/MM/YYYY',
//   timeFormat: 'HH:mm',
//   decimalSeparator: ',',
//   thousandSeparator: '.',
//   firstDayOfWeek: 0
// }
```

### 5. Usar Traduções

```typescript
import { getTranslations, translate } from '@rainersoft/utils';

// Obter todas as traduções
const t = getTranslations('pt-BR');
console.log(t.today); // 'Hoje'
console.log(t.months[0]); // 'Janeiro'
console.log(t.days[1]); // 'Segunda'

// Traduzir chave específica
translate('today', 'en-US'); // 'Today'
translate('yesterday', 'es-ES'); // 'Ayer'
```

### 6. Obter Moeda do Locale

```typescript
import { getCurrency } from '@rainersoft/utils';

getCurrency('pt-BR'); // 'BRL'
getCurrency('en-US'); // 'USD'
getCurrency('es-ES'); // 'EUR'
```

## Exemplo Completo - Aplicação Multi-idioma

```typescript
import { 
  setLocale, 
  detectBrowserLocale,
  formatCurrency,
  formatDate,
  getTranslations 
} from '@rainersoft/utils';

// 1. Detectar e configurar idioma ao iniciar a aplicação
const userLocale = detectBrowserLocale();
setLocale(userLocale);

// 2. Usar traduções
const t = getTranslations();
console.log(`${t.today}: ${formatDate(new Date())}`);
// pt-BR: "Hoje: 24/01/2026"
// en-US: "Today: 1/24/2026"
// es-ES: "Hoy: 24/01/2026"

// 3. Formatar valores monetários
const price = 1234.56;
console.log(`${t.price}: ${formatCurrency(price)}`);
// pt-BR: "R$ 1.234,56"
// en-US: "$1,234.56"
// es-ES: "1.234,56 €"

// 4. Trocar idioma dinamicamente
function changeLanguage(newLocale: 'pt-BR' | 'en-US' | 'es-ES') {
  setLocale(newLocale);
  // Atualizar interface...
}
```

## Exemplo - Componente React

```typescript
import { useState, useEffect } from 'react';
import { 
  setLocale, 
  getLocale, 
  getTranslations,
  formatCurrency,
  type Locale 
} from '@rainersoft/utils';

function App() {
  const [locale, setLocaleState] = useState<Locale>(getLocale());
  const t = getTranslations(locale);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setLocaleState(newLocale);
  };

  return (
    <div>
      <select value={locale} onChange={(e) => handleLocaleChange(e.target.value as Locale)}>
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en-US">🇺🇸 English</option>
        <option value="es-ES">🇪🇸 Español</option>
      </select>

      <h1>{t.today}: {formatDate(new Date())}</h1>
      <p>{formatCurrency(1234.56)}</p>
    </div>
  );
}
```

## Configurações por Locale

| Configuração | pt-BR | en-US | es-ES |
|--------------|-------|-------|-------|
| **Moeda** | BRL (R$) | USD ($) | EUR (€) |
| **Formato Data** | DD/MM/YYYY | MM/DD/YYYY | DD/MM/YYYY |
| **Formato Hora** | HH:mm | hh:mm A | HH:mm |
| **Separador Decimal** | , | . | , |
| **Separador Milhar** | . | , | . |
| **Primeiro Dia Semana** | Domingo (0) | Domingo (0) | Segunda (1) |

## Traduções Disponíveis

- `days` - Dias da semana completos
- `daysShort` - Dias da semana abreviados
- `months` - Meses completos
- `monthsShort` - Meses abreviados
- `today` - "Hoje" / "Today" / "Hoy"
- `yesterday` - "Ontem" / "Yesterday" / "Ayer"
- `tomorrow` - "Amanhã" / "Tomorrow" / "Mañana"
- `ago` - "atrás" / "ago" / "hace"
- `in` - "em" / "in" / "en"

## Integração com Módulos Existentes

Todos os módulos de formatação (`date`, `number`, `string`) já suportam o parâmetro `locale`:

```typescript
// Usar locale específico sem alterar o global
formatCurrency(1234.56, 'en-US'); // '$1,234.56'
formatDate(new Date(), 'long', 'es-ES'); // '24 de enero de 2026'
formatNumber(1234567, 0, 'pt-BR'); // '1.234.567'
```

## Boas Práticas

1. **Configure o locale uma vez** no início da aplicação
2. **Use `detectBrowserLocale()`** para melhor UX
3. **Permita o usuário trocar** o idioma manualmente
4. **Persista a preferência** em localStorage/cookies
5. **Use traduções** ao invés de textos hardcoded

## Próximos Passos

Para adicionar suporte a novos idiomas, edite:
- `LOCALE_CONFIG` - configurações de formatação
- `TRANSLATIONS` - traduções de textos comuns
- `CURRENCY_MAP` - mapeamento de moedas
- Type `Locale` - adicionar novo código de idioma
