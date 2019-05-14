// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAMqtgP2QvpK1M9qhp-OytIA4VuvDRj9L0',
  authDomain: 'chatbot-f2bfd.firebaseapp.com',
  databaseURL: 'https://chatbot-f2bfd.firebaseio.com',
  projectId: 'chatbot-f2bfd',
  storageBucket: 'chatbot-f2bfd.appspot.com',
  messagingSenderId: '914652296787',
  appId: '1:914652296787:web:56ad1a5405f58b51',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const database = firebase.database()

const firebaseOps = {}

const states = {
  user: {
    number: '',
    mailid: '',
  },
  trip_details: {
    triptype: '',
    packagetype: '',
    destination: '',
    people: '',
    dates: '',
    duration: '',
  },
  requirements: {
    facilties: '',
    hotel: '',
    transport: '',
    calltime: '',
    summary: '',
  },
}

firebaseOps.writeUser = (user_number, user_mail) => {
  const users = database.ref()
  const newUser = users.push()
  newUser.set({
    number: user_number,
    mailid: user_mail,
  })
}

firebaseOps.writedetails = (
  trip_type,
  user_destination,
  no_of_people,
  tentative_date,
  trip_duration,
  package_type,
) => {
  const users = database.ref('/users')
  const newUser = users.push()
  newUser.set({
    triptype: trip_type,
    packagetype: package_type,
    destination: user_destination,
    people: no_of_people,
    dates: tentative_date,
    duration: trip_duration,
  })
}

firebaseOps.writeReq = (
  req_facilities,
  hotel_preference,
  transport_type,
  cust_call_time,
  summary_req,
) => {
  const users = database.ref('/users')
  const newUser = users.push()
  newUser.set({
    facilties: req_facilities,
    hotel: hotel_preference,
    transport: transport_type,
    calltime: cust_call_time,
    summary: summary_req,
  })
}
