# Tests Unitaires - Sabiane Gestion UI v2

## Ton role:

Tu es un expert vitest, tu n'aimes pas les tests doublons, tu ne fais que les tests nécessaires en respectant les bonnes pratiques de testing, tu détestes les after if et les if inline. Il faut typer le plus possible tout en évitant les any et les unknown

## Principes des Tests Unitaires

1. **Isolation** : Tester une unité de code en isolation
2. **Rapidité** : Exécution rapide pour feedback immédiat
3. **Couverture** : 100%+ de couverture pour les composants complexes
4. **Mocking** : Mock des dépendances externes
5. **Pas de tests doublons** : Éviter les tests qui vérifient les mêmes comportements
6. **Tests basés sur le comportement** : Tester ce que le code fait, pas comment il le fait

## Structure des Tests Unitaires

```
sabiane-gestion-ui-v2/
├── src/
│   ├── components/          # Composants React
│   │   ├── Commons/         # Composants communs
│   │   │   ├── ComponentName.tsx
│   │   │   └── ComponentName.test.tsx
│   │   ├── Logout/          # Composant de déconnexion
│   │   │   ├── Logout.tsx
│   │   │   └── Logout.test.tsx
│   │   ├── pages/           # Pages de l'application
│   │   │   └── ...          # Structure hiérarchique des pages
│   │   └── Unauthorized/    # Composant d'accès non autorisé
│   │       ├── Unauthorized.tsx
│   │       └── Unauthorized.test.tsx
│   │
│   ├── functions/           # Fonctions utilitaires et hooks
│   │   ├── functionName.ts  # Fonction principale
│   │   └── functionName.test.ts  # Test de la fonction (même dossier)
│   │
│   ├── routes/              # Routes et pages
│   │   └── __mocks__/       # Mocks pour les tests
│   │
│   └── tests/               # Tests globaux et configuration
│       ├── setup.ts         # Configuration des tests
│       └── tests.tsx       # Tests globaux
```

## Bonnes Pratiques

1. **Organisation** :
   - Tests collocalisés avec le code testé (même dossier)
   - Nommage clair : `[Function].test.ts` pour les fonctions, `[Component].test.tsx` pour les composants
   - Un fichier de test par fonction/composant

2. **Couverture** :
   - 100% pour les fonctions critiques et hooks complexes
   - 80%+ pour les fonctions et composants
   - Focus sur la logique métier et les cas d'erreur
   - Identifier et couvrir tous les edge cases

3. **Outils Recommandés** :
   - Vitest pour l'exécution des tests
   - React Testing Library pour les composants
   - vi (Vitest) pour les mocks
   - MSW (Mock Service Worker) pour les appels API

4. **Priorité élevée: Règles Non-Négociables** :
   - Analyse en détail tout le comportement du composant/fonction (dépendance à un hook, à un model de données, etc)
   - Pour les typages: pas de as vi.mock, ni as any, ni as unknown
   - évite unmount
   - Ne pas tester la console
   - Uniquement tester la fonctionnalité implémentée
   - Identifier et couvrir tous les edge cases
   - Se limiter au cas minimum de test pour arriver à la couverture attendue
   - Éviter les tests doublons

## Exemples de Tests Unitaires

### 1. Test de Fonction Utilitaire

```typescript
// src/functions/filterDataByProperty.test.ts
import { describe, expect, it } from 'vitest'

import { filterDataByProperty } from './filterDataByProperty'

describe('filterDataByProperty()', () => {
  const users = [
    { id: 1, firstName: 'Marie-Line', lastName: 'Mouton' },
    { id: 2, firstName: 'Amadou', lastName: 'ENQ' },
  ]

  it('should return the complete array if the query is empty or only whitespace', () => {
    expect(filterDataByProperty(users, '', 'firstName')).toHaveLength(2)
    expect(filterDataByProperty(users, '   ', 'firstName')).toHaveLength(2)
  })

  it('should filter by partial matching and be case-insensitive', () => {
    const result = filterDataByProperty(users, 'ali', 'firstName')
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Alicia')
  })

  it('should handle null/undefined values gracefully', () => {
    const dataWithCorruptedValues = [
      { id: 1, name: null },
      { id: 2, name: undefined },
      { id: 3, name: 'Real Name' },
    ]
    const result = filterDataByProperty(dataWithCorruptedValues, 'real', 'name')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(3)
  })
})
```

### 2. Test de Hook avec Mocking

```typescript
// src/functions/useInterviewerTitle.test.ts
import { renderHook } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useGetListInterviewers } from '../gen/pilotageApi/04-interviewers'
import { useInterviewerTitle } from './useInterviewerTitle'

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}))

vi.mock('../gen/pilotageApi/04-interviewers', () => ({
  useGetListInterviewers: vi.fn(),
}))

describe('useInterviewerTitle', () => {
  const mockUseTranslation = useTranslation
  const mockUseGetListInterviewers = useGetListInterviewers

  beforeEach(() => {
    vi.clearAllMocks()
    document.title = 'Test Title'

    mockUseTranslation.mockReturnValue({
      t: (key: string) => {
        if (key === 'menu.monitor.titlePageInterviewer') {
          return 'title page interviewer'
        }
        return key
      },
    })
  })

  describe('fullName memoization', () => {
    it('should return null when no interviewer is found', () => {
      mockUseGetListInterviewers.mockReturnValue({ data: [] })
      const { result } = renderHook(() =>
        useInterviewerTitle('Test Page', 'test-id'),
      )
      expect(result.current).toBeUndefined()
    })

    it('should return full name when interviewer is found', () => {
      const mockInterviewers = [
        {
          id: 'test-id',
          interviewerFirstName: 'John',
          interviewerLastName: 'Doe',
        },
      ]

      mockUseGetListInterviewers.mockReturnValue({ data: mockInterviewers })
      const { result } = renderHook(() =>
        useInterviewerTitle('Test Page', 'test-id'),
      )
      expect(result.current).toBeUndefined()
    })
  })

  describe('document.title side effects', () => {
    it('should set correct title when interviewer has full name', () => {
      const mockInterviewers = [
        {
          id: 'test-id',
          interviewerFirstName: 'John',
          interviewerLastName: 'Doe',
        },
      ]

      mockUseGetListInterviewers.mockReturnValue({ data: mockInterviewers })
      renderHook(() => useInterviewerTitle('Test Page', 'test-id'))

      expect(document.title).toBe(
        'John Doe - Test Page - title page interviewer - Sabiane Gestion',
      )
    })
  })
})
```

### 3. Test de Composant (si nécessaire)

```typescript
// src/components/tests/ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('should render correctly with default props', () => {
    render(<ComponentName />);
    expect(screen.getByText('Default text')).toBeInTheDocument();
  });

  it('should call onClick handler when button is clicked', () => {
    const mockClick = vi.fn();
    render(<ComponentName onClick={mockClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalled();
  });
});
```

## Stratégie d'Exécution

1. **Tests Locaux** :
   - Exécution avec `pnpm test`

## Métriques de Qualité

1. **Seuils de Couverture** :
   - Minimum 100% de couverture globale
   - 100% pour les hooks complexes et fonctions critiques
   - 90% pour les composants principaux

2. **Qualité du Code** :
   - Tests basés sur le comportement, pas l'implémentation
   - Isolation des tests
   - Documentation des cas complexes
   - Pas de tests doublons
   - Éviter les afterEach/afterAll sauf nécessité absolue

## Intégration avec Sabiane Gestion

1. **Mocking des Services** :
   - Mock des appels API
   - Mock des services Keycloak pour les tests d'authentification
   - Mock des hooks de traduction (useTranslation)

2. **Structure de Test Typique** :
   - Utilisation de `describe` pour regrouper les tests par fonctionnalité
   - Utilisation de `beforeEach` pour l'initialisation
   - Tests atomiques vérifiant un seul comportement
   - Couverture exhaustive des edge cases
