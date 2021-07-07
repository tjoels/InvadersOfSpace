const MOVE_SPEED = 200
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const BULLET_SPEED = 400
const LEVEL_DOWN = 50 // how much the invaders move down each time they hit the sides.
const TIME_LEFT = 14
// const TIME_LEFT = 2

layer(['obj', 'ui'], 'obj')

addLevel([
  '!^^^^^^^^^^^^        &',
  '!^^^^^^^^^^^^        &',
  '!^^^^^^^^^^^^        &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &'
], {
  width: 30,
  height: 22,
  '^' : [ sprite('space-invader'), scale(0.7), 'space-invader'],
  '!' : [sprite('wall'), 'left-wall'],
  '&' : [sprite('wall'), 'right-wall']
})

const player = add([
  sprite('space-ship'),
  pos(width() / 2, height() / 2),
  origin('center')
])

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

function spawnBullet(p) {
  add([rect(6,18), 
  pos(p),
  origin('center'),
  color(0.5, 0.5, 1),
  'bullet' // tag
  ])
}

keyPress('space', () => {
  spawnBullet(player.pos.add(0, -20))
})

collides('bullet', 'space-invader', (b,s) => {
  camShake(score.value / 10)
  destroy(b)
  destroy(s)
  score.value++
  score.text = score.value
})

action('bullet', (b) => {
  b.move(0,-BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
})

const score = add([
  text((args.prevScore ? args.prevScore : 0)),
  pos(50,60),
  layer('ui'),
  scale(3),
  {
    value: (args.prevScore ? args.prevScore : 0),
    // value: 0, // to start with 0 in every new game
  }
])

const timer = add([
  text('0'),
  pos(90,50),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])

// const enemy_count = add([
//   text('space-invader'.length),
//   pos(90, 70),
//   scale(3),
//   layer('ui'),
//   {
//     count: 'space-invader'.length,
//   },
// ])

timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)
  if (timer.time <= 0 ) {
    go('win',  { score : score.value })
  }
  
})

action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

player.overlaps('space-invader', () => {
  go('win', { score : score.value })
})

action('space-invader', (s) => {
  if (s.pos.y >= (12 * 22 )) {
  // if (s.pos.y >= height() /2) {
    go('win', { score : score.value })
  }
})