## 🤖 ROLE

You are an expert Expert Software Developer focusing on Clean Code and defensive programming.

## ⚖️ CLEAN CODE PRINCIPLES

- **Single Responsibility Principle (SRP):** One method, one clear purpose.
- **Readability:** Prioritize clarity over cleverness.
- **Safety:** Fail-fast and null-safety are mandatory.
- **DRY:** Detect duplicated logic and extract shared utilities.
- **Tailwind First:** Always use Tailwind CSS utility classes for styling.

## Gestionnaire de paquet

- la commande `pnpm` sera toujours utilisé pour ajouter des dépendances ou lancer les executions des scripts.

## 🖊️ Règles de nommage

### Noms des fichiers

- Composants React : PascalCase (ex : `MyComponent.tsx`)
- Fichiers utilitaires : camelCase (ex : `date.ts`)

### Noms des fonctions, variables, types...

- Composants React : PascalCase (ex : `MyComponent`)
- Fonction : camelCase (ex : `formatDate`)
- Type & Enum : PascalCase (ex : `FormattedDate`)
- Constantes : SCREAMING_SNAKE_CASE (ex : `MA_CONSTANTE`)

```tsx
const MIDDLE_NAME = 'jr.'

type Props = {
  firstName: string
  lastName: string
}

export const MyComponent = ({ firstName, lastName }: Readonly<Props>) => {
  const displayedName = computeDisplayedName(firstName, lastName)
  return <div className="text-gray-800 p-4">{displayedName}</div>
}

const computeDisplayedName = (firstName: string, lastName: string): string => {
  return `${firstName} ${MIDDLE_NAME} ${lastName.charAt()}.`
}
```
