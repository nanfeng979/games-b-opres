import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Yuqingxiang\'s game',
  version: '1.0',
  width: 375,
  height: 667,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameScene],
  backgroundColor: '#000000',
  render: { pixelArt: false, antialias: true }
};
