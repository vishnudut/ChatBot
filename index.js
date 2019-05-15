var botui = new BotUI('hello-world')
var trip_type,
  package_type,
  user_number,
  user_mail,
  user_destination,
  no_of_people,
  tentative_date,
  trip_duration,
  req_facilities,
  transport_type,
  hotel_preference,
  first_contact_deet,
  cust_call_time,
  summary_req,
  trip_style,
  location_domain

var transport_type = null
var hotel_preference = null

//   var app = document.querySelector('.botui-app-container')
//   var con = document.querySelector('.botui-container')

//   con.addEventListener('scroll', e => {
//     console.log('scroll', e, con)
//     e.stopPropagation()
//     debounce(doTheScroll, 500, false)(e.target)
//   })

//   const doTheScroll = el => {
//     console.log('doing the scrol')
//     el.scrollTop = el.scrollHeight - el.offsetHeight
//   }

//   function debounce(func, wait, immediate) {
//     var timeout

//     return function executedFunction() {
//       var context = this
//       var args = arguments

//       var later = function() {
//         timeout = null
//         if (!immediate) func.apply(context, args)
//       }

//       var callNow = immediate && !timeout

//       clearTimeout(timeout)

//       timeout = setTimeout(later, wait)

//       if (callNow) func.apply(context, args)
//     }
//   }

// Start Bot
// First Messages
botui.message
  .bot({
    content: 'Hi there! 👋 I am Alexa ',
  })
  .then(function() {
    return botui.message.bot({
      content: "I'm here to help you.",
    })
  })
  .then(function() {
    return botui.message.add({
      loading: true,
      delay: 800,
      content: 'Would you like to share your contact details ?',
    })
  })
  .then(function() {
    return botui.action.button({
      action: [
        {
          text: '👍 Yes',
          value: 'yes',
        },
        {
          text: '👎 No',
          value: 'no',
        },
      ],
    })
  })
  .then(function(res) {
    first_contact_deet = res.value
    console.log(first_contact_deet)
    if (res.value == 'yes') {
      cus_deet()
    } else {
      return botui.message
        .add({
          content: 'Ok 😓',
        })
        .then(function() {
          return questions()
        })
    }
  })
function cus_deet() {
  botui.message
    .add({
      loading: true,
      delay: 500,
      content: 'Please enter your mobile number',
    })
    .then(function() {
      return botui.action
        .text({
          action: {
            icon: 'phone',
            sub_type: 'tel',
            placeholder: 'Mobile number',
          },
        })
        .then(function(res) {
          user_number = res.value
          console.log(user_number)
        })
    })
    .then(function() {
      return botui.message
        .add({
          content: 'Please enter your email-id',
        })
        .then(function() {
          return botui.action
            .text({
              action: {
                icon: 'envelope',
                sub_type: 'email',
                placeholder: 'Mail id',
              },
            })
            .then(function(res) {
              user_mail = res.value
              console.log(user_mail)
            })
        })
    })
    .then(function() {
      return botui.message.add({
        content: 'Thanks for your details',
      })
    })
    .then(function() {
      questions()
    })
}
// Questions for customer
function questions() {
  botui.message
    .add({
      loading: true,
      delay: 500,
      content: 'What type of trip are you looking forward to?',
    })
    .then(function() {
      return botui.action.button({
        action: [
          {
            text: '👪 Family',
            value: 'family',
          },
          {
            text: '👫 Friends',
            value: 'friends',
          },
          {
            text: '💑 Romantic',
            value: 'romance',
          },
        ],
      })
    })
    .then(function(res) {
      trip_type = res.value
      console.log(trip_type)
    })
    .then(function() {
      return botui.message
        .add({
          loading: true,
          delay: 400,
          content: 'What kind of package are you looking forward to ?',
        })
        .then(function() {
          return botui.action.button({
            action: [
              {
                text: '📦 Existing Package',
                value: 'existingPackage',
              },
              {
                text: '📦 Create your own Package',
                value: 'createOwnPackage',
              },
            ],
          })
        })
        .then(function(res) {
          package_type = res.value
          console.log(trip_type)
          if (res.value == 'existingPackage') {
            return botui.message
              .add({
                loading: true,
                delay: 400,
                type: 'html',
                content:
                  'Check the packages here   <a href="https://www.visiit.com/">Visiit Packages</a> ',
              })
              .then(function() {
                firebaseOps.writeExist()
              })
          } else {
            ownPackage()
          }
        })
    })
}
// OWN PACKAGE
function ownPackage() {
  botui.message
    .add({
      loading: true,
      delay: 400,
      content: 'Do you have a destination in your mind ?',
    })
    .then(function() {
      return botui.action.button({
        action: [
          {
            text: '👍 Yes',
            value: 'yes',
          },
          {
            text: '👎 No',
            value: 'no',
          },
        ],
      })
    })
    .then(function(res) {
      if (res.value == 'yes') {
        botui.message
          .add({
            loading: true,
            delay: 400,
            content: 'Enter your destination in mind',
          })
          .then(function() {
            return botui.action.text({
              action: {
                sub_type: 'text',
                placeholder: 'Enter your destination here',
              },
            })
          })
          .then(function(res) {
            user_destination = res.value
            botui.message.add({
              content: 'Your destination is ' + user_destination,
            })
          })
          .then(function() {
            ownPack_commonPart()
          })
      } else {
        return botui.message
          .add({
            loading: true,
            delay: 800,
            content:
              'Okay.. Are you looking for an International trip or within India?',
          })
          .then(function() {
            return botui.action
              .button({
                action: [
                  { text: 'International trip', value: 'International' },
                  { text: 'within India', value: 'India' },
                ],
              })
              .then(function(res) {
                location_domain = res.value
                console.log(location_domain)
              })
          })
          .then(function() {
            if (location_domain == 'International') {
              International()
            } else {
              India()
            }
          })
      }
    })
}
// Function for International option in own Package
// Will be called only when the user selects he doesn't have an option for destination in mind
function International() {
  botui.message
    .add({
      loading: true,
      delay: 1000,
      content: 'What kind of trip are you looking forward to go ?',
    })
    .then(function() {
      return botui.action
        .button({
          action: [
            {
              text: '🚵 Adventure',
              value: 'adventure',
            },
            {
              text: '⛳ Leisure',
              value: 'leisure',
            },
            {
              text: '🌄 Hill Stations',
              value: 'hillStation',
            },
            {
              text: '💕 Romantic',
              value: 'romantic',
            },
            {
              text: '🌊 Beaches',
              value: 'beaches',
            },
            {
              text: '🌳 Nature',
              value: 'nature',
            },
          ],
        })
        .then(function(res) {
          trip_style = res.value
          console.log(trip_style)
        })
    })
    .then(function() {
      return botui.message.add({
        loading: true,
        delay: 400,
        content:
          'Based on your requirements, here are some suggested destinations',
      })
    })
    .then(function() {
      return botui.message.add({
        loading: true,
        delay: 400,
        content: 'Please select the one that you prefer',
      })
    })
    .then(function() {
      if (trip_style == 'adventure') {
        return botui.action.button({
          action: [
            { text: 'Thailand', value: 'thailand' },
            { text: 'Europ', value: 'europ' },
            { text: 'Bhutan', value: 'bhutan' },
            { text: 'Australia', value: 'australia' },
            { text: 'New Zeland', value: 'new zeland' },
          ],
        })
      } else if (trip_style == 'leisure') {
        return botui.action.button({
          action: [
            { text: 'Thailand', value: 'thailand' },
            { text: 'Sri Lanka', value: 'srilanka' },
            { text: 'Singapore', value: 'singapore' },
            { text: 'Europe', value: 'europe' },
            { text: 'Dubai', value: 'dubai' },
          ],
        })
      } else if (trip_style == 'hillStation') {
        return botui.action.button({
          action: [
            { text: 'Thailand', value: 'thailand' },
            { text: 'Sri Lanka', value: 'srilanka' },
            { text: 'Singapore', value: 'singapore' },
            { text: 'Europe', value: 'europe' },
            { text: 'Dubai', value: 'dubai' },
          ],
        })
      } else if (trip_style == 'romantic') {
        return botui.action.button({
          action: [
            { text: 'Bali', value: 'bali' },
            { text: 'Italy', value: 'italy' },
            { text: 'France', value: 'france' },
            { text: 'Iceland', value: 'iceland' },
            { text: 'Greece', value: 'greece' },
          ],
        })
      } else if (trip_style == 'beaches') {
        return botui.action.button({
          action: [
            { text: 'Bali', value: 'bali' },
            { text: 'Maldives', value: 'maldives' },
            { text: 'Spain', value: 'spain' },
            { text: 'Australia', value: 'australia' },
            { text: 'Fiji', value: 'fiji' },
          ],
        })
      } else if (trip_style == 'nature') {
        return botui.action.button({
          action: [
            { text: 'America', value: 'america' },
            { text: 'Greece', value: 'greece' },
            { text: 'Croatia', value: 'croatia' },
            { text: 'Italy', value: 'italy' },
          ],
        })
      }
    })
    .then(function(res) {
      user_destination = res.value
      console.log(user_destination)
    })
    .then(function() {
      ownPack_commonPart()
    })
}
function India() {
  botui.message
    .add({
      loading: true,
      delay: 1000,
      content: 'What kind of trip are you looking forward to go ?',
    })
    .then(function() {
      return botui.action
        .button({
          action: [
            {
              text: '🚵 Adventure',
              value: 'adventure',
            },
            {
              text: '⛳ Leisure',
              value: 'leisure',
            },
            {
              text: '🌄 Hill Stations',
              value: 'hillStation',
            },
            {
              text: '💕 Romantic',
              value: 'romantic',
            },
            {
              text: '🌊 Beaches',
              value: 'beaches',
            },
            {
              text: '🌳 Nature',
              value: 'nature',
            },
          ],
        })
        .then(function(res) {
          trip_style = res.value
          console.log(trip_style)
        })
    })
    .then(function() {
      return botui.message.add({
        loading: true,
        delay: 400,
        content:
          'Based on your requirements, here are some suggested destinations',
      })
    })
    .then(function() {
      return botui.message.add({
        loading: true,
        delay: 400,
        content: 'Please select the one that you prefer',
      })
    })
    .then(function() {
      if (trip_style == 'adventure') {
        return botui.action.button({
          action: [
            { text: 'Andaman', value: 'andaman' },
            { text: 'Coorg', value: 'coorg' },
            { text: 'Himachal', value: 'himachal' },
            { text: 'Ooty', value: 'Ooty' },
            { text: 'Ladakh', value: 'ladakh' },
          ],
        })
      } else if (trip_style == 'leisure') {
        return botui.action.button({
          action: [
            { text: 'Kerala', value: 'kerala' },
            { text: 'Andaman', value: 'andaman' },
            { text: 'Himachal', value: 'himachal' },
            { text: 'Ladakh', value: 'ladakh' },
            { text: 'Kashmir', value: 'kashmir' },
          ],
        })
      } else if (trip_style == 'hillStation') {
        return botui.action.button({
          action: [
            { text: 'Kerala', value: 'kerala' },
            { text: 'Kashmir', value: 'kashmir' },
            { text: 'Ooty', value: 'ooty' },
            { text: 'Himachal', value: 'himachal' },
            { text: 'Assam', value: 'assam' },
          ],
        })
      } else if (trip_style == 'romantic') {
        return botui.action.button({
          action: [
            { text: 'Kerala', value: 'kerala' },
            { text: 'Andaman', value: 'andaman' },
            { text: 'Shimla', value: 'shimla' },
            { text: 'Allepey', value: 'allepey' },
            { text: 'Ooty', value: 'ooty' },
            { text: 'Coorg', value: 'coorg' },
          ],
        })
      } else if (trip_style == 'beaches') {
        return botui.action.button({
          action: [
            { text: 'Goa', value: 'goa' },
            { text: 'Andaman', value: 'andaman' },
            { text: 'Kerala', value: 'kerala' },
          ],
        })
      } else if (trip_style == 'nature') {
        return botui.action.button({
          action: [
            { text: 'Kerala', value: 'kerala' },
            { text: 'Andaman', value: 'andaman' },
            { text: 'Assam', value: 'assam' },
            { text: 'Ladakh', value: 'Ladakh' },
            { text: 'Kashmir', value: 'kashmir' },
          ],
        })
      }
    })
    .then(function(res) {
      user_destination = res.value
      console.log(user_destination)
    })
    .then(function() {
      ownPack_commonPart()
    })
}
function ownPack_commonPart() {
  return botui.message
    .add({
      loading: true,
      delay: 400,
      content: 'No of people in the trip ?',
    })
    .then(function() {
      return botui.action
        .button({
          action: [
            {
              text: '1',
              value: '1',
            },
            {
              text: '2',
              value: '2',
            },
            {
              text: '3',
              value: '3',
            },
            {
              text: '4',
              value: '4',
            },
            {
              text: '5',
              value: '5',
            },
            {
              text: '>5',
              value: 'more than 5',
            },
          ],
        })
        .then(function(res) {
          no_of_people = res.value
          console.log(no_of_people)
        })
    })
    .then(function() {
      return botui.message.add({
        loading: true,
        delay: 400,
        content: 'Do you have a tentative date when are you leaving ?',
      })
    })
    .then(function() {
      return botui.action.button({
        action: [
          {
            text: '👍 Yes',
            value: 'yes',
          },
          {
            text: '👎 No',
            value: 'no',
          },
        ],
      })
    })
    .then(function(res) {
      if (res.value == 'yes') {
        return botui.action.text({
          action: {
            sub_type: 'date',
            placeholder: 'Select your date here',
          },
        })
      } else {
        return botui.message
          .add({
            loading: true,
            delay: 400,
            content: 'Select the month which you plan to go on trip',
          })
          .then(function() {
            return botui.action.button({
              action: [
                {
                  text: 'Jan',
                  value: 'jan',
                },
                {
                  text: 'Feb',
                  value: 'feb',
                },
                {
                  text: 'Mar',
                  value: 'mar',
                },
                {
                  text: 'Apr',
                  value: 'apr',
                },
                {
                  text: 'May',
                  value: 'may',
                },
                {
                  text: 'Jun',
                  value: 'jun',
                },
                {
                  text: 'Jul',
                  value: 'jul',
                },
                {
                  text: 'Aug',
                  value: 'aug',
                },
                {
                  text: 'Sep',
                  value: 'sep',
                },
                {
                  text: 'Oct',
                  value: 'oct',
                },
                {
                  text: 'Nov',
                  value: 'nov',
                },
                {
                  text: 'Dec',
                  value: 'dec',
                },
              ],
            })
          })
      }
    })
    .then(function(res) {
      tentative_date = res.value
      console.log(tentative_date)
    })
    .then(function() {
      return botui.message.add({
        loading: true,
        delay: 400,
        content: 'Please enter your trip duration',
      })
    })
    .then(function() {
      return botui.action.button({
        action: [
          {
            text: 'one day',
            value: '1',
          },
          {
            text: 'two days',
            value: '2',
          },
          {
            text: 'three days',
            value: '3',
          },
          {
            text: 'four days',
            value: '4',
          },
          {
            text: 'five days',
            value: '5',
          },
          {
            text: 'more than five days',
            value: '5+',
          },
        ],
      })
    })
    .then(function(res) {
      trip_duration = res.value
      console.log(trip_duration)
    })
    .then(function() {
      return botui.action.select({
        action: {
          placeholder: 'Select your required facilities',
          //value: 'TR,EN', // Selected value or Selected Array object. Example: [{value: "TR", text : "Türkçe" },{value: "EN", text : "English" }]
          multipleselect: true, // Default: false
          options: [
            {
              value: 'hotel',
              text: '🏨 Hotel',
            },
            {
              value: 'transport',
              text: '🚂 Transport',
            },
            {
              value: 'cab',
              text: '🚖 Cab',
            },
          ],
          button: {
            icon: 'check',
            label: 'OK',
          },
        },
      })
    })
    .then(function(res) {
      req_facilities = res.value
      console.log(req_facilities)
      if (
        res.value == 'hotel' ||
        res.value == 'cab, hotel' ||
        res.value == 'hotel, cab'
      ) {
        return botui.message
          .add({
            loading: true,
            delay: 400,
            content: 'Which type of hotel do you prefer?',
          })
          .then(function() {
            return botui.action
              .button({
                action: [
                  {
                    text: '⭐',
                    value: 'one star',
                  },
                  {
                    text: '⭐⭐',
                    value: 'two star',
                  },
                  {
                    text: '⭐⭐⭐',
                    value: 'three star',
                  },
                  {
                    text: '⭐⭐⭐⭐',
                    value: 'four star',
                  },
                  {
                    text: '⭐⭐⭐⭐⭐',
                    value: 'five star',
                  },
                ],
              })
              .then(function(res) {
                hotel_preference = res.value
                console.log(hotel_preference)
              })
          })
      }
      if (
        res.value == 'transport' ||
        res.value == 'cab, transport' ||
        res.value == 'transport, cab'
      ) {
        return botui.message
          .add({
            loading: true,
            delay: 400,
            content: 'Which mode of transport do you prefer?',
          })
          .then(function() {
            return botui.action
              .button({
                action: [
                  {
                    text: '🚄 Train',
                    value: 'train',
                  },
                  {
                    text: '✈ Flight',
                    value: 'flight',
                  },
                  {
                    text: '🚌 Bus',
                    value: 'bus',
                  },
                ],
              })
              .then(function(res) {
                transport_type = res.value
                console.log(transport_type)
              })
          })
      }
      if (
        res.value == 'transport, hotel' ||
        res.value == 'hotel, transport' ||
        res.value == 'cab, hotel, transport' ||
        res.value == 'hotel, cab, transport' ||
        res.value == 'transport, hotel, cab' ||
        res.value == 'cab, transport, hotel' ||
        res.value == 'hotel, transport, cab' ||
        res.value == 'transport, cab, hotel'
      ) {
        return botui.message
          .add({
            loading: true,
            delay: 400,
            content: 'Which mode of transport do you prefer?',
          })
          .then(function() {
            return botui.action
              .button({
                action: [
                  {
                    text: '🚄 Train',
                    value: 'train',
                  },
                  {
                    text: '✈ Flight',
                    value: 'flight',
                  },
                  {
                    text: '🚌 Bus',
                    value: 'bus',
                  },
                ],
              })
              .then(function(res) {
                transport_type = res.value
                console.log(transport_type)
              })
          })
          .then(function() {
            return botui.message
              .add({
                loading: true,
                delay: 400,
                content: 'Which type of hotel do you prefer ?',
              })
              .then(function() {
                return botui.action
                  .button({
                    action: [
                      {
                        text: '⭐',
                        value: 'one star',
                      },
                      {
                        text: '⭐⭐',
                        value: 'two star',
                      },
                      {
                        text: '⭐⭐⭐',
                        value: 'three star',
                      },
                      {
                        text: '⭐⭐⭐⭐',
                        value: 'four star',
                      },
                      {
                        text: '⭐⭐⭐⭐⭐',
                        value: 'five star',
                      },
                    ],
                  })
                  .then(function(res) {
                    hotel_preference = res.value
                    console.log(hotel_preference)
                    console.log(first_contact_deet)
                  })
              })
          })
      }
    })
    .then(function() {
      if (first_contact_deet == 'yes') {
        contact_summary()
      } else {
        return botui.message
          .add({
            loading: true,
            delay: 400,
            content: 'Please enter your mobile number',
          })
          .then(function() {
            return botui.action
              .text({
                action: {
                  sub_type: 'number',
                  placeholder: 'Enter your mobile number here',
                },
              })
              .then(function(res) {
                user_number = res.value
                console.log(user_number)
              })
          })
          .then(function() {
            return botui.message
              .add({
                loading: true,
                delay: 400,
                content: 'Please enter your email-id',
              })
              .then(function() {
                return botui.action
                  .text({
                    action: {
                      sub_type: 'email',
                      placeholder: 'Enter your mail id here',
                    },
                  })
                  .then(function(res) {
                    user_mail = res.value
                    console.log(user_mail)
                  })
              })
          })
          .then(function() {
            return botui.message.add({
              loading: true,
              delay: 400,
              content: 'Thanks for your details',
            })
          })
          .then(function() {
            contact_summary()
          })
      }
    })
}
// SUMMARY REQUIREMENT AND THANKING THE CUSTOMER
function contact_summary() {
  return botui.message
    .add({
      loading: true,
      delay: 400,
      content: 'At what time do you want our expert to contact you ?',
    })
    .then(function() {
      botui.action
        .button({
          action: [
            {
              text: '11AM - 1PM',
              value: '11AM - 1PM',
            },
            {
              text: '2PM - 4PM',
              value: '2AM - 4PM',
            },
            {
              text: '4:30PM - 6PM',
              value: '4:30PM - 6PM',
            },
            {
              text: 'Other timing',
              value: 'otherTime',
            },
          ],
        })
        .then(function(res) {
          cust_call_time = res.value
          console.log(cust_call_time)
          if (res.value == 'otherTime') {
            return botui.message
              .add({
                loading: true,
                delay: 400,
                content: 'Please enter the time you have in mind ',
              })
              .then(function() {
                return botui.action
                  .text({
                    action: {
                      sub_type: 'time',
                      placeholder: 'Enter your time here',
                    },
                  })
                  .then(function(res) {
                    cust_call_time = res.value
                    console.log(cust_call_time)
                  })
              })
          }
        })
        .then(function() {
          return botui.message
            .add({
              loading: true,
              delay: 400,
              content:
                'Would you like to have the summary of your package to your mobile phone ?',
            })
            .then(function() {
              return botui.action
                .button({
                  action: [
                    {
                      text: '👍 Yes',
                      value: 'yes_summary',
                    },
                    {
                      text: '👎 No',
                      value: 'no_summary',
                    },
                  ],
                })
                .then(function(res) {
                  summary_req = res.value
                  console.log(summary_req)
                  if (res.value == 'yes_summary') {
                    return botui.message
                      .add({
                        loading: true,
                        delay: 400,
                        content:
                          'Noted, The summary will be sent to your mobile phone',
                      })
                      .then(function() {
                        return botui.message.add({
                          content:
                            'Thank you for your patience, Our expert will contact you',
                        })
                      })
                  } else {
                    botui.message.add({
                      loading: true,
                      delay: 400,
                      content:
                        'Thank you for your patience, Our expert will contact you',
                    })
                  }
                })
            })
            .then(res => {
              if (
                user_number != null &&
                (location_domain == 'International' ||
                  location_domain == 'India')
              ) {
                firebaseOps.writeCreateNo(
                  user_number,
                  user_mail,
                  trip_type,
                  user_destination,
                  no_of_people,
                  tentative_date,
                  trip_duration,
                  package_type,
                  req_facilities,
                  hotel_preference,
                  transport_type,
                  cust_call_time,
                  summary_req,
                  trip_style,
                  location_domain,
                )
              } else if (user_number != null) {
                firebaseOps.writeCreateYes(
                  user_number,
                  user_mail,
                  trip_type,
                  user_destination,
                  no_of_people,
                  tentative_date,
                  trip_duration,
                  package_type,
                  req_facilities,
                  hotel_preference,
                  transport_type,
                  cust_call_time,
                  summary_req,
                )
              }
            })
        })
    })
}
