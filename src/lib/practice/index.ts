// Practice Module Index
// Export all practice-related functionality

export * from './types';
export * from './practiceEngine';
export * from './bossBattles';

export { default as PracticeEngine, DRILL_TEMPLATES, EXAM_TEMPLATES } from './practiceEngine';
export { default as BOSS_BATTLES, initBossBattle, calculateDamage, getPhaseByHealthPercentage } from './bossBattles';
