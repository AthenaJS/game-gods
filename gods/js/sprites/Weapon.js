import { Sprite, AudioManager as AM, ResourceManager as RM } from 'athenajs';
class Weapon extends Sprite {
    constructor(options = {}) {
        // options.data = Object.assign({
        //     weaponType: 'knife',
        //     direction: 'right'
        // }, options.data);

        // this.weaponType = options.data.weaponType;

        super('knife', {
            imageId: 'enemies',
            x: options.x,
            y: options.y,
            pool: options.pool,
            canCollide: true,
            collideGroup: 2,
            data: Object.assign({
                weaponType: 'knife',
                direction: 'right'
            }, options.data),
            animations: {
                knife_left: {
                    frameDuration: 1,
                    frames: [{
                        width: 31,
                        height: 31,
                        offsetX: 0,
                        offsetY: 221,
                        hitBox: {
                            x: 13,
                            y: 14,// 6,
                            x2: 17,
                            y2: 18// 24
                        },
                        plane: 0
                    }],
                    loop: 0
                },
                knife_right: {
                    frameDuration: 1,
                    frames: [{
                        width: 31,
                        height: 31,
                        offsetX: 33,
                        offsetY: 221,
                        hitBox: {
                            x: 13,
                            y: 14, // 6,
                            x2: 17,
                            y2: 18 // 24
                        },
                        plane: 0
                    }],
                    loop: 0
                },
                disappear: {
                    frameDuration: 1,
                    frames: [{
                        offsetX: 0,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 34,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 68,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 102,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 136,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 170,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 204,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 238,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 272,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 306,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    },
                    {
                        offsetX: 340,
                        offsetY: 262,
                        width: 32,
                        height: 30,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 31,
                            y2: 31
                        },
                        plane: 0
                    }],
                    loop: 0
                }
            }
        });

        var that = this;

        // options = options || {};

        if (options.pool) {
            return;
        }

        options.data = Object.assign({
            weaponType: 'knife',
            direction: 'right'
        }, options.data);


        this.weaponType = options.data.weaponType;
        this.animName = this.weaponType + '_' + options.data.direction;

        this.animate('Rotate', {
            startValue: options.data.direction == 'left' ? 2 * Math.PI : 0,
            endValue: options.data.direction == 'left' ? 0 : 2 * Math.PI,
            duration: 800,
            loop: Infinity
        });

        this.setBehavior('weapon', {
            vx: options.data.direction == 'left' ? -6 : 6,
            vy: 0,
            gravity: 0,
            onVXChange: (vx) => {
                this.destroy(true);
            }
        });

        this.setAnimation(this.animName);

        this.running = true;
    }

    destroy(destroyAnimation) {
        this.movable = false;
        this.stopAnimate(0);

        if (destroyAnimation) {
            // only call parent's super once disappear animation has been played
            this.setAnimation('disappear', () => {
                super.destroy();
            });
            this.playSound('weapon_crash');
        } else {
            super.destroy();
        }
    }

    onCollision(sprite) {
        this.canCollide = false;
        this.destroy();
    }

    reset() {
        super.reset();

        this.currentMovement = '';
        // console.log('setting animation', this.animName);
        // this.setAnimation(this.animName);
    }
};

RM.registerScript('Weapon', Weapon);

export default Weapon;
