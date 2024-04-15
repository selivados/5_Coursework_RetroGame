/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = null;
    this.defence = null;
    this.health = 50;
    this.type = type;

    if (new.target.name === 'Character') {
      throw new Error('You cannot create objects of this class using new Character()');
    }
  }

  levelUp() {
    this.attack = Math.floor(Math
      .max(this.attack, this.attack * ((80 + this.health) / 100)));
    this.defence = Math.floor(Math
      .max(this.defence, this.defence * ((80 + this.health) / 100)));
    this.health = this.health + 80 > 100 ? 100 : this.health + 80;
  }
}
