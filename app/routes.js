const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/baby-age', function (req, res) {
  res.render('baby-age')
})

router.post('/baby-age', function (req, res) {
  const answer = req.session.data['baby-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'baby-age': 'Select how old your baby is.' }
    return res.render('baby-age')
  }
  if (answer === 'over-12-months') {
    return res.redirect('/ineligible-baby-age')
  }
  res.redirect('/communication-concerns')
})

router.get('/ineligible-baby-age', function (req, res) {
  res.render('ineligible-baby-age')
})

router.get('/communication-concerns', function (req, res) {
  res.render('communication-concerns')
})

router.post('/communication-concerns', function (req, res) {
  const answer = req.session.data['communication-concerns']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'communication-concerns': 'Select yes if you have concerns about communicating with your baby.' }
    return res.render('communication-concerns')
  }
  res.redirect('/current-challenges')
})

router.get('/current-challenges', function (req, res) {
  res.render('current-challenges')
})

router.post('/current-challenges', function (req, res) {
  const answer = req.session.data['current-challenges']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'current-challenges': 'Select your main challenge with communication.' }
    return res.render('current-challenges')
  }
  res.redirect('/parent-name')
})

router.get('/parent-name', function (req, res) {
  res.render('parent-name')
})

router.post('/parent-name', function (req, res) {
  const answer = req.session.data['parent-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'parent-name': 'Enter your full name.' }
    return res.render('parent-name')
  }
  res.redirect('/contact-email')
})

router.get('/contact-email', function (req, res) {
  res.render('contact-email')
})

router.post('/contact-email', function (req, res) {
  const answer = req.session.data['contact-email']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-email': 'Enter a valid email address.' }
    return res.render('contact-email')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('BC')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
