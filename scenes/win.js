add([
  text(args.score + "\n\n"),
  origin('center'),
  scale(6),
  pos(width() / 2, height() / 2)
  ])

add([
  text("Press up arrow key to continue"),
  origin('center'),
  scale(2),
  pos(width() / 2, height() / 2)
])

  keyPress('up', () => {
    go('main', { prevScore : args.score })
  })