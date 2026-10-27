# Sistem Desain Visual & Token Komponen — GeoLibre Map Starter Kit

## 1. Visual DNA & Token Inti (CSS Variables)

```css
:root {
  /* Palet Warna Vibe */
  --vibe-background: #090d16;
  --vibe-surface: rgba(15, 23, 42, 0.88);
  --vibe-surface-hover: rgba(30, 41, 59, 0.95);
  --vibe-border: rgba(51, 65, 85, 0.65);
  --vibe-text-main: #f8fafc;
  --vibe-text-sub: #94a3b8;
  --vibe-accent-1: #38bdf8;
  --vibe-accent-2: #0284c7;
  --vibe-accent-hover: #0ea5e9;

  /* Status Semantik */
  --vibe-success: #10b981;
  --vibe-warning: #f59e0b;
  --vibe-error: #ef4444;

  /* Geometri & Radius */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Tipografi */
  --vibe-font-heading: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --vibe-font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Transisi */
  --vibe-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 2. Token Komponen Geospasial (§7B Registry)

| Komponen | Token / Properti Kunci | Deskripsi Visual |
|---|---|---|
| **Floating Control Panel** | `background: var(--vibe-surface); backdrop-filter: blur(12px); border-radius: var(--radius-lg);` | Panel kontrol melayang dengan efek glassmorphism gelap |
| **Layer Switcher Button** | `border: 1px solid var(--vibe-border); font-size: 11px; padding: 6px 10px;` | Tombol pemilih basemap dengan state aktif warna accent |
| **Search Autocomplete Box** | `background: rgba(30, 41, 59, 0.85); border-radius: var(--radius-md);` | Kotak pencarian desa/kecamatan dengan dropdown hasil instan |
| **Map Popup Card** | `background: #0f172a; border: 1px solid #334155; border-radius: var(--radius-sm);` | Popup hover informasi desa, kecamatan, dan ID spasial |
| **Info Badge (Pill)** | `background: rgba(2, 132, 199, 0.2); color: var(--vibe-accent-1); font-size: 10px;` | Kapsul identitas desa dan kecamatan |

---

## 3. Titik Henti Responsif (Responsive Breakpoints)

| Token Breakpoint | Lebar Layar | Target Perangkat Utama |
|---|---|---|
| `--bp-mobile-sm` | `360px` | Android Small (Samsung Galaxy A-series) |
| `--bp-mobile-md` | `393px` | Android Medium / iPhone Standard |
| `--bp-mobile-lg` | `412px` | Android Large (Google Pixel / Samsung Plus) |
| `--bp-tablet` | `768px` | Tablet / iPad Portrait |
| `--bp-laptop` | `1366px` | **Target Utama Laptop / Desktop Monitor** |
| `--bp-desktop-hd` | `1920px` | Monitor Full HD Desktop |

---

## 4. Pedoman Anti-AI-SLOP Visual
1. **Dilarang keras menggunakan emoji mentah** pada antarmuka kode aplikasi.
2. **Dilarang hardcode warna heksadesimal** di luar palet yang didefinisikan pada `:root`.
3. **Dilarang resting shadow** pada elemen diam (bayangan hanya diterapkan pada elemen melayang/dialog).
4. **Wajib responsif** pada resolusi laptop standar 1366×768 dan perangkat bergerak Android 3M.
