import type { Locale } from '../types';
export declare function setLocale(locale: Locale): void;
export declare function getLocale(): Locale;
export declare function getCurrency(locale?: Locale): string;
export declare const LOCALE_CONFIG: {
    readonly 'pt-BR': {
        readonly locale: Locale;
        readonly currency: "BRL";
        readonly dateFormat: "DD/MM/YYYY";
        readonly timeFormat: "HH:mm";
        readonly decimalSeparator: ",";
        readonly thousandSeparator: ".";
        readonly firstDayOfWeek: 0;
    };
    readonly 'en-US': {
        readonly locale: Locale;
        readonly currency: "USD";
        readonly dateFormat: "MM/DD/YYYY";
        readonly timeFormat: "hh:mm A";
        readonly decimalSeparator: ".";
        readonly thousandSeparator: ",";
        readonly firstDayOfWeek: 0;
    };
    readonly 'es-ES': {
        readonly locale: Locale;
        readonly currency: "EUR";
        readonly dateFormat: "DD/MM/YYYY";
        readonly timeFormat: "HH:mm";
        readonly decimalSeparator: ",";
        readonly thousandSeparator: ".";
        readonly firstDayOfWeek: 1;
    };
};
export declare function getLocaleConfig(locale?: Locale): {
    readonly locale: Locale;
    readonly currency: "BRL";
    readonly dateFormat: "DD/MM/YYYY";
    readonly timeFormat: "HH:mm";
    readonly decimalSeparator: ",";
    readonly thousandSeparator: ".";
    readonly firstDayOfWeek: 0;
} | {
    readonly locale: Locale;
    readonly currency: "USD";
    readonly dateFormat: "MM/DD/YYYY";
    readonly timeFormat: "hh:mm A";
    readonly decimalSeparator: ".";
    readonly thousandSeparator: ",";
    readonly firstDayOfWeek: 0;
} | {
    readonly locale: Locale;
    readonly currency: "EUR";
    readonly dateFormat: "DD/MM/YYYY";
    readonly timeFormat: "HH:mm";
    readonly decimalSeparator: ",";
    readonly thousandSeparator: ".";
    readonly firstDayOfWeek: 1;
};
export declare const TRANSLATIONS: {
    readonly 'pt-BR': {
        readonly days: readonly ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        readonly daysShort: readonly ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        readonly months: readonly ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        readonly monthsShort: readonly ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        readonly today: "Hoje";
        readonly yesterday: "Ontem";
        readonly tomorrow: "Amanhã";
        readonly ago: "atrás";
        readonly in: "em";
    };
    readonly 'en-US': {
        readonly days: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        readonly daysShort: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        readonly months: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        readonly monthsShort: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        readonly today: "Today";
        readonly yesterday: "Yesterday";
        readonly tomorrow: "Tomorrow";
        readonly ago: "ago";
        readonly in: "in";
    };
    readonly 'es-ES': {
        readonly days: readonly ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        readonly daysShort: readonly ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        readonly months: readonly ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        readonly monthsShort: readonly ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        readonly today: "Hoy";
        readonly yesterday: "Ayer";
        readonly tomorrow: "Mañana";
        readonly ago: "hace";
        readonly in: "en";
    };
};
export declare function getTranslations(locale?: Locale): {
    readonly days: readonly ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    readonly daysShort: readonly ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    readonly months: readonly ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    readonly monthsShort: readonly ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    readonly today: "Hoje";
    readonly yesterday: "Ontem";
    readonly tomorrow: "Amanhã";
    readonly ago: "atrás";
    readonly in: "em";
} | {
    readonly days: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    readonly daysShort: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    readonly months: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    readonly monthsShort: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    readonly today: "Today";
    readonly yesterday: "Yesterday";
    readonly tomorrow: "Tomorrow";
    readonly ago: "ago";
    readonly in: "in";
} | {
    readonly days: readonly ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    readonly daysShort: readonly ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    readonly months: readonly ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    readonly monthsShort: readonly ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    readonly today: "Hoy";
    readonly yesterday: "Ayer";
    readonly tomorrow: "Mañana";
    readonly ago: "hace";
    readonly in: "en";
};
export declare function translate(key: keyof typeof TRANSLATIONS['pt-BR'], locale?: Locale): string;
export declare function detectBrowserLocale(): Locale;
export type { Locale } from '../types';
export { DEFAULT_LOCALE, CURRENCY_MAP } from '../types';
//# sourceMappingURL=index.d.ts.map