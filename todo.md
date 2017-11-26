# Todo

`next-time-tracker` todos

----

## Global
* [x] Favicon
* [x] Display warning if user hasn't validated their email
  * [x] Re-send validation email

----

## Pages

### Home
* [ ] Customize page for logged in user

### Login
* [x] Display login errors
* [ ] Create forgot password procedure
* [x] Validate email after login

### Register
* [ ] Catch and display technical errors e.g. network problems
* [x] Functionnal errors not displaying in production (400 error without body)

### Validate email
* [x] Re-send validation email

### Dashboard
* [x] Listen to spacebar to start/stop timer
* [ ] Display counter in real-time with a setInterval
* [ ] Smart detection of timer staying on all night

### Details
* [x] Create time-strip component
* [x] Add/Edit modal w/ flatpickr
* [x] Preset actions: Set normal work day, delete all day data
* [ ] Extract button generating an Excel file
* [x] Year/Month selector
* [x] Display current entry data adding a `Date.now()` to the `end` attribute to make it visualizable
* [ ] Set a limit to current entry data display to end of time strip

### Settings
* [x] Configure normal work day entries
* [x] Determine normal balance from normal work day entries
* [ ] Determine normal lunch period / breaks from normal work day entries (not useful for now)

### Profile
* [x] Edit connection info (username, email, password)
* [ ] Handle errors (network, username/email taken or wrong format, password not strong enough)

### Admin
* [ ] Create admin user rights
* [ ] Admin page with lots of options \o/
  * [ ] User manager

----

## Technical chanlenges
* [ ] Figure out upload w/ progress (axios?)
* [ ] Implement service worker
* [x] Setup email service using mailgun
* [ ] Secure API with policies
* [ ] i18n a11y
* [ ] Integrate Mobx with getInitialProps (https://github.com/zeit/next.js/pull/3260)
* [ ] Integrate `utils/api` with `waterline`
