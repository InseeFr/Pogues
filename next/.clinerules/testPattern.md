# Ton role:

Tu es un expert vitest, tu n'aimes pas les tests doublons, tu ne fais que les tests nécessaires en respectant les bonnes pratiques de testing, tu détestes les after if et les if inline. Il faut typer le plus possible tout en évitant les any et les unknown

## Structure du Projet de Test

Le projet Pogues utilise une structure de test cohérente à travers ses composants. Voici les patterns identifiés basés sur l'analyse des tests existants dans `next/src/components`.

## Patterns Identifiés

### 1. Structure de Base avec describe/it

**Caractéristiques:**

- Utilisation simple de `describe()` pour regrouper les tests par composant
- Chaque test utilise `it()` avec des noms descriptifs
- Pas de nesting excessif - structure plate et simple

**Exemple (basé sur MultimodeOverview.test.tsx):**

```typescript
import { renderWithRouter } from '@/testing/render';

import MultimodeOverview from './MultimodeOverview';

describe('MultimodeOverview', () => {
  it('displays multimode rules', async () => {
    const { getByText } = await renderWithRouter(
      <MultimodeOverview
        questionnaireId="q-id"
        isMovedRules={{ questionnaireFormula: 'my-q-formula' }}
      />,
    );

    expect(getByText('my-q-formula')).toBeInTheDocument();
  });
});
```

### 2. Tests de Composants UI

**Caractéristiques:**

- Tests d'intégration avec rendu complet
- Vérification du comportement utilisateur
- Utilisation de `@testing-library/react` et `userEvent`

**Exemple (basé sur Dialog.test.tsx):**

```typescript
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@/testing/render';

import Dialog from './Dialog';

describe('Dialog', () => {
  it('can be opened and closed with a trigger button', async () => {
    const user = userEvent.setup();

    const { queryByText, getByText } = await renderWithRouter(
      <Dialog body="body" title="title">
        <button>Open Dialog</button>
      </Dialog>,
    );

    const openButton = screen.getByRole('button', { name: 'Open Dialog' });
    await user.click(openButton);

    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('body')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();

    await user.click(screen.getByText('Cancel'));

    expect(queryByText('title')).toBeNull();
    expect(queryByText('body')).toBeNull();
  });
});
```

### 3. Tests de Formulaires Complexes

**Caractéristiques:**

- Tests complets de validation de formulaire
- Vérification des états des boutons basés sur la validité
- Tests des messages d'erreur et alertes
- Utilisation de `fireEvent` pour simuler les entrées utilisateur

**Exemple (basé sur CodesListForm.test.tsx):**

```typescript
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/testing/render';

import CodesListForm from './CodesListForm';

describe('CodesListForm', () => {
  it('should enable the button only when all fields are filled', async () => {
    const submitFn = vi.fn();
    await renderWithRouter(
      <CodesListForm
        questionnaireId="q-id"
        onSubmit={submitFn}
        variables={[]}
      />,
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: {
        value: 'my label',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeDisabled();
    });

    fireEvent.input(screen.getByTestId('codes.0.value'), {
      target: {
        value: 'my code value',
      },
    });
    fireEvent.input(screen.getByTestId('codes.0.label'), {
      target: {
        value: 'my code label',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Validate/i })).toBeEnabled();
    });
  });

  it('should display "must have label" error when empty', async () => {
    await renderWithRouter(
      <CodesListForm questionnaireId="q-id" onSubmit={vi.fn()} />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: { value: 'my label' },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /Code list name/i }), {
      target: { value: '' },
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByText('You must provide a label')).toBeDefined();
  });
});
```

### 4. Mocking des Dépendances

**Caractéristiques:**

- Mocking sélectif des dépendances externes
- Utilisation de `vi.mock()` pour les modules
- Mocking partiel pour préserver le comportement réel

**Exemple (basé sur CodesListForm.test.tsx):**

```typescript
const mockNavigate = vi.fn()

// Mock useNavigate from @tanstack/react-router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/components/ui/form/VTLEditor')
```

### 5. Tests de Comportement Asynchrone

**Caractéristiques:**

- Utilisation systématique de `async/await`
- `waitFor` pour les assertions asynchrones
- Gestion propre des promesses

**Exemple:**

```typescript
it('should handle async form submission', async () => {
  const submitFn = vi.fn().mockResolvedValue({ success: true });

  await renderWithRouter(
    <CodesListForm
      questionnaireId="q-id"
      onSubmit={submitFn}
      variables={[]}
    />,
  );

  // Fill form...
  fireEvent.input(screen.getByTestId('codes.0.value'), {
    target: { value: 'test' },
  });

  fireEvent.submit(screen.getByRole('button', { name: /Validate/i }));

  await waitFor(() => {
    expect(submitFn).toHaveBeenCalled();
  });
});
```

## Bonnes Pratiques Observées dans le Projet

1. **Utilisation de renderWithRouter**: Tous les tests de composants utilisent le helper personnalisé pour fournir le contexte de routage

2. **Noms de Tests Clairs**: Convention "should [comportement] when [condition]" systématiquement utilisée

3. **Tests Atomiques**: Chaque test vérifie un seul comportement spécifique

4. **Utilisation de screen**: Préférence pour les queries basées sur `screen` plutôt que les queries de container

5. **Gestion des Événements**: Utilisation appropriée de `fireEvent` et `userEvent` pour simuler les interactions

6. **Assertions Explicites**: Messages d'erreur clairs et vérifications spécifiques

## Recommandations Spécifiques au Projet

1. **Conserver la Structure Simple**: La structure plate avec `describe/it` fonctionne bien pour ce projet

2. **Utiliser les Helpers Existants**: Toujours utiliser `renderWithRouter` pour la cohérence

3. **Privilégier les Queries par Rôle**: Utiliser `getByRole` quand possible pour des tests plus robustes

4. **Tests de Validation**: Pour les formulaires, toujours tester:
   - État initial (boutons désactivés)
   - Validation en temps réel
   - Messages d'erreur
   - Soumission réussie

5. **Mocking Minimal**: Ne mocker que ce qui est nécessaire, préserver le comportement réel quand possible

6. **Tests Asynchrones**: Toujours utiliser `async/await` et `waitFor` pour les opérations asynchrones

## Exemple Complet de Test de Composant

```typescript
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@/testing/render';

import MyComponent from './MyComponent';

// Mock des dépendances si nécessaire
vi.mock('./some-dependency', () => ({
  someFunction: vi.fn(),
}));

describe('MyComponent', () => {
  it('should render correctly with required props', async () => {
    const { getByText } = await renderWithRouter(
      <MyComponent questionnaireId="test-id" />,
    );

    expect(getByText('Expected Content')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();

    await renderWithRouter(<MyComponent questionnaireId="test-id" />);

    const button = screen.getByRole('button', { name: /Action/i });
    await user.click(button);

    expect(screen.getByText('Result')).toBeInTheDocument();
  });

  it('should show validation errors when form is invalid', async () => {
    await renderWithRouter(<MyComponent questionnaireId="test-id" />);

    const input = screen.getByRole('textbox', { name: /Field/i });
    fireEvent.input(input, { target: { value: '' } });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });
});
```
