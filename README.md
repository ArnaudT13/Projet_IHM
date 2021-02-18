# Projet IHM

## Utilisation
Lors du lancement de l'application, l'utilisateur est redirigé sur la page principale `login`. À cette étape, deux configurations sont possibles : s'**inscrire** ou s'**authentifier** sur l'application.  
Lorsque l'utilisateur est authentifié, il accède directement à la page contenant la liste des utilisateurs.  
Sur celle-ci, il peut **ajouter des utilisateurs** en cliquant sur le bouton en haut à droite et **se déconnecter** avec le bouton du header. Il a également la possibilité de dérouler les opérations possibles pour un utilisateur donné en le sélectionnant, c'est-à-dire, **afficher les détails**, **modifier** ou **supprimer un utilisateur**.  
Enfin via la page de détails et en déroulant la liste de boutons en haut à droite, l'utilisateur peut **modifier et supprimer l'utilisateur** sélectionné.

## Organisation des pages
L'application est composée de **six pages**:
- `login`est la page principale qui redirige l'utilisateur sur la page `home` en cas d'authentification valide et sur la page `register` en cas de demande d'inscription.
- `register` propose à l'utilisateur un formulaire d'inscription composé de trois champs : *email, password, confirm password*. L'application vérifie le pattern du champ *email* ainsi que la correspondance des deux champs *password* et renvoie un toast d'erreur en cas de non-respect.
- `home` est la page centrale après authentification de l'utilisateur. Elle contient la liste des utilisateurs présentée sous forme de *cards* à l'aide du composant `user-list`. Lors de la sélection d'un utilisateur, une boite de dialogue `ActionSheetController` est affichée proposant d'afficher les détails de l'utilisateur sélectionné (redirection page `user-details`), de le modifier (redirection page `update-user`) ou de le supprimer. Et l'ajout d'un utilisateur redirige directement l'utilisateur sur la page `insert-user`.
- `user-details` affiche les détails d'un utilisateur et offre la possibilité de le modifier (même redirection que précédemment) ou de le supprimer.
- `insert-user` permet d'ajouter un utilisateur via un formulaire constitué de deux champs : *name* et *job* (un toast de succès ou d'erreur est affiché à la fin de l'opération).
- `update-user` permet de modifier un utilisateur à l'aide d'un formulaire identique à celui de la page d'ajout (un toast de succès ou d'erreur est affiché à la fin de l'opération).   

Le retour en arrière est disponible sur les pages `user-details`, `insert-user`, `update-user` et `register`. Et la fonctionnalité de déconnexion est accessible via la page `home`. 

## Organisation des services
L'application est composée de **trois services**:
- `LoginService` gère la phase d'authentification et de déconnexion de l'utilisateur.
- `UserService` propose des méthodes permettant de réaliser les opérations sur les utilisateurs via l'api.
- `UtilsService` permet de disposer de fonctions générales pour la gestion des toasts.

## Quelques précisions
- L'entité utilisateur est implémentée via l'interface `user`.  
- L'interceptor `AuthInterceptor` est mis en place pour éviter les appels répétitifs du token.
- La notion de *Guard* d'authentification est implémentée dans la classe `IsSignedInGuard` et permet de rediriger l'utilisateur sur la page `login` en cas non-identification.
- La classe `CustomValidator` permet de proposer une méthode de vérification de la correspondance *password - confirm password*
