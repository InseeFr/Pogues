/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.
// Import Routes
import { Route as rootRoute } from './routes/__root';
import { Route as AuthImport } from './routes/_auth';
import { Route as AuthLayoutImport } from './routes/_auth/_layout';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-list.$codesListId/index';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/index';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/new';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/route';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/composition';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/index';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/merge';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/_layout-q/tcm-composition';
import { Route as AuthLayoutQuestionnaireQuestionnaireIdRouteImport } from './routes/_auth/_layout/questionnaire.$questionnaireId/route';
import { Route as AuthLayoutQuestionnairesIndexImport } from './routes/_auth/_layout/questionnaires/index';
import { Route as AuthLayoutQuestionnairesNewImport } from './routes/_auth/_layout/questionnaires/new';
import { Route as AuthLayoutQuestionnairesRouteImport } from './routes/_auth/_layout/questionnaires/route';
import { Route as IndexImport } from './routes/index';

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any);

const AuthLayoutQuestionnairesRouteRoute =
  AuthLayoutQuestionnairesRouteImport.update({
    id: '/questionnaires',
    path: '/questionnaires',
    getParentRoute: () => AuthLayoutRoute,
  } as any);

const AuthLayoutQuestionnairesIndexRoute =
  AuthLayoutQuestionnairesIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthLayoutQuestionnairesRouteRoute,
  } as any);

const AuthLayoutQuestionnairesNewRoute =
  AuthLayoutQuestionnairesNewImport.update({
    id: '/new',
    path: '/new',
    getParentRoute: () => AuthLayoutQuestionnairesRouteRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdRouteRoute =
  AuthLayoutQuestionnaireQuestionnaireIdRouteImport.update({
    id: '/questionnaire/$questionnaireId',
    path: '/questionnaire/$questionnaireId',
    getParentRoute: () => AuthLayoutRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport.update({
    id: '/_layout-q',
    getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdRouteRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionImport.update({
    id: '/tcm-composition',
    path: '/tcm-composition',
    getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeImport.update({
    id: '/merge',
    path: '/merge',
    getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionImport.update({
    id: '/composition',
    path: '/composition',
    getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport.update({
    id: '/codes-lists',
    path: '/codes-lists',
    getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () =>
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewImport.update({
    id: '/new',
    path: '/new',
    getParentRoute: () =>
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute,
  } as any);

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexImport.update(
    {
      id: '/codes-list/$codesListId/',
      path: '/codes-list/$codesListId/',
      getParentRoute: () => AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute,
    } as any,
  );

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth': {
      id: '/_auth';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth/_layout': {
      id: '/_auth/_layout';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthLayoutImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/_layout/questionnaires': {
      id: '/_auth/_layout/questionnaires';
      path: '/questionnaires';
      fullPath: '/questionnaires';
      preLoaderRoute: typeof AuthLayoutQuestionnairesRouteImport;
      parentRoute: typeof AuthLayoutImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId': {
      id: '/_auth/_layout/questionnaire/$questionnaireId';
      path: '/questionnaire/$questionnaireId';
      fullPath: '/questionnaire/$questionnaireId';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdRouteImport;
      parentRoute: typeof AuthLayoutImport;
    };
    '/_auth/_layout/questionnaires/new': {
      id: '/_auth/_layout/questionnaires/new';
      path: '/new';
      fullPath: '/questionnaires/new';
      preLoaderRoute: typeof AuthLayoutQuestionnairesNewImport;
      parentRoute: typeof AuthLayoutQuestionnairesRouteImport;
    };
    '/_auth/_layout/questionnaires/': {
      id: '/_auth/_layout/questionnaires/';
      path: '/';
      fullPath: '/questionnaires/';
      preLoaderRoute: typeof AuthLayoutQuestionnairesIndexImport;
      parentRoute: typeof AuthLayoutQuestionnairesRouteImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q';
      path: '';
      fullPath: '/questionnaire/$questionnaireId';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdRouteImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists';
      path: '/codes-lists';
      fullPath: '/questionnaire/$questionnaireId/codes-lists';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/composition': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/composition';
      path: '/composition';
      fullPath: '/questionnaire/$questionnaireId/composition';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/merge': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/merge';
      path: '/merge';
      fullPath: '/questionnaire/$questionnaireId/merge';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition';
      path: '/tcm-composition';
      fullPath: '/questionnaire/$questionnaireId/tcm-composition';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/';
      path: '/';
      fullPath: '/questionnaire/$questionnaireId/';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new';
      path: '/new';
      fullPath: '/questionnaire/$questionnaireId/codes-lists/new';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/';
      path: '/';
      fullPath: '/questionnaire/$questionnaireId/codes-lists/';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteImport;
    };
    '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/': {
      id: '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/';
      path: '/codes-list/$codesListId';
      fullPath: '/questionnaire/$questionnaireId/codes-list/$codesListId';
      preLoaderRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexImport;
      parentRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQImport;
    };
  }
}

// Create and export the route tree

interface AuthLayoutQuestionnairesRouteRouteChildren {
  AuthLayoutQuestionnairesNewRoute: typeof AuthLayoutQuestionnairesNewRoute;
  AuthLayoutQuestionnairesIndexRoute: typeof AuthLayoutQuestionnairesIndexRoute;
}

const AuthLayoutQuestionnairesRouteRouteChildren: AuthLayoutQuestionnairesRouteRouteChildren =
  {
    AuthLayoutQuestionnairesNewRoute: AuthLayoutQuestionnairesNewRoute,
    AuthLayoutQuestionnairesIndexRoute: AuthLayoutQuestionnairesIndexRoute,
  };

const AuthLayoutQuestionnairesRouteRouteWithChildren =
  AuthLayoutQuestionnairesRouteRoute._addFileChildren(
    AuthLayoutQuestionnairesRouteRouteChildren,
  );

interface AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren {
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
}

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren: AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren =
  {
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute,
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute,
  };

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute._addFileChildren(
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteChildren,
  );

interface AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren {
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren;
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute;
}

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren: AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren =
  {
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren,
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute,
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute,
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute,
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute,
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute,
  };

const AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren =
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute._addFileChildren(
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteChildren,
  );

interface AuthLayoutQuestionnaireQuestionnaireIdRouteRouteChildren {
  AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren;
}

const AuthLayoutQuestionnaireQuestionnaireIdRouteRouteChildren: AuthLayoutQuestionnaireQuestionnaireIdRouteRouteChildren =
  {
    AuthLayoutQuestionnaireQuestionnaireIdLayoutQRoute:
      AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren,
  };

const AuthLayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren =
  AuthLayoutQuestionnaireQuestionnaireIdRouteRoute._addFileChildren(
    AuthLayoutQuestionnaireQuestionnaireIdRouteRouteChildren,
  );

interface AuthLayoutRouteChildren {
  AuthLayoutQuestionnairesRouteRoute: typeof AuthLayoutQuestionnairesRouteRouteWithChildren;
  AuthLayoutQuestionnaireQuestionnaireIdRouteRoute: typeof AuthLayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren;
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutQuestionnairesRouteRoute:
    AuthLayoutQuestionnairesRouteRouteWithChildren,
  AuthLayoutQuestionnaireQuestionnaireIdRouteRoute:
    AuthLayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren,
};

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
);

interface AuthRouteChildren {
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren;
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
};

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '': typeof AuthLayoutRouteWithChildren;
  '/questionnaires': typeof AuthLayoutQuestionnairesRouteRouteWithChildren;
  '/questionnaire/$questionnaireId': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren;
  '/questionnaires/new': typeof AuthLayoutQuestionnairesNewRoute;
  '/questionnaires/': typeof AuthLayoutQuestionnairesIndexRoute;
  '/questionnaire/$questionnaireId/codes-lists': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren;
  '/questionnaire/$questionnaireId/composition': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  '/questionnaire/$questionnaireId/merge': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  '/questionnaire/$questionnaireId/tcm-composition': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  '/questionnaire/$questionnaireId/': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  '/questionnaire/$questionnaireId/codes-lists/new': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  '/questionnaire/$questionnaireId/codes-lists/': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
  '/questionnaire/$questionnaireId/codes-list/$codesListId': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '': typeof AuthLayoutRouteWithChildren;
  '/questionnaire/$questionnaireId': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  '/questionnaires/new': typeof AuthLayoutQuestionnairesNewRoute;
  '/questionnaires': typeof AuthLayoutQuestionnairesIndexRoute;
  '/questionnaire/$questionnaireId/composition': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  '/questionnaire/$questionnaireId/merge': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  '/questionnaire/$questionnaireId/tcm-composition': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  '/questionnaire/$questionnaireId/codes-lists/new': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  '/questionnaire/$questionnaireId/codes-lists': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
  '/questionnaire/$questionnaireId/codes-list/$codesListId': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/_auth': typeof AuthRouteWithChildren;
  '/_auth/_layout': typeof AuthLayoutRouteWithChildren;
  '/_auth/_layout/questionnaires': typeof AuthLayoutQuestionnairesRouteRouteWithChildren;
  '/_auth/_layout/questionnaire/$questionnaireId': typeof AuthLayoutQuestionnaireQuestionnaireIdRouteRouteWithChildren;
  '/_auth/_layout/questionnaires/new': typeof AuthLayoutQuestionnairesNewRoute;
  '/_auth/_layout/questionnaires/': typeof AuthLayoutQuestionnairesIndexRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQRouteWithChildren;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsRouteRouteWithChildren;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/composition': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCompositionRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/merge': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQMergeRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQTcmCompositionRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQIndexRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsNewRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListsIndexRoute;
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/': typeof AuthLayoutQuestionnaireQuestionnaireIdLayoutQCodesListCodesListIdIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | '/'
    | ''
    | '/questionnaires'
    | '/questionnaire/$questionnaireId'
    | '/questionnaires/new'
    | '/questionnaires/'
    | '/questionnaire/$questionnaireId/codes-lists'
    | '/questionnaire/$questionnaireId/composition'
    | '/questionnaire/$questionnaireId/merge'
    | '/questionnaire/$questionnaireId/tcm-composition'
    | '/questionnaire/$questionnaireId/'
    | '/questionnaire/$questionnaireId/codes-lists/new'
    | '/questionnaire/$questionnaireId/codes-lists/'
    | '/questionnaire/$questionnaireId/codes-list/$codesListId';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/'
    | ''
    | '/questionnaire/$questionnaireId'
    | '/questionnaires/new'
    | '/questionnaires'
    | '/questionnaire/$questionnaireId/composition'
    | '/questionnaire/$questionnaireId/merge'
    | '/questionnaire/$questionnaireId/tcm-composition'
    | '/questionnaire/$questionnaireId/codes-lists/new'
    | '/questionnaire/$questionnaireId/codes-lists'
    | '/questionnaire/$questionnaireId/codes-list/$codesListId';
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_auth/_layout'
    | '/_auth/_layout/questionnaires'
    | '/_auth/_layout/questionnaire/$questionnaireId'
    | '/_auth/_layout/questionnaires/new'
    | '/_auth/_layout/questionnaires/'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/composition'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/merge'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/'
    | '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthRoute: typeof AuthRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_layout"
      ]
    },
    "/_auth/_layout": {
      "filePath": "_auth/_layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_layout/questionnaires",
        "/_auth/_layout/questionnaire/$questionnaireId"
      ]
    },
    "/_auth/_layout/questionnaires": {
      "filePath": "_auth/_layout/questionnaires/route.tsx",
      "parent": "/_auth/_layout",
      "children": [
        "/_auth/_layout/questionnaires/new",
        "/_auth/_layout/questionnaires/"
      ]
    },
    "/_auth/_layout/questionnaire/$questionnaireId": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/route.tsx",
      "parent": "/_auth/_layout",
      "children": [
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q"
      ]
    },
    "/_auth/_layout/questionnaires/new": {
      "filePath": "_auth/_layout/questionnaires/new.tsx",
      "parent": "/_auth/_layout/questionnaires"
    },
    "/_auth/_layout/questionnaires/": {
      "filePath": "_auth/_layout/questionnaires/index.tsx",
      "parent": "/_auth/_layout/questionnaires"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId",
      "children": [
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists",
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/composition",
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/merge",
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition",
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/",
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/"
      ]
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/route.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q",
      "children": [
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new",
        "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/"
      ]
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/composition": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/composition.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/merge": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/merge.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/tcm-composition": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/tcm-composition.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/index.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/new": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/new.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-lists/index.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists"
    },
    "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/": {
      "filePath": "_auth/_layout/questionnaire.$questionnaireId/_layout-q/codes-list.$codesListId/index.tsx",
      "parent": "/_auth/_layout/questionnaire/$questionnaireId/_layout-q"
    }
  }
}
ROUTE_MANIFEST_END */
