// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig({
  entry: {
    index: "src/index.ts",
    "date/index": "src/date/index.ts",
    "string/index": "src/string/index.ts",
    "number/index": "src/number/index.ts",
    "status/index": "src/status/index.ts",
    "auth/index": "src/authentication/index.ts",
    "search/index": "src/search/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "hooks/use-counter": "src/hooks/use-counter.ts",
    "i18n/index": "src/i18n/index.ts",
    "i18n/pt-br": "src/i18n/pt-br.ts",
    // Missing entries that are imported in index.ts
    "types": "src/types.ts",
    "error": "src/error/index.ts",
    "color": "src/color/index.ts",
    "validation": "src/validation/index.ts",
    "dom": "src/dom/index.ts",
    "stats": "src/stats/index.ts",
    "image": "src/image/index.ts",
    "cookie": "src/cookie/index.ts",
    "crypto": "src/crypto/index.ts",
    "storage": "src/storage/index.ts",
    "formatting": "src/formatting/index.ts"
  },
  format: ["cjs", "esm"],
  tsconfig: "./tsconfig.json",
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: false,
  treeshake: true,
  minify: false,
  target: "es2020"
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvcmFpbmVyL1x1MDBDMXJlYSBkZSB0cmFiYWxoby9kZXNlbnZvbHZpbWVudG8vcmFpbmVyLXV0aWxzL3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9ob21lL3JhaW5lci9cdTAwQzFyZWEgZGUgdHJhYmFsaG8vZGVzZW52b2x2aW1lbnRvL3JhaW5lci11dGlsc1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vaG9tZS9yYWluZXIvJUMzJTgxcmVhJTIwZGUlMjB0cmFiYWxoby9kZXNlbnZvbHZpbWVudG8vcmFpbmVyLXV0aWxzL3RzdXAuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndHN1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudHJ5OiB7XG4gICAgaW5kZXg6ICdzcmMvaW5kZXgudHMnLFxuICAgICdkYXRlL2luZGV4JzogJ3NyYy9kYXRlL2luZGV4LnRzJyxcbiAgICAnc3RyaW5nL2luZGV4JzogJ3NyYy9zdHJpbmcvaW5kZXgudHMnLFxuICAgICdudW1iZXIvaW5kZXgnOiAnc3JjL251bWJlci9pbmRleC50cycsXG4gICAgJ3N0YXR1cy9pbmRleCc6ICdzcmMvc3RhdHVzL2luZGV4LnRzJyxcbiAgICAnYXV0aC9pbmRleCc6ICdzcmMvYXV0aGVudGljYXRpb24vaW5kZXgudHMnLFxuICAgICdzZWFyY2gvaW5kZXgnOiAnc3JjL3NlYXJjaC9pbmRleC50cycsXG4gICAgJ2hvb2tzL2luZGV4JzogJ3NyYy9ob29rcy9pbmRleC50cycsXG4gICAgJ2hvb2tzL3VzZS1jb3VudGVyJzogJ3NyYy9ob29rcy91c2UtY291bnRlci50cycsXG4gICAgJ2kxOG4vaW5kZXgnOiAnc3JjL2kxOG4vaW5kZXgudHMnLFxuICAgICdpMThuL3B0LWJyJzogJ3NyYy9pMThuL3B0LWJyLnRzJyxcbiAgICAvLyBNaXNzaW5nIGVudHJpZXMgdGhhdCBhcmUgaW1wb3J0ZWQgaW4gaW5kZXgudHNcbiAgICAndHlwZXMnOiAnc3JjL3R5cGVzLnRzJyxcbiAgICAnZXJyb3InOiAnc3JjL2Vycm9yL2luZGV4LnRzJyxcbiAgICAnY29sb3InOiAnc3JjL2NvbG9yL2luZGV4LnRzJyxcbiAgICAndmFsaWRhdGlvbic6ICdzcmMvdmFsaWRhdGlvbi9pbmRleC50cycsXG4gICAgJ2RvbSc6ICdzcmMvZG9tL2luZGV4LnRzJyxcbiAgICAnc3RhdHMnOiAnc3JjL3N0YXRzL2luZGV4LnRzJyxcbiAgICAnaW1hZ2UnOiAnc3JjL2ltYWdlL2luZGV4LnRzJyxcbiAgICAnY29va2llJzogJ3NyYy9jb29raWUvaW5kZXgudHMnLFxuICAgICdjcnlwdG8nOiAnc3JjL2NyeXB0by9pbmRleC50cycsXG4gICAgJ3N0b3JhZ2UnOiAnc3JjL3N0b3JhZ2UvaW5kZXgudHMnLFxuICAgICdmb3JtYXR0aW5nJzogJ3NyYy9mb3JtYXR0aW5nL2luZGV4LnRzJyxcbiAgfSxcbiAgZm9ybWF0OiBbJ2NqcycsICdlc20nXSxcbiAgdHNjb25maWc6ICcuL3RzY29uZmlnLmpzb24nLFxuICBkdHM6IGZhbHNlLFxuICBzcGxpdHRpbmc6IGZhbHNlLFxuICBzb3VyY2VtYXA6IHRydWUsXG4gIGNsZWFuOiBmYWxzZSxcbiAgdHJlZXNoYWtlOiB0cnVlLFxuICBtaW5pZnk6IGZhbHNlLFxuICB0YXJnZXQ6ICdlczIwMjAnLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsb0JBQW9CO0FBRWxXLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQTtBQUFBLElBRWQsU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxRQUFRLENBQUMsT0FBTyxLQUFLO0FBQUEsRUFDckIsVUFBVTtBQUFBLEVBQ1YsS0FBSztBQUFBLEVBQ0wsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
