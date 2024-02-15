import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home', 
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'planner', 
        loadComponent: () => import('./planner/planner.component').then(m => m.PlannerComponent)
    },
    {
        path: 'player', 
        loadComponent: () => import('./player/player.component').then(m => m.PlayerComponent)
    }
];
