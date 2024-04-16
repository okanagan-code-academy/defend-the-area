controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    current_list += -1
    if (current_list < 0) {
        current_list = current_list + upgradeList.length
    }
    current_list = current_list % upgradeList.length
    selectionSprite.y += -10
    if (selectionSprite.y - menuSprite.top < 0) {
        selectionSprite.y = menuSprite.bottom - selectionSprite.height / 2
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    current_index += -1
    if (current_index < 0) {
        current_index = current_index + upgradeList[current_list].length
    }
    current_index = current_index % upgradeList[current_list].length
    selectionSprite.x += -20
    if (selectionSprite.x - scene.cameraProperty(CameraProperty.Left) < 0) {
        selectionSprite.x = scene.cameraProperty(CameraProperty.Right) - selectionSprite.width / 2
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    current_index += 1
    current_index = current_index % upgradeList[current_list].length
    selectionSprite.x += 20
    if (selectionSprite.x - scene.cameraProperty(CameraProperty.Left) > scene.screenWidth()) {
        selectionSprite.x = scene.cameraProperty(CameraProperty.Left) + selectionSprite.width / 2
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    current_list += 1
    current_list = current_list % upgradeList.length
    selectionSprite.y += 10
    if (selectionSprite.y - scene.cameraProperty(CameraProperty.Top) > scene.screenHeight()) {
        selectionSprite.y = menuSprite.top + selectionSprite.height / 2
    }
})
let upgradeList: number[][] = []
let menuSprite: Sprite = null
let current_list = 0
let current_index = 0
let selectionSprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
let towerSprite = sprites.create(img`
    ....................e2e22e2e....................
    .................222eee22e2e222.................
    ..............222e22e2e22eee22e222..............
    ...........e22e22eeee2e22e2eeee22e22e...........
    ........eeee22e22e22e2e22e2e22e22e22eeee........
    .....222e22e22eeee22e2e22e2e22eeee22e22e222.....
    ...22eeee22e22e22e22eee22eee22e22e22e22eeee22...
    4cc22e22e22eeee22e22e2e22e2e22e22eeee22e22e22cc4
    6c6eee22e22e22e22e22e2e22e2e22e22e22e22e22eee6c6
    46622e22eeee22e22eeee2e22e2eeee22e22eeee22e22664
    46622e22e22e22eeee22e2e22e2e22eeee22e22e22e22664
    4cc22eeee22e22e22e22eee22eee22e22e22e22eeee22cc4
    6c622e22e22eeee22e22e2e22e2e22e22eeee22e22e226c6
    466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
    46622e22eeee22e22e22e2e22e2e22e22e22eeee22e22664
    4cc22e22e22e22e22eeee2e22e2eeee22e22e22e22e22cc4
    6c622eeee22e22eeee22eee22eee22eeee22e22eeee226c6
    46622e22e22eeee22e22e2e22e2e22e22eeee22e22e22664
    466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
    4cc22e22eeee22e22e22e2e22e2e22e22e22eeee22e22cc4
    6c622e22e22e22e22e22eee22eee22e22e22e22e22e226c6
    46622eeee22e22e22eeecc6666cceee22e22e22eeee22664
    46622e22e22e22eeecc6666666666cceee22e22e22e22664
    4cceee22e22eeecc66666cccccc66666cceee22e22eeecc4
    6c622e22eeecc66666cc64444446cc66666cceee22e226c6
    46622e22cc66666cc64444444444446cc66666cc22e22664
    46622cc6666ccc64444444444444444446ccc6666cc22664
    4ccc6666ccc6444bcc666666666666ccb4446ccc6666ccc4
    cccccccc6666666cb44444444444444bc6666666cccccccc
    64444444444446c444444444444444444c64444444444446
    66cb444444444cb411111111111111114bc444444444bc66
    666cccccccccccd166666666666666661dccccccccccc666
    6666444444444c116eeeeeeeeeeeeee611c4444444446666
    666e2222222e4c16e4e44e44e44e44ee61c4e2222222e666
    666eeeeeeeee4c16e4e44e44e44e44ee61c4eeeeeeeee666
    666eddddddde4c66f4e4effffffe44ee66c4eddddddde666
    666edffdffde4c66f4effffffffff4ee66c4edffdffde666
    666edccdccde4c66f4effffffffffeee66c4edccdccde666
    666eddddddde4c66f4eeeeeeeeeeeeee66c4eddddddde666
    c66edffdffde4c66e4e44e44e44e44ee66c4edffdffde66c
    c66edccdccde4c66e4e44e44e44e44ee66c4edccdccde66c
    cc66666666664c66e4e44e44e44feeee66c46666666666cc
    .c66444444444c66e4e44e44e44ffffe66c44444444466c.
    ..c64eee4eee4c66f4e44e44e44f44fe66c4eee4eee46c..
    ...c4eee4eee4c66f4e44e44e44effee66c4eee4eee4c...
    ....644444444c66f4e44e44e44e44ee66c444444446....
    .....64eee444c66f4e44e44e44e44ee66c444eee46.....
    ......6ccc666c66e4e44e44e44e44ee66c666ccc6......
    `, SpriteKind.Player)
tiles.placeOnTile(towerSprite, tiles.getTileLocation(7, 7))
scene.cameraFollowSprite(towerSprite)
current_index = 0
current_list = 0
let testSprite = sprites.create(img`
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
    `, SpriteKind.Player)
testSprite.setPosition(towerSprite.x, towerSprite.y)
testSprite.z = 100
menuSprite = sprites.create(img`
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    c111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111cc111111111111111111c
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `, SpriteKind.Player)
menuSprite.setPosition(scene.cameraProperty(CameraProperty.Left) + 80, scene.cameraProperty(CameraProperty.Top) + 110)
selectionSprite = sprites.create(img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . . . . . . . . . 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, SpriteKind.Player)
selectionSprite.setPosition(menuSprite.left + selectionSprite.width / 2, menuSprite.top + selectionSprite.height / 2)
upgradeList = [[
0,
1,
2,
3,
4,
5,
6,
7
], [
8,
9,
10,
11,
12,
13,
14,
15
]]
forever(function () {
    testSprite.sayText(upgradeList[current_list][current_index])
})
