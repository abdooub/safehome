# 🏠 SafeHome : Votre Maison Intelligente, Simplifiée.

## **Description du Projet**

**SafeHome** est une application web de surveillance et de contrôle à distance d'équipements domestiques. Conçue pour une utilisation intuitive sur **Desktop**, elle se focalise sur une interface utilisateur claire et une gestion efficace des données de surveillance et d'historique.

Ce projet est développé par une équipe de 6 personnes dans un cadre pédagogique. Notre objectif est de simuler une expérience de maison connectée complète.

## **Fonctionnalités Principales**

* **Surveillance (Simulée)** : Affichage du flux vidéo en temps réel simulé.
* **Contrôle des Appareils** : Interface pour activer/désactiver des équipements (lumières, climatisation, etc.).
* **Gestion des Alertes** : Réception, affichage et acquittement des notifications critiques.
* **Historique des Actions** : Journal chronologique complet des événements et des interactions utilisateur.
* **Interface Desktop** : UX/UI optimisée pour la clarté et la rapidité d'utilisation sur grand écran.

## **Stack Technique Proposée**

| Domaine | Technologie | Rôle |
| :--- | :--- | :--- |
| **Front-end** | **React** (ou similaire) | Interface utilisateur dynamique et composant. |
| **Back-end** | **Node.js / Express** | API RESTful pour la logique métier et la communication. |
| **Base de Données** | **MongoDB** (ou PostgreSQL) | Stockage des profils, de l'historique et des configurations. |
| **Temps Réel** | **Socket.IO** | Gestion des flux de surveillance et de la poussée des alertes. |

## **Architecture Modulaire**

Le projet est divisé en modules Client-Serveur pour permettre une répartition claire des tâches entre les 6 membres de l'équipe :

* **Dossier `frontend/`** : Contient tous les composants React (UI, Vues, Logique client).
* **Dossier `backend/`** : Contient l'API Express, la connexion à la BDD et la gestion Socket.IO.


## **Installation et Lancement du Projet**

### **Prérequis**

* Node.js (version 18+)
* npm ou yarn
* Serveur MongoDB (local ou distant)

### **1. Démarrage du Back-end**

```bash
cd backend
npm install
# Créez et configurez votre fichier .env (PORT, MONGODB_URI)
npm start
