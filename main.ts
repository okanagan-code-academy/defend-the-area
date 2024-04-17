namespace SpriteKind {
    export const UI = SpriteKind.create()
}

function create_projectile (speed: number, target_sprite: Sprite, scale: number, source_sprite: Sprite, damage_amount: number) {
    projectile = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    projectile.setScale(scale, ScaleAnchor.Middle)
    projectile.setPosition(source_sprite.x, source_sprite.y)
    projectile.follow(target_sprite, speed)
    projectile.lifespan = 1000
    sprites.setDataNumber(projectile, "damage", damage_amount)
}
function on_health_zero (sprite: Sprite, points: number) {
    if (sprites.readDataNumber(sprite, "health") < 0) {
        sprites.destroy(sprite)
    }
}
function apply_damage(sprite: Sprite, damage_amount: number, color: number){
    create_text_sprite(damage_amount.toString(), sprite, Math.randomRange(-25, 25), -50, 200, color, (0.25)*damage_amount)
    sprites.changeDataNumberBy(sprite, "health", (-1)*damage_amount)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value = sprites.readDataNumber(sprite, "health")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    current_list += -1
    if (current_list < 0) {
        current_list = current_list + upgrade_list.length
    }
    current_list = current_list % upgrade_list.length
    selection_sprite.y += -10
    if (selection_sprite.y - menu_sprite.top < 0) {
        selection_sprite.y = menu_sprite.bottom - selection_sprite.height / 2
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Player, 200, function (sprite) {
    let nearby_enemy_list: Sprite[] = spriteutils.getSpritesWithin(SpriteKind.Enemy, 80, sprite)
    if (nearby_enemy_list.length > 0) {
        create_projectile(100, nearby_enemy_list._pickRandom(), 1, sprite, sprites.readDataNumber(tower_sprite, "projectile_damage"))
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    current_index += -1
    if (current_index < 0) {
        current_index = current_index + upgrade_list[current_list].length
    }
    current_index = current_index % upgrade_list[current_list].length
    selection_sprite.x += -40
    if (selection_sprite.x - scene.cameraProperty(CameraProperty.Left) < 0) {
        selection_sprite.x = scene.cameraProperty(CameraProperty.Right) - selection_sprite.width / 2
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    current_index += 1
    current_index = current_index % upgrade_list[current_list].length
    selection_sprite.x += 40
    if (selection_sprite.x - scene.cameraProperty(CameraProperty.Left) > scene.screenWidth()) {
        selection_sprite.x = scene.cameraProperty(CameraProperty.Left) + selection_sprite.width / 2
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    current_list += 1
    current_list = current_list % upgrade_list.length
    selection_sprite.y += 10
    if (selection_sprite.y - scene.cameraProperty(CameraProperty.Top) > scene.screenHeight()) {
        selection_sprite.y = menu_sprite.top + selection_sprite.height / 2
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    if(Math.percentChance(80)){
        apply_damage(otherSprite, sprites.readDataNumber(sprite, "damage"), 3)
    } else {
        create_text_sprite("miss", sprite, Math.randomRange(-25, 25), -50, 200, 2, 1)
    }
    
    on_health_zero(otherSprite, 1)
})

let projectile: Sprite = null
let upgrade_list: string[][] = []
let selection_sprite: Sprite = null
let menu_sprite: Sprite = null
let test_sprite: Sprite = null
let current_list: number = 0
let current_index: number = 0
let tower_sprite: Sprite = null
let total_enemy_count: number = 0

controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    if(upgrade_list[current_list][current_index] == "health_upgrade"){
        sprites.changeDataNumberBy(tower_sprite, "health", 5)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tower_sprite).setBarSize(statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tower_sprite).width + 5, 5)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tower_sprite).max += 5
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, tower_sprite).value += 5
    }
})

function create_tower(){
    tower_sprite = sprites.create(img`
        . . . b b b b b b b b b . . . .
        . . b 1 d d d d d d d 1 b . . .
        . b 1 1 1 1 1 1 1 1 1 1 1 b . .
        . b d b c c c c c c c b d b . .
        . b d c 6 6 6 6 6 6 6 c d b . .
        . b d c 6 d 6 6 6 6 6 c d b . .
        . b d c 6 6 6 6 6 6 6 c d b . .
        . b d c 6 6 6 6 6 6 6 c d b . .
        . b d c 6 6 6 6 6 6 6 c d b . .
        . b d c c c c c c c c c d b . .
        . c b b b b b b b b b b b c . .
        c b c c c c c c c c c c c b c .
        c 1 d d d d d d d d d d d 1 c .
        c 1 d 1 1 d 1 1 d 1 1 d 1 1 c .
        c b b b b b b b b b b b b b c .
        c c c c c c c c c c c c c c c .
    `, SpriteKind.Player)
    sprites.setDataNumber(tower_sprite, "health", 100)
    sprites.setDataNumber(tower_sprite, "projectile_damage", 5)
    sprites.setDataNumber(tower_sprite, "attack_range", 25)
    tiles.placeOnTile(tower_sprite, tiles.getTileLocation(9, 10))
    let statusbar: StatusBarSprite = statusbars.create(scene.screenWidth()/5, 5, StatusBarKind.Health)
    statusbar.setColor(10, 1)
    statusbar.positionDirection(CollisionDirection.Top)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    statusbar.max = sprites.readDataNumber(tower_sprite, "health")
    statusbar.value = statusbar.max
    statusbar.attachToSprite(tower_sprite)
    scene.cameraFollowSprite(tower_sprite)
    upgrade_list = [[
        "health_upgrade",
        "projectile_damage",
        "health_regen",
        "attack_range"
    ], [
        "health_upgrade",
        "projectile_damage",
        "health_regen",
        "attack_range"
    ]]
}

function intialize(){
    tiles.setCurrentTilemap(tilemap`level2`)
    create_tower()
    current_index = 0
    current_list = 0
    test_sprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . 5 5 . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Food)
    test_sprite.setPosition(tower_sprite.x, tower_sprite.y)
    menu_sprite = sprites.create(img`
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11115111511111115111511111115111511111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11152515251111152515251111152515251111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11522252225111522252225111522252225111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11522222225111522222225111522222225111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11152222251111152222251111152222251111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11115222511111115222511111115222511111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111555111111111555111111111555111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        c11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111cc11111111111111111111111111111111111111c
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `, SpriteKind.UI)
    menu_sprite.z = 100
    menu_sprite.setPosition(scene.cameraProperty(CameraProperty.Left) + 80, scene.cameraProperty(CameraProperty.Top) + 110)
    selection_sprite = sprites.create(img`
    2222222222222222222222222222222222222222
    2......................................2
    2......................................2
    2......................................2
    2......................................2
    2......................................2
    2......................................2
    2......................................2
    2......................................2
    2222222222222222222222222222222222222222
    `, SpriteKind.UI)
    selection_sprite.z = 100
    selection_sprite.setPosition(menu_sprite.left + selection_sprite.width / 2, menu_sprite.top + selection_sprite.height / 2)
}

intialize()

game.onUpdateInterval(2000, function () {
    create_enemy(randint(25, 75), 50)
})
function create_text_sprite(text: string, target_sprite: Sprite, velocity_x: number, velocity_y: number, acceleration_y: number, color: number, scale_factor: number){
    let text_sprite = textsprite.create(text)
    text_sprite.scale = scale_factor
    text_sprite.setOutline(1, color)
    text_sprite.setPosition(target_sprite.x, target_sprite.y)
    text_sprite.vx = velocity_x
    text_sprite.vy = velocity_y
    text_sprite.ay = acceleration_y
    text_sprite.lifespan = 400
}
function create_enemy(speed: number, health: number) {
    total_enemy_count += 1
    let small_enemy_sprite: Sprite = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Enemy)
    small_enemy_sprite.follow(tower_sprite, speed)
    tiles.placeOnRandomTile(small_enemy_sprite, sprites.castle.tilePath5)
    sprites.setDataNumber(small_enemy_sprite, "health", health)
    sprites.setDataNumber(small_enemy_sprite, "damage", 5)
    let statusbar: StatusBarSprite = statusbars.create(15, 4, StatusBarKind.Health)
    statusbar.setColor(4, 1)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    statusbar.max = sprites.readDataNumber(small_enemy_sprite, "health")
    statusbar.value = statusbar.max
    statusbar.attachToSprite(small_enemy_sprite)
    spriteutils.onSpriteUpdateInterval(small_enemy_sprite, 2000, function (sprite) {
        let tower_sprite = spriteutils.getSpritesWithin(SpriteKind.Player, 32, small_enemy_sprite)
        if (tower_sprite.length > 0) {
            apply_damage(tower_sprite[0], sprites.readDataNumber(small_enemy_sprite, "damage"), 2)
        }
    })
}
forever(function () {
    // test_sprite.sayText(upgrade_list[current_list][current_index])
})
