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

### 1. Créer Fichiers

- `components/{{feature}}/{{overview}}/{{feature}}Overview.tsx`
- `models/{{feature}}Types.ts` (si besoin)

### 2. Copy-Paste Template TSX (voir ci-dessous)

### 3. Checklist (voir fin document)

### 4. Build

```bash
npm run build  # DOIT réussir sans erreur une fois la tache terminée
```

## 🏗️ TEMPLATE TSX

```tsx
// 1. React/hooks → 2. Components (.tsx) → 3. Types → 4. SubComponents
import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink'
import Filters from '@/components/ui/Filters'
import { type CodesList } from '@/models/codesLists'
import { Filter, FilterType } from '@/models/filters'

import CodesListOverviewItem from './CodesListOverviewItem'

interface {{ComponentName}}Props {
  priority?: 'primary' | 'secondary';
  disabled?: boolean;
  onAction?: (data: any) => void;
}

export const {{ComponentName}} ({
  priority = 'primary',
  disabled = false,
  onAction
}: Readonly<{{ComponentName}}Props>) {
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

## Création de composants réutilisables

- Les composants réutilisables doivent être génériques et configurables via des props
- Ils doivent être de bas niveau ou surcharger les composants de BaseUI (voir exemple ci dessous), ne pas contenir de logique métier spécifique à une feature.
- Les composants de baseUI ne doivent jamais être importés directement dans les features, mais uniquement via des composants réutilisables qui les surchargent portant alors le même nom.
- Ils doivent être placés dans `components/ui` ou `components/shared`

### Template de composant réutilisable surchargant un composant BaseUI:

```tsx
import { Tooltip as UITooltip } from '@base-ui-components/react/tooltip'

import * as React from 'react'

interface TooltipProps {
  children: React.ReactNode
  /** Text to display in the tooltip popup. */
  title: React.ReactNode
}

/**
 * Display a tooltip when hovering its content. Should be used to display
 * information to sighted users (i.e. display the content of an aria label).
 */
export default function Tooltip({ children, title }: Readonly<TooltipProps>) {
  return (
    <UITooltip.Provider>
      <UITooltip.Root>
        <UITooltip.Trigger>{children}</UITooltip.Trigger>
        <UITooltip.Portal>
          <UITooltip.Positioner sideOffset={10}>
            <UITooltip.Popup className="flex origin-[var(--transform-origin)] flex-col rounded-md bg-[canvas] px-2 py-1 text-sm shadow-lg shadow-gray-200 outline outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:duration-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
              <UITooltip.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                <ArrowSvg />
              </UITooltip.Arrow>
              {title}
            </UITooltip.Popup>
          </UITooltip.Positioner>
        </UITooltip.Portal>
      </UITooltip.Root>
    </UITooltip.Provider>
  )
}

function ArrowSvg(props: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  )
}
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

## ✅ CHECKLIST FINALE

- [ ] NO `id` prop dans interface (généré en interne)
- [ ] Imports ordre correct 1-8, extensions correctes (.tsx sur composants)
- [ ] États hover/focus/disabled implémentés
- [ ] Tous les types sont explicitement définis (pas de `any`)
- [ ] Gestion d'erreur complète avec logging approprié
- [ ] Accessibilité complète (RGAA/WCAG niveau AA)
- [ ] Tests unitaires couvrant tous les cas d'erreur
- [ ] Documentation JSDoc complète pour les fonctions exportées
- [ ] `npm run build` réussit sans erreur
