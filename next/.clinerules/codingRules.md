# React Coding Rules

# very high priority order:

Tu es un développeur crafts, qui veut de la lisibilité et de la maintenabilité. Le code doit être simple.
Tu respectes le html sémantique et respecte l'accessibilité selon les critères RGAA et WCAG.
Tu refuses if inline, after if, code illisible et compliqué, et interdit la duplication.

Tu dois suivre toutes les étapes de ces règles de codage, sans oublier d'utiliser de bonnes pratiques, et vérifier que le code compilé ne présente aucune erreur dans la console.

## ⚡ 10 RÈGLES NON-NÉGOCIABLES

1. ❌ **JAMAIS `id` prop** → ✅ `const id = uuidService.generate()` en interne
2. ❌ **JAMAIS inline style** → ✅ `className` avec Tailwind CSS uniquement
3. ❌ **JAMAIS mutation** → ✅ `[...items, newItem]` `{...user, name: 'new'}`
4. ❌ **JAMAIS imports SANS extension** → ✅ TOUJOURS `.tsx` ou `.ts` (sauf node_modules)
5. ❌ **JAMAIS useMemo/useCallback** → ✅ React Compiler auto-optimise
6. ❌ **JAMAIS if inline** → ✅ if avec bloc `{}`
7. ❌ **JAMAIS `any` ou `unknown`** → ✅ Types spécifiques ou génériques typés
8. ❌ **JAMAIS `try/catch` silencieux** → ✅ Toujours logger les erreurs ou les propager
9. ❌ **JAMAIS `aria-*` sans valeur valide** → ✅ Toujours fournir des valeurs ARIA significatives
10. ❌ **JAMAIS rendu de listes non virtualisées (>50 items)** → ✅ Utiliser react-window ou react-virtualized

## 📋 WORKFLOW (6 ÉTAPES)

### 1. FIGMA → Notes

- MCP Figma: `get_figma_data` avec fileKey + nodeId
- Noter: width, height, padding, gap, border-radius, font-size
- Noter couleurs: background/text/border (hex codes)
- Noter états: hover, focus, disabled → couleurs + shadows exactes
- Sauver dans `figma-notes.txt`

### 2. Créer Fichiers

- `components/{{ComponentName}}/{{ComponentName}}.tsx`
- `components/{{ComponentName}}/{{ComponentName}}.scss`
- `types/{{feature}}Types.ts` (si besoin)

### 3. Copy-Paste Template TSX (voir ci-dessous)

### 4. Copy-Paste Template SCSS avec valeurs Figma (voir ci-dessous)

### 5. Checklist (voir fin document)

### 6. Build

```bash
npm run build  # DOIT réussir sans erreur une fois la tache terminée
```

## 🏗️ TEMPLATE TSX

```tsx
// 1. React/hooks → 2. OIDC → 3. Types (.ts) → 4. Components (.tsx) → 5. Hooks (rien) → 6. Services (rien) → 7. Utils
import React, { useState } from 'react';
import { useOidcAccessToken } from '@axafr/oidc';
import type { {{ComponentName}}Props } from '../../types/{{feature}}Types.ts';
import { uuidService } from '../../../shared/services/uuidService';

interface {{ComponentName}}Props {
  priority?: 'primary' | 'secondary';
  disabled?: boolean;
  onAction?: (data: any) => void;
}

export const {{ComponentName}}: React.FC<{{ComponentName}}Props> = ({
  priority = 'primary',
  disabled = false,
  onAction
}) => {
  const id = uuidService.generate();
  const [state, setState] = useState<string>('');
  const { accessToken } = useOidcAccessToken();

  async function handleAction() {
    if (!disabled && accessToken) {
      await apiCall(state, accessToken);
      onAction?.(state);
    }
  }

  return (
    <div className={`flex flex-col gap-4 p-4 ${priority === 'primary' ? 'bg-white border border-gray-200' : 'bg-gray-50'}`}>
      <input
        id={`${id}-input`}
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className={`px-4 py-2 rounded-md ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        onClick={handleAction}
        disabled={disabled}
      >
        Save
      </button>
    </div>
  );
};
```

## 🎨 TEMPLATE TAILWIND CLASSES

```tsx
// Utiliser directement les classes Tailwind dans le JSX
// Exemple d'équivalent Tailwind pour le template ci-dessus:

// Pour le conteneur principal:
className={`flex flex-col gap-4 p-4 ${priority === 'primary' ? 'bg-white border border-gray-200' : 'bg-gray-50'}`}

// Pour l'input:
className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

// Pour le bouton:
className={`px-4 py-2 rounded-md ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}

// États supplémentaires:
/*
hover:bg-blue-700 - État hover pour le bouton
focus:ring-2 focus:ring-blue-500 - État focus pour l'input
disabled:bg-gray-200 disabled:text-gray-400 - État disabled
*/
```

## ❌→✅ ERREURS FRÉQUENTES

| ❌ INTERDIT                     | ✅ CORRECT                                                         |
| ------------------------------- | ------------------------------------------------------------------ |
| `<div id="profile">`            | `<div id={`${id}-profile`}>`                                       |
| `style={{color: 'red'}}`        | `className="text-red-500"`                                         |
| `import { Comp } from './Comp'` | `import { Comp } from './Comp.tsx'`                                |
| `import { hook } from './hook'` | `import { hook } from './hook.ts'`                                 |
| `import X from '@shared/X'`     | `import { X } from '@shared/X.tsx'`                                |
| `.block .element`               | Utiliser les classes Tailwind directement dans le JSX              |
| `items.push(x)`                 | `[...items, x]`                                                    |
| `useCallback/useMemo`           | `function` (React Compiler)                                        |
| `export default Component`      | `export const Component` (named export)                            |
| `if (x) y = z;`                 | `if (x) { y = z; }`                                                |
| `if (x) return y;`              | `if (x) { return y; }`                                             |
| `if (x) obj.y = z;`             | `if (x) { obj.y = z; }`                                            |
| `const x: any = ...`            | `const x: string = ...`                                            |
| `try { ... } catch {}`          | `try { ... } catch (error) { console.error(error); throw error; }` |
| `<div aria-label>`              | `<div aria-label="Descriptive text">`                              |
| `{items.map(...)}` (50+ items)  | `<VirtualizedList items={items} />`                                |

## 📦 IMPORTS ORDRE

1. `import React, { useState } from 'react';`
2. `import { useOidcAccessToken } from '@axafr/oidc';`
3. `import type { Props } from '@shared/types/types.ts';` (keyword `type`, AVEC `.ts`)
4. `import { Comp } from '../Comp.tsx';` (relatif AVEC `.tsx`)
5. `import { Comp2 } from '@shared/components/Comp2.tsx';` (path alias AVEC `.tsx`)
6. `import { useHook } from '@shared/hooks/useHook.ts';` (path alias AVEC `.ts`)
7. `import { service } from '@shared/services/service.ts';` (path alias AVEC `.ts`)
8. `import { util } from '@shared/utils/util.ts';` (path alias AVEC `.ts`)
9. `import './Component.scss';` (DERNIER, optionnel - Tailwind ne nécessite pas de fichiers CSS séparés)

**RÈGLE D'OR:** TOUJOURS inclure `.tsx` ou `.ts` pour vos fichiers. Exception: node_modules (React, etc.).

## ✅ CHECKLIST FINALE

- [ ] Composant match Figma pixel-perfect (zoom 100%)
- [ ] BEM strict: `.block__element--modifier` (pas `.block .element`)
- [ ] NO `id` prop dans interface (généré en interne)
- [ ] NO inline `style={{}}` (className uniquement)
- [ ] Imports ordre correct 1-9, extensions correctes (.tsx sur composants)
- [ ] États hover/focus/disabled implémentés
- [ ] Tous les types sont explicitement définis (pas de `any`)
- [ ] Gestion d'erreur complète avec logging approprié
- [ ] Accessibilité complète (RGAA/WCAG niveau AA)
- [ ] Tests unitaires couvrant tous les cas d'erreur
- [ ] Documentation JSDoc complète pour les fonctions exportées
- [ ] `npm run build` réussit sans erreur
