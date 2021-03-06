import { Sprite, AudioManager as AM, ResourceManager as RM } from 'athenajs';

class MovingPlatform extends Sprite {
    constructor(options = {}) {
        super('movingPlatform', {
            imageId: 'tiles',
            x: options.x,
            y: options.y,
            pool: options.pool,
            map: options.map,
            collideGroup: 3,
            animations: {
                mainLoop: {
                    frameDuration: 1,
                    frames: [{
                        offsetX: 1244,
                        offsetY: 335,
                        width: 130,
                        height: 32,
                        hitBox: {
                            x: 0,
                            y: 0,
                            x2: 129,
                            y2: 31
                        },
                        plane: 0
                    }],
                    loop: 0
                }
            }
        });

        // options = options || {};

        options.x = typeof options.x !== 'undefined' ? options.x : 600;
        options.y = typeof options.y !== 'undefined' ? options.y : 300;

        this.running = true;
    }
};

RM.registerScript('MovingPlatform', MovingPlatform);

export default MovingPlatform;