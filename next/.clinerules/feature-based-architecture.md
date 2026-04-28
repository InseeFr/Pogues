# Architecture du Projet Sabiane Gestion UI V2

## Principes Fondamentaux

1. **Organisation par Type/Concern** : Structure claire séparant composants, fonctions, routes et types
2. **Modularité** : Chaque module a une responsabilité claire et bien définie
3. **Séparation des Préoccupations** : Code organisé par fonctionnalité technique plutôt que par feature métier
4. **Réutilisabilité** : Composants et fonctions partagés accessibles globalement

## Structure Globale

```bash
src/
├── api/                  # API services and models
├── components/           # Reusable UI components
│   ├── articulation/     # Articulation feature components
│   ├── codesLists/       # Codes lists feature components
│   │   └── create/       # Codes lists creation components
│   │   └── edit/         # Codes lists edition components
│   │   └── form/         # Codes lists form components
│   │   └── overview/     # Codes lists overview components
│   ├── layout/           # Layout components
│   ├── legacy/           # Legacy integration components
│   ├── login/            # Login components
│   ├── multimode/        # Multimode feature components
│   ├── nomenclatures/    # Nomenclatures feature components
│   ├── personalization/  # Personalization feature components
│   ├── questionnaires/   # Questionnaires feature components
│   ├── ui/               # UI utility components
│   ├── variables/        # Variables feature components
│   └── versions/         # Versions feature components
├── hooks/               # Custom React hooks
├── lib/                 # Library utilities
│   ├── auth/             # Authentication utilities
│   └── i18n/             # Internationalization utilities
├── models/              # Data models and types
├── routes/              # Application routes
│   ├── __root.tsx       # Root route configuration
│   ├── _layout.tsx      # Main layout route
│   ├── index.tsx        # Home route (redirects to questionnaires)
│   ├── _layout/         # Layout-specific routes
│   │   ├── login.tsx    # Login route
│   │   ├── questionnaire.$questionnaireId/  # Questionnaire-specific routes
│   │   └── questionnaires/  # Questionnaires routes
│   │       ├── index.tsx # Questionnaires list
│   │       ├── new.tsx   # New questionnaire
│   │       └── route.tsx # Questionnaires base route
├── testing/             # Testing utilities
└── utils/               # Utility functions
```

## Bonnes Pratiques

1. **Organisation des Composants** :
   - `components/ui/` : Composants UI génériques et réutilisables
   - `components/` : Composants spécifiques aux pages, organisés par domaine fonctionnel
   - `components/{{feature}/overview}`: Composants d'affichage de chaque page racine de chaque feature. Le composant racine de chaque page suit la convention `{{Feature}}Overview` (ex: `CodeListsOverview`)
   - Les sous composants de chaque pages sont organisés de manière fine dans des fichiers dédiés selon la convention `{{Feature}}{{SubComponent}}` (ex: `CodeListsOverviewLayout`, `CodeListsOverviewContent`, `CodeListsOverviewItem`, etc)
   - Chaque composant de page est autonome et peut utiliser des sous-composants
   - Chaque sous composant est unitaire et réutilisable, et peut être testé indépendamment

2. **Organisation des formulaires de création/d'édition** :
   - Les squelettes de formulaires sont organisés dans `components/{{feature}}/form` pour une meilleure visibilité, et utilisent le composant `Form` de `components/ui/` pour la structure générale du formulaire
   - La validation du schéma de données est gérée dans des fichiers dédiés (ex: `components/codeLists/form/schema.ts`) et utilisent Zod et useForm de React Hook Form
   - Les formulaires de création et d'édition sont organisés dans des dossiers dédiés (ex: `components/codeLists/create/` pour le formulaire de création de questionnaire, `components/codeLists/edit/` pour le formulaire d'édition)

3. **Fonctions Utilitaires** :
   - `hooks/` : Contient tous les hooks personnalisés
   - Les hooks suivent la convention `useXxx` (ex: `useUsers`)
   - Les autres fonctions utilitaires sont regroupées dans `utils/` ou `lib/` selon leur nature (ex: `lib/auth/` pour les fonctions d'authentification)

4. **Gestion des Routes** :
   - Utilisation de TanStack Router pour un routage déclaratif
   - Les routes sont organisées par domaine fonctionnel
   - Les routes suivent une logique hiérarchique (ex: `/questionnaire/:id/articulation`)
   - Les sous routes sont définies dans des fichiers dédiés pour une meilleure organisation (ex: `questionnaire.$questionnaireId/articulation/route.tsx`)

5. **Gestion des appels API** :
   - Utilisation de React Query pour la gestion des appels API
   - Les appels API utilisent l'instance Axios pré-configurée dans `lib/api/instance.ts`
   - Les requêtes API sont définies dans des fichiers dédiés (ex: `lib/api/codeLists.ts`)
   - Les clés de requêtes sont organisées de manière logique (ex: `codeListsQueryOptions(questionnaireId)`) dans ce même fichier, et utilisées directement dans les composants et hooks

6. **Typage générique** :
   - Types TypeScript organisés par domaine dans `models/`
   - Interfaces et types partagés accessibles globalement

7. **Gestion des librairies** :
   - Les fonctions relatives à l'utilisation de librairies externes sont regroupées dans `lib/`

## Patterns Recommandés

1. **Hooks Personnalisés** :

```typescript
// Exemple de hook personnalisé
export function useAltIcon() {
  const [showAltIcon, setShowAltIcon] = useState(false)
  const clickCountRef = useRef(0)
  const lastClickTimeRef = useRef(0)
  const spinnerTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    const now = Date.now()
    if (now - lastClickTimeRef.current < 500) {
      clickCountRef.current += 1
    } else {
      clickCountRef.current = 1
    }
    lastClickTimeRef.current = now

    if (clickCountRef.current >= 3) {
      setShowAltIcon(true)
      clickCountRef.current = 0
      if (spinnerTimeoutRef.current) clearTimeout(spinnerTimeoutRef.current)
      spinnerTimeoutRef.current = setTimeout(() => setShowAltIcon(false), 5000)
    }
  }

  return {
    handleClick,
    showAltIcon,
  }
}
```

2. **Composants de Page** :

```typescript
// Exemple de composant de page
interface CodesListsProps {
  codesLists?: CodesList[]
  questionnaireId: string
  readonly?: boolean
}

/**
 * Display the codes lists of the selected questionnaire and allow to edit them
 * or create a new one.
 */
export default function CodesListsOverview({
  codesLists = [],
  questionnaireId,
  readonly = false,
}: Readonly<CodesListsProps>) {
  const { t } = useTranslation()

  const [filteredCodesLists, setFilteredCodesLists] =
    useState<CodesList[]>(codesLists)

  const filters: Filter<CodesList>[] = [
    {
      label: t('codesLists.notUsed'),
      onFilter: (v: CodesList, filter: string[] = []) =>
        filter.includes('notUsed')
          ? !v.relatedQuestionNames || v.relatedQuestionNames.length === 0
          : true,
      options: [{ label: t('codesLists.notUsed'), value: 'notUsed' }],
      type: FilterType.ToggleGroup,
    },
    {
      label: t('codesLists.name'),
      onFilter: (v: CodesList, input?: string) =>
        input ? v.label.toLowerCase().includes(input.toLowerCase()) : true,
      placeholder: t('codesLists.search'),
      type: FilterType.Text,
    },
  ]

  if (codesLists.length > 0) {
    return (
      <>
        <Filters<CodesList>
          filters={filters}
          data={codesLists}
          setFilteredData={setFilteredCodesLists}
        />
        <ul>
          {filteredCodesLists.map((codesList) => (
            <CodesListOverviewItem
              key={codesList.id}
              questionnaireId={questionnaireId}
              codesList={codesList}
              readonly={readonly}
            />
          ))}
        </ul>
      </>
    )
  }

  if (readonly) {
    return (
      <div>
        <p>{t('codesLists.notUsedByQuestionnaire')}</p>
      </div>
    )
  }

  return (
    <ButtonLink
      to="/questionnaire/$questionnaireId/codes-lists/new"
      params={{ questionnaireId }}
      buttonStyle={ButtonStyle.Primary}
    >
      {t('codesLists.create')}
    </ButtonLink>
  )
}

```

3. **Définition de Routes** :

```typescript
// Exemple de définition de route
/**
 * Main code lists page where we display the various codes lists related to our
 * questionnaire and allow to edit them and create new ones.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error.message} />
    </CustomLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(codesListsQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: codesLists } = useSuspenseQuery(
    codesListsQueryOptions(questionnaireId),
  );

  return (
    <CustomLayout>
      <CodesListsOverview
        questionnaireId={questionnaireId}
        codesLists={codesLists}
      />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId } = Route.useParams();

  return (
    <CodesListOverviewLayout questionnaireId={questionnaireId}>
      {children}
    </CodesListOverviewLayout>
  );
}
```

4. ** Gestion des appels API avec React Query** :

```typescript
// Exemple de gestion d'appel API avec React Query
export type CodeListError =
  | CodeListRelatedQuestionError
  | { errorCode?: string }
export type CodeListRelatedQuestionError = {
  errorCode: ERROR_CODES.RELATED_QUESTION_NAMES
  relatedQuestionNames: string[]
}

export const codesListsKeys = {
  all: (questionnaireId: string) => ['codesLists', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    ['codesListsVersion', questionnaireId, versionId] as const,
}

/**
 * Used to retrieve codes lists associated to a questionnaire.
 *
 * @see {@link getCodesLists}
 */
export const codesListsQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: codesListsKeys.all(questionnaireId),
    queryFn: () => getCodesLists(questionnaireId),
  })

/**
 * Used to retrieve codes lists associated to an older version of a questionnaire.
 *
 * @see {@link getCodesListsFromVersion}
 */
export const codesListsFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: codesListsKeys.version(questionnaireId, versionId),
    queryFn: () => getCodesListsFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  })
```

## Avantages

- **Clarté** : Organisation logique et intuitive du code
- **Maintenabilité** : Séparation claire des responsabilités
- **Scalabilité** : Facile à ajouter de nouvelles fonctionnalités
- **Réutilisabilité** : Composants et fonctions facilement réutilisables
- **Testabilité** : Modules bien définis faciles à tester
